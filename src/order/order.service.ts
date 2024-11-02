import { Injectable } from '@nestjs/common/decorators';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common/exceptions';
import { PaginationDto } from '../pagination/dto/pagination.dto';
import { ClientRestaurantService } from '../client_restaurant/client_restaurant.service';
import { IOrder, IOrderList } from './interface/order.interface';
import { isEmpty } from 'class-validator';

@Injectable()
export class OrderService {
  constructor(
    private prismaService: PrismaService,
    private clientRestaurant: ClientRestaurantService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<IOrder> {
    try {
      if (
        !(await this.clientRestaurant.existRestaurantAndClient(
          createOrderDto.restaurant_id,
          createOrderDto.client_id,
        ))
      ) {
        throw new BadRequestException(
          'The customer is not in the restaurantThe customer is not in the restaurant ',
        );
      }
      return await this.prismaService.order.create({
        data: createOrderDto,
        select: {
          id: true,
          description: true,
          client: true,
          restaurant: true,
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to create order. ' + error);
    }
  }

  async findAll(pagination: PaginationDto): Promise<IOrderList> {
    try {
      const total = await this.prismaService.order.count();
      const data = await this.prismaService.order.findMany({
        take: pagination.take,
        ...(pagination.skip ? { skip: pagination.skip } : {}),
        ...(pagination.cursor
          ? {
              cursor: {
                id: pagination.cursor,
              },
            }
          : {}),
        select: {
          id: true,
          description: true,
          client: true,
          restaurant: true,
        },
        orderBy: {
          id: 'asc',
        },
      });

      const totalPage = Math.ceil(total / pagination.take);
      const page = pagination.page ? pagination.page : 1;

      return {
        data,
        meta: {
          total: total,
          totalPage: totalPage,
          currentPage: page,
        },
      };
    } catch (error) {
      throw new BadRequestException('Error to load list. ' + error);
    }
  }

  async findOne(id: number): Promise<IOrder> {
    try {
      return await this.prismaService.order.findFirst({
        select: {
          id: true,
          description: true,
          client: true,
          restaurant: true,
        },
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new BadRequestException('Error to load order. ' + error);
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      if (!(await this.existOrder(id))) {
        throw new BadRequestException('The order does not exist');
      }
      return await this.prismaService.order.update({
        where: { id: id },
        data: updateOrderDto,
      });
    } catch (error) {
      throw new BadRequestException('Failed to update order ' + error);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prismaService.order.delete({
        where: { id: id },
      });
    } catch (error) {
      throw new BadRequestException('Error to delete order. ' + error);
    }
  }

  async existOrder(id: number): Promise<boolean> {
    const order = await this.prismaService.order.findFirst({
      where: {
        id: id,
      },
    });
    if (isEmpty(order)) {
      return false;
    }
    return true;
  }
}
