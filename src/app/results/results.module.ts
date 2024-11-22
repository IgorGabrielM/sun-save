import {InjectionToken, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultsPageRoutingModule } from './results-routing.module';

import { ResultsPage } from './results.page';
import {NGX_ECHARTS_CONFIG, NgxEchartsDirective, NgxEchartsModule, provideEcharts} from "ngx-echarts";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultsPageRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
  ],
  declarations: [ResultsPage],
  providers: [
    provideEcharts(),
    NgxEchartsDirective,
    NgxEchartsModule,
    // NGX_ECHARTS_CONFIG
  ]
})
export class ResultsPageModule {}
