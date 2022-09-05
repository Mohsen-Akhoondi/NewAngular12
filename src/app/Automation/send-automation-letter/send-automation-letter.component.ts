import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { AutomationService } from 'src/app/Services/BaseService/AutomationService';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';

@Component({
  selector: 'app-send-automation-letter',
  templateUrl: './send-automation-letter.component.html',
  styleUrls: ['./send-automation-letter.component.css']
})

export class SendAutomationLetterComponent implements OnInit {
  @Input() InputParam;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('IsCheck') IsCheck: TemplateRef<any>;
  FolName = '';
  FirstName = '';
  LastName = '';
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  isClicked: boolean;
  PopUpType: string;
  HaveHeader: boolean;
  HaveMaxBtn: boolean;
  startLeftPosition: number;
  startTopPosition: number;
  columnDef;
  rowData = [];
  SelectedRow: any;
  GroupItems = [];
  GroupParams = {
    bindLabelProp: 'GroupName',
    bindValueProp: 'GroupID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
  };
  RegionCode;
  gridApi: any;
  CostFactorID: any;
  LetterTypeCode: any;
  constructor(private router: Router,
    private automation: AutomationService,
    private ProductRequest: ProductRequestService,
    private RegionList: RegionListService,
    private route: ActivatedRoute,
    private Contract: ContractListService) {
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'انتخاب',
        field: 'IsCheck',
        width: 100,
        resizable: true,
        editable: true,
        cellEditorFramework: CheckboxFieldEditableComponent,
        valueFormatter: function isValidFormer(params) {
          if (params.value) {
            return 'معتبر';
          } else {
            return 'نامعتبر';
          }
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsCheck
        },
      },
      {
        headerName: 'نام کاربر',
        field: 'UserName',
        editable: false,
        width: 200,
        resizable: true
      },
      {
        headerName: 'نام پرسنل',
        field: 'PersonnelName',
        editable: false,
        width: 200,
        resizable: true
      },
      {
        headerName: 'عناوین',
        field: 'FolName',
        editable: false,
        width: 300,
        resizable: true
      },
    ];

  }

  ngOnInit() {

    // this.RegionCode = this.InputParam.RegionCode ? this.InputParam.RegionCode : 0;
    // this.CostFactorID = this.InputParam.CostFactorID;
    // this.LetterTypeCode = this.InputParam.LetterTypeCode;

    this.RegionCode = 0;
    this.automation.ShowSendGroup(this.RegionCode).subscribe(res => {

      this.GroupItems = res;
    });

  }
  onSearch() {
    var SelectedGroupIndex = null;
    if (this.GroupParams.selectedObject) {
      SelectedGroupIndex = this.GroupItems.find(x => x.GroupID === this.GroupParams.selectedObject).Index;
    }
    this.automation.PersonnelSearch(this.RegionCode, this.GroupParams.selectedObject, SelectedGroupIndex, this.FolName, this.FirstName, this.LastName)
      .subscribe(res => { this.rowData = res; });
  }
  onSend() {

    const LetterList = [];
    this.gridApi.forEachNode(node => {
      if (node.data.IsCheck) {
        LetterList.push(node.data);
      }
    });

    const CostFactorLtter = {
      CostFactorID: this.CostFactorID,
      LetterTypeCode: this.LetterTypeCode,
    };

    this.automation.SendLetter(this.RegionCode, CostFactorLtter, LetterList)
      .subscribe(res => {

        this.ShowMessageBoxWithOkBtn('ارسال با موفقیت انجام شد.');
      });
  }

  onClose() {
    this.Closed.emit(true);
  }

  popupclosed(event) {
    this.isClicked = false;
    this.PopUpType = '';
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

  RowClick(event) {
    this.SelectedRow = event.data;
  }
  onGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }
}
