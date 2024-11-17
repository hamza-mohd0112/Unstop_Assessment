import { Component, OnInit } from '@angular/core';
import { Seat } from '../dbData.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seat-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seat-booking.component.html',
  styleUrl: './seat-booking.component.scss'
})
export class SeatBookingComponent implements OnInit {
 
    seats: Seat[] = [];
    totalRows = 12; // 11 rows of 7 seats + 1 row of 3 seats
    seatsPerRow = 7;
    lastRowSeats = 3;
    filteredSeatsByRow: { [key: number]: Seat[] } = {};
    rows: number[] = [];
    alreadyBookedSeats:Array<any> = [1, 2, 3, 10, 11]
  
    constructor() {}
  
    ngOnInit(): void {
      this.initializeSeats();
    }
  
    // Initialize seats
    initializeSeats() {
      let seatId = 1;
    
      for (let row = 1; row <= this.totalRows; row++) {
        const seatsInRow = row === this.totalRows ? this.lastRowSeats : this.seatsPerRow;
    
        for (let seat = 1; seat <= seatsInRow; seat++) {
          this.seats.push({ id: seatId++, row, status: 'available' });
        }
      }
    
      // Mock some booked seats
      this.bookSeatsDirectly(this.alreadyBookedSeats);
    
      
    
      // Generate rows array
      this.generateRows();
    }

    generateRows() {
      this.rows = Array.from({ length: this.totalRows }, (_, i) => i + 1);
    }

    filterSeatsByRow() {
      this.filteredSeatsByRow = {};
      for (let row = 1; row <= this.totalRows; row++) {
        this.filteredSeatsByRow[row] = this.seats.filter(seat => seat.row === row);
      }
    }

    // // Update filtered seats after booking
    // updateFilteredSeats() {
    //   this.filterSeatsByRow();
    // }
  
    // Mock booking some seats
    bookSeatsDirectly(seatIds: number[]) {
      this.seats.forEach(seat => {
        if (seatIds.includes(seat.id)) {
          seat.status = 'booked';
        }
      });

      // Pre-filter seats by row
      this.filterSeatsByRow();
    }
  
    // Book seats
    bookSeats(requestedSeats: any) {
      const availableSeats = this.seats.filter(seat => seat.status === 'available');
  
      if(requestedSeats > 7){
        alert('One person can reserve up to 7 seats at a time.');
        return;
      }
      if(requestedSeats <= 0){
        alert('Please Enter a valid Number of seats.');
        return;
      }
      if (availableSeats.length < requestedSeats) {
        alert('Not enough seats available.');
        return;
      }
      
  
      const bookedSeats: number[] = [];
      let count = 0;
  
      // Try booking in a single row first
      for (let row = 1; row <= this.totalRows; row++) {
        const rowSeats = availableSeats.filter(seat => seat.row === row);
  
        if (rowSeats.length >= requestedSeats) {
          for (let i = 0; i < requestedSeats; i++) {
            rowSeats[i].status = 'booked';
            bookedSeats.push(rowSeats[i].id);
          }
          this.displayBookingResult(bookedSeats);
          return;
        }
      }
  
      // If not possible in one row, book adjacent seats
      for (let seat of availableSeats) {
        if (count == requestedSeats) break;
        seat.status = 'booked';
        bookedSeats.push(seat.id);
        count++;
      }
  
      this.displayBookingResult(bookedSeats);
    }
  
    // Display booking result
    displayBookingResult(bookedSeats: number[]) {
      alert(`Seats booked: ${bookedSeats.join(', ')}`);
    }
  
}
