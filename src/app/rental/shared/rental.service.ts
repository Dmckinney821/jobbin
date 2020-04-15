
import { Injectable } from '@angular/core'
import { Observable, observable } from 'rxjs'
import { Rental } from './rental.model'

@Injectable()
export class RentalService {
    private rentals: Rental[] = [
        {
        id: '1',
        title: 'Central Park',
        city: 'NYC',
        street: 'spooner st',
        category: 'apartment',
        image: 'http://via.placeholder.com/350x250',
        bedrooms: 2,
        description: 'Very nice',
        dailyRate: 34,
        shared: false,
        createdAt: '24/12/2020'
      },{
        id: '2',
        title: 'Job',
        city: 'LA',
        street: 'spooner ct',
        category: 'condo',
        image: 'http://via.placeholder.com/350x250',
        bedrooms: 2,
        description: 'not nice',
        dailyRate: 14,
        shared: false,
        createdAt: '24/12/2020'
      },{
        id: '3',
        title: 'Macys',
        city: 'SF',
        street: 'spooner ave',
        category: 'house',
        image: 'http://via.placeholder.com/350x250',
        bedrooms: 2,
        description: 'kind of nice',
        dailyRate: 30,
        shared: true,
        createdAt: '24/12/2020'
      },
      {
        id: '4',
        title: 'Doomsday',
        city: 'ATL',
        street: 'spooner dr',
        category: 'apartment',
        image: 'http://via.placeholder.com/350x250',
        bedrooms: 2,
        description: 'the best of nice',
        dailyRate: 122,
        shared: false,
        createdAt: '24/12/2020'
      }]

      public getRentalById(rentalId: string): Observable<Rental>{
          return new Observable<Rental>((observer) => {
            setTimeout(() => {
                const foundRental = this.rentals.find((rental) => {
                    return rental.id = rentalId;
                });
                observer.next(foundRental)
            }, 500);
          })
      }
      public getRentals(): Observable<Rental[]>{
          return new Observable<Rental[]>((observer) => {
            setTimeout(() => {
                observer.next(this.rentals)
            }, 1000);
          });
          
      }
    
}