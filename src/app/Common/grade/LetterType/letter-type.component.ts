import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';

@Component({
  selector: 'app-letter-type',
  templateUrl: './letter-type.component.html',
  styleUrls: ['./letter-type.component.css']
})
export class LetterTypeComponent implements OnInit {
RowData: any;
private GridApi;
ModuleCode: number;
LetterTypeColDef: any;
HasSave: boolean;
btnclicked: any;
alertMessageParams = { HaveOkBtn: true, message: '' };
HaveHeader: boolean;
type: string;
Dto: any;
private sub: any;
  constructor(private LetterService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private users: UserSettingsService) {
    this.HasSave = false;
    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
   }

  ngOnInit() {
    const promise = new Promise((resolve) => {
      this.users.CheckAdmin().subscribe((res: boolean) => {
        this.HasSave = res;
        resolve(res);
      });
    }).then((Save: boolean) => {
      this.LetterTypeColDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 100,
          resizable: true
        },
        {
          headerName: 'کد نوع نامه',
          field: 'LetterTypeCode',
          width: 100,
          resizable: true,
          editable: false,
        },
        {
          headerName: 'نام نوع نامه ',
          field: 'LetterTypeName',
          width: 250,
          editable: Save,
          resizable: true
        },
    ];
    });
    this.GetAllLetterTypes();
  }
  GetAllLetterTypes() {
    this.RowData = [];
    this.LetterService.GetAllLetterTypes().subscribe(res => {
      this.RowData = res;
    });
   }
  LetterTypeGridReady(event) {
    this.GridApi = event.api;
  }
  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }
  RefreshItemNo () {
    let CurrItemNo = 0;
    const itemsToUpdate = [];
    this.GridApi.forEachNode(function (node) {
      if (node.data.ItemNo) {
        CurrItemNo++;
        node.data.ItemNo = CurrItemNo;
        itemsToUpdate.push(node.data);
      }
    });
    this.GridApi.updateRowData({ update: itemsToUpdate });
  }
  popupclosed() {
    this.btnclicked = false;
  }
  Save() {
    this.GridApi.stopEditing();
    this.RowData = [];
    this.Dto = [];
    this.GridApi.forEachNode((res: any) => {
      this.RowData.push(res.data);
    });
    this.RowData.forEach((res2: any) => {
      const temp = {
        LetterTypeCode: res2.LetterTypeCode,
        LetterTypeName: res2.LetterTypeName,
      };
      this.Dto.push(temp);
    });
    const promise = new Promise ((resolve, reject) => {
      this.LetterService.SaveLetterTypeList(this.Dto, this.ModuleCode).subscribe(
        res => {
        this.btnclicked = true;
        this.type = 'message-box';
        this.HaveHeader = true;
        this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
        resolve();
        },
        err => {
          this.btnclicked = true;
          this.type = 'message-box';
          this.HaveHeader = true;
          this.alertMessageParams.message = 'ثبت با مشکل مواجه شد';
        });
    }).then(() => {
      this.GetAllLetterTypes();
    });
    this.RefreshItemNo();
  }
}
