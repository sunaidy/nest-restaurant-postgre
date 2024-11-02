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
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { IRestaurant, IRestaurantList } from './interface/restaurant.interface';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  async create(
    @Body() createRestaurantDto: CreateRestaurantDto,
  ): Promise<IRestaurant> {
    return await this.restaurantService.create(createRestaurantDto);
  }

  @Get()
  findAll(
    @Query('take') take: string,
    @Query('skip') skip: string,
    @Query('cursor') cursor: string,
  ): Promise<IRestaurantList> {
    return this.restaurantService.findAll({
      take: +take,
      skip: +skip,
      cursor: +cursor,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IRestaurant> {
    return this.restaurantService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<IRestaurant> {
    return this.restaurantService.update(+id, updateRestaurantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.restaurantService.remove(+id);
  }
}
