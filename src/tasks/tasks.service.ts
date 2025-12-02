import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  public async create(createTaskDto: CreateTaskDto) {
    const task = this.tasksRepository.create(createTaskDto);
    return await this.tasksRepository.save(task);
  }

  findAll() {
    return `This action returns all tasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  async update(updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksRepository.findOneBy({ id: updateTaskDto.id });
    if (!task) {
      throw new BadRequestException(
        `Task with ID ${updateTaskDto.id} not found`,
      );
    }
    Object.assign(task, updateTaskDto);
    return await this.tasksRepository.save(task);
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
