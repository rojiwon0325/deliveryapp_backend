import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CoreResult {
  @IsBoolean()
  ok: boolean;

  @IsString()
  @IsOptional()
  error?: string;
}
