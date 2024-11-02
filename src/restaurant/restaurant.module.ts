import { Module } from '@nestjs/common/decorators';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { ClientRestaurantService } from 'src/client_restaurant/client_restaurant.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientService } from 'src/client/client.service';

@Module({
  controllers: [RestaurantController],
  providers: [
    RestaurantService,
    PrismaService,
    ClientRestaurantService,
    ClientService,
  ],
})
export class RestaurantModule {}
