import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';

@Component({
  selector: 'app-show-contract-relation',
  templateUrl: './show-contract-relation.component.html',
  styleUrls: ['./show-contract-relation.component.css']
})
export class ShowContractRelationComponent implements OnInit {

  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() InputParam;

  ProdReqRelApi;
  ProdcontractColDef;
  contractRelList = [];
  constructor(private ContractList: ContractListService,) { }

  ngOnInit() {
    if (this.InputParam && this.InputParam.CostFactorID) {
      this.ContractList.GetContractRelation(this.InputParam.CostFactorID, this.InputParam.IsCost ? this.InputParam.IsCost : true).subscribe(res => {
        this.contractRelList = res;
      });
    }
  }
  ngAfterViewInit(): void {
    this.ProdcontractColDef = [
      {
        headerName: 'رديف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: ' نوع ارتباط  ',
        field: 'ContractRelationTypeName',
        editable: false,
        width: 150,
        resizable: true
      },
      {
        headerName: 'سال مالی',
        field: 'FinYearCode',
        editable: false,
        width: 120,
        resizable: true
      },
      {
        headerName: 'موضوع قرارداد ',
        field: 'Subject',
        editable: false,
        width: 300,
        resizable: true
      },
      {
        headerName: 'شماره قراداد',
        field: 'LetterNo',
        width: 100,
        editable: false,
        resizable: true
      },
      {
        headerName: 'کد قراداد',
        field: 'ContractCode',
        width: 100,
        editable: false,
        resizable: true
      },
      {
        headerName: 'پیمانکار',
        field: 'ContractorFullName',
        width: 200,
        editable: false,
        resizable: true
      },
      {
        headerName: 'مبلغ قرارداد',
        field: 'ContractAmountStr',
        width: 150,
        editable: false,
        resizable: true
      },
      {
        headerName: 'تاریخ شروع قرارداد',
        field: 'PersianFromContractDateString',
        width: 150,
        editable: false,
        resizable: true
      },
      {
        headerName: 'توضيحات',
        field: 'Note',
        editable: false,
        width: 300,
        resizable: true
      },
    ];
  }
  // onGridReadyContractRel(params: { api: any; }) {
  //   this.ProdReqRelApi = params.api;
  // }
  closeModal() {
    this.Closed.emit(true);
  }
}
