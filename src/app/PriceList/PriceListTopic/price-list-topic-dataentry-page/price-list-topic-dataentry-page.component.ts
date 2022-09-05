import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';
import { NgSelectConfig } from 'src/app/Shared/ng-select/public-api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-price-list-topic-dataentry-page',
  templateUrl: './price-list-topic-dataentry-page.component.html',
  styleUrls: ['./price-list-topic-dataentry-page.component.css']
})
export class PriceListTopicDataentryPageComponent implements OnInit {
  @Input() InputParam;
  @Output() PriceListTopicClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  StarCodeItems;
  StarCodeParams = {
    bindLabelProp: 'StarCodeName',
    bindValueProp: 'StarCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: true
  };
  DisabledAmount = false;
  DesablePriceListTopicCode = false;
  WorkUnitItems: any = [];
  WorkUnitParams = {
    bindLabelProp: 'WorkUnitName',
    bindValueProp: 'WorkUnitCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  WorkParams = {
    bindLabelProp: 'WorkName',
    bindValueProp: 'WorkCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  PriceListTopicCode;
  PriceListTopicName;
  selectedWorkUnitCode;
  Amount;
  PriceListTopicQualifier;
  ParentPriceListPatternID;
  ParentPriceListTopicCode;
  type: string;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  startLeftPosition;
  startTopPosition;
  btnclicked;
  DisplayCode;
  ParentTopicCode;
  CheckValidate = false;
  PriceListTopicCod;
  Mode;
  PriceListTopicObj;
  ParentPriceListTopicObj;
  IsStar = '*';
  WorkItems = [{ WorkCode: 1, WorkName: 'کارکرد' }, { WorkCode: 0, WorkName: 'پایکار ' }];
  selectedWorkCode = 1;
  PriceListTypeCode;
  ContractEstimateRow;
  CostListFinYearCode;
  HaveSearch = false;
  BtnSaveName;
  PerCentWidth = 20;
  MaxLength = 4;
  IsVisible = true;
  IsDisable = false;
  IsDisableName = false;
  StarCodeList;
  ModuleCode;
  IsShowMapCode = false;
  ContractTopicMapCode;
  @Output() IsChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(private PriceList: PriceListService,
    private route: ActivatedRoute,
    config: NgSelectConfig) {
    config.notFoundText = 'موردی یافت نشد';
    this.StarCodeList = [{ StarCode: '0', StarCodeName: 'جدید' },
    { StarCode: '1', StarCodeName: 'فاکتوری' }];
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }

  ngOnInit() {
    if (!this.ModuleCode) {
      this.ModuleCode = this.InputParam.ModuleCode;
    }
    if (this.InputParam.ParentPage === 'price-list') {
      this.IsDisable = false;
    } else {
      this.IsDisable = true;
    }
    if (this.ModuleCode === 2682) {
      this.DisabledAmount = true;
      this.DesablePriceListTopicCode = true;
    }
    if (this.ModuleCode === 2645) { // برآورد اولیه
      this.IsShowMapCode = true;
    }
    this.WorkParams.selectedObject = 1;
    this.Mode = this.InputParam.Mode;
    if (this.InputParam.Mode === 'EditBatchTopicInEstimate') {
      this.EditBatchTopicInEstimateInit();
      return;
    }
    if (this.InputParam.Mode === 'AddBatchTopicInEstimate') {
      this.AddBatchTopicInEstimate();
      return;
    }
    if (this.InputParam.Mode === 'AddNewPopUpMode') {
      this.AddNewePopUpInit();
      return;
    }

    if (this.InputParam.Mode !== 'AddNewPopUpMode') {
      this.NGInit();
      return;
    }
  }
  EditBatchTopicInEstimateInit() {
    this.IsVisible = false;
    this.HaveSearch = false;
    this.IsDisable = true;
    this.IsDisableName = true;
    this.WorkUnitParams.IsDisabled = true;
    this.WorkParams.IsDisabled = true;
    this.BtnSaveName = 'ثبت';
    this.MaxLength = 8;
    this.PriceListTopicObj = this.InputParam.ContractEstimateRow;
    this.ContractEstimateRow = this.InputParam.ContractEstimateRow;
    this.PriceListTypeCode = this.PriceListTopicObj.PriceListTypeCode;
    this.CostListFinYearCode = this.PriceListTopicObj.CostListFinYearCode;
    this.PriceListTopicCode = this.PriceListTopicObj.PriceListNo.substr(4, 4);
    this.ParentTopicCode = this.PriceListTopicObj.PriceListNo.substr(0, 4);
    this.Amount = this.PriceListTopicObj.Amount;
    this.PriceListTopicName = this.PriceListTopicObj.PriceListName;
    this.IsStar = this.PriceListTopicObj.IsStar;
    if (this.PriceListTopicObj.IsWorkCode) {
      this.selectedWorkCode = 1;
    } else { this.selectedWorkCode = 0; }
    this.PriceList.GetWorkUnits().subscribe(res => {
      this.WorkUnitItems = res;
      this.WorkUnitParams.selectedObject = this.PriceListTopicObj.WorkUnitCode;
    });
  }
  EditModeInit() {

    this.PriceListTopicCode = this.PriceListTopicObj.PriceListTopicCode.substr(4, 4);
    this.ParentTopicCode = this.PriceListTopicObj.PriceListTopicCode.substr(0, 4);
    this.PriceListTopicName = this.PriceListTopicObj.PriceListTopicName;
    this.Amount = this.PriceListTopicObj.Amount;
    if (this.PriceListTopicObj.IsStar === '*') {
      this.IsStar = '*';
    } else { this.IsStar = ''; }

    if (this.PriceListTopicObj.IsWorkCode) {
      this.selectedWorkCode = 1;
    } else { this.selectedWorkCode = 0; }
  }
  AddBatchTopicInEstimate() {
    if (this.ModuleCode === 2516) {
      this.StarCodeParams.IsDisabled = false;
      this.StarCodeItems = this.StarCodeList;
    }
    this.IsVisible = false;
    this.HaveSearch = false;
    this.BtnSaveName = 'ثبت';
    this.MaxLength = 8;
    this.ContractEstimateRow = this.InputParam.ContractEstimateRow;
    this.PriceListTypeCode = this.InputParam.PriceListTypeCode;
    this.CostListFinYearCode = this.InputParam.CostListFinYearCode;
    // this.PriceListTopicCode = this.InputParam.PriceListTopicCode.substr(4, 4);
    this.ParentTopicCode = this.InputParam.PriceListTopicCode.substr(0, 4);
    this.Amount = this.InputParam.Amount;
    this.PriceList.GetWorkUnits().subscribe(res => {
      this.WorkUnitItems = res;
      this.WorkUnitParams.selectedObject = res[0].WorkUnitCode;
    });

    this.PriceListTopicName = this.ContractEstimateRow &&
                              this.ContractEstimateRow.PriceListName ?
                              this.ContractEstimateRow.PriceListName : '';
  }
  AddNewePopUpInit() {
    if (this.ModuleCode === 2516) {
      this.StarCodeParams.IsDisabled = false;
      this.StarCodeItems = this.StarCodeList;
    }
    this.IsVisible = false; // Injust
    this.HaveSearch = true;
    this.BtnSaveName = 'ثبت';
    this.MaxLength = 8;
    this.PriceListTypeCode = this.InputParam.PriceListTypeCode;
    this.CostListFinYearCode = this.InputParam.CostListFinYearCode;

    this.PriceList.GetWorkUnits().subscribe(res => {
      this.WorkUnitItems = res;
      this.WorkUnitParams.selectedObject = res[0].WorkUnitCode;
    });

  }

  NGInit() {
    this.PriceListTopicQualifier = this.InputParam.PriceListTopicQualifier;
    this.ParentPriceListPatternID = this.InputParam.PriceListPatternID;
    this.ParentPriceListTopicCode = this.InputParam.PriceListTopicCode;
    this.ParentTopicCode = this.InputParam.PriceListTopicCode;
    this.PriceListTopicObj = this.InputParam.selectedRow;
    this.BtnSaveName = 'ثبت';

    if (this.Mode === 'EditMode') {
      this.EditModeInit();
    }

    this.PriceList.GetWorkUnits().subscribe(res => {
      this.WorkUnitItems = res;
      if (this.Mode === 'EditMode') {
        this.WorkUnitParams.selectedObject = this.PriceListTopicObj.WorkUnitCode;
      } else { this.WorkUnitParams.selectedObject = res[0].WorkUnitCode; }
    });
  }

  getPriceListTopicCode(code) {
    this.PriceListTopicCode = code;
  }

  getParentTopicCode(code) {
    this.ParentTopicCode = code;
  }

  getAmount(Amount) {
    this.Amount = Amount;
  }

  close() {
    this.PriceListTopicClosed.emit(true);
  }

  onSaveClick() {

    if (this.ContractTopicMapCode) { // RFC 61095
      const str = this.ContractTopicMapCode;
      if (str.length > 8) {
        this.ShowMessageBoxWithOkBtn('کد معادل حداکثر 8 رقم می تواند باشد');
        return;
      }
    }

    if (this.InputParam.Mode === 'InsertMode') {
      this.InsertPriceListTopic_MC_2682('', '', this.ParentPriceListPatternID);
      return;
    }

    if (this.InputParam.Mode === 'EditMode') {
      this.UpdatePriceListTopic();
      return;
    }

    if (this.InputParam.Mode === 'AddNewPopUpMode') {
      this.AddNewPopUp();
      return;
    }
    if (this.InputParam.Mode === 'AddBatchTopicInEstimate') {
      this.onSaveEstimate();
      return;
    }
    // if (this.InputParam.Mode === 'EditBatchTopicInEstimate') {
    //   this.UpdateAmount();
    //   return;
    // }
  }

  UpdatePriceListTopic() {
    const TopicCode = this.padLeft(this.PriceListTopicCode, '0', 4);
    const DisplayCode = this.ParentTopicCode + '' + this.PriceListTopicCode + '@';
    const PriceListTopicCode = this.ParentTopicCode + '' + this.PriceListTopicCode;
    const PriceListTopic = {
      PriceListTopicID: this.PriceListTopicObj.PriceListTopicID,
      PriceListTopicCode: PriceListTopicCode,
      PriceListTopicName: this.PriceListTopicName,
      PriceListLevelCode: 6,
      PriceListTopicQualifier: '',
    };
    const PriceList = {
      Amount: /*this.Amount.replace(/,/g, '')*/ 0,
      IsStar: this.IsStar === '*' ? 1 : this.IsStar === 'ف' ? 0 : this.IsStar === 'م' ? 2 : this.IsStar === '*ف',
      IsWork: this.selectedWorkCode,
      WorkUnitCode: this.selectedWorkUnitCode,
    };
    this.PriceList.UpdatePriceListTopic(PriceListTopic, PriceList, DisplayCode, this.ModuleCode).subscribe(
      res => {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
        this.IsChange.emit(true);
      },
      err => {
        this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
      });
  }
  onSaveEstimate() {
    this.PriceList.FindPriceListPattern(this.CostListFinYearCode,
      this.PriceListTypeCode,
      this.ParentTopicCode).subscribe(
        ress => {
          if (ress) {
            this.ParentPriceListTopicObj = ress;
            // tslint:disable-next-line:max-line-length
            this.ShowMessageBoxWithYesNoBtn(' فهرست بهای مورد نظر در پایگاه وجود ندارد آیا مایل به ثبت آن  ' +
              +' ' + ' در رسته ' + ' ' + ress.Level1Name + ' ' +
              +' ' + ' و رشته ' + ' ' + ress.Level2Name + ' ' +
              // tslint:disable-next-line:max-line-length
              +' ' + ' و ' + ' ' + ress.Level3Name + ' ' + 'هستید ؟');
          } else {
            this.ShowMessageBoxWithOkBtn('فهرست بهای مورد نظر در ساختار قرار نمی گیرد');
          }
        }
      );
  }
  onSearchClick() {
    // tslint:disable-next-line:no-unused-expression
    if (this.ParentTopicCode) {
      const str = this.ParentTopicCode;
      if (str.length !== 4) {
        this.ShowMessageBoxWithOkBtn('کد فهرست بها باید چهار رقم باشد');
        return;
      }
    }
    if (this.ContractTopicMapCode) { // RFC 61095
      const str = this.ContractTopicMapCode;
      if (str.length > 8) {
        this.ShowMessageBoxWithOkBtn('کد معادل حداکثر 8 رقم می تواند باشد');
        return;
      }
    }
    const PriceListTopicCode = this.ParentTopicCode.toString() + (this.PriceListTopicCode ? this.PriceListTopicCode.toString() : '0000');
    const PriceListTopicCodes = [];
    PriceListTopicCodes.push(PriceListTopicCode);
    this.PriceList.GetPriceListPatterns(this.CostListFinYearCode,
      this.PriceListTypeCode,
      PriceListTopicCodes).
      subscribe(res => {
        if (res && res[0]) {
          this.PriceListTopicName = res[0].PriceListTopicName;
          this.IsStar = res[0].IsStar;
          this.Amount = res[0].Amount;
          this.selectedWorkCode = res[0].IsWork === 'کارکرد' ? 1 : 0;
          this.selectedWorkUnitCode = res[0].WorkUnitCode;
          this.PriceListTopicObj = res[0];
          this.IsChange.emit(this.PriceListTopicObj);
        } else {
          this.PriceList.FindPriceListPattern(this.CostListFinYearCode,
            this.PriceListTypeCode,
            this.ParentTopicCode).subscribe(
              ress => {
                if (ress) {
                  this.ParentPriceListTopicObj = ress;
                  // tslint:disable-next-line:max-line-length
                  this.ShowMessageBoxWithYesNoBtn(' فهرست بهای مورد نظر در پایگاه وجود ندارد آیا مایل به ثبت آن  ' +
                    +' ' + ' در رسته ' + ' ' + ress.Level1Name + ' ' +
                    +' ' + ' و رشته ' + ' ' + ress.Level2Name + ' ' +
                    // tslint:disable-next-line:max-line-length
                    +' ' + ' و فصل ' + ' ' + ress.Level3Name + ' ' + 'هستید ؟');
                } else {
                  this.ShowMessageBoxWithOkBtn('فهرست بهای مورد نظر در ساختار قرار نمی گیرد');
                }
              }
            );
        }
      });
  }

  AddNewPopUp() {
    if (this.PriceListTopicObj) {
      this.PriceListTopicClosed.emit(true);
    } else {
      this.onSearchClick();
    }
  }

  padLeft(text: string, padChar: string, size: number): string {
    return (String(padChar).repeat(size) + text).substr((size * -1), size);
  }

  popupclosed() {
    this.btnclicked = false;
  }
  onChangeWorkUnit(WorkUnitCode) {
    this.WorkUnitParams.selectedObject = WorkUnitCode;
  }
  onChangeWork(WorkCode) {
    this.WorkParams.selectedObject = WorkCode;
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


  getOutPutParam(event) {
    if (this.type === 'message-box') {
      this.btnclicked = false;
      if (event === 'YES') {
        this.InsertPriceListTopic_MC_2682(this.CostListFinYearCode,
          this.PriceListTypeCode,
          this.ParentPriceListTopicObj.PriceListPatternID);
        return;
      }
    }
  }
  UpdateAmount() {
    if (!this.Amount || this.Amount === '0') {
      this.ShowMessageBoxWithOkBtn('مبلغ فهرست بها نمی تواند خالی یا صفر باشد');
      return;
    }

    this.PriceList
      .UpdateAmountPriceListTopic(
        this.PriceListTopicObj.PriceListPatternID,
        this.Amount.replace(/,/g, '')).subscribe(
          res => {
            this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
            this.PriceListTopicObj = {
              PriceListPatternID: res,
              Amount: this.Amount.replace(/,/g, '')
            };
            this.IsChange.emit(this.PriceListTopicObj);
            return;
          },
          err => {
            this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
          }
        );
  }
  InsertPriceListTopic(CostListFinYearCode, PriceListTypeCode, ParentPriceListPatternID) {
    let PriceListTopicQualifier = '';
    let PriceListTopicCode = '';
    if (!this.PriceListTopicName) {
      this.ShowMessageBoxWithOkBtn('نام فهرست بها را وارد نمایید');
      return;
    }
    if (!this.WorkUnitParams.selectedObject) {
      this.ShowMessageBoxWithOkBtn('واحد را وارد نمایید');
      return;
    }
    if (!this.Amount) {
      this.ShowMessageBoxWithOkBtn('مبلغ را وارد نمایید');
      return;
    }
    if (this.Mode === 'AddNewPopUpMode' || this.Mode === 'AddBatchTopicInEstimate') {
      PriceListTopicQualifier = PriceListTypeCode + '' + CostListFinYearCode;
      this.DisplayCode = this.ParentTopicCode + this.PriceListTopicCode + '@' + PriceListTopicQualifier;
      PriceListTopicCode = this.ParentTopicCode + this.PriceListTopicCode;
    }
    if (this.Mode === 'InsertMode') {
      PriceListTopicQualifier = '';
      this.DisplayCode = this.ParentTopicCode + this.PriceListTopicCode + '@';
      PriceListTopicCode = this.ParentTopicCode + '' + this.PriceListTopicCode;
    }

    const PriceListTopic = {
      PriceListTopicCode: PriceListTopicCode,
      PriceListTopicName: this.PriceListTopicName,
      PriceListLevelCode: 6,
      PriceListTopicQualifier: PriceListTopicQualifier,
    };
    this.selectedWorkUnitCode = this.WorkUnitParams.selectedObject;
    const PriceList = {
      Amount: /*this.Amount.replace(/,/g, '')*/0,
      IsStar: 1,
      IsWork: this.WorkParams.selectedObject,
      WorkUnitCode: this.selectedWorkUnitCode,
    };
    this.PriceList.SavePriceListTopic(ParentPriceListPatternID,
      this.DisplayCode,
      PriceListTopic,
      PriceList,
      this.ModuleCode).subscribe(
        res => {
          this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
          if (this.Mode === 'AddNewPopUpMode' || this.Mode === 'AddBatchTopicInEstimate') {
            this.PriceListTopicObj = {
              PriceListPatternID: res,
              PriceListTopicID: -1,
              Amount: /*PriceList.Amount*/ this.Amount.replace(/,/g, ''),
              IsStar:  /*PriceList.IsStar ? '*' : 'ف'*/ PriceList.IsStar ? '*' : '',
              IsWork: PriceList.IsWork ? 'کارکرد' : 'پایکار',
              StarCode: this.StarCodeParams.selectedObject,
              IsStarCodeNameEditable: true,
              IsAmountEditable: true,
              IsStarCode: 1,
              PriceListTopicCode: PriceListTopic.PriceListTopicCode,
              PriceListTopicName: PriceListTopic.PriceListTopicName,
              WorkUnitName: '',
              WorkUnitCode: this.selectedWorkUnitCode
            };
            const WUObj = this.WorkUnitItems.filter(x => x.WorkUnitCode === this.WorkUnitParams.selectedObject)[0];
            this.PriceListTopicObj.WorkUnitName = WUObj ? WUObj.WorkUnitName : '';
            this.IsChange.emit(this.PriceListTopicObj);
            this.close();
            return;
          }
          this.IsChange.emit(true);
        },
        err => {
          this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
        }
      );
  }
  InsertPriceListTopic_MC_2682(CostListFinYearCode, PriceListTypeCode, ParentPriceListPatternID) {

    this.PriceList.GetLastPriceNumberbyPriceListTopicCode(this.ParentTopicCode, this.InputParam.CostListFinYearCode).subscribe(res => {
      if (res) {
        this.PriceListTopicCode = res;
      } else {
        this.PriceListTopicCode = '0001';
      }
      if (this.PriceListTopicCode) {
        let PriceListTopicQualifier = '';
        let PriceListTopicCod = '';
        if (!this.PriceListTopicName) {
          this.ShowMessageBoxWithOkBtn('نام فهرست بها را وارد نمایید');
          return;
        }
        if (!this.WorkUnitParams.selectedObject) {
          this.ShowMessageBoxWithOkBtn('واحد را وارد نمایید');
          return;
        }
        if (!this.Amount && this.ModuleCode !== 2682) {
          this.ShowMessageBoxWithOkBtn('مبلغ را وارد نمایید');
          return;
        }
        if (this.Mode === 'AddNewPopUpMode' || this.Mode === 'AddBatchTopicInEstimate') {
          PriceListTopicQualifier = PriceListTypeCode + '' + CostListFinYearCode;
          this.DisplayCode = this.ParentTopicCode + this.PriceListTopicCode + '@' + PriceListTopicQualifier;
          PriceListTopicCod = this.ParentTopicCode + this.PriceListTopicCode;
        }

        if (this.Mode === 'InsertMode') {
          PriceListTopicQualifier = '';
          this.DisplayCode = this.ParentTopicCode + this.PriceListTopicCode + '@';
          PriceListTopicCod = this.ParentTopicCode + '' + this.PriceListTopicCode;
        }

        const PriceListTopic = {
          PriceListTopicCode: PriceListTopicCod,
          PriceListTopicName: this.PriceListTopicName,
          PriceListLevelCode: 6,
          PriceListTopicQualifier: PriceListTopicQualifier,
        };
        this.selectedWorkUnitCode = this.WorkUnitParams.selectedObject;
        const PriceList = {
          Amount: /*this.Amount.replace(/,/g, '')*/0,
          IsStar: 1,
          IsWork: this.WorkParams.selectedObject,
          WorkUnitCode: this.selectedWorkUnitCode,
        };
        this.PriceList.SavePriceListTopic(ParentPriceListPatternID,
          this.DisplayCode,
          PriceListTopic,
          PriceList,
          this.ModuleCode).subscribe(
            res => {
              if (res && res > 0) {
                this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
                if (this.Mode === 'AddNewPopUpMode' || this.Mode === 'AddBatchTopicInEstimate') {
                  this.PriceListTopicObj = {
                    PriceListPatternID: res,
                    PriceListTopicID: -1,
                    Amount: /*PriceList.Amount*/ this.Amount.replace(/,/g, ''),
                    IsStar:  /*PriceList.IsStar ? '*' : 'ف'*/ PriceList.IsStar ? '*' : '',
                    IsWork: PriceList.IsWork ? 'کارکرد' : 'پایکار',
                    StarCode: this.StarCodeParams.selectedObject,
                    IsStarCodeNameEditable: true,
                    IsAmountEditable: true,
                    IsStarCode: 1,
                    PriceListTopicCode: PriceListTopic.PriceListTopicCode,
                    PriceListTopicName: PriceListTopic.PriceListTopicName,
                    WorkUnitName: '',
                    WorkUnitCode: this.selectedWorkUnitCode,
                    // tslint:disable-next-line: max-line-length
                    ContractOrderItemID: this.InputParam.ContractEstimateRow && this.InputParam.ContractEstimateRow.ContractOrderItemID ? this.InputParam.ContractEstimateRow.ContractOrderItemID : -1,
                    // tslint:disable-next-line: max-line-length
                    ItemNo: this.InputParam.ContractEstimateRow && this.InputParam.ContractEstimateRow.ItemNo ? this.InputParam.ContractEstimateRow.ItemNo : this.InputParam.ItemNo ? this.InputParam.ItemNo : -1,
                    ContractTopicMapCode: this.ContractTopicMapCode
                  };
                  const WUObj = this.WorkUnitItems.filter(x => x.WorkUnitCode === this.WorkUnitParams.selectedObject)[0];
                  this.PriceListTopicObj.WorkUnitName = WUObj ? WUObj.WorkUnitName : '';
                  this.IsChange.emit(this.PriceListTopicObj);
                  this.close();
                  return;
                }
                this.IsChange.emit(true);
              } else {
                this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
              }
            },
            err => {
              this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
            }
          );
      }
    });
  }

  onChangeStarCode(event) {
    this.StarCodeParams.selectedObject = event;
  }
}
