import { IsNumber } from 'class-validator';

export class BulkAssignUserDto {
  @IsNumber({}, { each: true })
  userIds: number[];

  @IsNumber()
  orgId: number;
}
