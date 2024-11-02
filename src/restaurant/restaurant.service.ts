import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ClientRestaurantService } from '../client_restaurant/client_restaurant.service';
import { isNotEmpty } from 'class-validator';
import { IRestaurant, IRestaurantList } from './interface/restaurant.interface';
import { PaginationDto } from '../useful/dto/pagination.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    private prismaService: PrismaService,
    private clientRestaurant: ClientRestaurantService,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<IRestaurant> {
    try {
      const restaurant = await this.prismaService.restaurant.create({
        data: {
          name: createRestaurantDto.name,
          address: createRestaurantDto.address,
          capacity: createRestaurantDto.capacity,
        },
      });
      const clients = [];
      if (isNotEmpty(createRestaurantDto.clients)) {
        for (const client_id of createRestaurantDto.clients) {
          await this.clientRestaurant.createClientRestaurant({
            client_id: client_id,
            restaurant_id: restaurant.id,
          });
          clients.push(client_id);
        }
      }
      return {
        id: restaurant.id,
        name: restaurant.name,
        address: restaurant.address,
        capacity: restaurant.capacity,
        clients: clients,
      };
    } catch (error) {
      throw new BadRequestException('Failed to create restaurant. ' + error);
    }
  }

  async findAll(pagination: PaginationDto): Promise<IRestaurantList> {
    try {
      const total = await this.prismaService.restaurant.count();
      const data = await this.prismaService.restaurant.findMany({
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
          name: true,
          address: true,
          capacity: true,
          clients: {
            select: { client_id: true },
          },
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
      throw new BadRequestException('Error to load list' + error);
    }
  }

  async findOne(id: number): Promise<IRestaurant> {
    try {
      const data = await this.prismaService.restaurant.findFirst({
        select: {
          id: true,
          name: true,
          address: true,
          capacity: true,
          clients: {
            select: { client_id: true },
          },
        },
        where: {
          id: id,
        },
      });
      return this.transformation(data);
    } catch (error) {
      throw new BadRequestException('Error to load restaurant ' + error);
    }
  }

  async update(
    id: number,
    updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<IRestaurant> {
    try {
      return await this.prismaService.restaurant.update({
        where: { id: id },
        data: updateRestaurantDto,
      });
    } catch (error) {
      throw new BadRequestException('Failed to update restaurant ' + error);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prismaService.restaurant.delete({
        where: { id: id },
      });
    } catch (error) {
      throw new BadRequestException('Error to delete restaurant ' + error);
    }
  }

  transformation(data) {
    return {
      ...data,
      clients: data.clients.map((client) => client.client_id),
    };
  }
}
