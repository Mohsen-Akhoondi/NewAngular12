import { Component, OnInit, Input, Output, EventEmitter,ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { NgSelectConfig } from 'src/app/Shared/ng-select/public-api';
import { ActivatedRoute } from '@angular/router';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { ProductService } from 'src/app/Services/BaseService/ProductService';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {
  @Input() ModuleCode;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  AgridApi: any;
  type: string;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  btnclicked = false;
  startLeftPosition: number;
  startTopPosition: number;
  MinHeightPixel: number;
  PercentWidth: number;
  MainMaxwidthPixel: any;
  HeightPercentWithMaxBtn: number;
  HaveMaxBtn = false;
  BtnClickedName: string;
  selectedRow: any;
  rowData = [];
  private sub: any;
  columnDef;
  BoxDevHeight = 78;
  gridHeight=90;
  FromGoodCodeParams;
  ToGoodCodeParams;
  paramObj;
  selectedProductID: any;
  CheckValidate = false;

  @ViewChild('IsTaxValueValid') IsTaxValueValid: TemplateRef<any>;
  constructor(private router: Router,
    private RegionList: RegionListService,
    config: NgSelectConfig,
    private route: ActivatedRoute,
    private ProductRequest: ProductRequestService,
    private ProductList: ProductService,  
  ) {
    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });


  }

  ngOnInit() {

  }

  ngAfterViewInit(): void{
    this.columnDef = [
      {
        headerName: '???????? ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: '?????? ????????',
        field: 'ProductName',
        width: 150,
        resizable: true
      },
      {
        headerName: ' ???? ???????? ',
        field: 'GoodsCode',
        width: 150,
        resizable: true
      },

      {
        headerName: '???? ?????? ',
        field: 'TechnicalCode',
        width: 150,
        resizable: true
      },
      {
        headerName: '?????????? ????????',
        field: 'GoodNo',
        width: 150,
        resizable: true
      },
      {
        headerName: '?????????????? ',
        field: 'Note',
        width: 170,
        resizable: true
      },
      {
        headerName: ' ?????????? ?????????? ?????????? ',
        field: 'RelatedProductId',
        width: 150,
        resizable: true
      },
      {
        headerName: ' ???????? ??????????  ',
        field: 'ProductTypeName',
        width: 100,
        resizable: true
      },
      {
        headerName: '???????????? ???????????? ???????? ????????????',
        field: 'IsTaxValue',
        width: 190,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsTaxValueValid
        },
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        resizable: true
      },
    ];

  }


  getNewData(): void {

  }

  Search() {
    this.CheckValidate = true;
    let ValidateForm = true;
    ValidateForm = ValidateForm && this.FromGoodCodeParams

    if (ValidateForm) 
    {
      if (!this.ToGoodCodeParams) 
      {
        this.ToGoodCodeParams = this.FromGoodCodeParams
      }
      this.ProductList.GetGoodList(this.FromGoodCodeParams,this.ToGoodCodeParams).subscribe(res => {
      
       if (res && res.length > 0) {
             this.rowData = res; 
               } else {
               this.type = 'message-box';
               this.HaveHeader = true;
               this.alertMessageParams.message = '???????????? ?????? ?????????? ???????? ??????';
               this.btnclicked = true;
               this.startLeftPosition = 500;
               this.startTopPosition = 100;
               }
      });
    }
      else {
        this.ShowMessageBoxWithOkBtn('???????????????? ?????? ?????????? ???????? ?????? ???????? ?????? ???? ?????????? ??????????????');
      }

  }

  onGridReady(params: { api: any; }) {
    this.AgridApi = params.api;
  }

  RowClick(InputValue) {
    this.selectedRow = InputValue;
  }


  Btnclick(BtnName) {
    if (BtnName === 'insert') {
      this.type = 'app-goods-request';
      this.HaveHeader = true;
      this.btnclicked = true;
      this.startLeftPosition = 108;
      this.startTopPosition = 5;
      this.HaveMaxBtn = true;
      this.HeightPercentWithMaxBtn = 97;
      this.PercentWidth = 90;
      this.MainMaxwidthPixel = 2000;
      this.MinHeightPixel = 645;
      this.paramObj = {
        ProductID: -1,  
      };
      return;
    }
    if (BtnName === 'update') {
      if (this.selectedRow == null) {
        this.type = 'message-box';
        this.HaveHeader = true;
        this.alertMessageParams.message = '???????????? ?????? ???????????? ???????????? ???????? ??????';
        this.btnclicked = true;
        this.HaveMaxBtn = false;
        this.startLeftPosition = 500;
        this.startTopPosition = 250;
        this.MinHeightPixel = null;
        return;
      }
      else{   
      this.type ='app-goods-request';
      this.HaveHeader = true;
      this.btnclicked = true;
      this.startLeftPosition = 15;
      this.startTopPosition = 5;
      this.HaveMaxBtn = true;
      this.HeightPercentWithMaxBtn = 97;
      this.PercentWidth = 90;
      this.MainMaxwidthPixel = 2000;
      this.MinHeightPixel = 645;
      this.paramObj = {
        //CostFactorID: this.selectedRow.data.CostFactorID,
        selectedRow :this.selectedRow.data,
        ModuleCode: this.selectedRow.data.ModuleCode,
        Mode: 'EditMode',
        ReadyToConfirm: null,
        SelectedRow: null,
        ModuleViewTypeCode: this.selectedRow.data.ModuleViewTypeCode, 
      };
      return;     
    }
    
      }
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

  close(): void {
    this.btnclicked = false;
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }

  onDeleteclick() {
    this.BtnClickedName = 'BtnDelete';
    this.ShowMessageBoxWithYesNoBtn('?????? ???? ?????? ???????? ???????????? ?????????? ????????????');
  }

  ShowMessageBoxWithYesNoBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 550;
    this.startTopPosition = 182;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }
  MessageBoxAction(ActionResult) {
    if (this.BtnClickedName === 'BtnDelete' && ActionResult === 'YES') {
      this.DoDelete();
    } else {
      this.Closed.emit(true);
    }
    this.type = '';
    this.BtnClickedName = '';
    this.btnclicked = false;
  }
  DoDelete() {
    this.ProductList.DeleteGoods(this.selectedRow.data.ProductID,this.ModuleCode).subscribe(
      res => {
        if (res === true) {
          this.ProductList.GetGoodList(this.FromGoodCodeParams,this.ToGoodCodeParams).subscribe(res1 => {this.rowData = res1});
          this.ShowMessageBoxWithOkBtn('?????? ???? ???????????? ?????????? ????');
        } else {
          this.ShowMessageBoxWithOkBtn('???????? ?????? ???????? ????????');
        }
      });
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

}
