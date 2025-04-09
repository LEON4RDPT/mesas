import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { StatisticsService } from '../../services/statistics.service';
import { Reserva } from '../../interfaces/reservas';

registerLocaleData(localePt);
@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-PT' }
  ],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  reservasTotais: number = 0;
  reservasHoje: number = 0;
  reservasPeriodo: Reserva[] = [];

  periodoSelecionado: string = 'dia';

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.carregarDadosIniciais();
    this.onPeriodoChange(this.periodoSelecionado);
  }

  carregarDadosIniciais(): void {
    this.statisticsService.getTodas().subscribe(res => {
      this.reservasTotais = res.body?.length ?? 0;
    });

    this.statisticsService.getHoje().subscribe(res => {
      this.reservasHoje = res.body?.length ?? 0;
    });
  }

  onPeriodoChange(periodo: string): void {
    switch (periodo) {
      case 'dia':
        this.statisticsService.getHoje().subscribe(data => this.reservasPeriodo = data.body ?? []);
        break;
      case 'semana':
        this.statisticsService.getSemana().subscribe(data => this.reservasPeriodo = data.body ?? []);
        break;
      case 'mes':
        this.statisticsService.getMes().subscribe(data => this.reservasPeriodo = data.body ?? []);
        break;
    }
  }
}
