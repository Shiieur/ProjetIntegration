import { ApiProperty } from '@nestjs/swagger';
import { IImage, IIngredient, IRecipeIngredientsDto, RecipeType } from './../../../../utils/interfaces';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class RecipesUpdateRequestDto {
  @ApiProperty({
    description: 'id of the updated recipe',
    example: 5,
  })
  @IsNotEmpty()
  @IsNumber()
  recipeId: number;

  @ApiProperty({
    description: 'Name of the recipe',
    example: 'Pinna Colada',
  })
  @IsNotEmpty()
  @Length(1, 50)
  @IsString()
  name: string;

  @ApiProperty({
    description: 'List of the ingredients ids used in the recipe',
    example: [
      { ingredientId: 1, quantity: 20, unitId: 4 },
      { ingredientId: 2, quantity: 20, unitId: 4 },
      { ingredientId: 4, quantity: 1, unitId: 4 },
    ],
  })
  ingredientsInfo?: IRecipeIngredientsDto[];

  @ApiProperty({
    description: 'How many drinks it can make',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'meal or drink',
    example: 'Meal',
  })
  @IsNotEmpty()
  @Length(1, 50)
  type: RecipeType;

  @ApiProperty({
    description: 'Images links for the recipe',
    example: '["http://google.com/image","http://google.com/image"]',
  })
  @IsString({ each: true })
  imageUrls: string[];

  @ApiProperty({
    description: 'steps for the recipe',
    example: '<h1>Step 1</h1><p>Blabla</p></br><h1>Step 2</h1><p>Blabla</p></br>',
  })
  @IsNotEmpty()
  @Length(1, 9999)
  @IsString()
  steps: string;

  @ApiProperty({
    description: 'Tags to search and display on cards',
    example: ['Amaretto', 'Lime juice', 'Egg white'],
  })
  @IsNotEmpty()
  @IsString({ each: true })
  tags: string[];
}
