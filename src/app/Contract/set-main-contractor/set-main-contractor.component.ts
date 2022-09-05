import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { RadioBoxModel } from 'src/app/Shared/Radio-Box/Radio-Box-Model/RadioBoxModel';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-set-main-contractor',
  templateUrl: './set-main-contractor.component.html',
  styleUrls: ['./set-main-contractor.component.css'],
})
export class SetMainContractorComponent implements OnInit {
  @Input() InputParam;
  @Output() SetMainContractorCLosed: EventEmitter<boolean> = new EventEmitter<boolean>();

  ContractorType = true;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  ContractorTotalItemCount;
  ContractorPageCount;
  NgSelectContractorParams = {
    bindLabelProp: 'ActorIdentityName', // RFC 51984
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '150px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    type: 'contract-contractor',
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails: [
        {
          HeaderCaption: 'شناسه',
          HeaderName: 'ActorId',
          width: 35,
          MinTermLenght: 1,
          SearchOption: 'ActorID',
        },
        {
          HeaderCaption: 'کد ملي',
          HeaderName: 'IdentityNo',
          width: 35,
          MinTermLenght: 10,
          SearchOption: 'IdentityNo',
        },
        // tslint:disable-next-line:max-line-length
        {
          HeaderCaption: 'نام و نام خانوادگي',
          HeaderName: 'ActorName',
          width: 53,
          MinTermLenght: 3,
          SearchOption: 'ActorName',
        },
      ],
      SearchItemHeader: [
        { HeaderCaption: 'شناسه', width: 35 },
        { HeaderCaption: 'کد ملي', width: 35 },
        { HeaderCaption: 'نام و نام خانوادگي', width: 53 },
      ],
      HaveItemNo: true,
      ItemNoWidth: 16,
    },
  };
  ContractorItems;
  ModuleCode;
  SelectedContractID: number;
  isClicked = false;
  PopUpType = '';
  startLeftPosition;
  startTopPosition;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  HaveHeader = false;
  ContractorTypeRadioParam: Array<RadioBoxModel> = [];

  constructor(
    private ContractList: ContractListService,
    private Actor: ActorService
  ) {}

  ngOnInit() {
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.ModuleCode = this.InputParam.ModuleCode;
    this.SelectedContractID = this.InputParam.SelectedContractID;
    const promise = new Promise<void>((resolve) => {
      this.ContractList.GetMainContractor(this.SelectedContractID).subscribe(res => {
        if (res && !isNullOrUndefined(res)) {
          this.ContractorType = res.ContractorType;
          this.NgSelectContractorParams.selectedObject = res.ActorID;
          resolve();
        }
      });
    }).then(() => {
      this.OpenContractor();
    });
  }

  rdoContractorTypeClick(Type) {
    this.ContractorType = Type;
    this.NgSelectContractorParams.selectedObject = null;
    this.ContractorItems = [];
  }
  FetchMoreContractor(event) {
    const ResultList = [];
    this.NgSelectContractorParams.loading = true;
    this.Actor.GetActorPaging(
      event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      this.ContractorType,
      false,
      false,
      null,
      null,
      false,
      null,
      false,
      true,
      this.ModuleCode
    ).subscribe((res) => {
      event.CurrentItems.forEach((el) => {
        ResultList.push(el);
      });
      res.List.forEach((element) => {
        ResultList.push(element);
      });
      this.ContractorItems = ResultList;
      this.NgSelectContractorParams.loading = false;
    });
  }
  OpenContractor() {
    const ResultList = [];
    this.Actor.GetActorPaging(1, 30, '', 'ActorID', this.ContractorType, false, false, this.NgSelectContractorParams.selectedObject,
      null, null, false, null, false, true, this.ModuleCode).subscribe(res => {
        this.ContractorItems = res.List;
        this.ContractorTotalItemCount = res.TotalItemCount;
        this.ContractorPageCount = Math.ceil(res.TotalItemCount / 30);
      });
  }
  doContractorSearch(event) {
    this.NgSelectContractorParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      this.ContractorType,
      false, false, null, null, false, null, false, true, this.ModuleCode).subscribe(res => {
        this.ContractorItems = res.List;
        this.ContractorTotalItemCount = res.TotalItemCount;
        this.ContractorPageCount = Math.ceil(res.TotalItemCount / 30);
        this.NgSelectContractorParams.loading = false;
      });
  }
  onSave() {
    this.ContractList.SetMainContractor(this.SelectedContractID, this.NgSelectContractorParams.selectedObject).subscribe(res => {
      if (res) {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد.');
      }
    });
  }
  onClose() {
    this.SetMainContractorCLosed.emit(true);
  }
  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  popupclosed(event) {
    this.isClicked = false;
    this.PopUpType = '';
  }
}
