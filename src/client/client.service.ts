import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientService {
  constructor(private prismaService: PrismaService) {}

  async create(createClientDto: CreateClientDto): Promise<CreateClientDto> {
    try {
      return await this.prismaService.client.create({
        data: createClientDto,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new BadRequestException('Error create client');
    }
  }

  findAll() {
    return `This action returns all client`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  /* update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }*/

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
