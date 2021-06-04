import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BasicChartComponent } from './BasicChart/basic-chart.component';
import { DailyComponent } from './DailyAnalysis/daily.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CalendarModule } from 'primeng/calendar';
import { LinksComponent } from './Links/links.component';
import { TreeModule } from 'primeng/tree';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    TableModule,
    HttpClientModule,
    AppRoutingModule,
    MultiSelectModule,
    DropdownModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    CalendarModule,
    TreeModule
  ],
  declarations: [
    AppComponent,
    BasicChartComponent,
    DailyComponent,
    LinksComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
