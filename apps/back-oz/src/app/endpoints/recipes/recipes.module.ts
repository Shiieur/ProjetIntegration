import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipeService } from './recipes.service';

@Module({
  providers: [RecipeService],
  controllers: [RecipesController],
})
export class RecipesModule {}
