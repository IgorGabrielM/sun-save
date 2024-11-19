import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  cidade: string = 'São Paulo';
  contaValor: number = 0;
  consumoKwh: number = 0;
  numPaineis: number = 0;
  custoTotal: number = 0;
  areaNecessaria: number = 0;
  geracaoAnual: number = 0;

  cidades = [
    { uf: 'RJ', city: 'Rio de Janeiro', value: 1.313 },
    { uf: 'MT', city: 'Cuiabá', value: 0.825 },
    { uf: 'SP', city: 'São Paulo', value: 0.821 },
    { uf: 'RS', city: 'Porto Alegre', value: 0.816 },
    { uf: 'MS', city: 'Campo Grande', value: 0.813 },
    { uf: 'AM', city: 'Manaus', value: 0.804 },
    { uf: 'PA', city: 'Belém', value: 0.766 },
    { uf: 'SE', city: 'Aracaju', value: 0.761 },
    { uf: 'AL', city: 'Maceió', value: 0.75 },
    { uf: 'BA', city: 'Salvador', value: 0.749 },
    { uf: 'PE', city: 'Recife', value: 0.736 },
    { uf: 'CE', city: 'Fortaleza', value: 0.731 },
    { uf: 'SC', city: 'Florianópolis', value: 0.729 },
    { uf: 'PR', city: 'Curitiba', value: 0.688 },
    { uf: 'RN', city: 'Natal', value: 0.672 },
    { uf: 'MG', city: 'Belo Horizonte', value: 0.669 },
    { uf: 'TO', city: 'Palmas', value: 0.668 },
    { uf: 'ES', city: 'Vitória', value: 0.647 },
    { uf: 'MA', city: 'São Luís', value: 0.642 },
    { uf: 'AC', city: 'Rio Branco', value: 0.64 },
    { uf: 'GO', city: 'Goiânia', value: 0.637 },
    { uf: 'PI', city: 'Teresina', value: 0.628 },
    { uf: 'PB', city: 'João Pessoa', value: 0.597 },
    { uf: 'RR', city: 'Boa Vista', value: 0.58 },
    { uf: 'DF', city: 'Brasília', value: 0.575 },
    { uf: 'RO', city: 'Porto Velho', value: 0.546 },
    { uf: 'AP', city: 'Macapá', value: 0.54 },
  ];

  irradiaçãoMediaDiaria = 5; // em kWh/m²/dia (ajuste conforme a região)
  capacidadePainel = 0.35; // em kW (350 W)
  eficiencia = 0.8; // 80% de eficiência
  custoPainel = 1500; // em R$ por painel
  areaPainel = 2; // em m² por painel

  constructor() {}

  openModal(){}

  onCityChange(event: any) {
    const selectedCity = this.cidades.find(
      (cidade) => cidade.city === event.detail.value
    );
    this.cidade = selectedCity ? selectedCity.city : 'São Paulo';
  }

  calcularConsumo() {
    const selectedCity = this.cidades.find(
      (cidade) => cidade.city === this.cidade
    );
    if (selectedCity && this.contaValor > 0) {
      this.consumoKwh = this.contaValor / selectedCity.value;
      this.calcularPaineis();
    } else {
      this.consumoKwh = 0;
    }
  }

  calcularPaineis() {
    // Consumo mensal para consumo diário
    const consumoDiario = this.consumoKwh / 30;

    // Cálculo da energia que cada painel gera por dia
    const energiaDiariaPainel =
      this.capacidadePainel * this.irradiaçãoMediaDiaria * this.eficiencia;

    // Número de painéis necessários
    this.numPaineis = Math.ceil(consumoDiario / energiaDiariaPainel);

    // Cálculo do custo total e área necessária
    this.custoTotal = this.numPaineis * this.custoPainel;
    this.areaNecessaria = this.numPaineis * this.areaPainel;

    // Geração anual de energia
    this.geracaoAnual = this.numPaineis * energiaDiariaPainel * 365;
  }
}
