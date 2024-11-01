import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from '../useful/dto/pagination.dto';
import { IClient, IClientList } from './interface/client.interface';

@Injectable()
export class ClientService {
  constructor(private prismaService: PrismaService) {}

  async create(createClientDto: CreateClientDto): Promise<CreateClientDto> {
    try {
      return await this.prismaService.client.create({
        data: createClientDto,
      });
    } catch (error) {
      throw new BadRequestException('Failed to create client' + error);
    }
  }

  async findAll(pagination: PaginationDto): Promise<IClientList> {
    try {
      const total = await this.prismaService.client.count();
      const data = await this.prismaService.client.findMany({
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
          email: true,
          phone: true,
          age: true,
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

  async findOne(id: number): Promise<IClient> {
    try {
      return await this.prismaService.client.findFirst({
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          age: true,
        },
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new BadRequestException('Error to load client' + error);
    }
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<IClient> {
    try {
      return await this.prismaService.client.update({
        where: { id: id },
        data: updateClientDto,
      });
    } catch (error) {
      throw new BadRequestException('Failed to update client ' + error);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prismaService.client.delete({
        where: { id: id },
      });
    } catch (error) {
      throw new BadRequestException('Error to delete client ' + error);
    }
  }
}
