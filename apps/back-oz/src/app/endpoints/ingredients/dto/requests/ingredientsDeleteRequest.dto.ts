import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class IngredientsDeleteRequestDto {
  @ApiProperty({
    description: 'Id of the ingredient',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
