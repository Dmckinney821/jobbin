import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bwm-rentail-detail-booking',
  templateUrl: './rentail-detail-booking.component.html',
  styleUrls: ['./rentail-detail-booking.component.scss']
})
export class RentailDetailBookingComponent implements OnInit {
  
  @Input() price: number;

  daterange: any = {};

  constructor() { }

  ngOnInit() {
  }

  options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false,
    opens: 'left'
  };

  selectedDate(value: any, datepicker?: any) {
    
    datepicker.start = value.start;
    datepicker.end = value.end;

    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }

}
