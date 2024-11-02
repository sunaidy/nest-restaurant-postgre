import { Module } from '@nestjs/common/decorators';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { PrismaModule } from './prisma/prisma.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [ClientModule, RestaurantModule, PrismaModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
