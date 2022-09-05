import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { NgSelectCellEditorComponent } from '../NgSelectCellEditor/ng-select-cell-editor.component';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contract-coef',
  templateUrl: './contract-coef.component.html',
  styleUrls: ['./contract-coef.component.css']
})
export class ContractCoefComponent implements OnInit {
  @Input() InputParam;
  @Output() ContractCoefClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  columnDef1;
  rowData1;
  ContractID;
  CoefLevelCode;
  ContractCoefgridApi;
  btnclicked = false;
  type: string;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  startLeftPosition;
  startTopPosition;
  ChangeDetection = false;
  ContractCode;
  ContractorName;
  WasSaveInfo = false;
  Subject;
  ModuleCode;
  OrginalModuleCode;
  // ReigonCode;
  ContractOrderItemID: number;
  IsVisible = true;
  constructor(private ContractList: ContractListService,
    private RefreshService: RefreshServices,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
      this.OrginalModuleCode = +params['ModuleCode'];
    });
    this.columnDef1 = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'نام نوع ضریب ',
        field: 'ContractCoefTypeName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.ContractList.GetContractCoefTypeList(),
          bindLabelProp: 'ContractCoefTypeName',
          bindValueProp: 'ContractCoefTypeCode'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ContractCoefTypeName;

          } else {
            return '';
          }
        },
        editable: true,
        width: 500,
        resizable: true
      },
      {
        headerName: 'ضریب ',
        field: 'Coef',
        width: 200,
        HaveThousand: true,
        resizable: true,
        editable: true,
        valueParser: numberValueParser
      },
      {
        headerName: 'مبلغ ',
        field: 'Value',
        width: 200,
        resizable: true,
        editable: true,
        HaveThousand: true,
        valueParser: numberValueParser
      },
    ];

    function numberValueParser(params) {
      if (Number(params.newValue)) {
        return Number(params.newValue);
      } else {
        return '';
      }
    }
  }

  ngOnInit() {
    if (this.InputParam.ContractOrderItemID) {
      this.ContractOrderItemID = this.InputParam.ContractOrderItemID;
    }
    this.ContractID = this.InputParam.ContractID;
    this.CoefLevelCode = this.InputParam.CoefLevelCode;
    this.ContractCode = this.InputParam.ContractCode;
    this.ContractorName = this.InputParam.ContractorName;
    this.WasSaveInfo = this.InputParam.WasSaveInfo;
    this.Subject = this.InputParam.Subject;
    this.ContractList.GetContractCoefList(this.ContractID, this.ContractOrderItemID).subscribe(res => {
      this.rowData1 = res;
    });
    this.IsVisible = this.ModuleCode !== 2687 && this.ModuleCode !== 2727;
    if (this.InputParam.ModuleViewTypeCode === 5555) {
      this.IsVisible = false;
    }
  }

  close() {
    if (this.ChangeDetection) {
      this.ShowMessageBoxWithYesNoBtn('اطلاعات ضرایب قراداد تغییر کرده است آیا می خواهید بدون ثبت اطلاعات از فرم خارج شوید ؟');
    } else {
      this.btnclicked = false;
      this.ContractCoefClosed.emit(true);
    }
  }
  onContractCoefGridReady(params: { api: any; }) {
    this.ContractCoefgridApi = params.api;
  }

  onConfirmClick() {
    // this.ReigonCode = this.InputParam.ReigonCode;
    // this.ContractList.CheckWritableRegionCode(this.ReigonCode).subscribe(res => {
    //  if (res) {
    const rowData = [];
    const ContractCoefList = [];
    this.ContractCoefgridApi.stopEditing();
    this.ContractCoefgridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });

    rowData.forEach((item) => {
      if (item.ContractCoefID) {
        let ContractCoefTypeCode;
        if (item.ContractCoefTypeName.ContractCoefTypeCode) {
          ContractCoefTypeCode = item.ContractCoefTypeName.ContractCoefTypeCode;
        } else { ContractCoefTypeCode = item.ContractCoefTypeCode; }
        const obj = {
          ContractCoefID: item.ContractCoefID,
          ContractID: item.ContractID,
          ContractCoefTypeCode: ContractCoefTypeCode,
          // tslint:disable-next-line:radix
          Value: parseInt(item.Value),
          // tslint:disable-next-line:radix
          Coef: parseFloat(item.Coef),
          ContractOrderItemID: this.ContractOrderItemID ? this.ContractOrderItemID : null,
        };
        ContractCoefList.push(obj);
      } else {
        const obj = {
          ContractCoefID: 0,
          ContractID: this.ContractID,
          ContractCoefTypeCode: item.ContractCoefTypeName.ContractCoefTypeCode,
          // tslint:disable-next-line:radix
          Value: parseInt(item.Value),
          // tslint:disable-next-line:radix
          Coef: parseFloat(item.Coef),
          ContractOrderItemID: this.ContractOrderItemID ? this.ContractOrderItemID : null,
        };
        ContractCoefList.push(obj);
      }
    });
    this.ContractList.SaveContractCoefList(this.ContractID, ContractCoefList, this.ContractOrderItemID).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
      if (this.WasSaveInfo === true) {
        this.RefreshService.RefreshContractOrderItemListVW();
      }
      this.ChangeDetection = false;
    },
      err => {
        this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
      });
    //  } else {
    //    this.ShowMessageBoxWithOkBtn('شما اجازه ثبت ندارید');
    // }
    // });
  }
  popupclosed() {
    this.btnclicked = false;
  }
  onCellValueChanged(event) {
    this.ChangeDetection = true;
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

  ShowMessageBoxWithYesNoBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }
  MessageBoxAction(ActionResult) {
    if (ActionResult === 'YES') {
      this.btnclicked = false;
      this.ContractCoefClosed.emit(true);
    }
  }
}
