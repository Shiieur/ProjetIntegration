import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipesModule } from './endpoints/recipes/recipes.module';
import { IngredientsModule } from './endpoints/ingredients/ingredients.module';
import { AuthzModule } from '../authz/authz.module';

@Module({
  imports: [IngredientsModule, RecipesModule, AuthzModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
