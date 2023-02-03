import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class IngredientsUpdateRequestDto {
  @ApiProperty({
    description: 'id of the updated ingredient',
    example: 5,
  })
  @IsNotEmpty()
  @IsNumber()
  ingredientId: number;

  @ApiProperty({
    description: "Name of the ingredient",
    example: "Pineapple"
  })
  @IsNotEmpty() 
  @Length(1, 50)
  @IsString()
  name : string;   

  @ApiProperty({
      description: "contains alcohol?",
      example: 0
  })
  @IsNotEmpty()
  @IsBoolean()
  alcoholic : boolean;

  @ApiProperty({
      description: 'Image of the ingredient',
      example: 'http://imageofingredient.com',
  })
  @IsNotEmpty()
  @IsString()
  imageUrl: string;  
}
