import { Component, OnInit } from '@angular/core';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';

@Component({
  selector: 'app-contract-archive-list',
  templateUrl: './contract-archive-list.component.html',
  styleUrls: ['./contract-archive-list.component.css']
})
export class ContractArchiveListComponent implements OnInit {
  NgSelectFromFinYearParams = {
    Items: [],
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  RegionParams = {
    Items: [],
    bindLabelProp: 'RegionCodeName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    clearable: false
  };
  FinYearList: any;
  ReigonListSet = [];
  ModuleCode: number;
  rowData = [];
  columnDef;
  btnclicked: boolean;
  type: string;
  HaveHeader: boolean;
  startLeftPosition: number;
  startTopPosition: number;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  ContractCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  HasArchive =false;

  constructor(private Workflow: WorkflowService,
    private Region: RegionListService,
    private route: ActivatedRoute,
    private Contract: ContractListService,
    private router: Router) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
    this.columnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'شماره قرارداد',
        field: 'LetterNo',
        width: 130,
        resizable: true
      },
      {
        headerName: 'موضوع قرارداد',
        field: 'Subject',
        width: 250,
        resizable: true
      },
      {
        headerName: 'تاریخ قرارداد',
        field: 'LetterDatePersian',
        width: 100,
        resizable: true
      },
      {
        headerName: 'تاریخ شروع قرارداد',
        field: 'FromContractDatePersian',
        width: 130,
        resizable: true
      },
      {
        headerName: 'تاریخ پایان قرارداد',
        field: 'ToContractDatePersian',
        width: 130,
        resizable: true
      },
    ];
  }

  ngOnInit() {
    
    forkJoin([
      this.Workflow.GetFinYearList(),
      this.Region.GetUserRegionList(),
    ]).subscribe(res => {
      this.FinYearList = res[0];
      this.ReigonListSet = res[1];

    });
  }

  OnSearch() {
    if (this.RegionParams.selectedObject === null) {
      this.ShowMessageBoxWithOkBtn('واحد اجرايي انتخاب نشده است');
      return;
    }
    if (this.NgSelectFromFinYearParams.selectedObject === null) {
      this.ShowMessageBoxWithOkBtn('سال مالی انتخاب نشده است');
      return;
    }
    this.Contract.GetContractArchiveList(this.RegionParams.selectedObject, this.NgSelectFromFinYearParams.selectedObject,this.HasArchive).subscribe(res => {
      this.rowData = res;
    });
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 486;
    this.startTopPosition = 211;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
  }

  closeModal() { 
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }

  OnChangeCheckBoxValue(Ischeck) {
    this.HasArchive = Ischeck;
  }

  popupclosed() {
    this.btnclicked = false;
  }
}
