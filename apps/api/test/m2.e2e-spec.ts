import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { execSync } from 'node:child_process';
import * as path from 'node:path';
import { AppModule } from '../src/app.module';
import { ApiResponseInterceptor } from '../src/common/api-response.interceptor';
import { HttpExceptionFilter } from '../src/common/http-exception.filter';

const hasDb = Boolean(process.env.DATABASE_URL);

const d = hasDb ? describe : describe.skip;

d('M2 API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const apiRoot = path.join(__dirname, '..');
    execSync('npx prisma migrate deploy', { cwd: apiRoot, stdio: 'inherit', env: process.env });
    execSync('npx prisma db seed', { cwd: apiRoot, stdio: 'inherit', env: process.env });

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new ApiResponseInterceptor());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /auth/login 仍可用（预留签发 token，业务路由不校验）', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'admin', password: '123456' })
      .expect(200);
    expect(res.body.code).toBe('OK');
    expect(res.body.data.accessToken).toBeDefined();
  });

  it('GET /users/me 无需 Authorization', async () => {
    const res = await request(app.getHttpServer()).get('/users/me').expect(200);
    expect(res.body.data.username).toBe('admin');
    expect(res.body.data.preferences).toBeDefined();
  });

  it('GET /learning/entry', async () => {
    const res = await request(app.getHttpServer()).get('/learning/entry').expect(200);
    expect(res.body.data.direction).toBe('ai-agent');
    expect(res.body.data.path.key).toBe('ai-agent-main');
    expect(res.body.data.stages.length).toBeGreaterThan(0);
  });

  it('PATCH /users/me preferences', async () => {
    const res = await request(app.getHttpServer())
      .patch('/users/me')
      .send({
        preferences: {
          preferredDirection: 'general',
          background: 'generalist',
          goal: 'skill-upgrade',
          pace: 'normal',
        },
      })
      .expect(200);
    expect(res.body.data.preferences.preferredDirection).toBe('general');
  });

  it('GET /learning/entry after general preference', async () => {
    const res = await request(app.getHttpServer()).get('/learning/entry').expect(200);
    expect(res.body.data.direction).toBe('general');
    expect(res.body.data.highlight).toEqual([]);
  });

  it('categories + knowledge CRUD', async () => {
    const cat = await request(app.getHttpServer())
      .post('/categories')
      .send({ name: 'Test Cat', description: 'd' })
      .expect(201);
    const categoryId = cat.body.data.id;

    const tag = await request(app.getHttpServer())
      .post('/tags')
      .send({ name: 't1', color: '#aabbcc' })
      .expect(201);
    const tagId = tag.body.data.id;

    const kn = await request(app.getHttpServer())
      .post('/knowledge')
      .send({
        title: 'Hello',
        summary: 'world summary',
        content: '# md',
        sourceType: 'web',
        contentType: 'article',
        difficulty: 'intro',
        categoryId,
        tagIds: [tagId],
      })
      .expect(201);
    const kid = kn.body.data.id;
    expect(kn.body.data.tags).toHaveLength(1);

    const list = await request(app.getHttpServer()).get('/knowledge?q=Hello').expect(200);
    expect(list.body.data.items.length).toBeGreaterThanOrEqual(1);

    await request(app.getHttpServer()).delete(`/knowledge/${kid}`).expect(200);

    await request(app.getHttpServer()).delete(`/tags/${tagId}`).expect(200);

    await request(app.getHttpServer()).delete(`/categories/${categoryId}`).expect(200);
  });
});
