import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.model';
// import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTaskWithFilterDto } from './dto/get-task-with-filter.dto';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {

  }

  getTasks(filterDto: GetTaskWithFilterDto): Promise<Task[]>
  {
    return this.taskRepository.getTasks(filterDto);
  }

  async getTaskById(id: number): Promise<Task>
  {
    const found = await this.taskRepository.findOne(id);

    if(!found)
    {
      throw new NotFoundException(`Task by Id ${id} not found`);
    }
    else
    {
      return found;
    }
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task>
  {
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTask(id: number): Promise<void>
  {
    const result = await this.taskRepository.delete(id);
    console.log(result);
  }

  async updateTask(id: number, status: TaskStatus): Promise<Task>
  {
    const result = await this.getTaskById(id);
    result.status = status;
    await result.save();
    return result;
  }

  /*private tasks: Task[] = [];

  getAllTasks(): Task[]
  {
    return this.tasks;
  }

  getTaskWithFilter(filterDto: GetTaskWithFilterDto): Task[]
  {
    const { status, search } = filterDto;
    
    let tasks = this.getAllTasks();
    
    if(status)
    {
      tasks = this.tasks.filter(task => task.status === status);
    }

    if(search)
    {
      tasks = this.tasks.filter(task => task.title.includes(search) || task.description.includes(search));
    }

    return tasks;
    
  }

  getTaskById(id: string): Task
  {
      const result = this.tasks.find(task => task.id === id);

      if(!result)
      {
        throw new NotFoundException(`Task by Id ${id} not found`);
      }
      else
      {
        return result;
      }

  }

  createTask(createTaskDto: CreateTaskDto): Task
  {
    const {title, description} = createTaskDto;

    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN
    }

    this.tasks.push(task);
    return task;

  }

  deleteTask(id: string): void
  {
     const result = this.getTaskById(id);

     this.tasks.forEach((task,i) => {
        if(task.id === id){
          return this.tasks.splice(i,1);
        }
    })
  }

  updateTask(id: string,status: TaskStatus)
  {
    const result = this.getTaskById(id);

    this.tasks.forEach((task,i) => {
      if(task.id === id)
      {
        this.tasks[i].status = status;
      }
    });
  }*/

  /*createTask(title: string, description: string): Task
  {
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN
    }

    this.tasks.push(task);
    return task;


  }*/

}
