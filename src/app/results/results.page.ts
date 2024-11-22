import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {EChartsOption} from "echarts";

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  @ViewChild('chartRetornoCustos', { static: false }) lineCanvas: ElementRef;
  @ViewChild('chartEconomiaMensal', { static: false }) barCanvas: ElementRef;

  optionsRetorno: EChartsOption
  optionsEconomia: EChartsOption

  @Input() data: {
    contaValor: number;
    cidade: {uf: string, city: string, value: number};
    consumoDiario: number;
    energiaDiariaPainel: number;
    numPaineis: number;
    custoTotal: number;
    areaNecessaria: number;
  };

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.innitOptionsRetorno();
    this.innitOptionsEconomia();
  }

  innitOptionsRetorno(){
    this.optionsRetorno = {
      xAxis: {
        type: 'category',
        data: ['1º', '2º', '3º', '4º']
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          show: false
        }
      },
      series: [
        {
          data: this.calculateSavings(),
          type: 'line',
          lineStyle: {
            color: '#5ADD75'
          },
          itemStyle: { color: '#5ADD75'}
        }
      ]
    };
  }

  calculateSavings() {
    const savings = [];
    for (let i = 0; i < 4; i++) {
      const monthlySavings = this.data.custoTotal - (this.data.energiaDiariaPainel * 360) * i;
      savings.push(monthlySavings);
    }
    return savings.reverse();
  }

  innitOptionsEconomia(){
    this.optionsEconomia = {
      xAxis: {
        type: 'category',
        data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          show: false
        }
      },
      series: [
        {
          data: this.calculateSavingsMounth(),
          type: 'bar',
          itemStyle: { color: '#5ADD75'}
        }
      ],
      dataZoom: [
        {
          type: 'slider',
          show: true,
          start: 0,
          end: 100
        },
        {
          type: 'inside',
          start: 0,
          end: 100
        }
      ]
    };
  }

  calculateSavingsMounth() {
    const savings = [];
    for (let i = 0; i < 13; i++) {
      const monthlySavings = this.data.custoTotal - (this.data.energiaDiariaPainel * 360) * i;
      savings.push(monthlySavings);
    }
    return savings.reverse();
  }

  close() {
    return this.modalCtrl.dismiss();
  }
}
