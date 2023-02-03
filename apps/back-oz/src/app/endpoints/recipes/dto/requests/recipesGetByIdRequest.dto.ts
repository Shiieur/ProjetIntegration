import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class RecipesGetByIdRequestDto {
  @ApiProperty({
    description: 'Id of the recipe',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
