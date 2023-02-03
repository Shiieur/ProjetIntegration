import { Module } from "@nestjs/common";
import { IngredientsController } from "./ingredients.controller";
import { IngredientService } from "./ingredients.service";

@Module({
    providers: [IngredientService],
    controllers: [IngredientsController]
})
export class IngredientsModule{}