import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [ClientModule, RestaurantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
