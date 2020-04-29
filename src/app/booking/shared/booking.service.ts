

import { Injectable } from '@angular/core'
import { Observable, observable } from 'rxjs'
import { Booking } from './booking.model'
import { HttpClient } from '@angular/common/http'

@Injectable()
export class BookingService {

    constructor(private http: HttpClient) {}
    
        createBooking(booking: Booking): Observable<any> {
        return this.http.post('/api/v1/bookings', booking);
      }
      
      
}