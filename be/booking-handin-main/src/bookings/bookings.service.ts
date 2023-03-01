import { Injectable, NotFoundException, Response } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { BookingDto } from './entities/booking.dto';
import { json } from 'stream/consumers';
import { response } from 'express';

@Injectable()
export class BookingsService {
    constructor(@InjectRepository(Booking) 
        private bookingRepository: Repository<Booking>) {}


    async findAll(): Promise<Booking[]> {
        return this.bookingRepository.find();
    }

    async findById(id: number): Promise<Booking> {
        return this.bookingRepository.findOneBy({id: id});
    }

    async create(bookingDto: BookingDto) : Promise<Booking> {
        return this.bookingRepository.save(bookingDto);
    }


    async update(id: number, bookingDto: BookingDto): Promise<Booking> {
        // Fetch the entity with the specified ID
        const existingBooking = await this.bookingRepository.findOneBy({id: id});
    
        if (!existingBooking) {
          // If the entity doesn't exist, throw a 404 error
          throw new NotFoundException(`Booking with ID ${id} not found`);
        }
    
        // Perform the update operation on the database
        await this.bookingRepository.update(id, bookingDto);
    
        // Fetch the updated entity from the database
        const updatedBooking = await this.bookingRepository.findOneBy({id: id});
    
        // Return the updated entity
        return updatedBooking;
      }
        

    async remove(id: number) {
        const existingBooking = await this.bookingRepository.findOneBy({id: id});
    
        if (!existingBooking) {
          // If the entity doesn't exist, throw a 404 error
          throw new NotFoundException(`Booking with ID ${id} not found`);
        }

        this.bookingRepository.delete(id);
        return { message: 'Deleted' };

      
    }


  





}



