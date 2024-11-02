import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { IOrder, IOrderList } from './interface/order.interface';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<IOrder> {
    return await this.orderService.create(createOrderDto);
  }

  @Get()
  async findAll(
    @Query('take') take: string,
    @Query('skip') skip: string,
    @Query('cursor') cursor: string,
  ): Promise<IOrderList> {
    return await this.orderService.findAll({
      take: +take,
      skip: +skip,
      cursor: +cursor,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IOrder> {
    return await this.orderService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.orderService.remove(+id);
  }
}
