/** 与 vite.config / .env.development 一致；未配置时默认本机 API，避免请求落到 H5 开发机 5173 的相对路径 */
const DEFAULT_API_BASE = 'http://127.0.0.1:3000';

function baseUrl(): string {
  const raw = import.meta.env.VITE_API_BASE_URL;
  const u = typeof raw === 'string' && raw.trim().length > 0 ? raw.trim() : DEFAULT_API_BASE;
  return u.replace(/\/$/, '');
}

export type ApiEnvelope<T> = {
  code: string;
  message: string;
  data: T;
};

export function request<T>(
  path: string,
  options: {
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    body?: Record<string, unknown>;
  } = {},
): Promise<ApiEnvelope<T>> {
  const { method = 'GET', body } = options;
  const url = `${baseUrl()}${path.startsWith('/') ? path : `/${path}`}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  return new Promise((resolve, reject) => {
    uni.request({
      url,
      method,
      data: body,
      header: headers,
      success: (res) => {
        const raw = res.data;
        if (typeof raw !== 'object' || raw === null) {
          reject(
            new Error(
              res.statusCode >= 400
                ? `HTTP ${res.statusCode}`
                : '接口返回格式异常（请确认 API 地址是否为后端服务）',
            ),
          );
          return;
        }
        const payload = raw as ApiEnvelope<T> & { code?: string };
        if (res.statusCode >= 400) {
          reject(
            new Error(
              typeof payload?.message === 'string'
                ? payload.message
                : `HTTP ${res.statusCode}`,
            ),
          );
          return;
        }
        if (payload?.code && payload.code !== 'OK') {
          reject(new Error(payload.message || payload.code));
          return;
        }
        resolve(payload as ApiEnvelope<T>);
      },
      fail: (err) => {
        const msg =
          err && typeof err === 'object' && 'errMsg' in err
            ? String((err as { errMsg?: string }).errMsg)
            : '网络请求失败';
        reject(new Error(msg || '网络请求失败'));
      },
    });
  });
}
