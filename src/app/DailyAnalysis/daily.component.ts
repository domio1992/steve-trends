import { Component, Input } from '@angular/core';
import { PrimeNGConfig, MessageService } from 'primeng/api';
import dayjs from 'dayjs';
import { DataService } from '../../assets/data.service';
import { DailyModel } from '../DailyAnalysis/models/daily.model';
var isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween);
declare var Chart: any;
@Component({
  selector: 'DailyComponent',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss'],
  providers: [MessageService, DataService]
})
export class DailyComponent {
  dailyModels: DailyModel[] = [];
  cols: any[];
  _selectedColumns: any[];
  days: any[];
  selectedDay: any;
  daysOfTheWeek: any;
  selectedDayOfTheWeek: any;
  rangeDates: Date[];
  selectedDates: any[];
  first: number = 0;
  totalRecords: number = 0;
  data: any;

  constructor(
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.loadData();
    this.primengConfig.ripple = true;

    this.daysOfTheWeek = [
      { name: 'Monday', code: 1 },
      { name: 'Tuesday', code: 2 },
      { name: 'Wednesday', code: 3 },
      { name: 'Thursday', code: 4 },
      { name: 'Friday', code: 5 }
    ];

    this.days = [
      { name: '1', code: 1 },
      { name: '2', code: 2 },
      { name: '3', code: 3 },
      { name: '4', code: 4 },
      { name: '5', code: 5 },
      { name: '6', code: 6 },
      { name: '7', code: 7 },
      { name: '8', code: 8 },
      { name: '9', code: 9 },
      { name: '10', code: 10 },
      { name: '11', code: 11 },
      { name: '12', code: 12 },
      { name: '13', code: 13 },
      { name: '14', code: 14 },
      { name: '15', code: 15 },
      { name: '16', code: 16 },
      { name: '17', code: 17 },
      { name: '18', code: 18 },
      { name: '19', code: 19 },
      { name: '20', code: 20 },
      { name: '21', code: 21 },
      { name: '22', code: 22 },
      { name: '23', code: 23 },
      { name: '24', code: 24 },
      { name: '25', code: 25 },
      { name: '26', code: 26 },
      { name: '27', code: 27 },
      { name: '28', code: 28 },
      { name: '29', code: 29 },
      { name: '30', code: 30 },
      { name: '31', code: 31 }
    ];

    this.cols = [
      { field: 'time', header: 'Time', pipe: 'none' },
      { field: 'previousClose', header: 'Previous Close', pipe: 'currency' },
      {
        field: 'prevPrevGap',
        header: 'Prev/Prev',
        pipe: 'currency',
        gapColor: true
      },
      { field: 'open', header: 'Open', pipe: 'currency' },
      {
        field: 'prevOpenGap',
        header: 'Prev/Open',
        pipe: 'currency',
        gapColor: true
      },
      { field: 'high', header: 'High', pipe: 'currency' },
      {
        field: 'openHighGap',
        header: 'Open/High',
        pipe: 'currency',
        gapColor: true
      },
      {
        field: 'prevHighGap',
        header: 'Prev/High',
        pipe: 'currency',
        gapColor: true
      },
      { field: 'low', header: 'Low', pipe: 'currency' },
      {
        field: 'prevLowGap',
        header: 'Prev/Low',
        pipe: 'currency',
        gapColor: true
      },
      {
        field: 'highLowGap',
        header: 'High/Low',
        pipe: 'currency',
        gapColor: true
      },
      {
        field: 'lowLowGap',
        header: 'Low/Low',
        pipe: 'currency',
        gapColor: true
      },
      {
        field: 'openLowGap',
        header: 'Open/Low',
        pipe: 'currency',
        gapColor: true
      },
      {
        field: 'lowCloseGap',
        header: 'Low/Close',
        pipe: 'currency',
        gapColor: true
      },
      { field: 'close', header: 'Close', pipe: 'currency' },
      {
        field: 'openCloseGap',
        header: 'Open/Close',
        pipe: 'currency',
        gapColor: true
      },
      {
        field: 'closeToCloseGap',
        header: 'Close/Close',
        pipe: 'currency',
        gapColor: true
      },
      {
        field: 'lowCloseGap',
        header: 'Low/Close',
        pipe: 'currency',
        gapColor: true
      },
      {
        field: 'highCloseGap',
        header: 'High/Close',
        pipe: 'currency',
        gapColor: true
      },
      { field: 'volume', header: 'Volume', pipe: 'number' }
    ];
    this._selectedColumns = this.cols;

    this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }
      ]
    };
  }

  getChart(ctx, options) {
    return new Chart(ctx, options);
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter(col => val.includes(col));
  }

  getColumnStyle(col, dailyModel) {
    if (col.gapColor) {
      if (dailyModel[col.field] > 0) {
        return 'normal green';
      } else if (dailyModel[col.field] < 0) {
        return 'normal red';
      } else if (dailyModel[col.field] === 0) {
        return 'normal grey';
      }
    }
    return 'normal';
  }

  onDayChanged(event) {
    this.selectedDay = event.value;
    this.selectedDayOfTheWeek = null;
    this.loadData();
  }

  onDayOfWeekChanged(event) {
    this.selectedDayOfTheWeek = event.value;
    this.selectedDay = null;
    this.loadData();
  }

  onCalendarChange(value) {
    if (this.rangeDates[0] && this.rangeDates[1]) {
      this.loadData();
    }
  }
  onCalendarClear(event) {
    this.rangeDates = null;
    this.loadData();
  }

  showMessage(loading, noData) {
    setTimeout(() => {
      if (loading) {
        this.messageService.add({
          severity: 'info',
          summary: 'Loading Data...',
          life: 1000
        });
      } else if (noData) {
        this.messageService.add({
          severity: 'warn',
          summary: 'No Data to Display',
          life: 2000
        });
      } else {
        this.messageService.add({
          severity: 'success',
          summary: 'Data Loaded Successfully',
          life: 2000
        });
      }
    }, 1);
  }

  handleADPDaysClick() {
    console.log('handleADPDaysClick');
    const earlistEntry = this.dailyModels[this.dailyModels.length - 1];
    const lastEntry = this.dailyModels[0];
    const earlistEntryDayJS = dayjs(earlistEntry.time, 'MM/DD/YYYY')
      .date(1)
      .startOf('day');
    console.log(earlistEntryDayJS);
    const lastEntryDayJS = dayjs(lastEntry.time, 'MM/DD/YYYY')
      .date(1)
      .startOf('day');
    let startDayJS = dayjs(earlistEntryDayJS);
    const filteredDates = [];
    while (startDayJS.isBefore(lastEntryDayJS)) {
      if (startDayJS.day() === 3) {
      } else if (startDayJS.day() > 3) {
        const daysAhead = 7 - startDayJS.day() + 3;
        startDayJS = startDayJS.add(daysAhead, 'day');
        console.log('startDayJS g: ', startDayJS, ' - ', daysAhead);
      } else if (startDayJS.day() < 3) {
        const daysAhead = 3 - startDayJS.day();
        startDayJS = startDayJS.add(daysAhead, 'day');
        console.log('startDayJS l: ', startDayJS);
      }
      filteredDates.push(dayjs(startDayJS));
      startDayJS = startDayJS.date(1);
      startDayJS = startDayJS.add(1, 'month');
    }
    console.log(filteredDates);
    const cloneDM = this.dailyModels;
    const finalModels = [];
    filteredDates.forEach(filteredDate =>
      finalModels.push(
        cloneDM.filter(
          model =>
            dayjs(model.time, 'MM/DD/YYYY').date() === filteredDate.date() &&
            dayjs(model.time, 'MM/DD/YYYY').month() === filteredDate.month() &&
            dayjs(model.time, 'MM/DD/YYYY').year() === filteredDate.year()
        )[0]
      )
    );
    this.dailyModels = finalModels;
  }

  handleFedJobReportDaysClick() {
    console.log('handleFedJobReportDaysClick');
    const earlistEntry = this.dailyModels[this.dailyModels.length - 1];
    const lastEntry = this.dailyModels[0];
    const earlistEntryDayJS = dayjs(earlistEntry.time, 'MM/DD/YYYY')
      .date(1)
      .startOf('day');
    console.log(earlistEntryDayJS);
    const lastEntryDayJS = dayjs(lastEntry.time, 'MM/DD/YYYY')
      .date(1)
      .startOf('day');
    let startDayJS = dayjs(earlistEntryDayJS);
    const filteredDates = [];
    while (startDayJS.isBefore(lastEntryDayJS)) {
      if (startDayJS.day() === 3) {
      } else if (startDayJS.day() > 3) {
        const daysAhead = 7 - startDayJS.day() + 3;
        startDayJS = startDayJS.add(daysAhead + 2, 'day');
        console.log('startDayJS g: ', startDayJS, ' - ', daysAhead);
      } else if (startDayJS.day() < 3) {
        const daysAhead = 3 - startDayJS.day();
        startDayJS = startDayJS.add(daysAhead + 2, 'day');
        console.log('startDayJS l: ', startDayJS);
      }
      filteredDates.push(dayjs(startDayJS));
      startDayJS = startDayJS.date(1);
      startDayJS = startDayJS.add(1, 'month');
    }
    console.log(filteredDates);
    const cloneDM = this.dailyModels;
    const finalModels = [];
    filteredDates.forEach(filteredDate =>
      finalModels.push(
        cloneDM.filter(
          model =>
            dayjs(model.time, 'MM/DD/YYYY').date() === filteredDate.date() &&
            dayjs(model.time, 'MM/DD/YYYY').month() === filteredDate.month() &&
            dayjs(model.time, 'MM/DD/YYYY').year() === filteredDate.year()
        )[0]
      )
    );
    this.dailyModels = finalModels;
  }

  handleClearFilters() {
    this.selectedDay = null;
    this.selectedDayOfTheWeek = null;
    this.rangeDates = null;
    this.loadData();
  }

  async loadData() {
    this.showMessage(true, false);
    this.dailyModels = [];
    let json = null;
    await this.dataService.getData().then(data => (json = data));
    console.log(json);
    const data = json.data as any[];
    data.forEach((entry, index) => {
      const timeDayJS = dayjs(entry.Time, 'MM/DD/YYYY').startOf('day');
      if (this.selectedDay && timeDayJS.get('date') === this.selectedDay.code) {
        this.createDailyModel(data, entry, index);
      }
      if (
        this.selectedDayOfTheWeek &&
        timeDayJS.day() === this.selectedDayOfTheWeek.code
      ) {
        this.createDailyModel(data, entry, index);
      }
      if (this.rangeDates && this.rangeDates.length >= 2) {
        const firstDate = dayjs(this.rangeDates[0]);
        const secondDate = dayjs(this.rangeDates[1]);
        if (
          dayjs(timeDayJS).isBetween(firstDate, secondDate) ||
          dayjs(timeDayJS).isSame(firstDate, 'day') ||
          dayjs(timeDayJS).isSame(secondDate, 'day')
        ) {
          this.createDailyModel(data, entry, index);
        }
      }
      if (!this.selectedDay && !this.selectedDayOfTheWeek && !this.rangeDates) {
        this.createDailyModel(data, entry, index);
      }
    });
    this.totalRecords = this.dailyModels.length;
    if (this.dailyModels.length === 0) {
      this.showMessage(false, true);
      return;
    }
    this.showMessage(false, false);
  }

  createDailyModel(displayData, entry, index) {
    let dailyModel: DailyModel = new DailyModel();
    dailyModel.time = entry.Time;
    // Based on previous day
    if (displayData.length != index + 1) {
      dailyModel.previousClose = displayData[index + 1].Last;
      dailyModel.prevOpenGap = entry.Open - dailyModel.previousClose;
      dailyModel.prevHighGap = entry.High - dailyModel.previousClose;
      dailyModel.prevLowGap = entry.Low - dailyModel.previousClose;
      dailyModel.lowLowGap = entry.Low - displayData[index + 1].Low;
      dailyModel.closeToCloseGap = entry.Last - displayData[index + 1].Last;
    }
    // Based on two days in the past
    if (displayData.length > index + 2) {
      dailyModel.prevPrevGap =
        displayData[index + 1].Last - displayData[index + 2].Last;
    }
    dailyModel.open = entry.Open;
    dailyModel.high = entry.High;
    dailyModel.openHighGap = entry.High - entry.Open;
    dailyModel.low = entry.Low;
    dailyModel.highLowGap = entry.Low - entry.High;
    dailyModel.openLowGap = entry.Low - entry.Open;
    dailyModel.close = entry.Last;
    dailyModel.lowCloseGap = entry.Last - entry.Low;
    dailyModel.openCloseGap = entry.Last - entry.Open;
    dailyModel.openCloseGap = entry.Last - entry.Open;
    dailyModel.lowCloseGap = entry.Last - entry.Low;
    dailyModel.highCloseGap = entry.Last - entry.High;
    dailyModel.volume = entry.Volume;
    this.dailyModels.push(dailyModel);
  }
}
