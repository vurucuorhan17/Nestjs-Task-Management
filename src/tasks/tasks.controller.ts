import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskWithFilterDto } from './dto/get-task-with-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status.validation.pipe';
import { Task } from './task.entity';

@Controller('/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskWithFilterDto): Promise<Task[]>
  {
    return this.tasksService.getTasks(filterDto);
  }

  @Get("/:id")
  getTaskById(@Param("id", ParseIntPipe) id:number): Promise<Task>
  {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete("/:id")
  deleteTask(@Param("id",ParseIntPipe) id:number): Promise<void>
  {
    return this.tasksService.deleteTask(id);
  }

  @Patch("/:id/status")
  updateTask(@Param("id",ParseIntPipe) id:number,@Body("status") status: TaskStatus):Promise<Task>
  {
    return this.tasksService.updateTask(id,status);
  }

  /*@Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTaskWithFilterDto): Task[]
  {
    if(Object.keys(filterDto).length)
    {
      return this.tasksService.getTaskWithFilter(filterDto);
    }
    else
    {
      return this.tasksService.getAllTasks();
    }

  }

  @Get("/:id")
  getTaskById(@Param("id") id: string): Task
  {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto
  ): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete("/:id")
  deleteTask(@Param("id") id:string): void
  {
    return this.tasksService.deleteTask(id);
  }

  @Patch("/:id/status")
  updateTask(@Param("id") id:string, @Body("status", TaskStatusValidationPipe) status: TaskStatus)
  {
    this.tasksService.updateTask(id,status);
  }*/

  // createTask(
  //   @Body("title") title: string,
  //   @Body("description") description: string
  // ): Task
  // {
  //   return this.tasksService.createTask(title, description);
  // }

}
