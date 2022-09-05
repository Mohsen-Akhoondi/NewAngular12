import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { of } from 'rxjs';
import { NgSelectConfig } from 'src/app/Shared/ng-select/public-api';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';


@Component({
  selector: 'app-researcher-product-request-list',
  templateUrl: './researcher-product-request-list.component.html',
  styleUrls: ['./researcher-product-request-list.component.css']
})
export class ResearcherProductRequestListComponent implements OnInit {
  @Input() ModuleCode;
  @Input() ModuleName;
  private gridApi;
  private gridColumnApi;
  columnDef;
  private defaultColDef;
  private rowSelection;
  ResearchrowsData: any;
  selectedRegion = 0;
  RegionListSet = [];
  btnclicked = false;
  DisableDelete = false;
  type: string;
  selectedRow: any;
  paramObj;
  HaveHeader: boolean;
  IsNotWorkFlow = true;
  HaveMaxBtn = false;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  startLeftPosition: number;
  startTopPosition: number;
  MinHeightPixel: number;
  HeightPercentWithMaxBtn: number;
  private sub: any;
  HasRegion = true;
  PercentWidth: number;
  MainMaxwidthPixel: any;
  BtnClickedName: string;

  constructor(private router: Router,
    private RegionList: RegionListService,
    private ProductRequest: ProductRequestService,
    private route: ActivatedRoute,
    config: NgSelectConfig,
  ) {
    config.notFoundText = 'موردی یافت نشد';
    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'کد پژوهش',
        field: 'Id',
        width: 100,
        resizable: true
      },
      {
        headerName: 'موضوع پژوهش',
        field: 'Title',
        width: 1150,
        resizable: true
      },
    ];

  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();
  }

  popupclosed() {
    this.HaveMaxBtn = false;
    this.btnclicked = false;
    this.PercentWidth = null;
    this.MainMaxwidthPixel = null;
    this.MinHeightPixel = null;
    this.type = '';
    this.HeightPercentWithMaxBtn = 95;
  }

  ngOnInit() {
    this.GetResearcherList();
  }

  GetResearcherList(): void {
    this.ResearchrowsData = of([]);
    this.ProductRequest.GetResearcherProductrequestList().subscribe((res: any) => {
      this.ResearchrowsData = res.resultvalue;

    });
  }

  RowClick(InputValue) {
    this.selectedRow = InputValue;
  }

  close(): void {
    this.Closed.emit(true);
  }

  Btnclick(BtnName) {
    if (this.selectedRow) {
      if (this.ModuleCode === 2895) {
        if (BtnName === 'insert') {
          this.type = 'product-request-page';
          this.HaveHeader = true;
          this.btnclicked = true;
          this.startLeftPosition = 20;
          this.startTopPosition = 5;
          this.HaveMaxBtn = true;
          this.HeightPercentWithMaxBtn = 97;
          this.PercentWidth = 90;
          this.MainMaxwidthPixel = 2000;
          this.MinHeightPixel = 645;
          this.paramObj = {
            Mode: 'InsertMode',
            Subject: this.selectedRow.data.Title,
            CostFactorID: -1,
            ResearcherID: this.selectedRow.data.Id,
          };
          return;
        }
      } else if (this.ModuleCode === 2934) {
        if (BtnName === 'insert') {
          this.type = 'product-request-page-without-flow';
          this.HaveHeader = true;
          this.btnclicked = true;
          this.startLeftPosition = 20;
          this.startTopPosition = 5;
          this.HaveMaxBtn = true;
          this.HeightPercentWithMaxBtn = 97;
          this.PercentWidth = 90;
          this.MainMaxwidthPixel = 2000;
          this.MinHeightPixel = 645;
          this.paramObj = {
            Mode: 'InsertMode',
            Subject: this.selectedRow.data.Title,
            CostFactorID: -1,
            ResearcherID: this.selectedRow.data.Id,
          };
          return;
        }
      }
    } else {
      this.ShowMessageBoxWithOkBtn('هیچ ردیفی انتخاب نشده است');
    }
  }

  getOutPutParam(event) {
    if (event && this.type === 'product-request-page') {
      this.ngOnInit();
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
  MessageBoxAction(ActionResult) {

    if (ActionResult === 'YES') {
      this.Closed.emit(true);
    }
    this.type = '';
    this.BtnClickedName = '';
    this.btnclicked = false;
  }

}
