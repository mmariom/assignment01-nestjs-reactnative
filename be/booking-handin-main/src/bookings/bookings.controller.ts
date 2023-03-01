import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from './entities/booking.entity';
import { BookingDto } from './entities/booking.dto';

@Controller('bookings')
export class BookingsController {
    constructor(private bookingService: BookingsService) {}

    @Get() 
    getAll(): Promise<Booking[]> {
        return this.bookingService.findAll();
    }
    @Post() 
    create(@Body() bookingDto: BookingDto) : Promise<Booking> {
        return this.bookingService.create(bookingDto);
    }
    @Put(':id') 
    updateSingle(@Param('id') id, @Body() bookingDto: BookingDto){
        return this.bookingService.update(id, bookingDto);
    }

    @Delete(':id') 
    removeSingle(@Param('id') id){
        return this.bookingService.remove(id);
    }
}
