import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseArrayPipe,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { RecipesCreateRequestDto } from './dto/requests/recipesCreateRequest.dto';
import { RecipesUpdateRequestDto } from './dto/requests/recipesUpdateRequest.dto';
import { RecipeService } from './recipes.service';
import { infologger } from '../../utils/winstonLogger';
import { PermissionsGuard } from '../../../permissions.guard';
import { Permissions } from '../../../permissions.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private recipeService: RecipeService) {}

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions('create:recipes')
  @Post()
  async create(
    @Body(new ValidationPipe({ transform: true }))
    bodyRecipe: RecipesCreateRequestDto,
    @Res() response: Response
  ) {
    const result = await this.recipeService.create(bodyRecipe);
    infologger.debug(`Create recipe success : ${JSON.stringify(bodyRecipe)}`);
    return response.status(HttpStatus.CREATED).json(result);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions('read:recipes')
  @Get()
  async find(
    @Query('ids', new ParseArrayPipe({ optional: true, items: Number, separator: ',' }))
    ids: number[],
    @Res() response: Response
  ) {
    if (ids) {
      const result = await this.recipeService.getById(ids);
      infologger.debug(`Get recipes by id success : ${JSON.stringify(result)}`);
      return response.status(HttpStatus.OK).json(result);
    } else {
      const result = await this.recipeService.getAll();
      infologger.debug(`Get all recipes success : ${JSON.stringify(result)}`);
      return response.status(HttpStatus.OK).json(result);
    }
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions('delete:recipes')
  @Delete()
  async delete(
    @Query('ids', new ParseArrayPipe({ optional: true, items: Number, separator: ',' }))
    ids: number[],
    @Res() response: Response
  ) {
    const result = await this.recipeService.delete(ids);
    infologger.debug(`Delete the recipe with the id: ${JSON.stringify(ids)}`);
    return response.status(HttpStatus.OK).json(result);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions('update:recipes')
  @Put()
  async update(
    @Body(new ValidationPipe({ transform: true }))
    bodyRecipe: RecipesUpdateRequestDto,
    @Res() response: Response
  ) {
    const result = await this.recipeService.update(bodyRecipe, bodyRecipe.recipeId);
    infologger.debug(
      `Update the recipe with the id: ${bodyRecipe.recipeId} with the following:${JSON.stringify(bodyRecipe)}`
    );
    return response.status(HttpStatus.OK).json(result);
  }
}
