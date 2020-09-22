import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform
{
  readonly allowedStatus = [
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
    TaskStatus.OPEN,
  ];

  transform(value: any): any
  {
    value = value.toUpperCase();

    if(!this.isValidStatus(value))
    {
      throw new BadRequestException(`${value} is invalid status`);
    }
    else
    {
      return value;
    }
  }

  private isValidStatus(status: any)
  {
    const index = this.allowedStatus.indexOf(status);

    return index !== -1;
  }

}