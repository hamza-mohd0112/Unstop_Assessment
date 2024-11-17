import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeatBookingComponent } from "./seat-booking/seat-booking.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SeatBookingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'seat_Booking_Project';
}
