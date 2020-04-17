import { Component, Input, ChangeDetectorRef } from '@angular/core';
import {MapService} from './map.service'

@Component({
  selector: 'bwm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  @Input() location: string;
  isPostioneError: boolean = false;

  lat: number = 51.678418;
  lng: number = 7.808007;

  constructor(private mapService: MapService,
              private ref: ChangeDetectorRef) { }

  mapReadyHandler() {
    
    this.mapService.getGeoLocation(this.location).subscribe(
      (coordinates) => {
        this.lat = coordinates.lat;
        this.lng = coordinates.lng;
        this.ref.detectChanges();
      }, () => {
        this.isPostioneError = true
      })
  }

}
