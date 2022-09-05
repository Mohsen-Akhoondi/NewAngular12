import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserSettingsService } from '../Services/BaseService/UserSettingsService';
import { GridOptions } from 'ag-grid-community';
import { CartableServices } from '../Services/WorkFlowService/CartableServices';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { RefreshServices } from '../Services/BaseService/RefreshServices';
import { CommonServices } from '../Services/BaseService/CommonServices';
import { TemplateRendererComponent } from '../Shared/grid-component/template-renderer/template-renderer.component';
import { ActorService } from '../Services/BaseService/ActorService';
import { WorkflowService } from '../Services/WorkFlowService/WorkflowServices';
import { ReportService } from '../Services/ReportService/ReportService';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cartable',
  templateUrl: './cartable.component.html',
  styleUrls: ['./cartable.component.css']
})
export class CartableComponent implements OnInit {
  @ViewChild('IsReadyToConfirm') IsReadyToConfirm: TemplateRef<any>;
  @ViewChild('IsReturn') IsReturn: TemplateRef<any>;
  columnDef;
  FinishedcolumnDef;
  DeletedcolumnDef;
  InProgresscolumnDef;
  private defaultColDef;
  UserWorkListrowData: any;
  UserFinishedWorkListrowData: any;
  UserDeletedWorkListrowData: any;
  UserInProgressrowData: any;
  type;
  gridheader: string;
  NewUserSelected: boolean;
  isClicked = false;
  HaveHeader = true;
  selectedRow;
  IsFinishedWLRow = false;
  onReturnClicked = false;
  IsDeletedWLRow = false;
  Message;
  paramObj;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  startLeftPosition;
  startTopPosition;
  WorkFlowTransitionID;
  HaveMaxBtn = false;
  IsAdmin: boolean;
  ModuleViewTypeCode: string;
  IsDisableConfirm;
  IsDisableReturn;
  IsDisableFree;
  IsDown = true;
  GridOptionsRowStyle: GridOptions = {
    getRowStyle: function (params) {
      if (params.data.CurrentNodeID === 577) {
        return { 'background-color': '#ffffff' }; // تاييد کننده اوليه
      }
      if (params.data.CurrentNodeID === 578) {
        return { 'background-color': '#ffe600' }; // تکميل کننده اطلاعات
      }
      if (params.data.CurrentNodeID === 576) {
        return { 'background-color': '#ffb6b6' }; // ثبت کننده اطلاعات
      }
      if (params.data.CurrentNodeID === 579) {
        return { 'background-color': '#ffa200' }; // تاييد تغييرات و تاييد کننده نهايي
      }
      if (params.data.CurrentNodeID === 580) {
        return { 'background-color': '#00d0ff' }; // تاييد کننده نهايي
      }
      // if (params.data.ObjectStatusCode === 2) {
      //   if (params.data.WorkflowStatusCode === 1 || params.data.WorkflowStatusCode === 2) {
      //     return { 'background-color': '#ffffff', 'font-weight': 'bold' };
      //   } else {
      //     return { 'background-color': '#ffffff' };
      //   }
      // }
      // if (params.data.ObjectStatusCode === 3) {
      //   if (params.data.WorkflowStatusCode === 1 || params.data.WorkflowStatusCode === 2) {
      //     return { 'background-color': '#ffe600', 'font-weight': 'bold' };
      //   } else {
      //     return { 'background-color': '#ffe600' };
      //   }
      // }
      // if (params.data.ObjectStatusCode === 4 || params.data.ObjectStatusCode === 14 || params.data.ObjectStatusCode === 15) {
      //   if (params.data.WorkflowStatusCode === 1 || params.data.WorkflowStatusCode === 2) {
      //     return { 'background-color': '#ffb6b6', 'font-weight': 'bold' };
      //   } else {
      //     return { 'background-color': '#ffb6b6' };
      //   }
      // }
      // if (params.data.ObjectStatusCode === 6) {
      //   if (params.data.WorkflowStatusCode === 1 || params.data.WorkflowStatusCode === 2) {
      //     return { 'background-color': '#ffa200', 'font-weight': 'bold' };
      //   } else {
      //     return { 'background-color': '#ffa200' };
      //   }
      // }
      // if (params.data.ObjectStatusCode === 5) {
      //   if (params.data.WorkflowStatusCode === 1 || params.data.WorkflowStatusCode === 2) {
      //     return { 'background-color': '#00d0ff', 'font-weight': 'bold' };
      //   } else {
      //     return { 'background-color': '#00d0ff' };
      //   }
      // }
      // if (params.data.ObjectStatusCode === 7) {
      //   if (params.data.WorkflowStatusCode === 1 || params.data.WorkflowStatusCode === 2) {
      //     return { 'background-color': '#738000', 'font-weight': 'bold' };
      //   } else {
      //     return { 'background-color': '#738000' };
      //   }
      // }
      // if (params.data.ObjectStatusCode === 8) {
      //   if (params.data.WorkflowStatusCode === 1 || params.data.WorkflowStatusCode === 2) {
      //     return { 'background-color': '#ffc0cb', 'font-weight': 'bold' };
      //   } else {
      //     return { 'background-color': '#ffc0cb' };
      //   }
      // }
      if (params.data.WorkflowStatusCode === 1 || params.data.WorkflowStatusCode === 2) {
        return { 'font-weight': 'bold' };
      }
      if (params.data.ReadyToConfirm) {
        return { 'background-color': '#c9ffd3' };
      }
    }
  };
  InProgressGridOptionsRowStyle: GridOptions = {
    getRowStyle: function (params) {
      switch (params.data.WorkflowOperationCode) {
        case 1:
          return { 'background-color': '#45fc03' };
        case 2:
          return { 'background-color': '#f77605' };
        case 3:
          return { 'background-color': '#fc1303' };
        case 4:
          return { 'background-color': '#e7f705' };
        default:
          break;
      }
    }
  };
  HeightPercentWithMaxBtn: number;
  PercentWidth: number;
  MinHeightPixel: number;
  MainMaxwidthPixel: number;
  IsFinishCartableClick = false;
  IsCurrentCartableClick = true;
  MinWidthPixel: number;
  InProgressCartableClick: any;
  IsDeletedCartableClick: any;
  UserRegionCode;
  MainMinwidthPixel;
  OverMainMinwidthPixel;

  WorkflowObjectItems = [];
  WorkflowObjectParams = {
    bindLabelProp: 'WorkflowObjectName',
    bindValueProp: 'WorkflowObjectCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
  };

  FinishedWorkflowObjectItems;
  FinishedWorkflowObjectParams = {
    bindLabelProp: 'WorkflowObjectName',
    bindValueProp: 'WorkflowObjectCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
  };

  DeletedWorkflowObjectItems;
  DeletedWorkflowObjectParams = {
    bindLabelProp: 'WorkflowObjectName',
    bindValueProp: 'WorkflowObjectCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
  };

  InProgWorkflowObjectItems;
  InProgressWorkflowObjectParams = {
    bindLabelProp: 'WorkflowObjectName',
    bindValueProp: 'WorkflowObjectCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
  };
  ISIRVersion = false;
  btnclicked = false;
  PopupType = '';
  NewUserMenuSelected: boolean; // 64114

