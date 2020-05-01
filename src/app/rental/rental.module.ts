
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { NgPipesModule } from 'ngx-pipes'
import { MapModule } from '../common/map/map.module';
import { Daterangepicker } from 'ng2-daterangepicker'
import { FormsModule } from '@angular/forms';

import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalComponent } from './rental.component';
import { RentalService } from './shared/rental.service';
import { BookingService } from '../booking/shared/booking.service';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { UppercasePipe } from '../common/pipes/uppercase.pipe'
import { AuthGuard } from '../auth/shared/auth.guard';
import { RentailDetailBookingComponent } from './rental-detail/rentail-detail-booking/rentail-detail-booking.component'
import { HelperService } from '../common/service/helper.service'
import { AppComponent } from '../app.component';
import { RentalSearchComponent } from './rental-search/rental-search.component';
import { RentalCreateComponent } from './rental-create/rental-create.component';



const routes: Routes = [
    {path: 'rentals', 
    component: RentalComponent,
    children: [
        { path: '', component: RentalListComponent },
        { path: 'new', component: RentalCreateComponent, canActivate: [AuthGuard] },
        { path: ':rentalId', component: RentalDetailComponent },
        { path: ':city/homes', component: RentalSearchComponent }
    ]}
  ]

@NgModule({
    declarations: [
        RentalListComponent,
        RentalListItemComponent,
        RentalComponent,
        RentalDetailComponent,
        UppercasePipe,
        RentailDetailBookingComponent,
        RentalSearchComponent,
        RentalCreateComponent
  
    ],
    imports: [
        HttpClientModule,
        NgPipesModule,
        CommonModule,
        Daterangepicker,
        FormsModule,
        MapModule,
        RouterModule.forChild(routes)],
    providers: [
        RentalService, 
        HelperService,
        BookingService
       ]
})
export class RentalModule {}