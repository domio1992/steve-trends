import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicChartComponent } from './BasicChart/basic-chart.component';
import { DailyComponent } from './DailyAnalysis/daily.component';
import { LinksComponent } from './Links/links.component';
const routes: Routes = [
  { path: 'daily', component: DailyComponent },
  { path: 'basicchart', component: BasicChartComponent },
  { path: 'links', component: LinksComponent },
  { path: '**', redirectTo: 'basicchart' }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
