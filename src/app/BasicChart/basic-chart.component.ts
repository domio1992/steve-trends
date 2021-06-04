import { Component } from '@angular/core';
import { PrimeNGConfig, MessageService } from 'primeng/api';
import { DataService } from '../../assets/data.service';
import { PriceEntry } from '../BasicChart/models/priceEntry';

@Component({
  selector: 'BasicChartComponent',
  templateUrl: './basic-chart.component.html',
  styleUrls: ['./basic-chart.component.scss'],
  providers: [MessageService, DataService]
})
export class BasicChartComponent {
  priceEntries: PriceEntry[] = [];
  first: number = 0;
  totalRecords: number = 0;

  constructor(
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.loadData();
    this.primengConfig.ripple = true;
  }

  showMessage(loading) {
    setTimeout(() => {
      if (loading) {
        this.messageService.add({
          severity: 'info',
          summary: 'Loading Data...',
          life: 1000
        });
      } else {
        this.messageService.add({
          severity: 'success',
          summary: 'Data Loaded Successfully',
          life: 1000
        });
      }
    }, 1);
  }

  getColumnStyle(priceEntry, field) {
    if (priceEntry[field] > 0) {
      return 'normal green';
    } else if (priceEntry[field] < 0) {
      return 'normal red';
    }
    return 'normal grey';
  }

  async loadData() {
    this.showMessage(true);
    let json = null;
    await this.dataService.getData().then(data => (json = data));
    (json.data as any[]).forEach(entry => {
      let priceEntry: PriceEntry = new PriceEntry();
      priceEntry.time = entry.Time;
      priceEntry.open = entry.Open;
      priceEntry.high = entry.High;
      priceEntry.low = entry.Low;
      priceEntry.last = entry.Last;
      priceEntry.change = entry.Change;
      priceEntry.percentChange = entry.PercentChange;
      priceEntry.volume = entry.Volume;
      this.priceEntries.push(priceEntry);
    });
    this.totalRecords = this.priceEntries.length;
    this.showMessage(false);
  }
}
