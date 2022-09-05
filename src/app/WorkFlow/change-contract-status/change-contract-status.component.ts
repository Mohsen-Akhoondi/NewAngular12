import { Component, OnInit , Input , Output , EventEmitter} from '@angular/core';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';

@Component({
  selector: 'app-change-contract-status',
  templateUrl: './change-contract-status.component.html',
  styleUrls: ['./change-contract-status.component.css']
})
export class ChangeContractStatusComponent implements OnInit {
  @Input() PopupParam;
  @Input() ModuleName;
  @Input() InputParam;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() CloseChoosePage: EventEmitter<any> = new EventEmitter<any>();

  ContractStatusName;
  ContractId;
  PopupType;
  ModuleCode;
  ContractSatusCode;
  HaveMaxBtn = false;
  HaveHeader = false;
  btnclicked = false;
  ParentModuleCode;
  startTopPosition: number;
  startLeftPosition: number;
  MinHeightPixel: number;
  OverPixelWidth: number;
  HeightPercentWithMaxBtn: number;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };


  ContractStatusItems;
  ContractStatusParams = {
    bindLabelProp: 'ContractStatusName',
    bindValueProp: 'ContractStatusCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
  };

  constructor(
    private ContractList: ContractListService,
    private ContractService: ContractListService,
  ) {
    
   }

  ngOnInit() {
    if (this.InputParam) { 
      this.ContractId =  this.InputParam.ContractId ;
      this.ContractStatusName = this.InputParam.ContractStatusName ;
      this.ModuleCode = this.InputParam.ParentModuleCode;
      this.ContractSatusCode = this.InputParam.ContractStatusCode
    }


  }
  OnOpenNgSelectContractStatus() {
    this.ContractList.GetContractStatusList().subscribe(res => {
      this.ContractStatusItems = res;
    });
  }

  ShowMessageBoxWithYesNoBtn(message) {
    this.btnclicked = true;
    this.PopupType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.PopupType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 545;
    this.startLeftPosition = 207;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveNoBtn = false;
    this.alertMessageParams.HaveYesBtn = false;
  }

  onClose() {
    this.CloseChoosePage.emit('Exit');
  }

  OnChangeClick() {
    if(this.ContractStatusParams.selectedObject == null){
      this.ShowMessageBoxWithOkBtn('لطفا فیلد‌ مربوطه را انتخاب کنید');
    }
    else{
      this.ShowMessageBoxWithYesNoBtn('آیا از تغییر وضعیت قرارداد اطمینان دارید؟');
    }

  }

  MessageBoxAction(event) {
    if (event === 'YES') {
      this.OnChangeContractStatusClick();
    }
    this.btnclicked = false;
    this.PopupType = '';
    this.HaveMaxBtn = false;
  }
  OnChangeContractStatusClick() {
    this.ContractService.ChangeContractStatus(this.InputParam.ContractId, this.InputParam.ParentModuleCode , this.ContractStatusParams.selectedObject).subscribe((res: any) => {
      

      if (res) {
        this.ShowMessageBoxWithOkBtn('تغییر وضعیت با موفقیت انجام شد');

      }
    },
    err => {
      if (!err.error.Message.includes('|')) {
        this.ShowMessageBoxWithOkBtn('تغییر وضعیت با شکست مواجه شد');
      }
    });
  }
  

  popupclosed(event) {
    this.btnclicked = false;
    this.HeightPercentWithMaxBtn = null;
    
  }

}
