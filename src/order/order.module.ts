import { Module } from '@nestjs/common/decorators';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ClientRestaurantService } from '../client_restaurant/client_restaurant.service';
import { ClientService } from 'src/client/client.service';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    PrismaService,
    ClientRestaurantService,
    ClientService,
  ],
})
export class OrderModule {}
