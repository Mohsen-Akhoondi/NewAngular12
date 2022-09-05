import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { JalaliDatepickerComponent } from 'src/app/Shared/jalali-datepicker/jalali-datepicker.component';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';


@Component({
  selector: 'app-corporate-without-inquiry',
  templateUrl: './corporate-without-inquiry.component.html',
  styleUrls: ['./corporate-without-inquiry.component.css']
})
export class CorporateWithoutInquiryComponent implements OnInit {
  @ViewChild('IsSignRightValid') IsSignRightValid: TemplateRef<any>;
  @ViewChild('UploadImage') UploadImage: TemplateRef<any>;
  @ViewChild('SignImageValid') SignImageValid: TemplateRef<any>;
  columnDef_Person;
  PopupParam;
  CurrentPersonID;
  gridApi_Person: any;
  rowData = [];
  BoxDevHeight = 85;
  selectedRow: any;
  IdentityNo: string;
  IdentityNoSearch: any;
  PostCodeSearch: any;
  CorporateObject: any;
  Validate: any;
  ActorId: any;
  Address: any;
  Tel: any;
  Cell: any;
  Email: any;
  Web: any;
  PostCode: any;
  RegionName: any;
  Fax: any;
  EconomicCode: any;
  RegisterReferenceName: any;
  RegisterPersianDate: any;
  RegisterNo: any;
  ActorName: any;
  ModuleCode;
  CorporateName;
  CorporateTypeItem;
  NgSelectResponsibilityTypeParams = {
    bindLabelProp: 'ResponsibilityTypeName',
    bindValueProp: 'ResponsibilityTypeCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'ResponsibilityType',
  };
  NgSelectCorporateTypeParams = {
    bindLabelProp: 'CorporateTypeName',
    bindValueProp: 'CorporateTypeCode',
    placeholder: '',
    MinWidth: '100px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    clearable: false,
    Required: true
  };
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  isClicked: boolean;
  PopUpType: string;
  HaveHeader: boolean;
  HaveMaxBtn: boolean;
  startLeftPosition: number;
  startTopPosition: number;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  IsValid: boolean;
  colDef;
  IsEditable;
  gridApi;
  // csm image var's
  ImgLoadMsgSizeCSM;
  ImgLoadMsgTypeCSM;
  ImgLoadMsgDimensionsCSM;
  fileListlengthCSM;
  selectedFileCSM;
  ImageMsgLodedCSM;
  IsUncorrectCSM;
  imgCSM;
  SelectedMCPRow;
  NgSelectPTTypeParams = {
    bindLabelProp: 'PositionTypeName',
    bindValueProp: 'PositionTypeCode',
    placeholder: '',
    MinWidth: '100px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'Position-type'
  };
  NgSelectActorCSMParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '170px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    DropDownMinWidth: '300px',
    type: 'Actor-MCP',
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
      SearchItemDetails:
        [{ HeaderCaption: 'کد ملی', HeaderName: 'IdentityNo', width: 35, TermLenght: 10, SearchOption: 'IdentityNo' },
        { HeaderCaption: 'نام و نام خانوادگی', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد ملی', width: 35, },
        { HeaderCaption: 'نام و نام خانوادگی', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  ProgramOrgIdentityCode: any;
  CheckValidate = false;
  IsEditFields = true;
  CorporateTypeCode: any;
  CorporateTypeName: any;
  ActorID: any;

  constructor(private Actor: ActorService,
    private ProductRequest: ProductRequestService,
    private router: Router,
    private route: ActivatedRoute,
    private User: UserSettingsService,
    private Common: CommonService,
    private RefreshEquipmentTypeItems: RefreshServices) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }


  ngOnInit() {
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 50;
    this.Actor.GetCorporateTypeItems(this.ModuleCode).subscribe(res => {
      this.CorporateTypeItem = res;
    })
  }

  ngAfterViewInit(): void {
    this.colDef = [
      {
        headerName: 'رديف ',
        field: 'ItemNo',
        width: 50,
        resizable: true,
      },
      {
        headerName: 'نام شخص',
        field: 'ActorName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectActorCSMParams,
          Items: [],
          MoreFunc: this.FetchMoreActorMCP,
          FetchByTerm: this.FetchActorByTermMCP,
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ActorName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ActorId) {
            params.data.ActorID = params.newValue.ActorId;
            params.data.ActorName = params.newValue.ActorName;
            return true;
          } else {
            params.data.ActorID = null;
            params.data.ActorName = null;
            return false;
          }
        },
        editable: true,
        width: 250,
        resizable: true
      },
      {
        headerName: 'پست سازمانی',
        field: 'PositionTypeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectPTTypeParams,
          Items: [],
          Owner: this
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.PositionTypeName) {
            params.data.PositionTypeCode = params.newValue.PositionTypeCode;
            params.data.PositionTypeName = params.newValue.PositionTypeName;
            return true;
          } else {
            params.data.PositionTypeName = '';
            params.data.PositionTypeCode = null;
            return false;
          }
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.PositionTypeName;
          } else {
            return '';
          }
        },
        editable: true,
        width: 130,
        resizable: true
      },
      {
        headerName: 'نوع مسئولیت',
        field: 'ResponsibilityTypeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectResponsibilityTypeParams,
          Items: [],
          Owner: this
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ResponsibilityTypeName) {
            params.data.ResponsibilityTypeCode = params.newValue.ResponsibilityTypeCode;
            params.data.ResponsibilityTypeName = params.newValue.ResponsibilityTypeName;
            return true;
          } else {
            params.data.ResponsibilityTypeName = '';
            params.data.ResponsibilityTypeCode = null;
            return false;
          }
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ResponsibilityTypeName;
          } else {
            return '';
          }
        },
        hide: (this.ModuleCode === 3010 || this.ModuleCode === 3011) ? false : true,
        editable: true,
        width: 130,
        resizable: true
      },
      {
        headerName: 'تاریخ شروع مسئولیت',
        field: 'ShamsiStartDate',
        width: 130,
        resizable: true,
        editable: () => {
          return true;
        },
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'ShamsiStartDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPC: 100,
          AppendTo: '.for-append-date'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.SDate;
          } else {
            return '';
          }
        },
      },
      {
        headerName: 'تاریخ پایان مسئولیت',
        field: 'ShamsiEndDate',
        width: 130,
        resizable: true,
        editable: () => {
          return true;
        },
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'ShamsiEndDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPC: 100,
          AppendTo: '.for-append-date'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.SDate;
          } else {
            return '';
          }
        },
      },
      {
        headerName: 'سال سابقه',
        field: 'HistoryYear',
        width: 80,
        resizable: true,
        sortable: true,
        editable: () => {
          return true;
        }
      },
      {
        headerName: 'ماه سابقه',
        field: 'HistoryMonth',
        width: 80,
        resizable: true,
        sortable: true,
        editable: () => {
          return true;
        }
      },
      {
        headerName: 'تاریخ پایان مسئولیت',
        field: 'ShamsiEmploymentDate',
        width: 130,
        resizable: true,
        editable: () => {
          return true;
        },
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'ShamsiEmploymentDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPC: 100,
          AppendTo: '.for-append-date'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.SDate;
          } else {
            return '';
          }
        },
      },
      {
        headerName: 'حق امضاء',
        field: 'SignRight',
        width: 80,
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsSignRightValid
        },
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.SignRight = params.newValue;
            return true;
          } else {
            params.data.SignRight = false;
            return false;
          }
        },
        resizable: true,
        editable: true
      },
      {
        headerName: 'امضاء',
        field: 'SignImageBase64String',
        width: 80,
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.SignImageValid
        },
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.SignImage = true;
            return true;
          } else {
            params.data.SignImage = false;
            params.data.SignImageBase64String = null;
            return false;
          }
        },
        resizable: true,
        editable: true
      },
      {
        headerName: 'بارگذاری امضاء',
        field: '',
        width: 120,
        sortable: false,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.UploadImage,
        }
      },
      {
        headerName: 'توضیحات',
        field: 'Note',
        width: 350,
        resizable: true,
        sortable: true,
        editable: () => {
          return true;
        }
      },
    ];
  }

  OnCheckBoxChange(event) {
    this.IsValid = event;
  }
  onClose() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }
  popupclosed(event) {
    this.isClicked = false;
    // this.PopUpType = '';
    this.HaveMaxBtn = false;

  }

  onSave() {
    this.CheckValidate = true;
    if (this.NgSelectCorporateTypeParams.selectedObject === null ||
      this.NgSelectCorporateTypeParams.selectedObject <= 0) {
      this.ShowMessageBoxWithOkBtn('نوع شخص حقوقی را انتخاب نمایید');
    }
    const corporatepositionList = [];
    this.gridApi.stopEditing();
    this.gridApi.forEachNode(res => {
      const tempobj = {
        CorporatePositionID: res.data.CorporatePositionID ? res.data.CorporatePositionID : -1,
        SignImageBase64StringSave: res.data.SignImageBase64StringSave ?
          res.data.SignImageBase64StringSave : res.data.SignImageBase64String,
        ActorID: res.data.ActorID,
        Note: res.data.Note,
        StartDate: (res.data.ShamsiStartDate && res.data.ShamsiStartDate.MDate)
          ? res.data.ShamsiStartDate.MDate : res.data.ShortStartDate,
        EndDate: (res.data.ShamsiEndDate && res.data.ShamsiEndDate.MDate)
          ? res.data.ShamsiEndDate.MDate : res.data.ShortEndDate,
        PositionTypeCode: res.data.PositionTypeCode,
        ResponsibilityTypeCode: res.data.ResponsibilityTypeCode ? res.data.ResponsibilityTypeCode : null,
        CorporateActorID: this.ActorId,
        SignRight: res.data.SignRight,
        HistoryMonth: res.data.HistoryMonth,
        HistoryYear: res.data.HistoryYear,
        EmploymentDate: (res.data.ShamsiEmploymentDate && res.data.ShamsiEmploymentDate.MDate)
          ? res.data.ShamsiEmploymentDate.MDate : res.data.ShortEmploymentDate
      };
      corporatepositionList.push(tempobj);
    });
      const CorporateObject = {
        ActorId : this.ActorId,
        RegisterReferenceName : this.RegisterReferenceName,
        RegisterNo : this.RegisterNo,
        RegisterPersianDate : this.RegisterPersianDate,
        Tel :this.Tel,
        Fax : this.Fax,
        Email : this.Email,
        Web : this.Web,
        RegionName : this.RegionName,
        EconomicCode : this.EconomicCode,
        Address : this.Address,
        PostCode : this.PostCode,
        ProgramOrgIdentityCode : this.ProgramOrgIdentityCode,
        CorporateName : this.ActorName ,
        CorporateTypeCode :this.NgSelectCorporateTypeParams.selectedObject ,
        IsValid : this.IsValid,
        IdentityNo : this.IdentityNoSearch,
        

      };   
        if (this.ActorId > 0) {
          this.Actor.UpdateActorCorporate(CorporateObject, corporatepositionList , this.ModuleCode).subscribe(res => {
            this.CorporateObject = res;
            this.Validate = this.CorporateObject.Validate;
            this.ShowMessageBoxWithOkBtn('ویرایش اطلاعات با موفقیت انجام شد');
          });
        } else {
          this.Actor.SaveActorCorporate(CorporateObject, corporatepositionList , this.ModuleCode).subscribe(res => {
            this.CorporateObject = res;
            this.ActorId = this.CorporateObject.ActorId;
            this.Validate = this.CorporateObject.Validate;
            this.ShowMessageBoxWithOkBtn('ثبت اطلاعات با موفقیت انجام شد');
          });
        }
      
      
  }

  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 530;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  onGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }

  onCellEditingStartedMCP(event) {
    if (event.colDef && event.colDef.field === 'ActorName') {
      this.colDef[1].cellEditorParams.Params.loading = true;
      this.Actor.GetActorPaging(1, 30, '', '', true, false, true, event.data.ActorID).subscribe(res => {
        this.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'Actor-MCP'
        });
      });
    }
    if (event.colDef && event.colDef.field === 'PositionTypeName') {
      this.Actor.GetAllPositionType().subscribe(res => {
        this.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'Position-type'
        });
      });
    }
    if (event.colDef && event.colDef.field === 'ResponsibilityTypeName') {
      this.Common.GetAllResponsibilityTypeByCorporateType(this.ModuleCode).subscribe(res => {
        this.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'ResponsibilityType'
        });
      });
    }
  }

  FetchActorByTermMCP(event) {
    event.Owner.colDef[1].cellEditorParams.Params.loading = true;
    event.Owner.Actor.GetActorPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption,
      true, false, true).subscribe(res => {
        event.Owner.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'Actor-MCP'
        });
      });
  }

  FetchMoreActorMCP(event) {
    event.Owner.colDef[1].cellEditorParams.Params.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      event.Owner.Actor.GetActorPaging(event.PageNumber, event.PageSize, event.term,
        event.SearchOption, true, false, true).subscribe(res => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
          });
          resolve(res.TotalItemCount);
        });
    }).then((TotalItemCount: number) => {
      event.Owner.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'Actor-MCP'
      });
    });
  }
  uploadimgCSMClicked() {
    $('#imguploadcsm').click();
  }

  onCSMFileChanged(event) {
    this.ImgLoadMsgSizeCSM = [];
    this.ImgLoadMsgTypeCSM = [];
    this.ImgLoadMsgDimensionsCSM = [];
    const fileListCSM: FileList = event.target.files;
    this.fileListlengthCSM = fileListCSM.length;
    if (fileListCSM.length > 0) {
      this.selectedFileCSM = fileListCSM[0];
      if (this.selectedFileCSM.size > 100000) {
        this.ImgLoadMsgSizeCSM.push({ msg: '*حجم فايل بيش از حد مجاز است' });
        this.ImageMsgLodedCSM = true;
        this.IsUncorrectCSM = true;
      } else { this.IsUncorrectCSM = false; }
      if (this.selectedFileCSM.type.split('/')[1] !== 'png' && this.selectedFileCSM.type.split('/')[1] !== 'jpeg'
        && this.selectedFileCSM.type.split('/')[1] !== 'bmp' && this.selectedFileCSM.type.split('/')[1] !== 'jpg') {
        this.ImgLoadMsgTypeCSM.push({ msg: '*نوع فايل معتبر نيست' });
        this.ImageMsgLodedCSM = true;
        this.IsUncorrectCSM = true;
      } else { this.IsUncorrectCSM = false; }
      const readerCSM = new FileReader();
      readerCSM.onload = e => {
        this.imgCSM = new Image();
        this.imgCSM.onload = () => {
          if (this.imgCSM.width > 1024 || this.imgCSM.height > 1024) {
            this.ImgLoadMsgDimensionsCSM.push({ msg: '*اندازه عکس معتبر نيست' });
            this.ImageMsgLodedCSM = true;
            this.IsUncorrectCSM = true;
          } else {
            this.gridApi.forEachNode(res => {
              if (res.rowIndex === this.SelectedMCPRow) {
                if (res.data.SignImage) {
                  res.data.SignImageBase64StringSave = this.imgCSM.src;
                  res.data.SignImageBase64String = this.imgCSM.src;
                } else {
                  res.data.SignImageBase64String = null;
                  res.data.SignImageBase64StringSave = null;
                }
              }
            });
            this.IsUncorrectCSM = false;
          }
        };
        this.imgCSM.src = readerCSM.result.toString();
      };
      readerCSM.readAsDataURL(this.selectedFileCSM);
    }
  }
  RowClickMCP(event) {
    this.SelectedMCPRow = event.rowIndex;
  }


  BtnArchiveClick() {
    this.ProductRequest.GetDocTypeMadatory(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null).subscribe(ress => { this.onCorporateDocArchiveClick(ress); });
  }

  onCorporateDocArchiveClick(MandatoryDocTypeList) {
    this.PopUpType = 'archive-details';
    this.HaveHeader = true;
    this.isClicked = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 307;
    this.startTopPosition = 10;
    this.PopupParam = { // RFC 52469-item1
      EntityID: this.ActorId,
      TypeCodeStr: '163-',
      DocTypeCode: 163,
      ModuleCode: 2785,
      IsReadOnly: !this.IsEditable,
      MandatoryDocTypeList: MandatoryDocTypeList
    };
  }
}
