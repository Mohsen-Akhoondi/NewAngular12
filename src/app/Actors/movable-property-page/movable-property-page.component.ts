import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-movable-property-page',
  templateUrl: './movable-property-page.component.html',
  styleUrls: ['./movable-property-page.component.css']
})
export class MovablePropertyPageComponent implements OnInit {
  @Output() MovablePropertyPageClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() InputParam: any;

  constructor() { }
  MovableColumnDef;
  MovablerowsData: any = [];
  ngOnInit() {
    this.MovableColumnDef = [
      {
        headerName: 'رديف ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'واحد اجرایی',
        field: 'RegionName',
        width: 200,
        resizable: true,
        sortable: true
      },
      {
        headerName: 'حوزه کاری',
        field: 'BusinessPatternName',
        width: 200,
        resizable: true,
        sortable: true
      },
      {
        headerName: 'نوع وسیله نقلیه',
        field: 'VehicleTypeName',
        width: 150,
        resizable: true,
        sortable: true
      },
      {
        headerName: 'نوع تجهیزات',
        field: 'EquipmentTypeName',
        width: 150,
        resizable: true,
        sortable: true
      },
      {
        headerName: 'مدل',
        field: 'Model',
        width: 120,
        resizable: true,
        sortable: true
      },
      {
        headerName: 'شماره موتور',
        field: 'EngineNo',
        width: 120,
        resizable: true,
        sortable: true
      },
      {
        headerName: 'شماره شاسی',
        field: 'ChassisNo',
        width: 120,
        resizable: true,
        sortable: true
      },
      {
        headerName: 'شماره vin',
        field: 'VinNo',
        width: 120,
        resizable: true,
        sortable: true
      },
      {
        headerName: 'پلاک',
        field: 'CarTag',
        HaveThousand: false,
        width: 200,
        resizable: true
      },
      {
        headerName: 'سال ساخت ',
        field: 'ProductYear',
        HaveThousand: false,
        width: 90,
        resizable: true,
      },
      {
        headerName: 'تعداد ',
        field: 'Qty',
        HaveThousand: false,
        width: 110,
        resizable: true
      },
      {
        headerName: 'مبلغ ',
        field: 'Amount',
        HaveThousand: true,
        width: 150,
        resizable: true,
      },
      {
        headerName: 'توضيحات',
        field: 'Note',
        width: 300,
        resizable: true
      },
      // RFC 53015
      // { // RFC 52469 
      //   headerName: 'مستندات',
      //   field: '',
      //   editable: false,
      //   width: 120,
      //   resizable: false
      // }
    ];
    this.MovablerowsData = this.InputParam.MovablerowsData;
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {

  }
  onClose() {
    this.MovablePropertyPageClosed.emit(true);
  }
}
