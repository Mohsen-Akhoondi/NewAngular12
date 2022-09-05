import { Component, OnInit } from '@angular/core';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { FinYearService } from 'src/app/Services/BaseService/FinYearService';

@Component({
  selector: 'app-control-project-bgt-info-page',
  templateUrl: './control-project-bgt-info-page.component.html',
  styleUrls: ['./control-project-bgt-info-page.component.css']
})
export class ControlProjectBgtInfoPageComponent implements OnInit {

  IsRegiondisable = false;
  RegionItems;
  RegionParams = {
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: this.IsRegiondisable,
    Required: true
  };

  FinYearItems;
  FinYearParams = {
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    Required: true
  };

  onChangeRegion(ARegionCode) {
    this.RegionParams.selectedObject = ARegionCode;
  }

  OnOpenNgSelect(type) {
    switch (type) {
      case 'Region':
        this.RegionList.GetRegionList(true).subscribe(res => {
          this.RegionItems = res;
          this.RegionParams.selectedObject = this.RegionItems[0].RegionCode;
        });
        break;
      case 'FinYear':
        this.FinYearList.GetFinYearList().subscribe(res => {
          this.FinYearItems = res;
        });
        break;

      default:
        break;
    }
  }

  constructor(
    private RegionList: RegionListService,
    private FinYearList: FinYearService
  ) { }

  ngOnInit() {
    this.RegionList.GetRegionList(true).subscribe(res => {
      this.RegionItems = res;
      this.RegionParams.selectedObject = this.RegionItems[0].RegionCode;
    });
  }

}
