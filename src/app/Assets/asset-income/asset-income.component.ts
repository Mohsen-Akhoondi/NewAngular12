import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-asset-income',
  templateUrl: './asset-income.component.html',
  styleUrls: ['./asset-income.component.css']
})
export class AssetIncomeComponent implements OnInit {
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  @Output() Output: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() InputParam;
  RegionParams = {
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  AssetParams  = {
    bindLabelProp: 'AssetCodeName',
    bindValueProp: 'AssetID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  RegionItems;
  AssetItems;
  Area;
  Location;
  columnDef;
  rowData;
  AssetIncomeTypeItems;
  AssetIncomeName;
  PlateNo;
  AssetIncomeTypeParams  = {
    bindLabelProp: 'AssetIncomeTypeName',
    bindValueProp: 'AssetIncomeTypeCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  RequiredComponents = [this.RegionParams, this.AssetParams, this.AssetIncomeTypeParams];
  btnclicked: boolean;
  type: string;
  HaveHeader;
  HaveMaxBtn = false;
  startLeftPosition: number;
  startTopPosition: number;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  CheckValidate = false;
  Position;
  Note;
  ModuleCode;
  AssetIncomeObj;
  constructor(private RegionList: RegionListService,
              private ProductRequest: ProductRequestService,
              private RefreshPersonItems: RefreshServices,
              private route: ActivatedRoute
             ) {
               this.route.params.subscribe(params => {
              this.ModuleCode = +params['ModuleCode'];
            });
 }

  ngOnInit() {
    this.RegionList.GetRegionList(this.ModuleCode, true).subscribe((res: any) => {
      this.RegionItems = res;
    });
    this.ProductRequest.GetAssetIncomeType().subscribe((res: any) => {
      this.AssetIncomeTypeItems = res;
    });
    if (this.InputParam.Mode === 'EditMode') {
    this.ProductRequest.GetAssetIncome(this.InputParam.AssetIncomeID).subscribe((res: any) => {
      this.AssetIncomeObj = res;
      this.RegionParams.selectedObject = this.InputParam.RegionCode;
      this.ProductRequest.GetAssetIncomeByRegionCode(this.RegionParams.selectedObject).subscribe((res: any) => {
        this.AssetItems = res;
        this.AssetParams.selectedObject = this.AssetIncomeObj.AssetID;
      });
      this.PlateNo = this.AssetIncomeObj.PlateNo;
      this.AssetIncomeTypeParams.selectedObject = this.AssetIncomeObj.AssetIncomeTypeCode;
      this.AssetIncomeName = this.AssetIncomeObj.AssetIncomeName;
      this.Area = this.AssetIncomeObj.Area;
      this.Position = this.AssetIncomeObj.Position;
      this.Note = this.AssetIncomeObj.Note;
    });
  }
  }

  closeModal() {
    this.Closed.emit(true);
  }
  onGridReady() {
  }
  onChangeRegion(event) {
    this.ProductRequest.GetAssetIncomeByRegionCode(event).subscribe((res: any) => {
      this.AssetItems = res;
    });
  }
  onSave() {
    this.CheckValidate = true;
    let ValidateForm = true;
    this.RequiredComponents.forEach((element, index, array) => {
      if (element.Required && !element.selectedObject && element.selectedObject !== 0) {
        ValidateForm = false;
      }
    });
    ValidateForm =  ValidateForm && this.Area && this.PlateNo;
    if (ValidateForm) {
      // tslint:disable-next-line:radix
      if (parseInt(this.Area.length) > 6) {
        this.ShowMessageBoxWithOkBtn('مساحت حداکثر 6 رقم صحیح باید داشته باشد');
        return;
      }
     const AssetIncomeObj = {
      AssetIncomeID : this.AssetIncomeObj && this.AssetIncomeObj.AssetIncomeID ? this.AssetIncomeObj.AssetIncomeID : -1,
      AssetID: this.AssetParams.selectedObject,
      AssetIncomeTypeCode: this.AssetIncomeTypeParams.selectedObject,
      Area: parseFloat(this.Area),
      Position: this.Position,
      Note: this.Note,
      PlateNo: this.PlateNo,
      AssetIncomeName: this.AssetIncomeName
     };
     this.ProductRequest.SaveAssetIncome(AssetIncomeObj, this.ModuleCode).subscribe((res: any) => {
      this.Output.emit(true);
      this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
       },
            err => {
              if (!err.error.Message.includes('|')) {
                this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
              }
    });
    } else {
      this.ShowMessageBoxWithOkBtn('خواهشمند است ابتدا فیلد های مشخص شده را تکمیل فرمایید');
    }
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 530;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  popupclosed(event) {
    this.btnclicked = false;
    this.type = '';
  }
}