  constructor(private router: Router,
    private ContractList: ContractListService,
    private Cartable: CartableServices,
    private UserSettings: UserSettingsService,
    private CrtableRefreshService: RefreshServices,
    private CommonService: CommonServices,
    private Actor: ActorService,
    private Workflow: WorkflowService,
    private Report: ReportService,
  ) {
    this.NewUserSelected = false;
    this.NewUserMenuSelected = false;
  }
  ngOnInit() {
    this.ISIRVersion = environment.IsExternal; // RFC 56670
    this.OnOpenNgSelect('Current', true);
    this.UserSettings.ChangeCartableUserPermission().subscribe(res => {
      this.IsAdmin = res.HaveAdminPermission;
      this.NewUserSelected = res.HaveSelectedUserSession;
      this.NewUserMenuSelected = res.HaveSelectedUserMenuSession;
      if (res.HaveSelectedUserSession && res.CurrentUser) {
        this.gridheader = res.CurrentUser.ActorFullName + ': ';
        for (let i = 0; i < res.CurrentUser.UsersRolesList.length; i++) {
          if (i < (res.CurrentUser.UsersRolesList.length - 1)) {
            const temp = res.CurrentUser.UsersRolesList[i].RoleName + '  ,  ';
            this.gridheader += temp;
          } else {
            this.gridheader += res.CurrentUser.UsersRolesList[i].RoleName;
          }
        }
      }
    });

    this.CrtableRefreshService.WorkListChange.subscribe(IsChange => {
      if (this.IsCurrentCartableClick) {
        this.OnOpenNgSelect('Current', true);
      }
    });

    this.Cartable.GetApplicationNote().subscribe(res => {
      if (res && res.length > 0) {
        this.type = 'application-note';
        this.isClicked = true;
        this.HaveMaxBtn = true;
        this.HaveHeader = true;
        this.MinWidthPixel = 845;
        this.HeightPercentWithMaxBtn = 85;
        this.startLeftPosition = 240;
        this.startTopPosition = 60;
        this.PercentWidth = 90;
        this.paramObj = {
          res: res,
          HeaderName: 'اطلاعیه سیستم جامع معاملات',
        };
      }
    });
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    this.columnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: 'تایید',
        width: 45,
        autoHeight: true,
        resizable: true,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsReadyToConfirm
        }
      },
      {
        headerName: '',
        width: 35,
        autoHeight: true,
        resizable: true,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsReturn
        },
        // tooltip: (params) => {
        //   if (params.WorkflowOperationCode === 2 || params.WorkflowOperationCode === 4) {
        //     return 'برگشتی';
        //   }
        // }
      },
      {
        headerName: 'ماهیت',
        field: 'IsIncomeStr',
        width: 120,
        resizable: true
      },
      {
        headerName: 'نوع درخواست ',
        field: 'WorkflowTypeName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'ارسال کننده',
        field: 'FullReferenceUserName',
        width: 240,
        resizable: true
      },
      {
        headerName: 'عملیات جاری',
        field: 'CurrentNodeName',
        width: 240,
        resizable: true
      },
      {
        headerName: 'موضوع ',
        field: 'ObjectSubject',
        width: 160,
        resizable: true
      },
      {
        headerName: 'کد ',
        field: 'ObjectCode',
        width: 80,
        resizable: true
      },
      {
        headerName: 'پیمانکار',
        field: 'ObjectActorName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'مبلغ',
        field: 'Amount',
        width: 150,
        resizable: true,
        HaveThousand: true,
      },
      {
        headerName: 'تاریخ ارسال',
        field: 'WorkFlowPersianDate',
        width: 120,
        resizable: true
      },
      {
        headerName: 'شماره ',
        field: 'ObjectNo',
        width: 120,
        resizable: true
      },
      {
        headerName: 'تاریخ درخواست',
        field: 'ObjectPersianDate',
        width: 120,
        resizable: true
      },
      {
        headerName: 'نوع شی گردش کار ',
        field: 'ObjectTypeName',
        width: 120,
        resizable: true
      }

    ];
    this.FinishedcolumnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: 'ماهیت',
        field: 'IsIncomeStr',
        width: 120,
        resizable: true
      },
      {
        headerName: 'نوع درخواست ',
        field: 'WorkflowTypeName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'ارسال کننده',
        field: 'ReferenceUserName',
        width: 140,
        resizable: true
      },
      {
        headerName: 'موضوع ',
        field: 'ObjectSubject',
        width: 160,
        resizable: true
      },
      {
        headerName: 'کد ',
        field: 'ObjectCode',
        width: 80,
        resizable: true
      },
      {
        headerName: 'پیمانکار',
        field: 'ObjectActorName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'مبلغ',
        field: 'Amount',
        width: 150,
        resizable: true,
        HaveThousand: true,
      },
      {
        headerName: 'تاریخ خاتمه',
        field: 'WorkFlowPersianDate',
        width: 120,
        resizable: true
      },
      {
        headerName: 'شماره ',
        field: 'ObjectNo',
        width: 120,
        resizable: true
      },
      {
        headerName: ' تاریخ درخواست ',
        field: 'ObjectPersianDate',
        width: 120,
        resizable: true
      },
    ];
    this.DeletedcolumnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: 'ماهیت',
        field: 'IsIncomeStr',
        width: 120,
        resizable: true
      },
      {
        headerName: 'نوع درخواست ',
        field: 'WorkflowTypeName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'ارسال کننده',
        field: 'ReferenceUserName',
        width: 140,
        resizable: true
      },
      {
        headerName: 'موضوع ',
        field: 'ObjectSubject',
        width: 160,
        resizable: true
      },
      {
        headerName: 'کد ',
        field: 'ObjectCode',
        width: 80,
        resizable: true
      },
      {
        headerName: 'پیمانکار',
        field: 'ObjectActorName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'مبلغ',
        field: 'Amount',
        width: 150,
        resizable: true,
        HaveThousand: true,
      },
      {
        headerName: 'تاریخ خاتمه',
        field: 'WorkFlowPersianDate',
        width: 120,
        resizable: true
      },
      {
        headerName: 'شماره ',
        field: 'ObjectNo',
        width: 120,
        resizable: true
      },
      {
        headerName: ' تاریخ درخواست ',
        field: 'ObjectPersianDate',
        width: 120,
        resizable: true
      },
    ];
    this.InProgresscolumnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: 'ماهیت',
        field: 'IsIncomeStr',
        width: 120,
        resizable: true
      },
      {
        headerName: 'نوع درخواست ',
        field: 'WorkflowTypeName',
        width: 130,
        resizable: true
      },
      {
        headerName: 'عملیات جاری',
        field: 'CurrentNodeName',
        width: 240,
        resizable: true
      },
      {
        headerName: 'موضوع ',
        field: 'ObjectSubject',
        width: 430,
        resizable: true
      },
      {
        headerName: 'کد ',
        field: 'ObjectCode',
        width: 80,
        resizable: true
      },
      {
        headerName: 'پیمانکار',
        field: 'ObjectActorName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'مبلغ',
        field: 'Amount',
        width: 150,
        resizable: true,
        HaveThousand: true,
      },
      {
        headerName: 'شماره ',
        field: 'ObjectNo',
        width: 110,
        resizable: true
      },
      {
        headerName: 'تاریخ اقدام',
        field: 'WorkFlowPersianDate',
        width: 120,
        resizable: true
      },
      {
        headerName: 'تاریخ درخواست ',
        field: 'ObjectPersianDate',
        width: 120,
        resizable: true
      },
    ];
    if (!this.ISIRVersion) {
      this.Cartable.checkQuestionLink().subscribe(res => {
        if (res) {
          this.ShowMessageBoxWithYesNoBtn('پرسشنامه ای برای سامانه معاملات موجود است. آیا مایل به پاسخگویی هستید؟');
        }
      });
    }
  }

  getRowData(CurrentWFItems = null) {
    let SelectedWorkflowObjectList = [];
    if (!CurrentWFItems) {
      this.WorkflowObjectParams.selectedObject.forEach(element => {
        SelectedWorkflowObjectList.push(element);
      });
    }
    // tslint:disable-next-line: quotemark
    this.UserSettings.GetUserWorkList(CurrentWFItems ? CurrentWFItems : SelectedWorkflowObjectList).subscribe(res => {
      res.forEach(element => {
        element.FullReferenceUserName = element.ReferenceRoleName ? element.ReferenceRoleName + ' - ' + element.ReferenceUserName : '';
      });
      if (CurrentWFItems) {
        SelectedWorkflowObjectList = [];
        const CurrentItems = [];
        const WFObjectList = this.CommonService.GroupBy(res, 'WorkflowObjectCode');
        this.WorkflowObjectItems.forEach(element => {
          const AItem = WFObjectList.find(z => Number(z.key) === element.WorkflowObjectCode);
          if (AItem && AItem.List.length > 0) {
            element.CartableCount = AItem.List.length;
            element.WorkflowObjectName = element.WorkflowObjectName + ' - تعداد ' + element.CartableCount;
            CurrentItems.push(element);
            SelectedWorkflowObjectList.push(element.WorkflowObjectCode);
          }
        });
        this.WorkflowObjectItems = CurrentItems;
        this.WorkflowObjectParams.selectedObject = SelectedWorkflowObjectList;
      }
      this.UserWorkListrowData = res;
      this.IsDown = true;
    });
  }


  onConfirmClick(InputValue) {
    if (this.selectedRow == null) {
      this.showMessageBox(' ردیفی جهت  ارسال انتخاب نشده است');
    } else if (this.IsFinishedWLRow) {
      this.showMessageBox('امکان ارسال گردش های خاتمه یافته وجود ندارد');
    } else {
      this.Cartable.GetUserWorkFlow(this.selectedRow.data.WorkflowID, 1)
        .subscribe(
          res => {
            if (res != null && res.length > 0) {
              if (this.selectedRow.data.IsEnd === 1) {
                this.WorkFlowTransitionID = res[0].WorkFlowTransitionID;
                // tslint:disable-next-line:max-line-length
                this.showMessageBox('باتوجه به اینکه نقش شما در این گردش آخرین فعالیت می باشدارسال شما به عنوان پایان کار در نظر گرفته می شود');
              } else {
                res.forEach(element => {
                  element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
                });
                this.type = 'work-flow-send';
                this.HaveMaxBtn = false;
                this.startLeftPosition = 250;
                this.startTopPosition = 70;
                this.PercentWidth = null;
                this.OverMainMinwidthPixel = null;
                this.MainMaxwidthPixel = null;
                this.HeightPercentWithMaxBtn = null;
                this.MinHeightPixel = null;
                this.paramObj = {
                  Message: 'ارسال',
                  OperationCode: 1,
                  rows: res,
                  CurrWorkFlow: this.selectedRow.data,
                  WorkFlowID: this.selectedRow.data.WorkflowID,
                  IsEnd: this.selectedRow.data.IsEnd,
                  ModuleViewTypeCode: Number(this.selectedRow.data.ModuleViewTypeCode),
                  ObjectNo: this.selectedRow.data.ObjectNo,
                  WorkflowTypeName: this.selectedRow.data.WorkflowTypeName,
                  WorkflowTypeCode: this.selectedRow.data.WorkflowTypeCode,
                  WorkflowObjectCode: this.selectedRow.data.WorkflowObjectCode,
                  ObjectID: this.selectedRow.data.ObjectID,
                  MinimumPosting: this.selectedRow.data.MinimumPosting,
                  RegionCode: this.selectedRow.data.RegionCode,
                  RegionName: this.selectedRow.data.RegionName,
                  UserRegionCode: this.UserRegionCode,
                  CartableUserID: this.selectedRow.data.CartableUserID,
                  // x: code
                };
                this.isClicked = true;
                this.selectedRow = null;
              }
            } else {
              this.showMessageBox('شخصی جهت ارسال کار توسط موتور گردش کار یافت نشد لطفا با راهبر سیستم تماس حاصل فرمایید');
            }
          },
          err => {
            const str = err.error.split('|');
            if (str[1]) {
              this.showMessageBox(str[1]);
            } else {
              this.showMessageBox('خطای پیش بینی نشده');
            }
          }
        );
    }
  }

  popupclosed() {
    this.OverMainMinwidthPixel = null;
    this.PercentWidth = null;
    this.MainMinwidthPixel = null;
    this.isClicked = false;
    this.HaveMaxBtn = false;
  }

  onReturnClick(InputValue) {
    if (this.selectedRow == null) {
      this.showMessageBox(' ردیفی جهت بازگشت انتخاب نشده است');
    } else {
      this.onReturnClicked = true;
      if (this.IsFinishedWLRow) {
        this.Cartable.GetUserWorkFlow(this.selectedRow.data.WorkflowID, 2)
          .subscribe(
            res => {
              this.WorkFlowTransitionID = res[0].WorkFlowTransitionID;
              // tslint:disable-next-line:max-line-length
              this.showMessageBox('باتوجه به اینکه ردیف انتخاب شده جهت بازگشت در کارتابل خاتمه یافته می باشد این کار به کارتابل جاری شما منتقل خواهد شد');
            },
            err => {
              const str = err.error.split('|');
              if (str[1]) {
                this.showMessageBox(str[1]);
              } else {
                this.showMessageBox('خطای پیش بینی نشده');
              }
            });
      } else {
        this.Cartable.GetUserWorkFlow(this.selectedRow.data.WorkflowID, 2)
          .subscribe(
            res => {
              if (res != null && res.length > 0) {
                res.forEach(element => {
                  element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
                });
                this.type = 'work-flow-send';
                this.HaveMaxBtn = false;
                this.startLeftPosition = 250;
                this.startTopPosition = 70;
                this.PercentWidth = null;
                this.OverMainMinwidthPixel = null;
                this.MainMaxwidthPixel = null;
                this.HeightPercentWithMaxBtn = null;
                this.MinHeightPixel = null;
                this.paramObj = {
                  Message: 'بازگشت',
                  OperationCode: 2,
                  rows: res,
                  CurrWorkFlow: this.selectedRow.data,
                  WorkFlowID: this.selectedRow.data.WorkflowID,
                  IsEnd: this.selectedRow.data.IsEnd,
                  ObjectNo: this.selectedRow.data.ObjectNo,
                  WorkflowTypeName: this.selectedRow.data.WorkflowTypeName,
                  WorkflowTypeCode: this.selectedRow.data.WorkflowTypeCode,
                  WorkflowObjectCode: this.selectedRow.data.WorkflowObjectCode,
                  ObjectID: this.selectedRow.data.ObjectID,
                  MinimumPosting: this.selectedRow.data.MinimumPosting,
                  RegionCode: this.selectedRow.data.RegionCode,
                  RegionName: this.selectedRow.data.RegionName,
                  CartableUserID: this.selectedRow.data.CartableUserID,
                };
                this.isClicked = true;
                this.selectedRow = null;
              } else {
                this.showMessageBox('شخصی جهت بازگشت کار توسط موتور گردش کار یافت نشد لطفا با راهبر سیستم تماس حاصل فرمایید');
              }
            },
            err => {
              const str = err.error.split('|');
              if (str[1]) {
                this.showMessageBox(str[1]);
              } else {
                this.showMessageBox(err.error);
              }
            }
          );
      }
    }
  }

  onRejectClick(InputValue) {
    if (this.selectedRow == null) {
      this.showMessageBox(' ردیفی جهت  پایان کار انتخاب نشده است');
    } else {
      this.Cartable.GetUserWorkFlow(this.selectedRow.data.WorkflowID, 3)
        .subscribe(
          res => {
            this.Cartable.UserRejectWorkFlow(this.selectedRow.data, this.selectedRow.data.WorkflowID, res[0].WorkFlowTransitionID, res[0].DesUserID, '', this.selectedRow.data.CartableUserID)
              // tslint:disable-next-line:no-shadowed-variable
              .subscribe(res => {
                this.showMessageBox('پایان کار با موفقیت به انجام رسید');
              },
                err => {
                  const str = err.error.split('|');
                  if (str[1]) {
                    this.showMessageBox(str[1]);
                  } else {
                    this.showMessageBox('خطای پیش بینی نشده');
                  }
                }
              );
          },
          err => {
            const str = err.error.split('|');
            if (str[1]) {
              this.showMessageBox(str[1]);
            } else {
              this.showMessageBox('خطای پیش بینی نشده');
            }
          },
        );
    }
  }

  RowClick(InputValue) {
    this.selectedRow = InputValue;
    this.IsFinishedWLRow = false;
    if (this.selectedRow.data.WorkflowStatusCode !== 3) {
      this.IsDisableReturn = true;
    } else {
      this.IsDisableReturn = false;
    }
  }

  InProgressRowClick(InputValue) {
    this.selectedRow = InputValue;
  }

  FinishedWorkListRowClick(InputValue) {
    this.selectedRow = InputValue;
    this.IsFinishedWLRow = true;
  }

  DeletedWorkListRowClick(InputValue) {
    this.selectedRow = InputValue;
    this.IsDeletedWLRow = true;
  }

  onRowDoubleClicked(Value) {
    this.HeightPercentWithMaxBtn = 95;
    this.MinHeightPixel = 645;
    this.UserSettings.GetUserRegionCodeByWorkflowTransitionID(Value.data.WorkflowID).subscribe(res => {
      this.UserRegionCode = res;
      this.onDoubleClicked(Value);
    });
  }
  onDoubleClicked(Value) {
    this.HaveHeader = true;
    let ModuleViewTypeCode = Value.data.ModuleViewTypeCode;
    let HeaderName = Value.data.ModuleViewTypeName;
    if (Value.data.ModuleViewTypeCode.includes('|')) {
      const Types = Value.data.ModuleViewTypeCode.split('|');
      const equals = Types.every(function (value, index, array) {
        return value === array[0];
      });

      if (!equals) {
        this.showMessageBox('نوع نمایش فعالیت برای نمونه انتخابی مشخص نشده است.لطفا با راهبر سیستم هماهنگ نمایید.');
        return;
      } else {
        ModuleViewTypeCode = Types[0];
        HeaderName = Value.data.ModuleViewTypeName.split('|')[0];
      }
    }

    this.Cartable.UserUpdateWorkFlowStatus(Value.data.JoinWorkflowLogID.split('|'), Value.data.CartableUserID).
      subscribe(res => {
        if (Value.data.WorkflowObjectCode === 1) {
          if (Value.data.WorkflowStatusCode === 1 || !Value.data.RelatedWorkflowLogID) {
            this.type = (Value.data.ContractTypeCode === 26 ||
              Value.data.ContractTypeCode === 29) ?
              'contract_person_estimate' :
              (Value.data.ContractTypeCode === 27 ||
                Value.data.ContractTypeCode === 28) ?
                'view-no-estimate' : 'Cartable_contract_estimate';
            this.isClicked = true;
            this.HaveMaxBtn = true;
            this.startLeftPosition = this.type === 'Cartable_contract_estimate' ? 1 : 59;
            this.startTopPosition = this.type === 'Cartable_contract_estimate' ? 15 : 20;
            this.MainMinwidthPixel = this.type === 'Cartable_contract_estimate' ? 1360 : '';
            this.paramObj = {
              CurrWorkFlow: Value.data,
              ReferenceUserName: Value.data.ReferenceUserName,
              RoleName: Value.data.RoleName,
              ReferenceRoleName: Value.data.ReferenceRoleName,
              IsWFShow: true,
              Note: Value.data.Note,
              WorkFlowID: Value.data.WorkflowID,
              ReadyToConfirm: Value.data.ReadyToConfirm,
              ModuleCode: 2645,
              ModuleViewTypeCode: Number(ModuleViewTypeCode),
              RegionCode: Value.data.RegionCode,
              RegionName: Value.data.RegionName,
              UserRegionCode: this.UserRegionCode,
              CartableUserID: Value.data.CartableUserID,
              selectedRow: {
                data:
                {
                  ContractOrderId: Value.data.ObjectID,
                  IsEnd: Value.data.IsEnd,
                  WorkflowTypeName: Value.data.WorkflowTypeName,
                  WorkflowTypeCode: Value.data.WorkflowTypeCode,
                  WorkflowObjectCode: Value.data.WorkflowObjectCode,
                  ObjectNo: Value.data.ObjectNo,
                  ObjectID: Value.data.ObjectID,
                  RegionCode: Value.data.RegionCode,
                  RegionName: Value.data.RegionName,
                  CartableUserID: Value.data.CartableUserID,
                }
              }
            };
          } else {
            this.IsDown = false;
            const WorkLogIDs = Value.data.JoinWorkflowLogID.split('|');
            this.paramObj = { rows: <any>[], IsWFShow: true };
            this.Cartable.GetFinWorkFlowByWorkLogDetailID(WorkLogIDs).subscribe((res: any[]) => {
              this.IsDown = true;
              if (res.length > 0) {
                res.forEach(element => {
                  element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
                });
                this.paramObj = {
                  rows: res,
                  IsWFShow: true,
                  ModuleCode: 2645,
                  CurrWorkFlow: Value.data,
                  IsEnd: Value.data.IsEnd,
                  ReadyToConfirm: Value.data.ReadyToConfirm,
                  ModuleViewTypeCode: Number(ModuleViewTypeCode),
                  UserRegionCode: this.UserRegionCode,
                  CartableUserID: Value.data.CartableUserID,
                  selectedRow: {
                    data:
                    {
                      WorkflowTypeName: Value.data.WorkflowTypeName,
                      WorkflowTypeCode: Value.data.WorkflowTypeCode,
                      WorkflowObjectCode: Value.data.WorkflowObjectCode,
                      ObjectNo: Value.data.ObjectNo,
                      ObjectID: Value.data.ObjectID,
                      ContractOrderId: Value.data.ObjectID,
                      RegionCode: Value.data.RegionCode,
                      RegionName: Value.data.RegionName,
                      CartableUserID: Value.data.CartableUserID,
                    }
                  }
                };
                this.type = 'work-flow-send';
                this.isClicked = true;
                this.HaveMaxBtn = false;
                this.startLeftPosition = 250;
                this.startTopPosition = 70;
                this.OverMainMinwidthPixel = null;
              } else {
                this.showMessageBox('رکوردی برای نمایش وجود ندارد.');
                return;
              }
            });
          }
        }
        if (Value.data.WorkflowObjectCode === 2) { // صورت وضعیت

          if (Value.data.WorkflowStatusCode === 1 || !Value.data.RelatedWorkflowLogID) {

            // if (Value.data.ContractTypeCode === 26 || Value.data.ContractTypeCode === 29) {
            //   this.type = 'contract-pay-details' // 'contract-pay-item-hour';
            // }

            // if (Value.data.ContractTypeCode === 27 || Value.data.ContractTypeCode === 28) {
            //   this.type = 'contract-pay-details';
            // }

            // if (!Value.data.PriceListPatternID) {
            //   this.type = 'contract-pay-details';
            // }

            // if (Value.data.PriceListPatternID &&
            //   Value.data.ContractTypeCode !== 26 &&
            //   Value.data.ContractTypeCode !== 29) {
            //   // this.type = 'contract-pay-item-estimate-page';
            //   this.type = 'contract-pay-details';
            // }

            // this.HaveMaxBtn = true;
            // this.HeightPercentWithMaxBtn = 97;
            // this.startLeftPosition = 59;
            // this.startTopPosition = 20;


            // case when co.is_on_contract = 0 then 2                                                              
            //      when co.is_on_contract = 1 then 9
            //      else 10 end    object_type_code


            if (Value.data.ObjectTypeCode === 2) {
              this.type = 'contract-pay-details';
              this.HaveMaxBtn = true;
              this.HeightPercentWithMaxBtn = 97;
              this.startLeftPosition = 59;
              this.startTopPosition = 20;
            }

            if (Value.data.ObjectTypeCode === 9) { // پیش پرداخت و علی الحساب
              this.startLeftPosition = 300;
              this.startTopPosition = 100;
              this.HaveMaxBtn = true;
              this.HeightPercentWithMaxBtn = 52;
              this.MainMinwidthPixel = 780;
              this.type = 'pre-pay';
            }

            this.paramObj = {
              CurrWorkFlow: Value.data,
              ReferenceUserName: Value.data.ReferenceUserName,
              RoleName: Value.data.RoleName,
              ReferenceRoleName: Value.data.ReferenceRoleName,
              Note: Value.data.Note,
              WorkFlowID: Value.data.WorkflowID,
              ReadyToConfirm: Value.data.ReadyToConfirm,
              IsEnd: Value.data.IsEnd,
              WorkflowTypeName: Value.data.WorkflowTypeName,
              WorkflowTypeCode: Value.data.WorkflowTypeCode,
              WorkflowObjectCode: Value.data.WorkflowObjectCode,
              ObjectNo: Value.data.ObjectNo,
              ObjectID: Value.data.ObjectID,
              Mode: 'EditMode',
              IsViewable: false,
              SelectedCPCostFactorID: Value.data.CostFactorID,
              SelectedContractPayID: Value.data.ObjectID,
              RegionCode: Value.data.RegionCode,
              SelectedContractID: Value.data.ContractID,
              ModuleViewTypeCode: Number(ModuleViewTypeCode),
              PriceListPatternID: Value.data.PriceListPatternID,
              ContractTypeCode: Value.data.ContractTypeCode,
              ContractCode: Value.data.ObjectCode,
              Subject: Value.data.ObjectSubject,
              LetterDatePersian: Value.data.ObjectPersianDate,
              ContractorName: Value.data.ObjectActorName,
              LetterNo: Value.data.ObjectNo,
              RegionName: Value.data.RegionName,
              UserRegionCode: this.UserRegionCode,
              MinimumPosting: Value.data.MinimumPosting,
              CartableUserID: Value.data.CartableUserID,
              ShowReportsSign: false,
            };
            this.isClicked = true;
          } else {
            this.IsDown = false;
            const WorkLogIDs = Value.data.JoinWorkflowLogID.split('|');
            this.paramObj = { rows: <any>[], IsWFShow: true };
            this.Cartable.GetFinWorkFlowByWorkLogDetailID(WorkLogIDs).subscribe((res: any[]) => {
              this.IsDown = true;
              if (res.length > 0) {
                res.forEach(element => {
                  element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
                });
                this.paramObj = {
                  rows: res,
                  IsWFShow: true,
                  CurrWorkFlow: Value.data,
                  IsEnd: Value.data.IsEnd,
                  ReadyToConfirm: Value.data.ReadyToConfirm,
                  ModuleViewTypeCode: Number(ModuleViewTypeCode),
                  UserRegionCode: this.UserRegionCode,
                  ReferenceUserName: Value.data.ReferenceUserName,
                  RoleName: Value.data.RoleName,
                  ReferenceRoleName: Value.data.ReferenceRoleName,
                  Note: Value.data.Note,
                  WorkFlowID: Value.data.WorkflowID,
                  WorkflowTypeName: Value.data.WorkflowTypeName,
                  WorkflowTypeCode: Value.data.WorkflowTypeCode,
                  WorkflowObjectCode: Value.data.WorkflowObjectCode,
                  ObjectNo: Value.data.ObjectNo,
                  ObjectID: Value.data.ObjectID,
                  Mode: 'EditMode',
                  IsViewable: false,
                  SelectedCPCostFactorID: Value.data.CostFactorID,
                  RegionCode: Value.data.RegionCode,
                  SelectedContractID: Value.data.ContractID,
                  PriceListPatternID: Value.data.PriceListPatternID,
                  ContractTypeCode: Value.data.ContractTypeCode,
                  RegionName: Value.data.RegionName,
                  MinimumPosting: Value.data.MinimumPosting,
                  CartableUserID: Value.data.CartableUserID,
                  selectedRow: {
                    data:
                    {
                      WorkflowTypeName: Value.data.WorkflowTypeName,
                      WorkflowTypeCode: Value.data.WorkflowTypeCode,
                      WorkflowObjectCode: Value.data.WorkflowObjectCode,
                      ObjectNo: Value.data.ObjectNo,
                      ObjectID: Value.data.ObjectID,
                      ContractOrderId: Value.data.ObjectID,
                      RegionCode: Value.data.RegionCode,
                      RegionName: Value.data.RegionName,
                      CartableUserID: Value.data.CartableUserID,
                    }
                  }
                };
                this.type = 'work-flow-send';
                this.isClicked = true;
                this.HaveMaxBtn = false;
                this.startLeftPosition = 250;
                this.startTopPosition = 70;
              } else {
                this.showMessageBox('رکوردی برای نمایش وجود ندارد.');
                return;
              }
            });
          }
        }
        if (Value.data.WorkflowObjectCode === 3 || Value.data.WorkflowObjectCode === 5 || Value.data.WorkflowObjectCode === 7 || Value.data.WorkflowObjectCode === 31) {
          if (Value.data.WorkflowStatusCode === 1 || !Value.data.RelatedWorkflowLogID) {
            this.type = 'product-request-page';
            this.HaveMaxBtn = true;
            this.startLeftPosition = 10;
            this.startTopPosition = 0;
            this.HeightPercentWithMaxBtn = 97;
            this.MinHeightPixel = 645;
            this.paramObj = {
              CurrWorkFlow: Value.data,
              ReferenceUserName: Value.data.ReferenceUserName,
              RoleName: Value.data.RoleName,
              ReferenceRoleName: Value.data.ReferenceRoleName,
              Note: Value.data.Note,
              WorkFlowID: Value.data.WorkflowID,
              ReadyToConfirm: Value.data.ReadyToConfirm,
              IsEnd: Value.data.IsEnd,
              WorkflowTypeName: Value.data.WorkflowTypeName,
              WorkflowTypeCode: Value.data.WorkflowTypeCode,
              WorkflowObjectCode: Value.data.WorkflowObjectCode,
              ObjectNo: Value.data.ObjectNo,
              ObjectID: Value.data.ObjectID,
              ModuleViewTypeCode: Number(ModuleViewTypeCode),
              Mode: 'EditMode',
              IsViewable: false,
              CostFactorID: Value.data.ObjectID,
              SelectedRow: null,
              ContractTypeCode: -1,
              ISProvisionRemain: Value.data.WorkflowObjectCode === 5,
              ISArticle48: Value.data.WorkflowObjectCode === 7,
              ISTavafoghNameh: Value.data.WorkflowObjectCode === 31,
              RegionCode: Value.data.RegionCode,
              RegionName: Value.data.RegionName,
              MinimumPosting: Value.data.MinimumPosting,
              HeaderName: HeaderName,
              UserRegionCode: this.UserRegionCode,
              CartableUserID: Value.data.CartableUserID,
            };
            this.isClicked = true;
          } else {

            this.IsDown = false;
            const WorkLogIDs = Value.data.JoinWorkflowLogID.split('|');
            this.paramObj = { rows: <any>[], IsWFShow: true };
            this.Cartable.GetFinWorkFlowByWorkLogDetailID(WorkLogIDs).subscribe((res: any[]) => {
              this.IsDown = true;
              if (res.length > 0) {
                res.forEach(element => {
                  element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
                });
                this.paramObj = {
                  rows: res,
                  IsWFShow: true,
                  // ModuleCode: 2645,
                  CurrWorkFlow: Value.data,
                  IsEnd: Value.data.IsEnd,
                  ReadyToConfirm: Value.data.ReadyToConfirm,
                  ModuleViewTypeCode: Number(ModuleViewTypeCode),
                  UserRegionCode: this.UserRegionCode,
                  ReferenceUserName: Value.data.ReferenceUserName,
                  RoleName: Value.data.RoleName,
                  ReferenceRoleName: Value.data.ReferenceRoleName,
                  Note: Value.data.Note,
                  WorkFlowID: Value.data.WorkflowID,
                  WorkflowTypeName: Value.data.WorkflowTypeName,
                  WorkflowTypeCode: Value.data.WorkflowTypeCode,
                  WorkflowObjectCode: Value.data.WorkflowObjectCode,
                  ObjectNo: Value.data.ObjectNo,
                  ObjectID: Value.data.ObjectID,
                  Mode: 'EditMode',
                  IsViewable: false,
                  SelectedCPCostFactorID: Value.data.CostFactorID,
                  RegionCode: Value.data.RegionCode,
                  SelectedContractID: Value.data.ContractID,
                  PriceListPatternID: Value.data.PriceListPatternID,
                  // ContractTypeCode: Value.data.ContractTypeCode,
                  RegionName: Value.data.RegionName,
                  CostFactorID: Value.data.ObjectID,
                  SelectedRow: null,
                  ContractTypeCode: -1,
                  ISProvisionRemain: Value.data.WorkflowObjectCode === 5,
                  ISArticle48: Value.data.WorkflowObjectCode === 7,
                  ISTavafoghNameh: Value.data.WorkflowObjectCode === 31,
                  MinimumPosting: Value.data.MinimumPosting,
                  HeaderName: HeaderName,
                  CartableUserID: Value.data.CartableUserID,
                  selectedRow: {
                    data:
                    {
                      WorkflowTypeName: Value.data.WorkflowTypeName,
                      WorkflowTypeCode: Value.data.WorkflowTypeCode,
                      WorkflowObjectCode: Value.data.WorkflowObjectCode,
                      ObjectNo: Value.data.ObjectNo,
                      ObjectID: Value.data.ObjectID,
                      ContractOrderId: Value.data.ObjectID,
                      RegionCode: Value.data.RegionCode,
                      RegionName: Value.data.RegionName,
                      CartableUserID: Value.data.CartableUserID,
                    }
                  }
                };
                this.type = 'work-flow-send';
                this.isClicked = true;
                this.HaveMaxBtn = false;
                this.startLeftPosition = 250;
                this.startTopPosition = 70;
              } else {
                this.showMessageBox('رکوردی برای نمایش وجود ندارد.');
                return;
              }
            });
          }
        }
        // tslint:disable-next-line: max-line-length
        if (Value.data.WorkflowObjectCode === 4 || Value.data.WorkflowObjectCode === 6 ||
          Value.data.WorkflowObjectCode === 9 || Value.data.WorkflowObjectCode === 13) {
          if (Value.data.WorkflowStatusCode === 1 || !Value.data.RelatedWorkflowLogID) {
            this.type = 'product-request-page-without-flow';
            this.HaveMaxBtn = true;
            this.startLeftPosition = 108;
            this.startTopPosition = 5;
            this.HeightPercentWithMaxBtn = 97;
            this.MinHeightPixel = 645;
            this.paramObj = {
              CurrWorkFlow: Value.data,
              ReferenceUserName: Value.data.ReferenceUserName,
              RoleName: Value.data.RoleName,
              ReferenceRoleName: Value.data.ReferenceRoleName,
              Note: Value.data.Note,
              WorkFlowID: Value.data.WorkflowID,
              ReadyToConfirm: Value.data.ReadyToConfirm,
              IsEnd: Value.data.IsEnd,
              WorkflowTypeName: Value.data.WorkflowTypeName,
              WorkflowTypeCode: Value.data.WorkflowTypeCode,
              WorkflowObjectCode: Value.data.WorkflowObjectCode,
              ObjectNo: Value.data.ObjectNo,
              ObjectID: Value.data.ObjectID,
              ModuleViewTypeCode: Number(ModuleViewTypeCode),
              Mode: 'EditMode',
              IsViewable: false,
              CostFactorID: Value.data.ObjectID,
              SelectedRow: null,
              ContractTypeCode: -1,
              ISProvisionRemain: Value.data.WorkflowObjectCode === 4,
              ISEstateRequest: Value.data.WorkflowObjectCode === 6,
              ISTahator: Value.data.WorkflowObjectCode === 13,
              RegionCode: Value.data.RegionCode,
              RegionName: Value.data.RegionName,
              MinimumPosting: Value.data.MinimumPosting,
              HeaderName: HeaderName,
              UserRegionCode: this.UserRegionCode,
              CartableUserID: Value.data.CartableUserID,
            };
            this.isClicked = true;
          } else {
            this.IsDown = false;
            const WorkLogIDs = Value.data.JoinWorkflowLogID.split('|');
            this.paramObj = { rows: <any>[], IsWFShow: true };
            this.Cartable.GetFinWorkFlowByWorkLogDetailID(WorkLogIDs).subscribe((res: any[]) => {
              this.IsDown = true;
              if (res.length > 0) {
                res.forEach(element => {
                  element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
                });
                this.paramObj = {
                  rows: res,
                  IsWFShow: true,
                  CurrWorkFlow: Value.data,
                  IsEnd: Value.data.IsEnd,
                  ReadyToConfirm: Value.data.ReadyToConfirm,
                  ModuleViewTypeCode: Number(ModuleViewTypeCode),
                  UserRegionCode: this.UserRegionCode,
                  ReferenceUserName: Value.data.ReferenceUserName,
                  RoleName: Value.data.RoleName,
                  ReferenceRoleName: Value.data.ReferenceRoleName,
                  Note: Value.data.Note,
                  WorkFlowID: Value.data.WorkflowID,
                  WorkflowTypeName: Value.data.WorkflowTypeName,
                  WorkflowTypeCode: Value.data.WorkflowTypeCode,
                  WorkflowObjectCode: Value.data.WorkflowObjectCode,
                  ObjectNo: Value.data.ObjectNo,
                  ObjectID: Value.data.ObjectID,
                  Mode: 'EditMode',
                  IsViewable: false,
                  SelectedCPCostFactorID: Value.data.CostFactorID,
                  RegionCode: Value.data.RegionCode,
                  SelectedContractID: Value.data.ContractID,
                  PriceListPatternID: Value.data.PriceListPatternID,
                  // ContractTypeCode: Value.data.ContractTypeCode,
                  RegionName: Value.data.RegionName,
                  CostFactorID: Value.data.ObjectID,
                  SelectedRow: null,
                  ContractTypeCode: -1,
                  MinimumPosting: Value.data.MinimumPosting,
                  HeaderName: HeaderName,
                  ISProvisionRemain: Value.data.WorkflowObjectCode === 4,
                  ISEstateRequest: Value.data.WorkflowObjectCode === 6,
                  ISTahator: Value.data.WorkflowObjectCode === 13,
                  CartableUserID: Value.data.CartableUserID,
                  selectedRow: {
                    data:
                    {
                      WorkflowTypeName: Value.data.WorkflowTypeName,
                      WorkflowTypeCode: Value.data.WorkflowTypeCode,
                      WorkflowObjectCode: Value.data.WorkflowObjectCode,
                      ObjectNo: Value.data.ObjectNo,
                      ObjectID: Value.data.ObjectID,
                      ContractOrderId: Value.data.ObjectID,
                      RegionCode: Value.data.RegionCode,
                      RegionName: Value.data.RegionName,
                      CartableUserID: Value.data.CartableUserID,
                    }
                  }
                };
                this.type = 'work-flow-send';
                this.isClicked = true;
                this.HaveMaxBtn = false;
                this.startLeftPosition = 250;
                this.startTopPosition = 70;
              } else {
                this.showMessageBox('رکوردی برای نمایش وجود ندارد.');
                return;
              }
            });
          }
        }
        if (Value.data.WorkflowObjectCode === 8) {
          if (Value.data.WorkflowStatusCode === 1 || !Value.data.RelatedWorkflowLogID) {
            this.type = 'ground-delivery-minutes';
            this.HaveMaxBtn = true;
            this.startLeftPosition = 30;
            this.startTopPosition = 5;
            this.HeightPercentWithMaxBtn = 97;
            this.MinHeightPixel = 645;
            this.PercentWidth = 90;
            this.MainMaxwidthPixel = 1400;
            this.MainMinwidthPixel = 100;
            this.paramObj = {
              CurrWorkFlow: Value.data,
              ReferenceUserName: Value.data.ReferenceUserName,
              RoleName: Value.data.RoleName,
              ReferenceRoleName: Value.data.ReferenceRoleName,
              Note: Value.data.Note,
              WorkFlowID: Value.data.WorkflowID,
              ReadyToConfirm: Value.data.ReadyToConfirm,
              IsEnd: Value.data.IsEnd,
              WorkflowTypeName: Value.data.WorkflowTypeName,
              WorkflowTypeCode: Value.data.WorkflowTypeCode,
              WorkflowObjectCode: Value.data.WorkflowObjectCode,
              ObjectNo: Value.data.ObjectNo,
              ContractMinutesID: Value.data.ObjectID,
              Mode: 'EditMode',
              IsViewable: false,
              SelectedCPCostFactorID: Value.data.CostFactorID,
              RegionCode: Value.data.RegionCode,
              SelectedContractID: Value.data.ContractID,
              ModuleViewTypeCode: Number(ModuleViewTypeCode),
              PriceListPatternID: Value.data.PriceListPatternID,
              ContractTypeCode: Value.data.ContractTypeCode,
              RegionName: Value.data.RegionName,
              UserRegionCode: this.UserRegionCode,
              CartableUserID: Value.data.CartableUserID,
            };
            this.isClicked = true;

          } else {
            this.IsDown = false;
            const WorkLogIDs = Value.data.JoinWorkflowLogID.split('|');
            this.paramObj = { rows: <any>[], IsWFShow: true };
            this.Cartable.GetFinWorkFlowByWorkLogDetailID(WorkLogIDs).subscribe((res: any[]) => {
              this.IsDown = true;
              if (res.length > 0) {
                res.forEach(element => {
                  element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
                });
                this.paramObj = {
                  rows: res,
                  IsWFShow: true,
                  CurrWorkFlow: Value.data,
                  IsEnd: Value.data.IsEnd,
                  ReadyToConfirm: Value.data.ReadyToConfirm,
                  ModuleViewTypeCode: Number(ModuleViewTypeCode),
                  UserRegionCode: this.UserRegionCode,
                  ReferenceUserName: Value.data.ReferenceUserName,
                  RoleName: Value.data.RoleName,
                  ReferenceRoleName: Value.data.ReferenceRoleName,
                  Note: Value.data.Note,
                  WorkFlowID: Value.data.WorkflowID,
                  WorkflowTypeName: Value.data.WorkflowTypeName,
                  WorkflowTypeCode: Value.data.WorkflowTypeCode,
                  WorkflowObjectCode: Value.data.WorkflowObjectCode,
                  ObjectNo: Value.data.ObjectNo,
                  ObjectID: Value.data.ObjectID,
                  Mode: 'EditMode',
                  IsViewable: false,
                  SelectedCPCostFactorID: Value.data.CostFactorID,
                  RegionCode: Value.data.RegionCode,
                  SelectedContractID: Value.data.ContractID,
                  PriceListPatternID: Value.data.PriceListPatternID,
                  // ContractTypeCode: Value.data.ContractTypeCode,
                  RegionName: Value.data.RegionName,
                  CostFactorID: Value.data.ObjectID,
                  SelectedRow: null,
                  // ContractTypeCode: -1,
                  MinimumPosting: Value.data.MinimumPosting,
                  HeaderName: HeaderName,
                  ContractMinutesID: Value.data.ObjectID,
                  ContractTypeCode: Value.data.ContractTypeCode,
                  CartableUserID: Value.data.CartableUserID,
                  selectedRow: {
                    data:
                    {
                      WorkflowTypeName: Value.data.WorkflowTypeName,
                      WorkflowTypeCode: Value.data.WorkflowTypeCode,
                      WorkflowObjectCode: Value.data.WorkflowObjectCode,
                      ObjectNo: Value.data.ObjectNo,
                      ObjectID: Value.data.ObjectID,
                      ContractOrderId: Value.data.ObjectID,
                      RegionCode: Value.data.RegionCode,
                      RegionName: Value.data.RegionName,
                      CartableUserID: Value.data.CartableUserID,
                    }
                  }
                };
                this.type = 'work-flow-send';
                this.isClicked = true;
                this.HaveMaxBtn = false;
                this.startLeftPosition = 250;
                this.startTopPosition = 70;
              } else {
                this.showMessageBox('رکوردی برای نمایش وجود ندارد.');
                return;
              }
            });
          }
        }
        if (Value.data.WorkflowObjectCode === 10) {
          if (Value.data.WorkflowStatusCode === 1 || !Value.data.RelatedWorkflowLogID) {
            this.type = 'pure-product-request-page';
            this.HaveMaxBtn = true;
            this.startLeftPosition = 110;
            this.startTopPosition = 5;
            this.HeightPercentWithMaxBtn = 97;
            this.MinHeightPixel = 645;
            this.paramObj = {
              CurrWorkFlow: Value.data,
              ReferenceUserName: Value.data.ReferenceUserName,
              RoleName: Value.data.RoleName,
              ReferenceRoleName: Value.data.ReferenceRoleName,
              Note: Value.data.Note,
              WorkFlowID: Value.data.WorkflowID,
              ReadyToConfirm: Value.data.ReadyToConfirm,
              IsEnd: Value.data.IsEnd,
              WorkflowTypeName: Value.data.WorkflowTypeName,
              WorkflowTypeCode: Value.data.WorkflowTypeCode,
              WorkflowObjectCode: Value.data.WorkflowObjectCode,
              ObjectNo: Value.data.ObjectNo,
              ObjectID: Value.data.ObjectID,
              ModuleViewTypeCode: Number(ModuleViewTypeCode),
              Mode: 'EditMode',
              IsViewable: false,
              CostFactorID: Value.data.ObjectID,
              SelectedRow: null,
              ContractTypeCode: -1,
              //ISProvisionRemain: Value.data.WorkflowObjectCode === 5,
              //ISArticle48: Value.data.WorkflowObjectCode === 7,
              RegionCode: Value.data.RegionCode,
              RegionName: Value.data.RegionName,
              MinimumPosting: Value.data.MinimumPosting,
              HeaderName: HeaderName,
              UserRegionCode: this.UserRegionCode,
              CartableUserID: Value.data.CartableUserID,
            };
            this.isClicked = true;
          } else {
            this.IsDown = false;
            const WorkLogIDs = Value.data.JoinWorkflowLogID.split('|');
            this.paramObj = { rows: <any>[], IsWFShow: true };
            this.Cartable.GetFinWorkFlowByWorkLogDetailID(WorkLogIDs).subscribe((res: any[]) => {
              this.IsDown = true;
              if (res.length > 0) {
                res.forEach(element => {
                  element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
                });
                this.paramObj = {
                  rows: res,
                  IsWFShow: true,
                  // ModuleCode: 2645,
                  CurrWorkFlow: Value.data,
                  IsEnd: Value.data.IsEnd,
                  ReadyToConfirm: Value.data.ReadyToConfirm,
                  ModuleViewTypeCode: Number(ModuleViewTypeCode),
                  UserRegionCode: this.UserRegionCode,
                  ReferenceUserName: Value.data.ReferenceUserName,
                  RoleName: Value.data.RoleName,
                  ReferenceRoleName: Value.data.ReferenceRoleName,
                  Note: Value.data.Note,
                  WorkFlowID: Value.data.WorkflowID,
                  WorkflowTypeName: Value.data.WorkflowTypeName,
                  WorkflowTypeCode: Value.data.WorkflowTypeCode,
                  WorkflowObjectCode: Value.data.WorkflowObjectCode,
                  ObjectNo: Value.data.ObjectNo,
                  ObjectID: Value.data.ObjectID,
                  Mode: 'EditMode',
                  IsViewable: false,
                  SelectedCPCostFactorID: Value.data.CostFactorID,
                  RegionCode: Value.data.RegionCode,
                  SelectedContractID: Value.data.ContractID,
                  PriceListPatternID: Value.data.PriceListPatternID,
                  // ContractTypeCode: Value.data.ContractTypeCode,
                  RegionName: Value.data.RegionName,
                  CostFactorID: Value.data.ObjectID,
                  SelectedRow: null,
                  ContractTypeCode: -1,
                  // ISProvisionRemain: Value.data.WorkflowObjectCode === 5,
                  // ISArticle48: Value.data.WorkflowObjectCode === 7,
                  MinimumPosting: Value.data.MinimumPosting,
                  HeaderName: HeaderName,
                  CartableUserID: Value.data.CartableUserID,
                  selectedRow: {
                    data:
                    {
                      WorkflowTypeName: Value.data.WorkflowTypeName,
                      WorkflowTypeCode: Value.data.WorkflowTypeCode,
                      WorkflowObjectCode: Value.data.WorkflowObjectCode,
                      ObjectNo: Value.data.ObjectNo,
                      ObjectID: Value.data.ObjectID,
                      ContractOrderId: Value.data.ObjectID,
                      RegionCode: Value.data.RegionCode,
                      RegionName: Value.data.RegionName,
                      CartableUserID: Value.data.CartableUserID,
                    }
                  }
                };
                this.type = 'work-flow-send';
                this.isClicked = true;
                this.HaveMaxBtn = false;
                this.startLeftPosition = 250;
                this.startTopPosition = 70;
              } else {
                this.showMessageBox('رکوردی برای نمایش وجود ندارد.');
                return;
              }
            });
          }
        }
        if (Value.data.WorkflowObjectCode === 11) {
          if (Value.data.ObjectTypeCode === 5) {
            this.type = 'corporate2';
            this.HaveMaxBtn = true;
            this.startLeftPosition = 20;
            this.startTopPosition = 5;
            this.HeightPercentWithMaxBtn = 97;
            this.MinHeightPixel = 645;
            this.PercentWidth = 97;
            this.OverMainMinwidthPixel = 1400;
            this.MainMinwidthPixel = 100;
            this.paramObj = {
              CurrWorkFlow: Value.data,
              ReferenceUserName: Value.data.ReferenceUserName,
              RoleName: Value.data.RoleName,
              ReferenceRoleName: Value.data.ReferenceRoleName,
              Note: Value.data.Note,
              WorkFlowID: Value.data.WorkflowID,
              ReadyToConfirm: Value.data.ReadyToConfirm,
              IsEnd: Value.data.IsEnd,
              WorkflowTypeName: Value.data.WorkflowTypeName,
              WorkflowTypeCode: Value.data.WorkflowTypeCode,
              WorkflowObjectCode: Value.data.WorkflowObjectCode,
              ObjectNo: Value.data.ObjectNo,
              ObjectID: Value.data.ObjectID,
              Mode: 'EditMode',
              IsViewable: false,
              ModuleViewTypeCode: Number(ModuleViewTypeCode),
              CorporateID: Value.data.ObjectID,
              SelectedRow: null,
              ContractTypeCode: -1,
              RegionCode: Value.data.RegionCode,
              RegionName: Value.data.RegionName,
              MinimumPosting: Value.data.MinimumPosting,
              HeaderName: HeaderName,
              ShowSendBtn: 'YES',
              CartableUserID: Value.data.CartableUserID,
            };
            this.isClicked = true;
          } else if (Value.data.ObjectTypeCode === 6) {
            this.type = 'person2';
            this.HaveMaxBtn = true;
            this.startLeftPosition = 15;
            this.PercentWidth = 97;
            this.startTopPosition = 5;
            this.HeightPercentWithMaxBtn = 97;
            this.MinHeightPixel = 645;
            this.paramObj = {
              CurrWorkFlow: Value.data,
              ReferenceUserName: Value.data.ReferenceUserName,
              RoleName: Value.data.RoleName,
              ReferenceRoleName: Value.data.ReferenceRoleName,
              Note: Value.data.Note,
              WorkFlowID: Value.data.WorkflowID,
              ReadyToConfirm: Value.data.ReadyToConfirm,
              IsEnd: Value.data.IsEnd,
              WorkflowTypeName: Value.data.WorkflowTypeName,
              WorkflowTypeCode: Value.data.WorkflowTypeCode,
              WorkflowObjectCode: Value.data.WorkflowObjectCode,
              ObjectNo: Value.data.ObjectNo,
              ObjectID: Value.data.ObjectID,
              Mode: 'EditMode',
              IsViewable: false,
              ModuleViewTypeCode: Number(ModuleViewTypeCode),
              CorporateID: Value.data.ObjectID,
              SelectedRow: null,
              ContractTypeCode: -1,
              RegionCode: Value.data.RegionCode,
              RegionName: Value.data.RegionName,
              MinimumPosting: Value.data.MinimumPosting,
              HeaderName: HeaderName,
              ShowSendBtn: 'YES',
              CartableUserID: Value.data.CartableUserID,
              ActorId: Value.data.ObjectID,
            };
            this.isClicked = true;
          }
        }
        if (Value.data.WorkflowObjectCode === 15) { // سایر اسناد مناقصه

          if (Value.data.WorkflowStatusCode === 1 || !Value.data.RelatedWorkflowLogID) {

            this.type = 'other-contract-documents';

            this.HaveMaxBtn = true;

            this.startLeftPosition = 90;

            this.startTopPosition = 50;

            this.HeightPercentWithMaxBtn = 60;

            this.MinHeightPixel = 350;

            this.PercentWidth = 90;

            this.MainMaxwidthPixel = 1400;

            this.MainMinwidthPixel = 100;

            this.paramObj = {

              CurrWorkFlow: Value.data,

              ReferenceUserName: Value.data.ReferenceUserName,

              RoleName: Value.data.RoleName,

              ReferenceRoleName: Value.data.ReferenceRoleName,

              Note: Value.data.Note,

              WorkFlowID: Value.data.WorkflowID,

              ReadyToConfirm: Value.data.ReadyToConfirm,

              IsEnd: Value.data.IsEnd,

              WorkflowTypeName: Value.data.WorkflowTypeName,

              WorkflowTypeCode: Value.data.WorkflowTypeCode,

              WorkflowObjectCode: Value.data.WorkflowObjectCode,

              ObjectNo: Value.data.ObjectNo,

              ContractMinutesID: Value.data.ObjectID,

              Mode: 'EditMode',

              IsViewable: false,

              SelectedCPCostFactorID: Value.data.CostFactorID,

              RegionCode: Value.data.RegionCode,

              SelectedContractID: Value.data.ContractID,

              ModuleViewTypeCode: Number(ModuleViewTypeCode),

              PriceListPatternID: Value.data.PriceListPatternID,

              ContractTypeCode: Value.data.ContractTypeCode,

              RegionName: Value.data.RegionName,

              UserRegionCode: this.UserRegionCode,

              CartableUserID: Value.data.CartableUserID,

            };

            this.isClicked = true;



          } else {

            this.IsDown = false;

            const WorkLogIDs = Value.data.JoinWorkflowLogID.split('|');

            this.paramObj = { rows: <any>[], IsWFShow: true };

            this.Cartable.GetFinWorkFlowByWorkLogDetailID(WorkLogIDs).subscribe((res: any[]) => {

              this.IsDown = true;

              if (res.length > 0) {

                res.forEach(element => {

                  element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);

                });

                this.paramObj = {

                  rows: res,

                  IsWFShow: true,

                  CurrWorkFlow: Value.data,

                  IsEnd: Value.data.IsEnd,

                  ReadyToConfirm: Value.data.ReadyToConfirm,

                  ModuleViewTypeCode: Number(ModuleViewTypeCode),

                  UserRegionCode: this.UserRegionCode,

                  ReferenceUserName: Value.data.ReferenceUserName,

                  RoleName: Value.data.RoleName,

                  ReferenceRoleName: Value.data.ReferenceRoleName,

                  Note: Value.data.Note,

                  WorkFlowID: Value.data.WorkflowID,

                  WorkflowTypeName: Value.data.WorkflowTypeName,

                  WorkflowTypeCode: Value.data.WorkflowTypeCode,

                  WorkflowObjectCode: Value.data.WorkflowObjectCode,

                  ObjectNo: Value.data.ObjectNo,

                  ObjectID: Value.data.ObjectID,

                  Mode: 'EditMode',

                  IsViewable: false,

                  SelectedCPCostFactorID: Value.data.CostFactorID,

                  RegionCode: Value.data.RegionCode,

                  SelectedContractID: Value.data.ContractID,

                  PriceListPatternID: Value.data.PriceListPatternID,

                  // ContractTypeCode: Value.data.ContractTypeCode,

                  RegionName: Value.data.RegionName,

                  CostFactorID: Value.data.ObjectID,

                  SelectedRow: null,

                  // ContractTypeCode: -1,

                  MinimumPosting: Value.data.MinimumPosting,

                  HeaderName: HeaderName,

                  ContractMinutesID: Value.data.ObjectID,

                  ContractTypeCode: Value.data.ContractTypeCode,

                  CartableUserID: Value.data.CartableUserID,

                  selectedRow: {

                    data:

                    {

                      WorkflowTypeName: Value.data.WorkflowTypeName,

                      WorkflowTypeCode: Value.data.WorkflowTypeCode,

                      WorkflowObjectCode: Value.data.WorkflowObjectCode,

                      ObjectNo: Value.data.ObjectNo,

                      ObjectID: Value.data.ObjectID,

                      ContractOrderId: Value.data.ObjectID,

                      RegionCode: Value.data.RegionCode,

                      RegionName: Value.data.RegionName,

                      CartableUserID: Value.data.CartableUserID,

                    }

                  }

                };

                this.type = 'work-flow-send';

                this.isClicked = true;

                this.HaveMaxBtn = false;

                this.startLeftPosition = 250;

                this.startTopPosition = 70;

              } else {

                this.showMessageBox('رکوردی برای نمایش وجود ندارد.');

                return;

              }

            });

          }

        }
        if (Value.data.WorkflowObjectCode === 16) {
          if (Value.data.WorkflowStatusCode === 1 || !Value.data.RelatedWorkflowLogID) {
            this.type = 'fee-page';
            this.HaveMaxBtn = true;
            this.startLeftPosition = 30;
            this.startTopPosition = 5;
            this.HeightPercentWithMaxBtn = 97;
            this.MinHeightPixel = 645;
            this.PercentWidth = 90;
            this.MainMaxwidthPixel = 1400;
            this.MainMinwidthPixel = 100;
            this.paramObj = {
              CurrWorkFlow: Value.data,
              ModuleViewTypeCode: Number(ModuleViewTypeCode),
              UserRegionCode: this.UserRegionCode,
            };
            this.isClicked = true;

          } else {
            this.IsDown = false;
            const WorkLogIDs = Value.data.JoinWorkflowLogID.split('|');
            this.paramObj = { rows: <any>[], IsWFShow: true };
            this.Cartable.GetFinWorkFlowByWorkLogDetailID(WorkLogIDs).subscribe((res: any[]) => {
              this.IsDown = true;
              if (res.length > 0) {
                res.forEach(element => {
                  element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
                });
                this.paramObj = {
                  rows: res,
                  IsWFShow: true,
                  CurrWorkFlow: Value.data,
                  ModuleViewTypeCode: Number(ModuleViewTypeCode),
                  UserRegionCode: this.UserRegionCode,
                  HeaderName: HeaderName,
                };
                this.type = 'work-flow-send';
                this.isClicked = true;
                this.HaveMaxBtn = false;
                this.startLeftPosition = 250;
                this.startTopPosition = 70;
              } else {
                this.showMessageBox('رکوردی برای نمایش وجود ندارد.');
                return;
              }
            });
          }
        } // EndFee
        if (Value.data.WorkflowObjectCode === 17) {
          if (Value.data.WorkflowStatusCode === 1 || !Value.data.RelatedWorkflowLogID) {
            this.type = 'single-sale-invoice';
            this.HaveMaxBtn = true;
            this.startLeftPosition = 10;
            this.startTopPosition = 0;
            this.HeightPercentWithMaxBtn = 97;
            this.MinHeightPixel = 645;
            this.paramObj = {
              CurrWorkFlow: Value.data,
              ModuleViewTypeCode: Number(ModuleViewTypeCode),
              Mode: 'EditMode',
              HeaderName: HeaderName,
              UserRegionCode: this.UserRegionCode,
            };
            this.isClicked = true;
          } else {
            this.IsDown = false;
            const WorkLogIDs = Value.data.JoinWorkflowLogID.split('|');
            this.paramObj = { rows: <any>[], IsWFShow: true };
            this.Cartable.GetFinWorkFlowByWorkLogDetailID(WorkLogIDs).subscribe((res: any[]) => {
              this.IsDown = true;
              if (res.length > 0) {
                res.forEach(element => {
                  element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
                });
                this.paramObj = {
                  rows: res,
                  IsWFShow: true,
                  CurrWorkFlow: Value.data,
                  ModuleViewTypeCode: Number(ModuleViewTypeCode),
                  UserRegionCode: this.UserRegionCode,
                  Mode: 'EditMode',
                  HeaderName: HeaderName,
                };
                this.type = 'work-flow-send';
                this.isClicked = true;
                this.HaveMaxBtn = false;
                this.startLeftPosition = 250;
                this.startTopPosition = 70;
              } else {
                this.showMessageBox('رکوردی برای نمایش وجود ندارد.');
                return;
              }
            });
          }
        }
        if (Value.data.WorkflowObjectCode === 25) {
          if (Value.data.WorkflowStatusCode === 1 || !Value.data.RelatedWorkflowLogID) {
            this.type = 'customer-order';
            this.HaveMaxBtn = true;
            this.startLeftPosition = 100;
            this.startTopPosition = 10;
            this.HeightPercentWithMaxBtn = 97;
            this.MinHeightPixel = 645;
            this.MainMinwidthPixel = 1100;
            this.paramObj = {
              CurrWorkFlow: Value.data,
              CustomerOrderID: Value.data.ObjectID,
              ModuleViewTypeCode: Number(ModuleViewTypeCode),
              Mode: 'EditMode',
              HeaderName: HeaderName,
              UserRegionCode: this.UserRegionCode,
            };
            this.isClicked = true;
          } else {
            this.IsDown = false;
            const WorkLogIDs = Value.data.JoinWorkflowLogID.split('|');
            this.paramObj = { rows: <any>[], IsWFShow: true };
            this.Cartable.GetFinWorkFlowByWorkLogDetailID(WorkLogIDs).subscribe((res: any[]) => {
              this.IsDown = true;
              if (res.length > 0) {
                res.forEach(element => {
                  element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
                });
                this.paramObj = {
                  rows: res,
                  IsWFShow: true,
                  CurrWorkFlow: Value.data,
                  CustomerOrderID: Value.data.ObjectID,
                  ModuleViewTypeCode: Number(ModuleViewTypeCode),
                  UserRegionCode: this.UserRegionCode,
                  Mode: 'EditMode',
                  HeaderName: HeaderName,
                  MinimumPosting: Value.data.MinimumPosting,
                };
                this.type = 'work-flow-send';
                this.isClicked = true;
                this.HaveMaxBtn = false;
                this.startLeftPosition = 250;
                this.startTopPosition = 70;
              } else {
                this.showMessageBox('رکوردی برای نمایش وجود ندارد.');
                return;
              }
            });
          }
        }
        if (Value.data.WorkflowObjectCode === 27) {
          if (Value.data.WorkflowStatusCode === 1 || !Value.data.RelatedWorkflowLogID) {
            this.type = 'customer-product-request-page';
            this.HaveMaxBtn = true;
            this.startLeftPosition = 50;
            this.startTopPosition = 10;
            this.HaveMaxBtn = true;
            this.HeightPercentWithMaxBtn = 97
            this.PercentWidth = 90;
            this.MainMinwidthPixel = 1215;
            this.MinHeightPixel = 645;
            this.paramObj = {
              CurrWorkFlow: Value.data,
              CustomerOrderID: Value.data.ObjectID,
              ModuleViewTypeCode: Number(ModuleViewTypeCode),
              Mode: 'EditMode',
              HeaderName: HeaderName,
              UserRegionCode: this.UserRegionCode,
            };
            this.isClicked = true;
          } else {
            this.IsDown = false;
            const WorkLogIDs = Value.data.JoinWorkflowLogID.split('|');
            this.paramObj = { rows: <any>[], IsWFShow: true };
            this.Cartable.GetFinWorkFlowByWorkLogDetailID(WorkLogIDs).subscribe((res: any[]) => {
              this.IsDown = true;
              if (res.length > 0) {
                res.forEach(element => {
                  element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
                });
                this.paramObj = {
                  rows: res,
                  IsWFShow: true,
                  CurrWorkFlow: Value.data,
                  CustomerOrderID: Value.data.ObjectID,
                  ModuleViewTypeCode: Number(ModuleViewTypeCode),
                  UserRegionCode: this.UserRegionCode,
                  Mode: 'EditMode',
                  HeaderName: HeaderName,
                  MinimumPosting: Value.data.MinimumPosting,
                };
                this.type = 'work-flow-send';
                this.isClicked = true;
                this.HaveMaxBtn = false;
                this.startLeftPosition = 250;
                this.startTopPosition = 70;
              } else {
                this.showMessageBox('رکوردی برای نمایش وجود ندارد.');
                return;
              }
            });
          }
        }
        if (Value.data.WorkflowObjectCode === 26) {
          if (Value.data.WorkflowStatusCode === 1 || !Value.data.RelatedWorkflowLogID) {
            this.type = 'app-asset';
            this.HaveMaxBtn = true;
            this.startLeftPosition = 100;
            this.startTopPosition = 10;
            this.HeightPercentWithMaxBtn = 97;
            this.MinHeightPixel = 645;
            this.MainMinwidthPixel = 1100;
            this.paramObj = {
              CurrWorkFlow: Value.data,
              AssetID: Value.data.ObjectID,
              ModuleViewTypeCode: Number(ModuleViewTypeCode),
              Mode: 'EditMode',
              HeaderName: HeaderName,
              UserRegionCode: this.UserRegionCode,
              selectedRow: {
                WorkflowTypeName: Value.data.WorkflowTypeName,
                WorkflowTypeCode: Value.data.WorkflowTypeCode,
                WorkflowObjectCode: Value.data.WorkflowObjectCode,
                ObjectNo: Value.data.ObjectNo,
                AssetID: Value.data.ObjectID,
                RegionCode: Value.data.RegionCode,
                RegionName: Value.data.RegionName,
                CartableUserID: Value.data.CartableUserID,
                ProductID: Value.data.ContractID


              }
            };
            this.isClicked = true;
          } else {
            this.IsDown = false;
            const WorkLogIDs = Value.data.JoinWorkflowLogID.split('|');
            this.paramObj = { rows: <any>[], IsWFShow: true };
            this.Cartable.GetFinWorkFlowByWorkLogDetailID(WorkLogIDs).subscribe((res: any[]) => {
              this.IsDown = true;
              if (res.length > 0) {
                res.forEach(element => {
                  element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
                });
                this.paramObj = {
                  rows: res,
                  IsWFShow: true,
                  CurrWorkFlow: Value.data,
                  AssetID: Value.data.ObjectID,
                  ModuleViewTypeCode: Number(ModuleViewTypeCode),
                  UserRegionCode: this.UserRegionCode,
                  Mode: 'EditMode',
                  HeaderName: HeaderName,
                  MinimumPosting: Value.data.MinimumPosting,
                  selectedRow: {
                    WorkflowTypeName: Value.data.WorkflowTypeName,
                    WorkflowTypeCode: Value.data.WorkflowTypeCode,
                    WorkflowObjectCode: Value.data.WorkflowObjectCode,
                    ObjectNo: Value.data.ObjectNo,
                    AssetID: Value.data.ObjectID,
                    ContractOrderId: Value.data.ObjectID,
                    RegionCode: Value.data.RegionCode,
                    RegionName: Value.data.RegionName,
                    CartableUserID: Value.data.CartableUserID,
                    ProductID: Value.data.ContractID

                  }
                };
                this.type = 'work-flow-send';
                this.isClicked = true;
                this.HaveMaxBtn = false;
                this.startLeftPosition = 250;
                this.startTopPosition = 70;
              } else {
                this.showMessageBox('رکوردی برای نمایش وجود ندارد.');
                return;
              }
            });
          }
        }
        if (Value.data.WorkflowObjectCode === 28) {
          if (Value.data.WorkflowStatusCode === 1 || !Value.data.RelatedWorkflowLogID) {
            this.type = 'contract-supervision';
            this.HaveMaxBtn = true;
            this.startLeftPosition = 50;
            this.startTopPosition = 10;
            this.HaveMaxBtn = true;
            this.HeightPercentWithMaxBtn = 97
            this.PercentWidth = 90;
            this.MainMinwidthPixel = 1215;
            this.MinHeightPixel = 645;
            this.paramObj = {
              CurrWorkFlow: Value.data,
              SelectedCnrtSupervisionID: Value.data.ObjectID,
              ModuleViewTypeCode: Number(ModuleViewTypeCode),
              Mode: 'EditMode',
              HeaderName: HeaderName,
              UserRegionCode: this.UserRegionCode,
            };
            this.isClicked = true;
          } else {
            this.IsDown = false;
            const WorkLogIDs = Value.data.JoinWorkflowLogID.split('|');
            this.paramObj = { rows: <any>[], IsWFShow: true };
            this.Cartable.GetFinWorkFlowByWorkLogDetailID(WorkLogIDs).subscribe((res: any[]) => {
              this.IsDown = true;
              if (res.length > 0) {
                res.forEach(element => {
                  element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
                });
                this.paramObj = {
                  rows: res,
                  IsWFShow: true,
                  CurrWorkFlow: Value.data,
                  SelectedCnrtSupervisionID: Value.data.ObjectID,
                  ModuleViewTypeCode: Number(ModuleViewTypeCode),
                  UserRegionCode: this.UserRegionCode,
                  Mode: 'EditMode',
                  HeaderName: HeaderName,
                  MinimumPosting: Value.data.MinimumPosting,
                };
                this.type = 'work-flow-send';
                this.isClicked = true;
                this.HaveMaxBtn = false;
                this.startLeftPosition = 250;
                this.startTopPosition = 70;
              } else {
                this.showMessageBox('رکوردی برای نمایش وجود ندارد.');
                return;
              }
            });
          }
        }
        if (Value.data.WorkflowObjectCode === 29) {
          if (Value.data.WorkflowStatusCode === 1 || !Value.data.RelatedWorkflowLogID) {
            this.type = 'contract';
            this.HaveMaxBtn = true;
            this.startLeftPosition = 60;
            this.startTopPosition = 5;
            this.HeightPercentWithMaxBtn = 97;
            this.MainMinwidthPixel = 1215;
            this.MinHeightPixel = 645;
            this.paramObj = {
              CurrWorkFlow: Value.data,
              ReferenceUserName: Value.data.ReferenceUserName,
              RoleName: Value.data.RoleName,
              ReferenceRoleName: Value.data.ReferenceRoleName,
              Note: Value.data.Note,
              ContractReceiveFactorID: Value.data.ObjectID,
              WorkFlowID: Value.data.WorkflowID,
              ReadyToConfirm: Value.data.ReadyToConfirm,
              IsEnd: Value.data.IsEnd,
              WorkflowTypeName: Value.data.WorkflowTypeName,
              WorkflowTypeCode: Value.data.WorkflowTypeCode,
              WorkflowObjectCode: Value.data.WorkflowObjectCode,
              ObjectNo: Value.data.ObjectNo,
              ObjectID: Value.data.ObjectID,
              ModuleCode: Value.data.ModuleCode,
              ModuleViewTypeCode: Number(ModuleViewTypeCode),
              Mode: 'EditMode',
              IsViewable: false,
              CostFactorID: Value.data.ObjectID,
              SelectedRow: null,
              ContractTypeCode: -1,
              ISProvisionRemain: Value.data.WorkflowObjectCode === 4,
              ISEstateRequest: Value.data.WorkflowObjectCode === 6,
              ISTahator: Value.data.WorkflowObjectCode === 13,
              RegionCode: Value.data.RegionCode,
              RegionName: Value.data.RegionName,
              MinimumPosting: Value.data.MinimumPosting,
              HeaderName: HeaderName,
              UserRegionCode: this.UserRegionCode,
              CartableUserID: Value.data.CartableUserID,
            };
            this.isClicked = true;
          } else {
            this.IsDown = false;
            const WorkLogIDs = Value.data.JoinWorkflowLogID.split('|');
            this.paramObj = { rows: <any>[], IsWFShow: true };
            this.Cartable.GetFinWorkFlowByWorkLogDetailID(WorkLogIDs).subscribe((res: any[]) => {
              this.IsDown = true;
              if (res.length > 0) {
                res.forEach(element => {
                  element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
                });
                this.type = 'contract';
                this.HaveMaxBtn = true;
                this.startLeftPosition = 60;
                this.startTopPosition = 5;
                this.MainMinwidthPixel = 1215;
                this.HeightPercentWithMaxBtn = 97;
                this.MinHeightPixel = 645;
                this.paramObj = {
                  CurrWorkFlow: Value.data,
                  ReferenceUserName: Value.data.ReferenceUserName,
                  RoleName: Value.data.RoleName,
                  ReferenceRoleName: Value.data.ReferenceRoleName,
                  Note: Value.data.Note,
                  ContractReceiveFactorID: Value.data.ObjectID,
                  WorkFlowID: Value.data.WorkflowID,
                  ReadyToConfirm: Value.data.ReadyToConfirm,
                  IsEnd: Value.data.IsEnd,
                  WorkflowTypeName: Value.data.WorkflowTypeName,
                  WorkflowTypeCode: Value.data.WorkflowTypeCode,
                  WorkflowObjectCode: Value.data.WorkflowObjectCode,
                  ObjectNo: Value.data.ObjectNo,
                  ObjectID: Value.data.ObjectID,
                  ModuleCode: Value.data.ModuleCode,
                  ModuleViewTypeCode: Number(ModuleViewTypeCode),
                  Mode: 'EditMode',
                  IsViewable: false,
                  CostFactorID: Value.data.ObjectID,
                  SelectedRow: null,
                  ContractTypeCode: -1,
                  ISProvisionRemain: Value.data.WorkflowObjectCode === 4,
                  ISEstateRequest: Value.data.WorkflowObjectCode === 6,
                  ISTahator: Value.data.WorkflowObjectCode === 13,
                  RegionCode: Value.data.RegionCode,
                  RegionName: Value.data.RegionName,
                  MinimumPosting: Value.data.MinimumPosting,
                  HeaderName: HeaderName,
                  UserRegionCode: this.UserRegionCode,
                  CartableUserID: Value.data.CartableUserID,
                };
                this.isClicked = true;
              } else {
                this.showMessageBox('رکوردی برای نمایش وجود ندارد.');
                return;
              }
            });
          }
        }
        if (Value.data.WorkflowObjectCode === 30) {
          if (Value.data.WorkflowStatusCode === 1 || !Value.data.RelatedWorkflowLogID) {
            this.type = 'product-request-invest-archive';
            this.HaveMaxBtn = true;
            this.HeightPercentWithMaxBtn = 97;
            this.PercentWidth = 80;
            //this.MainMaxwidthPixel = 809;
            this.MinHeightPixel = 626;
            this.startLeftPosition = 115;
            this.startTopPosition = 11;
            //this.MainMaxwidthPixel = this.MainMinwidthPixel = 1200;
            this.paramObj = {
              CurrWorkFlow: Value.data,
              CostFactorID: Value.data.ObjectID,
              ModuleViewTypeCode: Number(ModuleViewTypeCode),
              Mode: 'EditMode',
              HeaderName: HeaderName,
              UserRegionCode: this.UserRegionCode,
            };
            this.isClicked = true;
          } else {
            this.IsDown = false;
            const WorkLogIDs = Value.data.JoinWorkflowLogID.split('|');
            this.paramObj = { rows: <any>[], IsWFShow: true };
            this.Cartable.GetFinWorkFlowByWorkLogDetailID(WorkLogIDs).subscribe((res: any[]) => {
              this.IsDown = true;
              if (res.length > 0) {
                res.forEach(element => {
                  element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
                });
                this.paramObj = {
                  rows: res,
                  IsWFShow: true,
                  CurrWorkFlow: Value.data,
                  CostFactorID: Value.data.ObjectID,
                  ModuleViewTypeCode: Number(ModuleViewTypeCode),
                  UserRegionCode: this.UserRegionCode,
                  Mode: 'EditMode',
                  HeaderName: HeaderName,
                  MinimumPosting: Value.data.MinimumPosting,
                };
                this.type = 'work-flow-send';
                this.isClicked = true;
                this.HaveMaxBtn = false;
                this.startLeftPosition = 250;
                this.startTopPosition = 70;
              } else {
                this.showMessageBox('رکوردی برای نمایش وجود ندارد.');
                return;
              }
            });
          }
        }
      });
  }
  onFinishedRowDoubleClicked(Value, num) {
    this.selectedRow = Value;
    this.HeightPercentWithMaxBtn = 95;
    this.MinHeightPixel = 645;
    this.onFinishedDoubleClicked(Value, num);
  }
  onDeletedRowDoubleClicked(Value, num) {
    this.selectedRow = Value;
    this.HeightPercentWithMaxBtn = 95;
    this.MinHeightPixel = 645;
    this.onFinishedDoubleClicked(Value, num);
  }
  onFinishedDoubleClicked(Value, num) {
    this.HaveHeader = true;
    let ModuleViewTypeCode = 0;
    let HeaderName = '';

    if (Value.data.WorkflowObjectCode === 1) {
      this.type = (Value.data.ContractTypeCode === 26 ||
        Value.data.ContractTypeCode === 29) ?
        'contract_person_estimate' :
        (Value.data.ContractTypeCode === 27 ||
          Value.data.ContractTypeCode === 28) ?
          'view-no-estimate' : 'Cartable_contract_estimate';
      this.isClicked = true;
      this.HaveMaxBtn = true;
      this.startLeftPosition = this.type === 'Cartable_contract_estimate' ? 1 : 59;
      this.startTopPosition = this.type === 'Cartable_contract_estimate' ? 15 : 20;
      this.MainMinwidthPixel = this.type === 'Cartable_contract_estimate' ? 1360 : '';
      this.paramObj = {
        CurrWorkFlow: Value.data,
        ReferenceUserName: Value.data.ReferenceUserName,
        RoleName: Value.data.RoleName,
        ReferenceRoleName: Value.data.ReferenceRoleName,
        IsWFShow: true,
        Note: Value.data.Note,
        WorkFlowID: Value.data.WorkflowID,
        ReadyToConfirm: Value.data.ReadyToConfirm,
        ModuleCode: 2645,
        ModuleViewTypeCode: 2,
        RegionCode: Value.data.RegionCode,
        HaveSave: false,
        RegionName: Value.data.RegionName,
        PrivateType: 'Cartable',
        IsEditable: false,
        selectedRow: {
          data:
          {
            ContractOrderId: Value.data.ObjectID,
            IsEnd: Value.data.IsEnd,
            WorkflowTypeName: Value.data.WorkflowTypeName,
            WorkflowTypeCode: Value.data.WorkflowTypeCode,
            WorkflowObjectCode: Value.data.WorkflowObjectCode,
            ObjectNo: Value.data.ObjectNo,
            ObjectID: Value.data.ObjectID,
            RegionCode: Value.data.RegionCode,
            RegionName: Value.data.RegionName,
            CartableUserID: Value.data.CartableUserID,
          }
        }
      };
    }
    if (Value.data.WorkflowObjectCode === 2) {

      // if (Value.data.ContractTypeCode === 26 || Value.data.ContractTypeCode === 29) {
      //   this.type = 'contract-pay-details'; // 'contract-pay-item-hour';
      // }

      // if (Value.data.ContractTypeCode === 27 || Value.data.ContractTypeCode === 28) {
      //   this.type = 'contract-pay-details';
      // }

      // if (!Value.data.PriceListPatternID) {
      //   this.type = 'contract-pay-details';
      // }

      // if (Value.data.PriceListPatternID &&
      //   Value.data.ContractTypeCode !== 26 &&
      //   Value.data.ContractTypeCode !== 29) {
      //   this.type = 'contract-pay-details';
      //   // this.type = 'contract-pay-item-estimate-page';
      // }

      // this.HaveMaxBtn = true;
      // this.startLeftPosition = 59;
      // this.startTopPosition = 20;
      // this.HeightPercentWithMaxBtn = 97;
      if (Value.data.ObjectTypeCode === 2) {
        this.type = 'contract-pay-details';
        this.HaveMaxBtn = true;
        this.startLeftPosition = 59;
        this.startTopPosition = 20;
        this.HeightPercentWithMaxBtn = 97;
      }

      if (Value.data.ObjectTypeCode === 9) { // پیش پرداخت و علی الحساب
        this.startLeftPosition = 300;
        this.startTopPosition = 100;
        this.HaveMaxBtn = true;
        this.HeightPercentWithMaxBtn = 52;
        this.MainMinwidthPixel = 780;
        this.type = 'pre-pay';
      }

      this.paramObj = {
        CurrWorkFlow: Value.data,
        ReferenceUserName: Value.data.ReferenceUserName,
        RoleName: Value.data.RoleName,
        ReferenceRoleName: Value.data.ReferenceRoleName,
        Note: Value.data.Note,
        WorkFlowID: Value.data.WorkflowID,
        ReadyToConfirm: Value.data.ReadyToConfirm,
        IsEnd: Value.data.IsEnd,
        WorkflowTypeName: Value.data.WorkflowTypeName,
        WorkflowTypeCode: Value.data.WorkflowTypeCode,
        WorkflowObjectCode: Value.data.WorkflowObjectCode,
        ObjectNo: Value.data.ObjectNo,
        ObjectID: Value.data.ObjectID,
        ContractCode: Value.data.ObjectCode,
        Mode: 'EditMode',
        IsViewable: false,
        SelectedCPCostFactorID: Value.data.CostFactorID,
        SelectedContractPayID: Value.data.ObjectID,
        RegionCode: Value.data.RegionCode,
        SelectedContractID: Value.data.ContractID,
        ModuleViewTypeCode: 500000,
        PriceListPatternID: Value.data.PriceListPatternID,
        ContractTypeCode: Value.data.ContractTypeCode,
        Subject: Value.data.ObjectSubject,
        LetterDatePersian: Value.data.ObjectPersianDate,
        ContractorName: Value.data.ObjectActorName,
        LetterNo: Value.data.ObjectNo,
        RegionName: Value.data.RegionName,
        CartableUserID: Value.data.CartableUserID,
        ShowSendBtn: 'YES',
        ShowReportsSign: true,
      };
      this.isClicked = true;
    }
    if (Value.data.WorkflowObjectCode === 3) {

      this.type = 'product-request-page';
      this.HaveMaxBtn = true;
      this.startLeftPosition = 10;
      this.startTopPosition = 0;
      this.HeightPercentWithMaxBtn = 97;
      this.MinHeightPixel = 645;

      this.paramObj = {
        CurrWorkFlow: Value.data,
        ReferenceUserName: Value.data.ReferenceUserName,
        RoleName: Value.data.RoleName,
        ReferenceRoleName: Value.data.ReferenceRoleName,
        Note: Value.data.Note,
        WorkFlowID: Value.data.WorkflowID,
        ReadyToConfirm: Value.data.ReadyToConfirm,
        IsEnd: Value.data.IsEnd,
        WorkflowTypeName: Value.data.WorkflowTypeName,
        WorkflowTypeCode: Value.data.WorkflowTypeCode,
        WorkflowObjectCode: Value.data.WorkflowObjectCode,
        ObjectNo: Value.data.ObjectNo,
        ObjectID: Value.data.ObjectID,
        ModuleViewTypeCode: 3,
        Mode: 'EditMode',
        IsViewable: false,
        CostFactorID: Value.data.ObjectID,
        SelectedRow: null,
        ContractTypeCode: -1,
        ISProvisionRemain: Value.data.WorkflowObjectCode === 5,
        ISArticle48: Value.data.WorkflowObjectCode === 7,
        ISTavafoghNameh: Value.data.WorkflowObjectCode === 31,
        RegionCode: Value.data.RegionCode,
        RegionName: Value.data.RegionName,
        HeaderName: HeaderName,
        ShowSendBtn: 'YES',
        CartableUserID: Value.data.CartableUserID,
        IsInProgressCartable: num === 1 ? true : false, // RFC 59699     
      };
      this.isClicked = true;
    }
    if (Value.data.WorkflowObjectCode === 5 || Value.data.WorkflowObjectCode === 7 || Value.data.WorkflowObjectCode === 31) {

      this.type = 'product-request-page';
      this.HaveMaxBtn = true;
      this.startLeftPosition = 10;
      this.startTopPosition = 0;
      this.HeightPercentWithMaxBtn = 97;
      this.MinHeightPixel = 645;

      this.paramObj = {
        CurrWorkFlow: Value.data,
        ReferenceUserName: Value.data.ReferenceUserName,
        RoleName: Value.data.RoleName,
        ReferenceRoleName: Value.data.ReferenceRoleName,
        Note: Value.data.Note,
        WorkFlowID: Value.data.WorkflowID,
        ReadyToConfirm: Value.data.ReadyToConfirm,
        IsEnd: Value.data.IsEnd,
        WorkflowTypeName: Value.data.WorkflowTypeName,
        WorkflowTypeCode: Value.data.WorkflowTypeCode,
        WorkflowObjectCode: Value.data.WorkflowObjectCode,
        ObjectNo: Value.data.ObjectNo,
        ObjectID: Value.data.ObjectID,
        ModuleViewTypeCode: 500000, // حالت فقط خواندنی
        Mode: 'EditMode',
        IsViewable: false,
        CostFactorID: Value.data.ObjectID,
        SelectedRow: null,
        ContractTypeCode: -1,
        ISProvisionRemain: Value.data.WorkflowObjectCode === 5,
        ISArticle48: Value.data.WorkflowObjectCode === 7,
        ISTavafoghNameh: Value.data.WorkflowObjectCode === 31,
        RegionCode: Value.data.RegionCode,
        RegionName: Value.data.RegionName,
        HeaderName: HeaderName,
        ShowSendBtn: 'YES',
        CartableUserID: Value.data.CartableUserID,
      };
      this.isClicked = true;
    }
    // tslint:disable-next-line:max-line-length
    if (Value.data.WorkflowObjectCode === 4 || Value.data.WorkflowObjectCode === 6 || Value.data.WorkflowObjectCode === 9 || Value.data.WorkflowObjectCode === 13) {

      this.type = 'product-request-page-without-flow';
      this.HaveMaxBtn = true;
      this.startLeftPosition = 108;
      this.startTopPosition = 5;
      this.HeightPercentWithMaxBtn = 97;
      this.MinHeightPixel = 645;

      this.paramObj = {
        CurrWorkFlow: Value.data,
        ReferenceUserName: Value.data.ReferenceUserName,
        RoleName: Value.data.RoleName,
        ReferenceRoleName: Value.data.ReferenceRoleName,
        Note: Value.data.Note,
        WorkFlowID: Value.data.WorkflowID,
        ReadyToConfirm: Value.data.ReadyToConfirm,
        IsEnd: Value.data.IsEnd,
        WorkflowTypeName: Value.data.WorkflowTypeName,
        WorkflowTypeCode: Value.data.WorkflowTypeCode,
        WorkflowObjectCode: Value.data.WorkflowObjectCode,
        ObjectNo: Value.data.ObjectNo,
        ObjectID: Value.data.ObjectID,
        ModuleViewTypeCode: 500000, // حالت فقط خواندنی
        Mode: 'EditMode',
        IsViewable: false,
        CostFactorID: Value.data.ObjectID,
        SelectedRow: null,
        ContractTypeCode: -1,
        ISProvisionRemain: Value.data.WorkflowObjectCode === 4,
        ISEstateRequest: Value.data.WorkflowObjectCode === 6,
        ISTahator: Value.data.WorkflowObjectCode === 13,
        RegionCode: Value.data.RegionCode,
        RegionName: Value.data.RegionName,
        HeaderName: HeaderName,
        DisabledControls: 'YES',
        CartableUserID: Value.data.CartableUserID,
      };
      this.isClicked = true;
    }
    if (Value.data.WorkflowObjectCode === 8) {

      this.type = 'ground-delivery-minutes';
      this.HaveMaxBtn = true;
      this.startLeftPosition = 94;
      this.startTopPosition = 10;
      this.HeightPercentWithMaxBtn = 70;
      this.MinHeightPixel = 645;
      this.PercentWidth = 85;
      this.MainMaxwidthPixel = 1150;

      this.paramObj = {
        CurrWorkFlow: Value.data,
        ReferenceUserName: Value.data.ReferenceUserName,
        RoleName: Value.data.RoleName,
        ReferenceRoleName: Value.data.ReferenceRoleName,
        Note: Value.data.Note,
        WorkFlowID: Value.data.WorkflowID,
        ReadyToConfirm: Value.data.ReadyToConfirm,
        IsEnd: Value.data.IsEnd,
        WorkflowTypeName: Value.data.WorkflowTypeName,
        WorkflowTypeCode: Value.data.WorkflowTypeCode,
        WorkflowObjectCode: Value.data.WorkflowObjectCode,
        ObjectNo: Value.data.ObjectNo,
        ContractMinutesID: Value.data.ObjectID,
        Mode: 'EditMode',
        IsViewable: false,
        SelectedCPCostFactorID: Value.data.CostFactorID,
        RegionCode: Value.data.RegionCode,
        SelectedContractID: Value.data.ContractID,
        ModuleViewTypeCode: 500000,
        PriceListPatternID: Value.data.PriceListPatternID,
        ContractTypeCode: Value.data.ContractTypeCode,
        RegionName: Value.data.RegionName,
        CartableUserID: Value.data.CartableUserID,
      };
      this.isClicked = true;
    }
    if (Value.data.WorkflowObjectCode === 10) {

      this.type = 'pure-product-request-page';
      this.HaveMaxBtn = true;
      this.startLeftPosition = 110;
      this.startTopPosition = 5;
      this.HeightPercentWithMaxBtn = 97;
      this.MinHeightPixel = 645;
      this.paramObj = {
        CurrWorkFlow: Value.data,
        ReferenceUserName: Value.data.ReferenceUserName,
        RoleName: Value.data.RoleName,
        ReferenceRoleName: Value.data.ReferenceRoleName,
        Note: Value.data.Note,
        WorkFlowID: Value.data.WorkflowID,
        ReadyToConfirm: Value.data.ReadyToConfirm,
        IsEnd: Value.data.IsEnd,
        WorkflowTypeName: Value.data.WorkflowTypeName,
        WorkflowTypeCode: Value.data.WorkflowTypeCode,
        WorkflowObjectCode: Value.data.WorkflowObjectCode,
        ObjectNo: Value.data.ObjectNo,
        ObjectID: Value.data.ObjectID,
        ModuleViewTypeCode: 2,
        Mode: 'EditMode',
        IsViewable: false,
        CostFactorID: Value.data.ObjectID,
        SelectedRow: null,
        ContractTypeCode: -1,
        // ISProvisionRemain: Value.data.WorkflowObjectCode === 5,
        // ISArticle48: Value.data.WorkflowObjectCode === 7,
        RegionCode: Value.data.RegionCode,
        RegionName: Value.data.RegionName,
        HeaderName: HeaderName,
        ShowSendBtn: 'YES',
        CartableUserID: Value.data.CartableUserID,
      };
      this.isClicked = true;
    }
    if (Value.data.WorkflowObjectCode === 11) {
      if (Value.data.ObjectTypeCode === 5) {
        this.type = 'corporate2';
        this.HaveMaxBtn = true;
        this.startLeftPosition = 15;
        this.startTopPosition = 5;
        this.HeightPercentWithMaxBtn = 97;
        this.MinHeightPixel = 645;
        this.PercentWidth = 97;
        this.paramObj = {
          CurrWorkFlow: Value.data,
          ReferenceUserName: Value.data.ReferenceUserName,
          RoleName: Value.data.RoleName,
          ReferenceRoleName: Value.data.ReferenceRoleName,
          Note: Value.data.Note,
          WorkFlowID: Value.data.WorkflowID,
          ReadyToConfirm: Value.data.ReadyToConfirm,
          IsEnd: Value.data.IsEnd,
          WorkflowTypeName: Value.data.WorkflowTypeName,
          WorkflowTypeCode: Value.data.WorkflowTypeCode,
          WorkflowObjectCode: Value.data.WorkflowObjectCode,
          ObjectNo: Value.data.ObjectNo,
          ObjectID: Value.data.ObjectID,
          Mode: 'EditMode',
          IsViewable: false,
          ModuleViewTypeCode: 300000, // RFC 54203
          CorporateID: Value.data.ObjectID,
          SelectedRow: null,
          ContractTypeCode: -1,
          RegionCode: Value.data.RegionCode,
          RegionName: Value.data.RegionName,
          HeaderName: HeaderName,
          ShowSendBtn: 'YES',
          CartableUserID: Value.data.CartableUserID,
        };
        this.isClicked = true;
      } else if (Value.data.ObjectTypeCode === 6) {
        this.type = 'person2';
        this.HaveMaxBtn = true;
        this.startLeftPosition = 15;
        this.startTopPosition = 5;
        this.HeightPercentWithMaxBtn = 97;
        this.MinHeightPixel = 645;
        this.PercentWidth = 97;
        this.paramObj = {
          CurrWorkFlow: Value.data,
          ReferenceUserName: Value.data.ReferenceUserName,
          RoleName: Value.data.RoleName,
          ReferenceRoleName: Value.data.ReferenceRoleName,
          Note: Value.data.Note,
          WorkFlowID: Value.data.WorkflowID,
          ReadyToConfirm: Value.data.ReadyToConfirm,
          IsEnd: Value.data.IsEnd,
          WorkflowTypeName: Value.data.WorkflowTypeName,
          WorkflowTypeCode: Value.data.WorkflowTypeCode,
          WorkflowObjectCode: Value.data.WorkflowObjectCode,
          ObjectNo: Value.data.ObjectNo,
          ObjectID: Value.data.ObjectID,
          Mode: 'EditMode',
          IsViewable: false,
          ModuleViewTypeCode: 300000, // RFC 54203
          CorporateID: Value.data.ObjectID,
          SelectedRow: null,
          ContractTypeCode: -1,
          RegionCode: Value.data.RegionCode,
          RegionName: Value.data.RegionName,
          HeaderName: HeaderName,
          ShowSendBtn: 'YES',
          CartableUserID: Value.data.CartableUserID,
          ActorId: Value.data.ObjectID,
        };
        this.isClicked = true;
      }
    }
    if (Value.data.WorkflowObjectCode === 15) {

      this.type = 'other-contract-documents';
      this.HaveMaxBtn = true;
      this.startLeftPosition = 90;
      this.startTopPosition = 50;
      this.HeightPercentWithMaxBtn = 60;
      this.MinHeightPixel = 350;
      this.PercentWidth = 85;
      this.MainMaxwidthPixel = 1150;

      this.paramObj = {
        CurrWorkFlow: Value.data,
        ReferenceUserName: Value.data.ReferenceUserName,
        RoleName: Value.data.RoleName,
        ReferenceRoleName: Value.data.ReferenceRoleName,
        Note: Value.data.Note,
        WorkFlowID: Value.data.WorkflowID,
        ReadyToConfirm: Value.data.ReadyToConfirm,
        IsEnd: Value.data.IsEnd,
        WorkflowTypeName: Value.data.WorkflowTypeName,
        WorkflowTypeCode: Value.data.WorkflowTypeCode,
        WorkflowObjectCode: Value.data.WorkflowObjectCode,
        ObjectNo: Value.data.ObjectNo,
        ContractMinutesID: Value.data.ObjectID,
        Mode: 'EditMode',
        IsViewable: false,
        SelectedCPCostFactorID: Value.data.CostFactorID,
        RegionCode: Value.data.RegionCode,
        SelectedContractID: Value.data.ContractID,
        ModuleViewTypeCode: 500000,
        PriceListPatternID: Value.data.PriceListPatternID,
        ContractTypeCode: Value.data.ContractTypeCode,
        RegionName: Value.data.RegionName,
        CartableUserID: Value.data.CartableUserID,
      };
      this.isClicked = true;
    }
    if (Value.data.WorkflowObjectCode === 17) {

      this.type = 'single-sale-invoice';
      this.HaveMaxBtn = true;
      this.startLeftPosition = 10;
      this.startTopPosition = 0;
      this.HeightPercentWithMaxBtn = 97;
      this.MinHeightPixel = 645;

      this.paramObj = {
        CurrWorkFlow: Value.data,
        ModuleViewTypeCode: 200000,
        Mode: 'EditMode',
        IsInFinishedCartable: num === 2 ? true : false, // RFC 61296
      };
      this.isClicked = true;
    }
    if (Value.data.WorkflowObjectCode === 25) {

      this.type = 'customer-order';
      this.HaveMaxBtn = true;
      this.startLeftPosition = 100;
      this.startTopPosition = 10;
      this.HeightPercentWithMaxBtn = 97;
      this.MinHeightPixel = 645;
      this.MainMinwidthPixel = 1100;

      this.paramObj = {
        CurrWorkFlow: Value.data,
        CustomerOrderID: Value.data.ObjectID,
        ModuleViewTypeCode: 200000,
        Mode: 'EditMode',
        IsInFinishedCartable: num === 2 ? true : false, // RFC 61296
      };
      this.isClicked = true;
    }
    if (Value.data.WorkflowObjectCode === 27) {

      this.type = 'customer-product-request-page';
      this.HaveMaxBtn = true;
      this.startLeftPosition = 50;
      this.startTopPosition = 10;
      this.HeightPercentWithMaxBtn = 97;
      this.MinHeightPixel = 645;
      this.PercentWidth = 90;
      this.MainMinwidthPixel = 1215;
      this.paramObj = {
        CurrWorkFlow: Value.data,
        CustomerOrderID: Value.data.ObjectID,
        ModuleViewTypeCode: 200000,
        Mode: 'EditMode',
        IsInFinishedCartable: num === 2 ? true : false, // RFC 61296
      };
      this.isClicked = true;
    }
    if (Value.data.WorkflowObjectCode === 26) {

      this.type = 'app-asset';
      this.HaveMaxBtn = true;
      this.startLeftPosition = 50;
      this.startTopPosition = 10;
      this.HeightPercentWithMaxBtn = 97;
      this.MinHeightPixel = 645;
      this.PercentWidth = 90;
      this.MainMinwidthPixel = 1215;
      this.paramObj = {
        CurrWorkFlow: Value.data,
        AssetID: Value.data.ObjectID,
        ModuleViewTypeCode: 200000,
        Mode: 'EditMode',
        IsInFinishedCartable: num === 2 ? true : false,
        selectedRow: {
          WorkflowTypeName: Value.data.WorkflowTypeName,
          WorkflowTypeCode: Value.data.WorkflowTypeCode,
          WorkflowObjectCode: Value.data.WorkflowObjectCode,
          ObjectNo: Value.data.ObjectNo,
          AssetID: Value.data.ObjectID,
          ContractOrderId: Value.data.ObjectID,
          RegionCode: Value.data.RegionCode,
          RegionName: Value.data.RegionName,
          CartableUserID: Value.data.CartableUserID,
          ProductID: Value.data.ContractID

        }

      };
      this.isClicked = true;
    }
    if (Value.data.WorkflowObjectCode === 28) {
      this.type = 'contract-supervision';
      this.HaveMaxBtn = true;
      this.startLeftPosition = 100;
      this.startTopPosition = 10;
      this.HeightPercentWithMaxBtn = 97;
      this.MinHeightPixel = 645;
      this.MainMinwidthPixel = 1100;

      this.paramObj = {
        CurrWorkFlow: Value.data,
        SelectedCnrtSupervisionID: Value.data.ObjectID,
        ModuleViewTypeCode: 200000,
        Mode: 'EditMode',
        IsInFinishedCartable: num === 2 ? true : false,
      };
      this.isClicked = true;
    }
    if (Value.data.WorkflowObjectCode === 29) {
      if (Value.data.WorkflowStatusCode === 1 || !Value.data.RelatedWorkflowLogID) {
        this.type = 'contract';
        this.HaveMaxBtn = true;
        this.startLeftPosition = 60;
        this.startTopPosition = 5;
        this.HeightPercentWithMaxBtn = 97;
        this.MainMinwidthPixel = 1215;
        this.MinHeightPixel = 645;
        this.paramObj = {
          CurrWorkFlow: Value.data,
          ReferenceUserName: Value.data.ReferenceUserName,
          RoleName: Value.data.RoleName,
          ReferenceRoleName: Value.data.ReferenceRoleName,
          Note: Value.data.Note,
          ContractReceiveFactorID: Value.data.ObjectID,
          WorkFlowID: Value.data.WorkflowID,
          ReadyToConfirm: Value.data.ReadyToConfirm,
          IsEnd: Value.data.IsEnd,
          WorkflowTypeName: Value.data.WorkflowTypeName,
          WorkflowTypeCode: Value.data.WorkflowTypeCode,
          WorkflowObjectCode: Value.data.WorkflowObjectCode,
          ObjectNo: Value.data.ObjectNo,
          ObjectID: Value.data.ObjectID,
          ModuleCode: Value.data.ModuleCode,
          ModuleViewTypeCode: Number(ModuleViewTypeCode),
          Mode: 'EditMode',
          IsViewable: false,
          CostFactorID: Value.data.ObjectID,
          SelectedRow: null,
          ContractTypeCode: -1,
          ISProvisionRemain: Value.data.WorkflowObjectCode === 4,
          ISEstateRequest: Value.data.WorkflowObjectCode === 6,
          ISTahator: Value.data.WorkflowObjectCode === 13,
          RegionCode: Value.data.RegionCode,
          RegionName: Value.data.RegionName,
          MinimumPosting: Value.data.MinimumPosting,
          HeaderName: HeaderName,
          UserRegionCode: this.UserRegionCode,
          CartableUserID: Value.data.CartableUserID,
        };
        this.isClicked = true;
      } else {
        this.IsDown = false;
        const WorkLogIDs = Value.data.JoinWorkflowLogID.split('|');
        this.paramObj = { rows: <any>[], IsWFShow: true };
        this.Cartable.GetFinWorkFlowByWorkLogDetailID(WorkLogIDs).subscribe((res: any[]) => {
          this.IsDown = true;
          if (res.length > 0) {
            res.forEach(element => {
              element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
            });
            this.type = 'contract';
            this.HaveMaxBtn = true;
            this.startLeftPosition = 60;
            this.startTopPosition = 5;
            this.MainMinwidthPixel = 1215;
            this.HeightPercentWithMaxBtn = 97;
            this.MinHeightPixel = 645;
            this.paramObj = {
              CurrWorkFlow: Value.data,
              ReferenceUserName: Value.data.ReferenceUserName,
              RoleName: Value.data.RoleName,
              ReferenceRoleName: Value.data.ReferenceRoleName,
              Note: Value.data.Note,
              ContractReceiveFactorID: Value.data.ObjectID,
              WorkFlowID: Value.data.WorkflowID,
              ReadyToConfirm: Value.data.ReadyToConfirm,
              IsEnd: Value.data.IsEnd,
              WorkflowTypeName: Value.data.WorkflowTypeName,
              WorkflowTypeCode: Value.data.WorkflowTypeCode,
              WorkflowObjectCode: Value.data.WorkflowObjectCode,
              ObjectNo: Value.data.ObjectNo,
              ObjectID: Value.data.ObjectID,
              ModuleCode: Value.data.ModuleCode,
              ModuleViewTypeCode: Number(ModuleViewTypeCode),
              Mode: 'EditMode',
              IsViewable: false,
              CostFactorID: Value.data.ObjectID,
              SelectedRow: null,
              ContractTypeCode: -1,
              ISProvisionRemain: Value.data.WorkflowObjectCode === 4,
              ISEstateRequest: Value.data.WorkflowObjectCode === 6,
              ISTahator: Value.data.WorkflowObjectCode === 13,
              RegionCode: Value.data.RegionCode,
              RegionName: Value.data.RegionName,
              MinimumPosting: Value.data.MinimumPosting,
              HeaderName: HeaderName,
              UserRegionCode: this.UserRegionCode,
              CartableUserID: Value.data.CartableUserID,
            };
            this.isClicked = true;
          } else {
            this.showMessageBox('رکوردی برای نمایش وجود ندارد.');
            return;
          }
        });
      }
    }
    if (Value.data.WorkflowObjectCode === 30) {

      this.type = 'product-request-invest-archive';
      this.HaveMaxBtn = true;
      this.startLeftPosition = 115;
      this.startTopPosition = 10;
      this.HeightPercentWithMaxBtn = 97;
      this.MinHeightPixel = 645;
      this.PercentWidth = 80;
      //this.MainMaxwidthPixel = this.MainMinwidthPixel = 1200;
      this.paramObj = {
        CurrWorkFlow: Value.data,
        CostFactorID: Value.data.ObjectID,
        ModuleViewTypeCode: 200000,
        Mode: 'EditMode',
        IsInFinishedCartable: num === 2 ? true : false, // RFC 61296
      };
      this.isClicked = true;
    }
  }
  onFinishedWorkListRowDoubleClicked(Value) {
    this.HaveHeader = true;
    let ModuleViewTypeCode = Value.data.ModuleViewTypeCode;
    let HeaderName = Value.data.ModuleViewTypeName;
    if (!Value.data.ModuleViewTypeCode) {
      ModuleViewTypeCode = '2';
    }

    if (Value.data.ModuleViewTypeCode.includes('|')) {
      const Types = Value.data.ModuleViewTypeCode.split('|');
      const equals = Types.every(function (value, index, array) {
        return value === array[0];
      });

      if (!equals) {
        this.showMessageBox('نوع نمایش فعالیت برای نمونه انتخابی مشخص نشده است.لطفا با راهبر سیستم هماهنگ نمایید.');
        return;
      } else {
        ModuleViewTypeCode = Types[0];
        HeaderName = Value.data.ModuleViewTypeName.split('|')[0];
      }
    }

    if (Value.data.WorkflowObjectCode === 1) {
      if (Value.data.WorkflowStatusCode === 1 || !Value.data.RelatedWorkflowLogID) {
        this.type = (Value.data.ContractTypeCode === 26 ||
          Value.data.ContractTypeCode === 29) ?
          'contract_person_estimate' :
          (Value.data.ContractTypeCode === 27 ||
            Value.data.ContractTypeCode === 28) ?
            'view-no-estimate' : 'Cartable_contract_estimate';
        this.isClicked = true;
        this.HaveMaxBtn = true;
        this.startLeftPosition = this.type === 'Cartable_contract_estimate' ? 1 : 59;
        this.startTopPosition = this.type === 'Cartable_contract_estimate' ? 15 : 20;
        this.MainMinwidthPixel = this.type === 'Cartable_contract_estimate' ? 1360 : ''; this.paramObj = {
          CurrWorkFlow: Value.data,
          ReferenceUserName: Value.data.ReferenceUserName,
          RoleName: Value.data.RoleName,
          ReferenceRoleName: Value.data.ReferenceRoleName,
          IsWFShow: true,
          Note: Value.data.Note,
          WorkFlowID: Value.data.WorkflowID,
          ReadyToConfirm: Value.data.ReadyToConfirm,
          ModuleCode: 2645,
          ModuleViewTypeCode: Number(ModuleViewTypeCode),
          RegionCode: Value.data.RegionCode,
          RegionName: Value.data.RegionName,
          selectedRow: {
            data:
            {
              ContractOrderId: Value.data.ObjectID,
              IsEnd: Value.data.IsEnd,
              WorkflowTypeName: Value.data.WorkflowTypeName,
              WorkflowTypeCode: Value.data.WorkflowTypeCode,
              WorkflowObjectCode: Value.data.WorkflowObjectCode,
              ObjectNo: Value.data.ObjectNo,
              ObjectID: Value.data.ObjectID,
              RegionCode: Value.data.RegionCode,
              RegionName: Value.data.RegionName,
              CartableUserID: Value.data.CartableUserID,
            }
          }
        };
      } else {
        this.paramObj = { rows: <any>[], IsWFShow: true };
        this.paramObj = {
          IsWFShow: true,
          ModuleCode: 2645,
          CurrWorkFlow: Value.data,
          IsEnd: Value.data.IsEnd,
          ReadyToConfirm: Value.data.ReadyToConfirm,
          ModuleViewTypeCode: Number(ModuleViewTypeCode),
          CartableUserID: Value.data.CartableUserID,
          selectedRow: {
            data:
            {
              WorkflowTypeName: Value.data.WorkflowTypeName,
              WorkflowTypeCode: Value.data.WorkflowTypeCode,
              WorkflowObjectCode: Value.data.WorkflowObjectCode,
              ObjectNo: Value.data.ObjectNo,
              ObjectID: Value.data.ObjectID,
              ContractOrderId: Value.data.ObjectID,
              RegionCode: Value.data.RegionCode,
              RegionName: Value.data.RegionName,
              CartableUserID: Value.data.CartableUserID,
            }
          }
        };
        this.type = 'work-flow-send';
        this.isClicked = true;
        this.HaveMaxBtn = false;
        this.OverMainMinwidthPixel = null;
        this.startLeftPosition = 250;
        this.startTopPosition = 70;
      }
    }
    if (Value.data.WorkflowObjectCode === 2) {
      if (Value.data.WorkflowStatusCode === 1 || !Value.data.RelatedWorkflowLogID) {

        // if (Value.data.ContractTypeCode === 26 || Value.data.ContractTypeCode === 29) {
        //   this.type = 'contract-pay-details'; // 'contract-pay-item-hour';
        // }

        // if (Value.data.ContractTypeCode === 27 || Value.data.ContractTypeCode === 28) {
        //   this.type = 'contract-pay-details';
        // }

        // if (!Value.data.PriceListPatternID) {
        //   this.type = 'contract-pay-details';
        // }

        // if (Value.data.PriceListPatternID &&
        //   Value.data.ContractTypeCode !== 26 &&
        //   Value.data.ContractTypeCode !== 29) {
        //   // this.type = 'contract-pay-item-estimate-page';
        //   this.type = 'contract-pay-details';
        // }

        // this.HaveMaxBtn = true;
        // this.HeightPercentWithMaxBtn = 97;
        // this.startLeftPosition = 59;
        // this.startTopPosition = 20;

        if (Value.data.ObjectTypeCode === 2) {
          this.type = 'contract-pay-details';
          this.HaveMaxBtn = true;
          this.HeightPercentWithMaxBtn = 97;
          this.startLeftPosition = 59;
          this.startTopPosition = 20;
        }

        if (Value.data.ObjectTypeCode === 9) { // پیش پرداخت و علی الحساب
          this.startLeftPosition = 300;
          this.startTopPosition = 100;
          this.HaveMaxBtn = true;
          this.HeightPercentWithMaxBtn = 52;
          this.MainMinwidthPixel = 780;
          this.type = 'pre-pay';
        }

        this.paramObj = {
          CurrWorkFlow: Value.data,
          ReferenceUserName: Value.data.ReferenceUserName,
          RoleName: Value.data.RoleName,
          ReferenceRoleName: Value.data.ReferenceRoleName,
          Note: Value.data.Note,
          WorkFlowID: Value.data.WorkflowID,
          ReadyToConfirm: Value.data.ReadyToConfirm,
          IsEnd: Value.data.IsEnd,
          WorkflowTypeName: Value.data.WorkflowTypeName,
          WorkflowTypeCode: Value.data.WorkflowTypeCode,
          WorkflowObjectCode: Value.data.WorkflowObjectCode,
          ObjectNo: Value.data.ObjectNo,
          ObjectID: Value.data.ObjectID,
          Mode: 'EditMode',
          IsViewable: false,
          SelectedCPCostFactorID: Value.data.CostFactorID,
          SelectedContractPayID: Value.data.ObjectID,
          RegionCode: Value.data.RegionCode,
          SelectedContractID: Value.data.ContractID,
          ModuleViewTypeCode: Number(ModuleViewTypeCode),
          PriceListPatternID: Value.data.PriceListPatternID,
          ContractTypeCode: Value.data.ContractTypeCode,
          ContractCode: Value.data.ObjectCode,
          RegionName: Value.data.RegionName,
          UserRegionCode: this.UserRegionCode,
          Subject: Value.data.ObjectSubject,
          LetterDatePersian: Value.data.ObjectPersianDate,
          ContractorName: Value.data.ObjectActorName,
          LetterNo: Value.data.ObjectNo,
          CartableUserID: Value.data.CartableUserID,
          ShowSendBtn: 'YES'
        };
        this.isClicked = true;
      } else {
        this.IsDown = false;
        const WorkLogIDs = Value.data.JoinWorkflowLogID.split('|');
        this.paramObj = { rows: <any>[], IsWFShow: true };
        this.Cartable.GetFinWorkFlowByWorkLogDetailID(WorkLogIDs).subscribe((res: any[]) => {
          this.IsDown = true;
          if (res.length > 0) {
            res.forEach(element => {
              element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
            });
            this.paramObj = {
              rows: res,
              IsWFShow: true,
              CurrWorkFlow: Value.data,
              IsEnd: Value.data.IsEnd,
              ReadyToConfirm: Value.data.ReadyToConfirm,
              ModuleViewTypeCode: Number(ModuleViewTypeCode),
              UserRegionCode: this.UserRegionCode,
              ReferenceUserName: Value.data.ReferenceUserName,
              RoleName: Value.data.RoleName,
              ReferenceRoleName: Value.data.ReferenceRoleName,
              Note: Value.data.Note,
              WorkFlowID: Value.data.WorkflowID,
              WorkflowTypeName: Value.data.WorkflowTypeName,
              WorkflowTypeCode: Value.data.WorkflowTypeCode,
              WorkflowObjectCode: Value.data.WorkflowObjectCode,
              ObjectNo: Value.data.ObjectNo,
              ObjectID: Value.data.ObjectID,
              Mode: 'EditMode',
              IsViewable: false,
              SelectedCPCostFactorID: Value.data.CostFactorID,
              RegionCode: Value.data.RegionCode,
              SelectedContractID: Value.data.ContractID,
              PriceListPatternID: Value.data.PriceListPatternID,
              ContractTypeCode: Value.data.ContractTypeCode,
              RegionName: Value.data.RegionName,
              CostFactorID: Value.data.ObjectID,
              SelectedRow: null,
              MinimumPosting: Value.data.MinimumPosting,
              HeaderName: HeaderName,
              ShowSendBtn: 'YES',
              selectedRow: {
                data:
                {
                  WorkflowTypeName: Value.data.WorkflowTypeName,
                  WorkflowTypeCode: Value.data.WorkflowTypeCode,
                  WorkflowObjectCode: Value.data.WorkflowObjectCode,
                  ObjectNo: Value.data.ObjectNo,
                  ObjectID: Value.data.ObjectID,
                  ContractOrderId: Value.data.ObjectID,
                  RegionCode: Value.data.RegionCode,
                  RegionName: Value.data.RegionName,
                  CartableUserID: Value.data.CartableUserID,
                }
              }
            };
            this.type = 'work-flow-send';
            this.isClicked = true;
            this.HaveMaxBtn = false;
            this.startLeftPosition = 250;
            this.startTopPosition = 70;
          } else {
            this.showMessageBox('رکوردی برای نمایش وجود ندارد.');
            return;
          }
        });
      }
    }
    if (Value.data.WorkflowObjectCode === 3 || Value.data.WorkflowObjectCode === 5 || Value.data.WorkflowObjectCode === 7 || Value.data.WorkflowObjectCode === 31) {
      if (Value.data.WorkflowStatusCode === 1 || !Value.data.RelatedWorkflowLogID) {
        this.type = 'product-request-page';
        this.HaveMaxBtn = true;
        this.startLeftPosition = 10;
        this.startTopPosition = 0;
        this.HeightPercentWithMaxBtn = 97;
        this.MinHeightPixel = 645;
        this.paramObj = {
          CurrWorkFlow: Value.data,
          ReferenceUserName: Value.data.ReferenceUserName,
          RoleName: Value.data.RoleName,
          ReferenceRoleName: Value.data.ReferenceRoleName,
          Note: Value.data.Note,
          WorkFlowID: Value.data.WorkflowID,
          ReadyToConfirm: Value.data.ReadyToConfirm,
          IsEnd: Value.data.IsEnd,
          WorkflowTypeName: Value.data.WorkflowTypeName,
          WorkflowTypeCode: Value.data.WorkflowTypeCode,
          WorkflowObjectCode: Value.data.WorkflowObjectCode,
          ObjectNo: Value.data.ObjectNo,
          ObjectID: Value.data.ObjectID,
          ModuleViewTypeCode: Number(ModuleViewTypeCode),
          Mode: 'EditMode',
          IsViewable: false,
          CostFactorID: Value.data.ObjectID,
          SelectedRow: null,
          ContractTypeCode: -1,
          ISProvisionRemain: Value.data.WorkflowObjectCode === 5,
          ISArticle48: Value.data.WorkflowObjectCode === 7,
          ISTavafoghNameh: Value.data.WorkflowObjectCode === 31,
          RegionCode: Value.data.RegionCode,
          RegionName: Value.data.RegionName,
          MinimumPosting: Value.data.MinimumPosting,
          HeaderName: HeaderName,
          UserRegionCode: this.UserRegionCode,
          CartableUserID: Value.data.CartableUserID,
        };
        this.isClicked = true;
      } else {
        this.IsDown = false;
        const WorkLogIDs = Value.data.JoinWorkflowLogID.split('|');
        this.paramObj = { rows: <any>[], IsWFShow: true };
        this.Cartable.GetFinWorkFlowByWorkLogDetailID(WorkLogIDs).subscribe((res: any[]) => {
          this.IsDown = true;
          if (res.length > 0) {
            res.forEach(element => {
              element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
            });
            this.paramObj = {
              rows: res,
              IsWFShow: true,
              CurrWorkFlow: Value.data,
              IsEnd: Value.data.IsEnd,
              ReadyToConfirm: Value.data.ReadyToConfirm,
              ModuleViewTypeCode: Number(ModuleViewTypeCode),
              UserRegionCode: this.UserRegionCode,
              ReferenceUserName: Value.data.ReferenceUserName,
              RoleName: Value.data.RoleName,
              ReferenceRoleName: Value.data.ReferenceRoleName,
              Note: Value.data.Note,
              WorkFlowID: Value.data.WorkflowID,
              WorkflowTypeName: Value.data.WorkflowTypeName,
              WorkflowTypeCode: Value.data.WorkflowTypeCode,
              WorkflowObjectCode: Value.data.WorkflowObjectCode,
              ObjectNo: Value.data.ObjectNo,
              ObjectID: Value.data.ObjectID,
              Mode: 'EditMode',
              IsViewable: false,
              SelectedCPCostFactorID: Value.data.CostFactorID,
              RegionCode: Value.data.RegionCode,
              SelectedContractID: Value.data.ContractID,
              PriceListPatternID: Value.data.PriceListPatternID,
              // ContractTypeCode: Value.data.ContractTypeCode,
              RegionName: Value.data.RegionName,
              CostFactorID: Value.data.ObjectID,
              SelectedRow: null,
              MinimumPosting: Value.data.MinimumPosting,
              HeaderName: HeaderName,
              ContractTypeCode: -1,
              ISProvisionRemain: Value.data.WorkflowObjectCode === 5,
              ISArticle48: Value.data.WorkflowObjectCode === 7,
              ISTavafoghNameh: Value.data.WorkflowObjectCode === 31,
              selectedRow: {
                data:
                {
                  WorkflowTypeName: Value.data.WorkflowTypeName,
                  WorkflowTypeCode: Value.data.WorkflowTypeCode,
                  WorkflowObjectCode: Value.data.WorkflowObjectCode,
                  ObjectNo: Value.data.ObjectNo,
                  ObjectID: Value.data.ObjectID,
                  ContractOrderId: Value.data.ObjectID,
                  RegionCode: Value.data.RegionCode,
                  RegionName: Value.data.RegionName,
                  CartableUserID: Value.data.CartableUserID,
                }
              }
            };
            this.type = 'work-flow-send';
            this.isClicked = true;
            this.HaveMaxBtn = false;
            this.startLeftPosition = 250;
            this.startTopPosition = 70;
          } else {
            this.showMessageBox('رکوردی برای نمایش وجود ندارد.');
            return;
          }
        });
      }
    }
    if (Value.data.WorkflowObjectCode === 4 || Value.data.WorkflowObjectCode === 6 || Value.data.WorkflowObjectCode === 13) {
      if (Value.data.WorkflowStatusCode === 1 || !Value.data.RelatedWorkflowLogID) {
        this.type = 'product-request-page-without-flow';
        this.HaveMaxBtn = true;
        this.startLeftPosition = 108;
        this.startTopPosition = 5;
        this.HeightPercentWithMaxBtn = 97;
        this.MinHeightPixel = 645;
        this.paramObj = {
          CurrWorkFlow: Value.data,
          ReferenceUserName: Value.data.ReferenceUserName,
          RoleName: Value.data.RoleName,
          ReferenceRoleName: Value.data.ReferenceRoleName,
          Note: Value.data.Note,
          WorkFlowID: Value.data.WorkflowID,
          ReadyToConfirm: Value.data.ReadyToConfirm,
          IsEnd: Value.data.IsEnd,
          WorkflowTypeName: Value.data.WorkflowTypeName,
          WorkflowTypeCode: Value.data.WorkflowTypeCode,
          WorkflowObjectCode: Value.data.WorkflowObjectCode,
          ObjectNo: Value.data.ObjectNo,
          ObjectID: Value.data.ObjectID,
          ModuleViewTypeCode: Number(ModuleViewTypeCode),
          Mode: 'EditMode',
          IsViewable: false,
          CostFactorID: Value.data.ObjectID,
          SelectedRow: null,
          ContractTypeCode: -1,
          ISProvisionRemain: Value.data.WorkflowObjectCode === 4,
          ISArticle48: Value.data.WorkflowObjectCode === 7,
          ISTahator: Value.data.WorkflowObjectCode === 13,
          RegionCode: Value.data.RegionCode,
          RegionName: Value.data.RegionName,
          MinimumPosting: Value.data.MinimumPosting,
          HeaderName: HeaderName,
          UserRegionCode: this.UserRegionCode,
          CartableUserID: Value.data.CartableUserID,
        };
        this.isClicked = true;
      } else {
        this.IsDown = false;
        const WorkLogIDs = Value.data.JoinWorkflowLogID.split('|');
        this.paramObj = { rows: <any>[], IsWFShow: true };
        this.Cartable.GetFinWorkFlowByWorkLogDetailID(WorkLogIDs).subscribe((res: any[]) => {
          this.IsDown = true;
          if (res.length > 0) {
            res.forEach(element => {
              element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
            });
            this.paramObj = {
              rows: res,
              IsWFShow: true,
              CurrWorkFlow: Value.data,
              IsEnd: Value.data.IsEnd,
              ReadyToConfirm: Value.data.ReadyToConfirm,
              ModuleViewTypeCode: Number(ModuleViewTypeCode),
              UserRegionCode: this.UserRegionCode,
              ReferenceUserName: Value.data.ReferenceUserName,
              RoleName: Value.data.RoleName,
              ReferenceRoleName: Value.data.ReferenceRoleName,
              Note: Value.data.Note,
              WorkFlowID: Value.data.WorkflowID,
              WorkflowTypeName: Value.data.WorkflowTypeName,
              WorkflowTypeCode: Value.data.WorkflowTypeCode,
              WorkflowObjectCode: Value.data.WorkflowObjectCode,
              ObjectNo: Value.data.ObjectNo,
              ObjectID: Value.data.ObjectID,
              Mode: 'EditMode',
              IsViewable: false,
              SelectedCPCostFactorID: Value.data.CostFactorID,
              RegionCode: Value.data.RegionCode,
              SelectedContractID: Value.data.ContractID,
              PriceListPatternID: Value.data.PriceListPatternID,
              // ContractTypeCode: Value.data.ContractTypeCode,
              RegionName: Value.data.RegionName,
              CostFactorID: Value.data.ObjectID,
              SelectedRow: null,
              MinimumPosting: Value.data.MinimumPosting,
              HeaderName: HeaderName,
              ContractTypeCode: -1,
              ISProvisionRemain: Value.data.WorkflowObjectCode === 4,
              ISArticle48: Value.data.WorkflowObjectCode === 7,
              ISTahator: Value.data.WorkflowObjectCode === 13,
              selectedRow: {
                data:
                {
                  WorkflowTypeName: Value.data.WorkflowTypeName,
                  WorkflowTypeCode: Value.data.WorkflowTypeCode,
                  WorkflowObjectCode: Value.data.WorkflowObjectCode,
                  ObjectNo: Value.data.ObjectNo,
                  ObjectID: Value.data.ObjectID,
                  ContractOrderId: Value.data.ObjectID,
                  RegionCode: Value.data.RegionCode,
                  RegionName: Value.data.RegionName,
                  CartableUserID: Value.data.CartableUserID,
                }
              }
            };
            this.type = 'work-flow-send';
            this.isClicked = true;
            this.HaveMaxBtn = false;
            this.startLeftPosition = 250;
            this.startTopPosition = 70;
          } else {
            this.showMessageBox('رکوردی برای نمایش وجود ندارد.');
            return;
          }
        });
      }
    }
    if (Value.data.WorkflowObjectCode === 10) {
      if (Value.data.WorkflowStatusCode === 1 || !Value.data.RelatedWorkflowLogID) {
        this.type = 'pure-product-request-page';
        this.HaveMaxBtn = true;
        this.startLeftPosition = 110;
        this.startTopPosition = 5;
        this.HeightPercentWithMaxBtn = 97;
        this.MinHeightPixel = 645;
        this.paramObj = {
          CurrWorkFlow: Value.data,
          ReferenceUserName: Value.data.ReferenceUserName,
          RoleName: Value.data.RoleName,
          ReferenceRoleName: Value.data.ReferenceRoleName,
          Note: Value.data.Note,
          WorkFlowID: Value.data.WorkflowID,
          ReadyToConfirm: Value.data.ReadyToConfirm,
          IsEnd: Value.data.IsEnd,
          WorkflowTypeName: Value.data.WorkflowTypeName,
          WorkflowTypeCode: Value.data.WorkflowTypeCode,
          WorkflowObjectCode: Value.data.WorkflowObjectCode,
          ObjectNo: Value.data.ObjectNo,
          ObjectID: Value.data.ObjectID,
          ModuleViewTypeCode: Number(ModuleViewTypeCode),
          Mode: 'EditMode',
          IsViewable: false,
          CostFactorID: Value.data.ObjectID,
          SelectedRow: null,
          ContractTypeCode: -1,
          // ISProvisionRemain: Value.data.WorkflowObjectCode === 5,
          // ISArticle48: Value.data.WorkflowObjectCode === 7,
          RegionCode: Value.data.RegionCode,
          RegionName: Value.data.RegionName,
          MinimumPosting: Value.data.MinimumPosting,
          HeaderName: HeaderName,
          UserRegionCode: this.UserRegionCode,
          CartableUserID: Value.data.CartableUserID,
        };
        this.isClicked = true;
      } else {
        this.IsDown = false;
        const WorkLogIDs = Value.data.JoinWorkflowLogID.split('|');
        this.paramObj = { rows: <any>[], IsWFShow: true };
        this.Cartable.GetFinWorkFlowByWorkLogDetailID(WorkLogIDs).subscribe((res: any[]) => {
          this.IsDown = true;
          if (res.length > 0) {
            res.forEach(element => {
              element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
            });
            this.paramObj = {
              rows: res,
              IsWFShow: true,
              CurrWorkFlow: Value.data,
              IsEnd: Value.data.IsEnd,
              ReadyToConfirm: Value.data.ReadyToConfirm,
              ModuleViewTypeCode: Number(ModuleViewTypeCode),
              UserRegionCode: this.UserRegionCode,
              ReferenceUserName: Value.data.ReferenceUserName,
              RoleName: Value.data.RoleName,
              ReferenceRoleName: Value.data.ReferenceRoleName,
              Note: Value.data.Note,
              WorkFlowID: Value.data.WorkflowID,
              WorkflowTypeName: Value.data.WorkflowTypeName,
              WorkflowTypeCode: Value.data.WorkflowTypeCode,
              WorkflowObjectCode: Value.data.WorkflowObjectCode,
              ObjectNo: Value.data.ObjectNo,
              ObjectID: Value.data.ObjectID,
              Mode: 'EditMode',
              IsViewable: false,
              SelectedCPCostFactorID: Value.data.CostFactorID,
              RegionCode: Value.data.RegionCode,
              SelectedContractID: Value.data.ContractID,
              PriceListPatternID: Value.data.PriceListPatternID,
              // ContractTypeCode: Value.data.ContractTypeCode,
              RegionName: Value.data.RegionName,
              CostFactorID: Value.data.ObjectID,
              SelectedRow: null,
              MinimumPosting: Value.data.MinimumPosting,
              HeaderName: HeaderName,
              ContractTypeCode: -1,
              // ISProvisionRemain: Value.data.WorkflowObjectCode === 5,
              // ISArticle48: Value.data.WorkflowObjectCode === 7,
              selectedRow: {
                data:
                {
                  WorkflowTypeName: Value.data.WorkflowTypeName,
                  WorkflowTypeCode: Value.data.WorkflowTypeCode,
                  WorkflowObjectCode: Value.data.WorkflowObjectCode,
                  ObjectNo: Value.data.ObjectNo,
                  ObjectID: Value.data.ObjectID,
                  ContractOrderId: Value.data.ObjectID,
                  RegionCode: Value.data.RegionCode,
                  RegionName: Value.data.RegionName,
                  CartableUserID: Value.data.CartableUserID,
                }
              }
            };
            this.type = 'work-flow-send';
            this.isClicked = true;
            this.HaveMaxBtn = false;
            this.startLeftPosition = 250;
            this.startTopPosition = 70;
          } else {
            this.showMessageBox('رکوردی برای نمایش وجود ندارد.');
            return;
          }
        });
      }
    }
    if (Value.data.WorkflowObjectCode === 17) {
      if (Value.data.WorkflowStatusCode === 1 || !Value.data.RelatedWorkflowLogID) {
        this.type = 'single-sale-invoice';
        this.HaveMaxBtn = true;
        this.startLeftPosition = 10;
        this.startTopPosition = 0;
        this.HeightPercentWithMaxBtn = 97;
        this.MinHeightPixel = 645;
        this.paramObj = {
          CurrWorkFlow: Value.data,
          ModuleViewTypeCode: Number(ModuleViewTypeCode),
          Mode: 'EditMode',
          HeaderName: HeaderName,
          UserRegionCode: this.UserRegionCode,
        };
        this.isClicked = true;
      } else {
        this.IsDown = false;
        const WorkLogIDs = Value.data.JoinWorkflowLogID.split('|');
        this.paramObj = { rows: <any>[], IsWFShow: true };
        this.Cartable.GetFinWorkFlowByWorkLogDetailID(WorkLogIDs).subscribe((res: any[]) => {
          this.IsDown = true;
          if (res.length > 0) {
            res.forEach(element => {
              element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
            });
            this.paramObj = {
              rows: res,
              IsWFShow: true,
              CurrWorkFlow: Value.data,
              ModuleViewTypeCode: Number(ModuleViewTypeCode),
              UserRegionCode: this.UserRegionCode,
              Mode: 'EditMode',
              HeaderName: HeaderName,
            };
            this.type = 'work-flow-send';
            this.isClicked = true;
            this.HaveMaxBtn = false;
            this.startLeftPosition = 250;
            this.startTopPosition = 70;
          } else {
            this.showMessageBox('رکوردی برای نمایش وجود ندارد.');
            return;
          }
        });
      }
    }
    if (Value.data.WorkflowObjectCode === 25) {
      if (Value.data.WorkflowStatusCode === 1 || !Value.data.RelatedWorkflowLogID) {
        this.type = 'customer-order';
        this.HaveMaxBtn = true;
        this.startLeftPosition = 100;
        this.startTopPosition = 10;
        this.HeightPercentWithMaxBtn = 97;
        this.MinHeightPixel = 645;
        this.MainMinwidthPixel = 1100;
        this.paramObj = {
          CurrWorkFlow: Value.data,
          CustomerOrderID: Value.data.ObjectID,
          ModuleViewTypeCode: Number(ModuleViewTypeCode),
          Mode: 'EditMode',
          HeaderName: HeaderName,
          UserRegionCode: this.UserRegionCode,
        };
        this.isClicked = true;
      } else {
        this.IsDown = false;
        const WorkLogIDs = Value.data.JoinWorkflowLogID.split('|');
        this.paramObj = { rows: <any>[], IsWFShow: true };
        this.Cartable.GetFinWorkFlowByWorkLogDetailID(WorkLogIDs).subscribe((res: any[]) => {
          this.IsDown = true;
          if (res.length > 0) {
            res.forEach(element => {
              element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
            });
            this.paramObj = {
              rows: res,
              IsWFShow: true,
              CurrWorkFlow: Value.data,
              CustomerOrderID: Value.data.ObjectID,
              ModuleViewTypeCode: Number(ModuleViewTypeCode),
              UserRegionCode: this.UserRegionCode,
              Mode: 'EditMode',
              HeaderName: HeaderName,
              MinimumPosting: Value.data.MinimumPosting,
            };
            this.type = 'work-flow-send';
            this.isClicked = true;
            this.HaveMaxBtn = false;
            this.startLeftPosition = 250;
            this.startTopPosition = 70;
          } else {
            this.showMessageBox('رکوردی برای نمایش وجود ندارد.');
            return;
          }
        });
      }
    }
    if (Value.data.WorkflowObjectCode === 27) {
      if (Value.data.WorkflowStatusCode === 1 || !Value.data.RelatedWorkflowLogID) {
        this.type = 'customer-product-request-page';
        this.HaveMaxBtn = true;
        this.startLeftPosition = 50;
        this.startTopPosition = 10;
        this.HeightPercentWithMaxBtn = 97;
        this.MinHeightPixel = 645;
        this.PercentWidth = 90;
        this.MainMinwidthPixel = 1215;
        this.paramObj = {
          CurrWorkFlow: Value.data,
          CustomerOrderID: Value.data.ObjectID,
          ModuleViewTypeCode: Number(ModuleViewTypeCode),
          Mode: 'EditMode',
          HeaderName: HeaderName,
          UserRegionCode: this.UserRegionCode,
        };
        this.isClicked = true;
      } else {
        this.IsDown = false;
        const WorkLogIDs = Value.data.JoinWorkflowLogID.split('|');
        this.paramObj = { rows: <any>[], IsWFShow: true };
        this.Cartable.GetFinWorkFlowByWorkLogDetailID(WorkLogIDs).subscribe((res: any[]) => {
          this.IsDown = true;
          if (res.length > 0) {
            res.forEach(element => {
              element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
            });
            this.paramObj = {
              rows: res,
              IsWFShow: true,
              CurrWorkFlow: Value.data,
              CustomerOrderID: Value.data.ObjectID,
              ModuleViewTypeCode: Number(ModuleViewTypeCode),
              UserRegionCode: this.UserRegionCode,
              Mode: 'EditMode',
              HeaderName: HeaderName,
              MinimumPosting: Value.data.MinimumPosting,
            };
            this.type = 'work-flow-send';
            this.isClicked = true;
            this.HaveMaxBtn = false;
            this.startLeftPosition = 250;
            this.startTopPosition = 70;
          } else {
            this.showMessageBox('رکوردی برای نمایش وجود ندارد.');
            return;
          }
        });
      }
    }
    if (Value.data.WorkflowObjectCode === 26) {
      if (Value.data.WorkflowStatusCode === 1 || !Value.data.RelatedWorkflowLogID) {
        this.type = 'app-asset';
        this.HaveMaxBtn = true;
        this.startLeftPosition = 50;
        this.startTopPosition = 10;
        this.HeightPercentWithMaxBtn = 97;
        this.MinHeightPixel = 645;
        this.PercentWidth = 90;
        this.MainMinwidthPixel = 1215;
        this.paramObj = {
          CurrWorkFlow: Value.data,
          AssetID: Value.data.ObjectID,
          ModuleViewTypeCode: Number(ModuleViewTypeCode),
          Mode: 'EditMode',
          HeaderName: HeaderName,
          UserRegionCode: this.UserRegionCode,
          selectedRow: {
            WorkflowTypeName: Value.data.WorkflowTypeName,
            WorkflowTypeCode: Value.data.WorkflowTypeCode,
            WorkflowObjectCode: Value.data.WorkflowObjectCode,
            ObjectNo: Value.data.ObjectNo,
            AssetID: Value.data.ObjectID,
            ContractOrderId: Value.data.ObjectID,
            RegionCode: Value.data.RegionCode,
            RegionName: Value.data.RegionName,
            CartableUserID: Value.data.CartableUserID,
            ProductID: Value.data.ContractID

          }
        };
        this.isClicked = true;
      } else {
        this.IsDown = false;
        const WorkLogIDs = Value.data.JoinWorkflowLogID.split('|');
        this.paramObj = { rows: <any>[], IsWFShow: true };
        this.Cartable.GetFinWorkFlowByWorkLogDetailID(WorkLogIDs).subscribe((res: any[]) => {
          this.IsDown = true;
          if (res.length > 0) {
            res.forEach(element => {
              element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
            });
            this.paramObj = {
              rows: res,
              IsWFShow: true,
              CurrWorkFlow: Value.data,
              AssetID: Value.data.ObjectID,
              ModuleViewTypeCode: Number(ModuleViewTypeCode),
              UserRegionCode: this.UserRegionCode,
              Mode: 'EditMode',
              HeaderName: HeaderName,
              MinimumPosting: Value.data.MinimumPosting,
              selectedRow: {
                WorkflowTypeName: Value.data.WorkflowTypeName,
                WorkflowTypeCode: Value.data.WorkflowTypeCode,
                WorkflowObjectCode: Value.data.WorkflowObjectCode,
                ObjectNo: Value.data.ObjectNo,
                AssetID: Value.data.ObjectID,
                ContractOrderId: Value.data.ObjectID,
                RegionCode: Value.data.RegionCode,
                RegionName: Value.data.RegionName,
                CartableUserID: Value.data.CartableUserID,
                ProductID: Value.data.ContractID

              }
            };
            this.type = 'work-flow-send';
            this.isClicked = true;
            this.HaveMaxBtn = false;
            this.startLeftPosition = 250;
            this.startTopPosition = 70;
          } else {
            this.showMessageBox('رکوردی برای نمایش وجود ندارد.');
            return;
          }
        });
      }
    }
    if (Value.data.WorkflowObjectCode === 28) {
      if (Value.data.WorkflowStatusCode === 1 || !Value.data.RelatedWorkflowLogID) {
        this.type = 'contract-supervision';
        this.HaveMaxBtn = true;
        this.startLeftPosition = 100;
        this.startTopPosition = 10;
        this.HeightPercentWithMaxBtn = 97;
        this.MinHeightPixel = 645;
        this.MainMinwidthPixel = 1100;
        this.paramObj = {
          CurrWorkFlow: Value.data,
          SelectedCnrtSupervisionID: Value.data.ObjectID,
          ModuleViewTypeCode: Number(ModuleViewTypeCode),
          Mode: 'EditMode',
          HeaderName: HeaderName,
          UserRegionCode: this.UserRegionCode,
        };
        this.isClicked = true;
      } else {
        this.IsDown = false;
        const WorkLogIDs = Value.data.JoinWorkflowLogID.split('|');
        this.paramObj = { rows: <any>[], IsWFShow: true };
        this.Cartable.GetFinWorkFlowByWorkLogDetailID(WorkLogIDs).subscribe((res: any[]) => {
          this.IsDown = true;
          if (res.length > 0) {
            res.forEach(element => {
              element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
            });
            this.paramObj = {
              rows: res,
              IsWFShow: true,
              CurrWorkFlow: Value.data,
              SelectedCnrtSupervisionID: Value.data.ObjectID,
              ModuleViewTypeCode: Number(ModuleViewTypeCode),
              UserRegionCode: this.UserRegionCode,
              Mode: 'EditMode',
              HeaderName: HeaderName,
              MinimumPosting: Value.data.MinimumPosting,
            };
            this.type = 'work-flow-send';
            this.isClicked = true;
            this.HaveMaxBtn = false;
            this.startLeftPosition = 250;
            this.startTopPosition = 70;
          } else {
            this.showMessageBox('رکوردی برای نمایش وجود ندارد.');
            return;
          }
        });
      }
    }
    if (Value.data.WorkflowObjectCode === 29) {
      if (Value.data.WorkflowStatusCode === 1 || !Value.data.RelatedWorkflowLogID) {
        this.type = 'contract';
        this.HaveMaxBtn = true;
        this.startLeftPosition = 60;
        this.startTopPosition = 5;
        this.HeightPercentWithMaxBtn = 97;
        this.MainMinwidthPixel = 1215;
        this.MinHeightPixel = 645;
        this.paramObj = {
          CurrWorkFlow: Value.data,
          ReferenceUserName: Value.data.ReferenceUserName,
          RoleName: Value.data.RoleName,
          ReferenceRoleName: Value.data.ReferenceRoleName,
          Note: Value.data.Note,
          ContractReceiveFactorID: Value.data.ObjectID,
          WorkFlowID: Value.data.WorkflowID,
          ReadyToConfirm: Value.data.ReadyToConfirm,
          IsEnd: Value.data.IsEnd,
          WorkflowTypeName: Value.data.WorkflowTypeName,
          WorkflowTypeCode: Value.data.WorkflowTypeCode,
          WorkflowObjectCode: Value.data.WorkflowObjectCode,
          ObjectNo: Value.data.ObjectNo,
          ObjectID: Value.data.ObjectID,
          ModuleCode: Value.data.ModuleCode,
          ModuleViewTypeCode: Number(ModuleViewTypeCode),
          Mode: 'EditMode',
          IsViewable: false,
          CostFactorID: Value.data.ObjectID,
          SelectedRow: null,
          ContractTypeCode: -1,
          ISProvisionRemain: Value.data.WorkflowObjectCode === 4,
          ISEstateRequest: Value.data.WorkflowObjectCode === 6,
          ISTahator: Value.data.WorkflowObjectCode === 13,
          RegionCode: Value.data.RegionCode,
          RegionName: Value.data.RegionName,
          MinimumPosting: Value.data.MinimumPosting,
          HeaderName: HeaderName,
          UserRegionCode: this.UserRegionCode,
          CartableUserID: Value.data.CartableUserID,
        };
        this.isClicked = true;
      } else {
        this.IsDown = false;
        const WorkLogIDs = Value.data.JoinWorkflowLogID.split('|');
        this.paramObj = { rows: <any>[], IsWFShow: true };
        this.Cartable.GetFinWorkFlowByWorkLogDetailID(WorkLogIDs).subscribe((res: any[]) => {
          this.IsDown = true;
          if (res.length > 0) {
            res.forEach(element => {
              element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
            });
            this.type = 'contract';
            this.HaveMaxBtn = true;
            this.startLeftPosition = 60;
            this.startTopPosition = 5;
            this.MainMinwidthPixel = 1215;
            this.HeightPercentWithMaxBtn = 97;
            this.MinHeightPixel = 645;
            this.paramObj = {
              CurrWorkFlow: Value.data,
              ReferenceUserName: Value.data.ReferenceUserName,
              RoleName: Value.data.RoleName,
              ReferenceRoleName: Value.data.ReferenceRoleName,
              Note: Value.data.Note,
              ContractReceiveFactorID: Value.data.ObjectID,
              WorkFlowID: Value.data.WorkflowID,
              ReadyToConfirm: Value.data.ReadyToConfirm,
              IsEnd: Value.data.IsEnd,
              WorkflowTypeName: Value.data.WorkflowTypeName,
              WorkflowTypeCode: Value.data.WorkflowTypeCode,
              WorkflowObjectCode: Value.data.WorkflowObjectCode,
              ObjectNo: Value.data.ObjectNo,
              ObjectID: Value.data.ObjectID,
              ModuleCode: Value.data.ModuleCode,
              ModuleViewTypeCode: Number(ModuleViewTypeCode),
              Mode: 'EditMode',
              IsViewable: false,
              CostFactorID: Value.data.ObjectID,
              SelectedRow: null,
              ContractTypeCode: -1,
              ISProvisionRemain: Value.data.WorkflowObjectCode === 4,
              ISEstateRequest: Value.data.WorkflowObjectCode === 6,
              ISTahator: Value.data.WorkflowObjectCode === 13,
              RegionCode: Value.data.RegionCode,
              RegionName: Value.data.RegionName,
              MinimumPosting: Value.data.MinimumPosting,
              HeaderName: HeaderName,
              UserRegionCode: this.UserRegionCode,
              CartableUserID: Value.data.CartableUserID,
            };
            this.isClicked = true;
          } else {
            this.showMessageBox('رکوردی برای نمایش وجود ندارد.');
            return;
          }
        });
      }
    }

    if (Value.data.WorkflowObjectCode === 30) {
      if (Value.data.WorkflowStatusCode === 1 || !Value.data.RelatedWorkflowLogID) {
        this.type = 'product-request-invest-archive';
        this.HaveMaxBtn = true;
        this.startLeftPosition = 115;
        this.startTopPosition = 10;
        this.HeightPercentWithMaxBtn = 97;
        this.MinHeightPixel = 645;
        this.PercentWidth = 80;
        //this.MainMaxwidthPixel = this.MainMinwidthPixel = 1200;
        this.paramObj = {
          CurrWorkFlow: Value.data,
          CostFactorID: Value.data.ObjectID,
          ModuleViewTypeCode: Number(ModuleViewTypeCode),
          Mode: 'EditMode',
          HeaderName: HeaderName,
          UserRegionCode: this.UserRegionCode,
        };
        this.isClicked = true;
      } else {
        this.IsDown = false;
        const WorkLogIDs = Value.data.JoinWorkflowLogID.split('|');
        this.paramObj = { rows: <any>[], IsWFShow: true };
        this.Cartable.GetFinWorkFlowByWorkLogDetailID(WorkLogIDs).subscribe((res: any[]) => {
          this.IsDown = true;
          if (res.length > 0) {
            res.forEach(element => {
              element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
            });
            this.paramObj = {
              rows: res,
              IsWFShow: true,
              CurrWorkFlow: Value.data,
              CostFactorID: Value.data.ObjectID,
              ModuleViewTypeCode: Number(ModuleViewTypeCode),
              UserRegionCode: this.UserRegionCode,
              Mode: 'EditMode',
              HeaderName: HeaderName,
              MinimumPosting: Value.data.MinimumPosting,
            };
            this.type = 'work-flow-send';
            this.isClicked = true;
            this.HaveMaxBtn = false;
            this.startLeftPosition = 250;
            this.startTopPosition = 70;
          } else {
            this.showMessageBox('رکوردی برای نمایش وجود ندارد.');
            return;
          }
        });
      }
    }
  }
  onShowReport() {
    if (!this.selectedRow || !this.selectedRow.data || !this.selectedRow.data.WorkflowID) {
      this.showMessageBox(' ردیفی جهت مشاهده گردش انتخاب نشده است');
    } else {
      this.Report.ShowReport(this.selectedRow.data.WorkflowID,
        this.selectedRow.data.WorkflowInstanceID,
        this.selectedRow.data.ObjectID,
        this.selectedRow.data.ObjectCode,
        this.selectedRow.data.ObjectNo,
        this.selectedRow.data.ObjectPersianDate,
        this.selectedRow.data.ObjectSubject,
        this.selectedRow.data.ObjectActorName,
        this.selectedRow.data.WorkflowTypeCode,
        this.selectedRow.data.WorkflowTypeName,
        99999,
        this.selectedRow.data.RegionCode);
    }
  }
  onShowWFDetials() {
    if (!this.selectedRow || !this.selectedRow.data || !this.selectedRow.data.WorkflowID) {
      this.showMessageBox(' ردیفی جهت مشاهده گردش انتخاب نشده است');
    } else {
      this.type = 'user-work-log-details';
      this.HaveHeader = true;
      this.HaveMaxBtn = true;
      this.startLeftPosition = 110;
      this.startTopPosition = 8;
      this.HeightPercentWithMaxBtn = 98;
      this.MinHeightPixel = 644;
      if (this.selectedRow.data.WorkflowObjectCode === 2) {
        this.ContractList.GetContractDataByID(this.selectedRow.data.ContractID).subscribe(res => {
          this.paramObj = {
            HeaderName: 'جزئیات گردش',
            Subject: res[0].Subject,
            PersianProductRequestDate: this.selectedRow.data.ObjectPersianDate,
            workflowtypeStatus: this.selectedRow.data.WorkflowObjectCode,
            WorkFlowInstanceId: this.selectedRow.data.WorkflowInstanceID,
            ProductRequestCode: this.selectedRow.data.ObjectCode,
            ParentModuleCode: 999999,
            LetterNo: res[0].LetterNo,
            FinYearCode: res[0].FinYearCode,
            ContractNo: res[0].ContractNo,
            ContractPayDate: this.selectedRow.data.ObjectPersianDate,
            ContractCode: res[0].ContractCode,
            ContractorName: res[0].ContractorName,
            ContractTypeName: res[0].ContractTypeName,
            ContractAmount: res[0].ContractAmount,
            LetterDatePersian: res[0].LetterDatePersian,
            ContractPayTechnicalCode: this.selectedRow.data.ObjectNo
          };
          this.isClicked = true;
        });
      } else {
        this.paramObj = {
          HeaderName: 'جزئیات گردش',
          Subject: this.selectedRow.data.ObjectSubject,
          PersianProductRequestDate: this.selectedRow.data.ObjectPersianDate,
          workflowtypeStatus: this.selectedRow.data.WorkflowObjectCode,
          WorkFlowInstanceId: this.selectedRow.data.WorkflowInstanceID,
          ProductRequestCode: this.selectedRow.data.ObjectCode,
          ParentModuleCode: 999999,
        };
        this.isClicked = true;
      }
    }
  }

  getOutPutParam(event) {
    if (this.type === 'message-box' && this.selectedRow.data.IsEnd === 1 && !this.IsFinishedWLRow && !this.onReturnClicked) {
      this.Cartable.UserConfirmWorkFlow(
        this.selectedRow.data,
        this.selectedRow.data.WorkflowID,
        this.WorkFlowTransitionID,
        null,
        '',
        this.selectedRow.data.ObjectNo,
        this.selectedRow.data.WorkflowTypeCode,
        this.selectedRow.data.WorkflowTypeName,
        this.selectedRow.data.ObjectID,
        this.selectedRow.data.CartableUserID,
      )
        .subscribe(res => {
          this.getRowData();
        },
          err => {
            const str = err.error.split('|');
            if (str[1]) {
              this.showMessageBox(str[1]);
            } else {
              this.showMessageBox('خطای پیش بینی نشده');
            }
          });
    } else if (this.type === 'message-box' && this.IsFinishedWLRow && this.onReturnClicked) {
      this.Cartable.UserReturnWorkFlow(
        this.selectedRow.data,
        this.selectedRow.data.WorkflowID,
        this.WorkFlowTransitionID,
        null,
        '',
        this.selectedRow.data.ObjectNo,
        this.selectedRow.data.WorkflowTypeName,
        this.selectedRow.data.ObjectID,
        this.selectedRow.data.WorkflowTypeCode,
        this.selectedRow.data.CartableUserID,
      )
        .subscribe(res => {
          this.getRowData();
        },
          err => {
            const str = err.error.split('|');
            if (str[1]) {
              this.alertMessageParams.message = str[1];
            } else {
              this.alertMessageParams.message = 'خطای پیش بینی نشده';
            }
            this.isClicked = true;
          });
      this.onReturnClicked = false;
    }

    if (this.type === 'user-select') {
      if (event.SelectType === 1) {
        this.NewUserSelected = true;
        this.gridheader = event.ActorName + ': ';
        for (let i = 0; i < event.Roles.length; i++) {
          if (i < (event.Roles.length - 1)) {
            const temp = event.Roles[i] + '  ,  ';
            this.gridheader += temp;
          } else {
            this.gridheader += event.Roles[i];
          }
        }
        this.WorkflowObjectItems = this.DeletedWorkflowObjectItems = this.FinishedWorkflowObjectItems = this.InProgWorkflowObjectItems = null;
        this.OnOpenNgSelect('Current', true);
        if (this.IsFinishCartableClick) {
          this.OnOpenNgSelect('Finished', true);
        }

        if (this.InProgressCartableClick) {
          this.OnOpenNgSelect('InProg', true);
        }

        if (this.IsDeletedCartableClick) {
          this.OnOpenNgSelect('Deleted', true);
        }
      } else {
        this.NewUserMenuSelected = true;
        this.CrtableRefreshService.RefreshMenu();
      }
    }
  }

  showMessageBox(message) {
    this.type = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.alertMessageParams.message = message;
    this.isClicked = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
  }

  ShowUsersList() {
    this.HaveHeader = false;
    this.isClicked = true;
    this.type = 'user-select';
    this.HaveMaxBtn = false;
    this.startLeftPosition = 275;
    this.startTopPosition = 225;
    this.HeightPercentWithMaxBtn = 10;
    this.PercentWidth = 35;
  }

  RemoveSelectedUser() {
    // tslint:disable-next-line: no-shadowed-variable
    const promise = new Promise<void>((resolve, reject) => {
      this.Actor.RemoveSelectedUserSessionForCartable().subscribe(res => {
        resolve();
      }, err => {
        reject();
      });
    }).then(() => {
      this.WorkflowObjectItems = this.DeletedWorkflowObjectItems = this.FinishedWorkflowObjectItems = this.InProgWorkflowObjectItems = null;
      this.CrtableRefreshService.RefreshCartable();
      this.NewUserSelected = false;
      this.gridheader = '';

      if (this.IsFinishCartableClick) {
        this.OnOpenNgSelect('Finished', true);
      }

      if (this.InProgressCartableClick) {
        this.OnOpenNgSelect('InProg', true);
      }

      if (this.IsDeletedCartableClick) {
        this.OnOpenNgSelect('Deleted', true);
      }

    }).catch(() => {
    });
  }

  OnCurrentCartableClick(IsCurrentCartableClick) {
    this.IsCurrentCartableClick = IsCurrentCartableClick;
    this.IsFinishCartableClick = this.IsDeletedCartableClick = this.InProgressCartableClick = false;
    this.IsDisableConfirm = !IsCurrentCartableClick;
    this.IsDisableFree = !IsCurrentCartableClick;
    this.IsDisableReturn = false;
    this.selectedRow = null;
    if (!this.WorkflowObjectItems) {
      this.OnOpenNgSelect('Current', true);
    }
  }

  OnFinishCartableClick(IsFinishCartableClick) {
    this.IsFinishCartableClick = IsFinishCartableClick;
    this.IsCurrentCartableClick = this.IsDeletedCartableClick = this.InProgressCartableClick = false;
    this.IsDisableConfirm = IsFinishCartableClick;
    this.IsDisableFree = IsFinishCartableClick;
    this.IsDisableReturn = false;
    this.selectedRow = null;
    if (!this.FinishedWorkflowObjectItems) {
      this.OnOpenNgSelect('Finished', true);
    }
  }

  OnDeletedCartableClick(IsDeletedCartableClick) {
    this.IsDeletedCartableClick = IsDeletedCartableClick;
    this.IsCurrentCartableClick = this.IsFinishCartableClick = this.InProgressCartableClick = false;
    this.IsDisableFree = this.IsDisableReturn = this.IsDisableConfirm = IsDeletedCartableClick;
    this.selectedRow = null;
    if (!this.DeletedWorkflowObjectItems) {
      this.OnOpenNgSelect('Deleted', true);
    }
  }

  OnInProgressCartableClick(InProgressCartableClick) {
    this.selectedRow = null;
    this.InProgressCartableClick = InProgressCartableClick;
    this.IsCurrentCartableClick = this.IsDeletedCartableClick = this.IsFinishCartableClick = false;
    this.IsDisableFree = this.IsDisableReturn = this.IsDisableConfirm = InProgressCartableClick;
    if (!this.InProgWorkflowObjectItems) {
      this.OnOpenNgSelect('InProg', true);
    }
  }

  GetFinishCartableRowData(CurrentWFItems = null) {
    if (this.IsFinishCartableClick) {
      let SelectedWorkflowObjectList = [];
      if (!CurrentWFItems) {
        this.FinishedWorkflowObjectParams.selectedObject.forEach(element => {
          SelectedWorkflowObjectList.push(element);
        });
      }
      this.UserSettings.GetUserFinishedWorkList(CurrentWFItems ? CurrentWFItems : SelectedWorkflowObjectList).subscribe(res => {
        if (CurrentWFItems) {
          SelectedWorkflowObjectList = [];
          const CurrentItems = [];
          const WFObjectList = this.CommonService.GroupBy(res, 'WorkflowObjectCode');
          this.FinishedWorkflowObjectItems.forEach(element => {
            const AItem = WFObjectList.find(z => Number(z.key) === element.WorkflowObjectCode);
            if (AItem && AItem.List.length > 0) {
              element.CartableCount = AItem.List.length;
              element.WorkflowObjectName = element.WorkflowObjectName + ' - تعداد ' + element.CartableCount;
              CurrentItems.push(element);
              SelectedWorkflowObjectList.push(element.WorkflowObjectCode);
            }
          });
          this.FinishedWorkflowObjectItems = CurrentItems;
          this.FinishedWorkflowObjectParams.selectedObject = SelectedWorkflowObjectList;
        }
        this.UserFinishedWorkListrowData = res;
        this.IsDown = true;
      });
    }
  }

  GetDeletedCartableRowData(CurrentWFItems = null) {
    if (this.IsDeletedCartableClick) {
      let SelectedWorkflowObjectList = [];
      if (!CurrentWFItems) {
        this.FinishedWorkflowObjectParams.selectedObject.forEach(element => {
          SelectedWorkflowObjectList.push(element);
        });
      }
      this.UserSettings.GetUserDeleteddWorkList(CurrentWFItems ? CurrentWFItems : SelectedWorkflowObjectList).subscribe(res => {
        if (CurrentWFItems) {
          SelectedWorkflowObjectList = [];
          const CurrentItems = [];
          const WFObjectList = this.CommonService.GroupBy(res, 'WorkflowObjectCode');
          this.DeletedWorkflowObjectItems.forEach(element => {
            const AItem = WFObjectList.find(z => Number(z.key) === element.WorkflowObjectCode);
            if (AItem && AItem.List.length > 0) {
              element.CartableCount = AItem.List.length;
              element.WorkflowObjectName = element.WorkflowObjectName + ' - تعداد ' + element.CartableCount;
              CurrentItems.push(element);
              SelectedWorkflowObjectList.push(element.WorkflowObjectCode);
            }
          });
          this.DeletedWorkflowObjectItems = CurrentItems;
          this.DeletedWorkflowObjectParams.selectedObject = SelectedWorkflowObjectList;
        }
        this.UserDeletedWorkListrowData = res;
        this.IsDown = true;
      });
    }
  }

  GetInProgressCartableRowData(CurrentWFItems = null) {
    if (this.InProgressCartableClick) {
      let SelectedWorkflowObjectList = [];
      if (!CurrentWFItems) {
        this.InProgressWorkflowObjectParams.selectedObject.forEach(element => {
          SelectedWorkflowObjectList.push(element);
        });
      }
      this.UserSettings.GetUserInProgressWorkList(CurrentWFItems ? CurrentWFItems : SelectedWorkflowObjectList).subscribe(res => {
        if (CurrentWFItems) {
          SelectedWorkflowObjectList = [];
          const CurrentItems = [];
          const WFObjectList = this.CommonService.GroupBy(res, 'WorkflowObjectCode');
          this.InProgWorkflowObjectItems.forEach(element => {
            const AItem = WFObjectList.find(z => Number(z.key) === element.WorkflowObjectCode);
            if (AItem && AItem.List.length > 0) {
              element.CartableCount = AItem.List.length;
              element.WorkflowObjectName = element.WorkflowObjectName + ' - تعداد ' + element.CartableCount;
              CurrentItems.push(element);
              SelectedWorkflowObjectList.push(element.WorkflowObjectCode);
            }
          });
          this.InProgWorkflowObjectItems = CurrentItems;
          this.InProgressWorkflowObjectParams.selectedObject = SelectedWorkflowObjectList;
        }
        this.UserInProgressrowData = res;
        this.IsDown = true;
      });
    }
  }

  onFreeClick() {
    if (!this.InProgressCartableClick && !this.IsFinishCartableClick) {
      if (this.selectedRow == null) {
        this.showMessageBox(' ردیفی جهت آزاد سازی انتخاب نشده است');
      } else {
        this.Cartable.FreeWorkFlow(this.selectedRow.data.WorkflowID)
          .subscribe(
            res => {
              this.showMessageBox('آزاد سازی با موفقیت انجام شد');
            },
            err => {
              console.log(err);
            },
          );
      }
    }
  }

  InProgressWorkListRowClick(event) {
    this.selectedRow = event;
  }

  OnOpenNgSelect(Type, Fill = null) {
    this.Workflow.GetWorkflowObjectList(Type === 'Current' ? 1 : 0).subscribe(res => {
      if (Type === 'Current') {
        this.WorkflowObjectItems = res;
      } else if (Type === 'Finished') {
        this.FinishedWorkflowObjectItems = res;
      } else if (Type === 'InProg') {
        this.InProgWorkflowObjectItems = res;
      } else if (Type === 'Deleted') {
        this.DeletedWorkflowObjectItems = res;
      }

      if (Fill) {

        switch (Type) {
          case 'Current':
            const CurrentSelectedIDs = [];
            this.WorkflowObjectItems.forEach(element => {
              CurrentSelectedIDs.push(element.WorkflowObjectCode);
            });
            this.UserWorkListrowData = this.WorkflowObjectParams.selectedObject = [];
            this.IsDown = false;
            this.getRowData(CurrentSelectedIDs);
            break;

          case 'Finished':
            const FinishedSelectedIDs = [];
            this.FinishedWorkflowObjectItems.forEach(element => {
              FinishedSelectedIDs.push(element.WorkflowObjectCode);
            });
            this.UserFinishedWorkListrowData = this.FinishedWorkflowObjectParams.selectedObject = [];
            this.IsDown = false;
            this.GetFinishCartableRowData(FinishedSelectedIDs);
            break;

          case 'InProg':
            const InProgSelectedIDs = [];
            this.InProgWorkflowObjectItems.forEach(element => {
              InProgSelectedIDs.push(element.WorkflowObjectCode);
            });
            this.UserInProgressrowData = this.InProgressWorkflowObjectParams.selectedObject = [];
            this.IsDown = false;
            this.GetInProgressCartableRowData(InProgSelectedIDs);
            break;

          case 'Deleted':
            const DeletedSelectedIDs = [];
            this.DeletedWorkflowObjectItems.forEach(element => {
              DeletedSelectedIDs.push(element.WorkflowObjectCode);
            });
            this.UserDeletedWorkListrowData = this.DeletedWorkflowObjectParams.selectedObject = [];
            this.IsDown = false;
            this.GetDeletedCartableRowData(DeletedSelectedIDs);

            break;

          default:
            break;
        }
      }
    });
  }

  onChangeWorkflowObject(event) { // کمبوی کارتابل جاری
    this.WorkflowObjectParams.selectedObject = event;
    this.getRowData();
  }

  onChangeFinishedWorkflowObject(event) { // کمبوی کارتابل خانمه یافته
    this.FinishedWorkflowObjectParams.selectedObject = event;
    this.GetFinishCartableRowData();
  }

  onChangeInProgressWorkflowObject(event) { // کمبوی کارتابل اقدام شده
    this.FinishedWorkflowObjectParams.selectedObject = event;
    this.GetInProgressCartableRowData();
  }

  onChangeDeletedWorkflowObject(event) { // کمبوی کارتابل ابطال شده
    this.DeletedWorkflowObjectParams.selectedObject = event;
    this.GetDeletedCartableRowData();
  }

  ShowMessageBoxWithYesNoBtn(message) {
    this.btnclicked = true;
    this.PopupType = 'message-box';
    this.HaveHeader = true;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }

  MessageBoxAction(ActionResult) {
    if (ActionResult === 'YES') {
      this.Cartable.RedirectToSurveyPage().subscribe(res => {
        if (res) {
          this.PopupType = '';
          this.btnclicked = false;
          window.open(res, '_blank');
          this.showMessageBoxWithOK('سپاس از همیاری شما. مشارکت، باعث ارائه خدمات بهتر به شما در آینده می شود.');
        }
      });
    }
  }
  showMessageBoxWithOK(message) {
    this.PopupType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.btnclicked = true;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  popupMessageclosed() {
    this.OverMainMinwidthPixel = null;
    this.PercentWidth = null;
    this.MainMinwidthPixel = null;
    this.btnclicked = false;
    this.HaveMaxBtn = false;
    this.PopupType = '';
  }
  RemoveChangedMenu() {
    // tslint:disable-next-line: no-shadowed-variable
    const promise = new Promise<void>((resolve, reject) => {
      this.Actor.RemoveSelectedUserSessionForMenu().subscribe(res => {
        resolve();
      }, err => {
        reject();
      });
    }).then(() => {
      this.CrtableRefreshService.RefreshMenu();
      this.NewUserMenuSelected = false;
    }).catch(() => {
    });
  } // 64114
}
