import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { of } from 'rxjs';

@Component({
  selector: 'app-role-search',
  templateUrl: './role-search.component.html',
  styleUrls: ['./role-search.component.css']
})
export class RoleSearchComponent implements OnInit {
  @Input() ModuleCode;
  @Input() ModuleName;
  ColumnDef;
  SelectedRegionObject;
  rowData: any;
  selectedRegion = 205;
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
  BoxDevHeight = 84;
  private sub: any;
  HasRegion = true;
  PercentWidth: number;
  MainMaxwidthPixel: any;
  BtnClickedName: string;
  gridApi;
  NgSelectMVTParams = {
    bindLabelProp: 'ModuleViewTypeCodeName',
    bindValueProp: 'ModuleViewTypeCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: 1,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'module-view-type'
  };
  constructor(private router: Router,
    private RegionList: RegionListService,
    private route: ActivatedRoute
  ) {
    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
    this.ColumnDef = [
          {
            headerName: 'ردیف ',
            field: 'ItemNo',
            width: 80,
            resizable: true
          },
          {
            headerName: 'نقش',
            field: 'ProductRequestNo',
            width: 100,
            resizable: true,
            sortable: true,
          },
        ];
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

  onChangeRegion(newObj) {
  }

  ngOnInit() {
   this.getNewData();
  }

  getNewData(): void {
    this.RegionList.GetSpecialRegionList(this.ModuleCode, true).subscribe(res => {
      this.HasRegion = res.length > 0;
      if (this.HasRegion) {
        this.RegionListSet = res;
        this.selectedRegion = res[0].RegionCode;
        this.getRolesListData(this.selectedRegion);
        this.SelectedRegionObject = this.RegionListSet.find(x => x.RegionCode === this.selectedRegion);
      }
    });
  }

  getRolesListData(region): void {
    this.rowData = of([]);

  }
  onGridReady(params) {
    this.gridApi = params.api;
  }

  close(): void {
    this.btnclicked = false;
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
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
