import { IsObject } from 'class-validator';

export class PatchMeDto {
  @IsObject()
  preferences!: Record<string, unknown>;
}
