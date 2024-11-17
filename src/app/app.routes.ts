import { Routes } from '@angular/router';
import { SeatBookingComponent } from './seat-booking/seat-booking.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'seatBooking', pathMatch: 'full'
    },
    {
        path: 'seatBooking',
        component: SeatBookingComponent,
        // canDeactivate: [AuthGuard] 
      },
];
