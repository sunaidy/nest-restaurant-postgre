import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { IClient, IClientList } from './interface/client.interface';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(
    @Body() createClientDto: CreateClientDto,
  ): Promise<CreateClientDto> {
    return await this.clientService.create(createClientDto);
  }

  @Get()
  async findAll(
    @Query('take') take: string,
    @Query('skip') skip: string,
    @Query('cursor') cursor: string,
  ): Promise<IClientList> {
    return await this.clientService.findAll({
      take: +take,
      skip: +skip,
      cursor: +cursor,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IClient> {
    return this.clientService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<IClient> {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.clientService.remove(+id);
  }
}
