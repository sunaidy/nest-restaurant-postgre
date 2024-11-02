import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateClientRestaurantDto } from './dto/create-client_restaurant.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientService } from 'src/client/client.service';
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
      const client = this.clientServide.findOne(
        createClientRestaurantDto.client_id,
      );
      if (isEmpty(client)) {
        throw new HttpException(
          'The client not exist ',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
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
}
