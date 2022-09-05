import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { ContractPayDetailsService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayDetailsService';
import { ActivatedRoute, Router } from '@angular/router';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';

@Component({
  selector: 'app-contract-pay-deduction',
  templateUrl: './contract-pay-deduction.component.html',
  styleUrls: ['./contract-pay-deduction.component.css']
})
export class ContractPayDeductionComponent implements OnInit {
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() InputParam;
  CostFactorID;
  gridApi: any;
  rowData: any = [];
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  columnDef;
  IsSaveValid = true;
  btnclicked: boolean;
  type: string;
  HaveMaxBtn: boolean;
  startTopPosition: number;
  HeightPercentWithMaxBtn: any;
  PercentWidth: any;
  MainMaxwidthPixel: any;
  MinHeightPixel: any;
  ModuleCode: number;
  OrginalModuleCode: number;
  HaveHeader: boolean;
  startLeftPosition: number;
  IsCompelete =false;

  constructor(private contractpaydetail: ContractPayDetailsService,
    private router: Router,
    private route: ActivatedRoute,) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
      this.OrginalModuleCode = +params['ModuleCode'];
    });
  }

  ngOnInit() {
    if (this.InputParam && this.InputParam.CostFactorID) {
      this.CostFactorID = this.InputParam.CostFactorID;
    }
    this.contractpaydetail.GetDeductionListByCostFactorID(this.InputParam.CostFactorID).subscribe(res => {
      this.rowData = res;
    });
  }
  ngAfterViewInit(): void {
    this.columnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'نوع کسر',
        field: 'DeductionTypeName',
        width: 250,
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.contractpaydetail.GetAllDeductionType(),
          bindLabelProp: 'DeductionTypeName',
          bindValueProp: 'DeductionTypeCode',
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.DeductionTypeName) {
            params.data.DeductionTypeName = params.newValue.DeductionTypeName;
            params.data.DeductionTypeCode = params.newValue.DeductionTypeCode;
            params.data.Rank = '';
            return true;
          }
        },
        cellRenderer: 'SeRender',
        editable: true,
        resizable: true,
      },
      {
        headerName: 'مبلغ',
        field: 'DeductionAmount',
        cellEditorFramework: NumberInputComponentComponent,
        HaveThousand: true,
        width: 110,
        resizable: true,
        editable: true,
      },
      {
        headerName: 'درصد',
        cellEditorFramework: NumberInputComponentComponent,
        HaveThousand: true,
        field: 'Percent',
        width: 150,
        resizable: true,
        editable: true,
      },
      {
        headerName: 'توضیحات',
        field: 'Note',
        width: 220,
        resizable: true,
        editable: true,
      },
    ];
  }

  closeModal() {
    this.btnclicked = false;
    this.Closed.emit(true);
  }

  onGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }

  onCellEditingStartedMCP(event) {

  }

  OnSave() {
    this.IsSaveValid = true;
    this.IsCompelete = false;
    this.gridApi.stopEditing();
    const DeductionList = [];
    this.gridApi.forEachNode(node => {
      if (node.data.DeductionTypeCode) {
        var keys = Object.keys(node.data);
        const DeductionTypeCodeList = [];
        if (node.data.EntityList) {
          node.data.EntityList.forEach(Entity => {
            let str = 'DeductionTypeName' + Entity.EntityTypeID.toString()
            let ID = 'DeductionTypeCode' + Entity.EntityTypeID.toString();
            var key = keys.find(x => x === str);

            if (key && node.data[key]) {
              if (node.data[key].ActorID) {
                DeductionTypeCodeList.push(node.data[key].DeductionTypeCode);
              } else {
                key = keys.find(x => x === ID);
                if (key && node.data[key]) {
                  DeductionTypeCodeList.push(node.data[key]);
                }
              }
            }
          });
        }
        const DeductionObj = {
          ContractPayDeductionID: node.data.ContractPayDeductionID,
          CostFactorID: this.InputParam.CostFactorID,
          DeductionTypeCode: node.data.DeductionTypeCode,
          Percent: node.data.Percent,
          FDeductionAmount: node.data.DeductionAmount ? node.data.DeductionAmount : null,
          Note: node.data.Note ? node.data.Note : null,
          ItemNo: node.data.ItemNo,
        };
        DeductionList.push(DeductionObj);
      }
      else {
        this.IsSaveValid = false;
        this.ShowMessageBoxWithOkBtn('ابتدا کد کسر را وارد کنید');
      }
    });
    if (this.IsSaveValid) {
      this.contractpaydetail.SaveContractpayDeductions(this.InputParam.CostFactorID, DeductionList, this.ModuleCode).subscribe((res: any) => {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
      this.IsCompelete =true;
      });
    }
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

  popupclosed(event) {
    if (this.IsCompelete) {
      this.ngOnInit()
    }
    this.btnclicked = false;
    this.HeightPercentWithMaxBtn = null;
    this.PercentWidth = null;
    this.MainMaxwidthPixel = null;
    this.MinHeightPixel = null;
    this.HaveMaxBtn = false;

  }
  onCellEditingStarted(event) {}
}
