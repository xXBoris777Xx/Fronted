import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async getTasks() {
    return this.prisma.task.findMany();
  }

  async getTaskById(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException(`Tarea con id ${id} no encontrada`);
    return task;
  }

  async createTask(dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        priority: dto.priority,
        completed: dto.completed ?? false,
      },
    });
  }

  async updateTask(id: number, dto: UpdateTaskDto) {
    await this.getTaskById(id); // lanza 404 si no existe
    return this.prisma.task.update({
      where: { id },
      data: dto,
    });
  }

  async deleteTask(id: number) {
    await this.getTaskById(id); // lanza 404 si no existe
    return this.prisma.task.delete({ where: { id } });
  }
}
