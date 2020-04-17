import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map.component';
import { CamelizePipe } from 'ngx-pipes'
import { CommonModule } from '@angular/common'

import { MapService } from './map.service'


@NgModule({
  declarations: [
    MapComponent
  ],
  exports: [
      MapComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyD0MMfwhNb-2sS8O75cZl1f62efPGBwV6w'
    }),
    CommonModule
  ],
  providers: [
      MapService,
      CamelizePipe
  ]
})
export class MapModule { }
