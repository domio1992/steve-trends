import { Component } from '@angular/core';
import { PrimeNGConfig, MessageService } from 'primeng/api';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'LinksComponent',
  templateUrl: './links.component.html',
  styles: [``],
  providers: [MessageService]
})
export class LinksComponent {
  nodes: TreeNode[];
  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.nodes = [
      {
        key: '0',
        label: 'U.S. Bureau of Labor Statistics',
        children: [
          {
            key: '0-0',
            label: 'Release Calendar',
            data: 'https://www.bls.gov/schedule/2021/05_sched.htm',
            type: 'url'
          }
        ]
      },
      {
        key: '0',
        label: 'BarChart - SPY Cheat Sheet',
        children: [
          {
            key: '0-0',
            label: 'SPY Cheat Sheet',
            data: 'https://www.barchart.com/etfs-funds/quotes/SPY/cheat-sheet',
            type: 'url'
          }
        ]
      },
      {
        key: '0',
        label: 'MarketWatch - U.S. Economic Calendar',
        children: [
          {
            key: '0-0',
            label: 'U.S. Economic Calendar',
            data: 'https://www.marketwatch.com/economy-politics/calendar',
            type: 'url'
          }
        ]
      },
      {
        key: '0',
        label: 'Federal Open Market Committee',
        children: [
          {
            key: '0-0',
            label: 'Federal Open Market Committee Calendar',
            data:
              'https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm',
            type: 'url'
          }
        ]
      }
    ];
  }
}
