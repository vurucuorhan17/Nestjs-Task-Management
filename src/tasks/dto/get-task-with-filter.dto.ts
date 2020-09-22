import { TaskStatus } from '../task.model';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class GetTaskWithFilterDto
{
  @IsOptional()
  @IsIn([TaskStatus.OPEN,TaskStatus.DONE,TaskStatus.IN_PROGRESS])
  @IsNotEmpty()
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}