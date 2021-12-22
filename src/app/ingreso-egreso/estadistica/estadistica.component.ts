import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartData, ChartType } from 'chart.js';
import { Subscription } from 'rxjs';
//import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { IngresoEgresoAppState } from '../ingreso-egreso.reducer';

//import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {

  ingresos!:number;
  egresos!: number;

  cuantosIngresos!:number;
  cuantosEgresos!:number;

  subscription:Subscription=new Subscription();

  public doughnutChartLabels: string[] = ['Ingresos','Egresos'  ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ ] }
     
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private store:Store<IngresoEgresoAppState>) { }

  ngOnInit(): void {
    this.subscription=this.store.select('ingresoEgreso')
      .subscribe(ingresoEgreso=>{
        this.contarIngresoEgreso(ingresoEgreso.items);
      });
  }

  contarIngresoEgreso(items:IngresoEgreso[]){
    console.log('entra');
    this.ingresos=0;
    this.egresos=0;

    this.cuantosEgresos=0;
    this.cuantosIngresos=0;

    items.forEach(item=>{
      if(item.tipo==='ingreso'){
        this.cuantosIngresos ++;
        this.ingresos+=item.monto;
      } else{
        this.cuantosEgresos ++;
        this.egresos += item.monto;
      }
    });

    //this.doughnutChartData.datasets=[12,12];
    this.doughnutChartData.datasets[0].data[0]=this.ingresos;
    this.doughnutChartData.datasets[0].data[1]=this.egresos;
  }
}
