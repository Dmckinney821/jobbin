import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Booking } from '../../../booking/shared/booking.model';
import { HelperService } from '../../../common/service/helper.service';
import { BookingService } from '../../../booking/shared/booking.service'
import { debug } from 'util';
import { AuthService } from '../../../auth/shared/auth.service';

import { DaterangePickerComponent } from 'ng2-daterangepicker'

import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import * as moment from 'moment';
import { Rental } from '../../shared/rental.model';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'bwm-rentail-detail-booking',
  templateUrl: './rentail-detail-booking.component.html',
  styleUrls: ['./rentail-detail-booking.component.scss']
})
export class RentailDetailBookingComponent implements OnInit {
  
  @Input() rental: Rental;
  @ViewChild(DaterangePickerComponent, {static: false})
    private picker: DaterangePickerComponent
 

  newBooking: Booking;
  modalRef: any;


  daterange: any = {};
  bookedOutDates: any[] = [];
  errors: any[] = [];

  options: any = {
    locale: { format: Booking.DATE_FORMAT },
    alwaysShowCalendars: false,
    isInvalidDate: this.checkForInvalidDates.bind(this),
    opens: 'left',
    autoUpdateInput: false
  };

  constructor(private helper: HelperService, 
              private modalService: NgbModal,
              private bookingService: BookingService,
              public auth: AuthService
              // private vcr: ViewContainerRef
              ) { 
                // this.toastr.setRootViewContainerRef(vcr);
              }

  ngOnInit() {
    this.newBooking = new Booking();
    this.getBookedOutDates();
   
  }

    private checkForInvalidDates(date) {
    
    return this.bookedOutDates.includes(this.helper.formatBookingDate(date)) || date.diff(moment(), 'days') < 0;
  }

  private getBookedOutDates() {
    const bookings: Booking[] = this.rental.bookings

    if(bookings && bookings.length > 0) {
      bookings.forEach((booking: Booking) => {
        const dateRange = this.helper.getBookingRangeOfDates(booking.startAt, booking.endAt)
        this.bookedOutDates.push(...dateRange)
        
      })
    }
  }

  private addNewBookedDates(bookingData: any) {
    const dateRange = this.helper.getBookingRangeOfDates(bookingData.startAt, bookingData.endAt)
    this.bookedOutDates.push(...dateRange)
  }

  private resetDatePicker() {
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val('')
  }

  openConfirmModal(content) {
    this.errors = [];
    this.modalRef = this.modalService.open(content)
    
  }

  createBooking() {
    this.newBooking.rental = this.rental;

    this.bookingService.createBooking(this.newBooking).subscribe(
        (bookingData: any) => {
        this.addNewBookedDates(bookingData);
        this.newBooking = new Booking();
        this.modalRef.close();
        this.resetDatePicker();
        // this.toastr.success('Booking successfully created', 'Success')
      },
      (errorResponse: any) => {
        this.errors = errorResponse.error.errors;
      }
    )
  }

  selectedDate(value: any, datepicker?: any) {
    this.options.autoUpdateInput = true;
    this.newBooking.startAt = this.helper.formatBookingDate(value.start);
    this.newBooking.endAt = this.helper.formatBookingDate(value.end);
    this.newBooking.days = -(value.start.diff(value.end, 'days'));
    this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;
  
  }

}
