import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UpdateTagDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @Matches(/^#([0-9a-fA-F]{6})$/, { message: 'color 须为 #RRGGBB' })
  color?: string | null;
}
