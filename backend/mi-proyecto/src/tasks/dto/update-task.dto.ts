import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsIn(['low', 'medium', 'high'], { message: 'La prioridad debe ser low, medium o high' })
  @IsOptional()
  priority?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
