import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClientRestaurantDto } from './dto/create-client_restaurant.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ClientService } from '../client/client.service';
import { isEmpty } from 'class-validator';

@Injectable()
export class ClientRestaurantService {
  constructor(
    private prismaService: PrismaService,
    private clientServide: ClientService,
  ) {}

  async createClientRestaurant(
    createClientRestaurantDto: CreateClientRestaurantDto,
  ) {
    try {
      if (
        !(await this.clientServide.existClient(
          createClientRestaurantDto.client_id,
        ))
      ) {
        throw new BadRequestException('The client does not exist');
      }
      return await this.prismaService.client_restaurant.create({
        data: createClientRestaurantDto,
      });
    } catch (error) {
      throw new BadRequestException(
        'Failed to create ralation with client' + error,
      );
    }
  }
  async existRestaurantAndClient(
    restaurant_id: number,
    client_id: number,
  ): Promise<boolean> {
    const realtion = await this.prismaService.client_restaurant.findFirst({
      where: {
        restaurant_id: restaurant_id,
        client_id: client_id,
      },
    });
    if (isEmpty(realtion)) {
      return false;
    }
    return true;
  }
}
