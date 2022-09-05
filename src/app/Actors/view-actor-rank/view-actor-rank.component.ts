import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { GridOptions } from 'ag-grid-community';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-view-actor-rank',
  templateUrl: './view-actor-rank.component.html',
  styleUrls: ['./view-actor-rank.component.css']
})
export class ViewActorRankComponent implements OnInit {
  @Input() InputParam;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  columnDef;
  rowData;
  DetailColDef;
  DetailList = [];
  gridApi;

  GridOptionsRowStyle: GridOptions = {
    getRowStyle: function (params) {
      if (params.data.RankParameterCode === 1000) {
        return { 'background-color': '#6bfdbd' };
      }

      if (params.data.RankParameterCode === 1000) {
        return { 'font-weight': 'bold' };
      }

    }
  };
  SelectedRankRow: any;

  constructor(private Actor: ActorService) {
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: 'عنوان',
        field: 'RankParameterName',
        width: 190,
        resizable: true
      },
      {
        headerName: 'امتیاز',
        field: 'Score',
        width: 80,
        resizable: true
      },
      {
        headerName: 'رتبه',
        field: 'Rank',
        width: 60,
        resizable: true
      },
      {
        headerName: 'توضیحات',
        field: 'Note',
        width: 250,
        resizable: true
      },
    ];
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    $('#div1').resizable({
      handles: 'w',
      resize: function (event, ui) {
        ui.position.left = ui.originalPosition.left;
        ui.size.width = (ui.size.width
          - ui.originalSize.width) * 2
          + ui.originalSize.width;
      }
    });

  }

  ngOnInit() {
    this.Actor.CalculateRank(this.InputParam.ActorID, this.InputParam.PriceListTopicID).subscribe(res => {
      this.rowData = res;
    });
  }


  onClose() {
    this.Closed.emit(true);
  }

  onRowClick(event) {
    this.SelectedRankRow = event.data;
    this.DetailList = this.SelectedRankRow.RankDetailList;
    if (this.SelectedRankRow.RankParameterCode === 1) {
      this.DetailColDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 50,
          resizable: true
        },
        {
          headerName: 'شخص',
          field: 'ActorName',
          width: 150,
          resizable: true
        },
        {
          headerName: 'مدرک',
          field: 'GradeName',
          width: 90,
          resizable: true
        },
        {
          headerName: 'موسسه/شرکت',
          field: 'EmployerName',
          width: 120,
          resizable: true
        },
        {
          headerName: 'رسته مرتبط',
          field: 'ExperienceCoefName',
          width: 150,
          resizable: true
        },
        {
          headerName: 'سابقه (روز)',
          field: 'Days',
          width: 90,
          resizable: true
        },
        {
          headerName: 'امتیاز',
          field: 'Score',
          width: 90,
          resizable: true
        }
      ];
    } else if (this.SelectedRankRow.RankParameterCode === 2) { // توان مالی
      this.DetailColDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 50,
          resizable: true
        },
        {
          headerName: 'موجودی حساب',
          field: 'SumAccountBalance',
          HaveThousand: true,
          width: 150,
          resizable: true
        },
        {
          headerName: 'گردش حساب',
          field: 'SumTurnOver',
          HaveThousand: true,
          width: 120,
          resizable: true
        }
      ];
    } else if (this.SelectedRankRow.RankParameterCode === 3 ||
      this.SelectedRankRow.RankParameterCode === 9) { // تجهیزات
      this.DetailColDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 50,
          resizable: true
        },
        {
          headerName: 'نوع کاربری',
          field: 'GoodsName',
          width: 200,
          resizable: true
        },
        {
          headerName: 'تعداد',
          field: 'Count',
          HaveThousand: true,
          width: 80,
          resizable: true
        }
      ];

    } else if (this.SelectedRankRow.RankParameterCode === 6) {
      this.DetailColDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 50,
          resizable: true
        },
        {
          headerName: 'قرارداد',
          field: 'Subject',
          width: 200,
          resizable: true
        },
        {
          headerName: 'حوزه تخصص',
          field: 'PriceListTopicName',
          width: 200,
          resizable: true
        },
        {
          headerName: 'تاریخ شروع',
          field: 'FromDate',
          width: 100,
          resizable: true
        },
        {
          headerName: 'تاریخ پایان',
          field: 'EndDate',
          width: 100,
          resizable: true
        },
        {
          headerName: 'منطقه',
          field: 'WorkPlaceName',
          width: 100,
          resizable: true
        },
        {
          headerName: 'ناحیه',
          field: 'RegionAreaCode',
          width: 70,
          resizable: true
        },
        {
          headerName: 'امتیاز',
          field: 'Score',
          HaveThousand: true,
          width: 80,
          resizable: true
        }
      ];
    } else if (this.SelectedRankRow.RankParameterCode === 4) {
      this.DetailColDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 50,
          resizable: true
        },
        {
          headerName: 'شخص',
          field: 'ActorName',
          width: 150,
          resizable: true
        },
        {
          headerName: 'مدرک',
          field: 'GradeName',
          width: 90,
          resizable: true
        },
        {
          headerName: 'موسسه/شرکت',
          field: 'EmployerName',
          width: 120,
          resizable: true
        },
        {
          headerName: 'رسته مرتبط',
          field: 'ExperienceCoefName',
          width: 150,
          resizable: true
        },
        {
          headerName: 'سابقه (روز)',
          field: 'Days',
          width: 90,
          resizable: true
        },
        {
          headerName: 'امتیاز',
          field: 'Score',
          width: 90,
          resizable: true
        }
      ];
    } else {
      this.DetailColDef = [];
      this.DetailList = [];
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.SetDefaultRowIndex();
  }
  SetDefaultRowIndex() {
    if (this.gridApi) {
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === 1) {
          node.setSelected(true);
          this.onRowClick(node);
        }
      });
    }
  }
}
