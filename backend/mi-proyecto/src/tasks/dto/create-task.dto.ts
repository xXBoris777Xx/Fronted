import { IsBoolean, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'El título no puede estar vacío' })
  title: string;

  @IsString()
  @IsIn(['low', 'medium', 'high'], { message: 'La prioridad debe ser low, medium o high' })
  priority: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
