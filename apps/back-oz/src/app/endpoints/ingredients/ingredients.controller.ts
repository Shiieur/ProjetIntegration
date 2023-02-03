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
import { infologger } from '../../utils/winstonLogger';
import { IngredientsCreateRequestDto } from './dto/requests/ingredientsCreateRequest.dto';
import { IngredientsUpdateRequestDto } from './dto/requests/ingredientsUpdateRequest.dto';
import { IngredientService } from './ingredients.service';
import { PermissionsGuard } from '../../../permissions.guard';
import { Permissions } from '../../../permissions.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('ingredients')
@Controller('ingredients')
export class IngredientsController {
  constructor(private ingredientService: IngredientService) {}

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions('create:ingredients')
  @Post()
  async create(
    @Body(new ValidationPipe({ transform: true }))
    bodyIngredient: IngredientsCreateRequestDto,
    @Res() response: Response
  ) {
    const result = await this.ingredientService.create(bodyIngredient);
    infologger.debug(`Create ingredient success : ${JSON.stringify(bodyIngredient)}`);
    return response.status(HttpStatus.CREATED).json(result);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions('read:ingredients')
  @Get()
  async find(
    @Query('ids', new ParseArrayPipe({ optional: true, items: Number, separator: ',' }))
    ids: number[],
    @Res() response: Response
  ) {
    if (ids) {
      const result = await this.ingredientService.getFullIngredients(ids);
      infologger.debug(`Get ingredients by id success : ${JSON.stringify(result)}`);
      return response.status(HttpStatus.OK).json(result);
    } else {
      const result = await this.ingredientService.getFullIngredients();
      infologger.debug(`Get all ingredients success : ${JSON.stringify(result)}`);
      return response.status(HttpStatus.OK).json(result);
    }
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions('delete:ingredients')
  @Delete()
  async delete(
    @Query('ids', new ParseArrayPipe({ optional: true, items: Number, separator: ',' }))
    ids: number[],
    @Res() response: Response
  ) {
    const result = await this.ingredientService.delete(ids);
    infologger.debug(`Delete the ingredient with the id: ${JSON.stringify(ids)}`);
    return response.status(HttpStatus.OK).json(result);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions('update:ingredients')
  @Put()
  async update(
    @Body(new ValidationPipe({ transform: true }))
    bodyIngredient: IngredientsUpdateRequestDto,
    @Res() response: Response
  ) {
    const result = await this.ingredientService.update(bodyIngredient, bodyIngredient.ingredientId);
    infologger.debug(
      `Update the ingredient with the id: ${bodyIngredient.ingredientId} with the following:${JSON.stringify(
        bodyIngredient
      )}`
    );
    return response.status(HttpStatus.OK).json(result);
  }
}
