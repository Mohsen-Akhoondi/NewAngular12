import { Component, OnInit, Input } from '@angular/core';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { JalaliDatepickerComponent } from 'src/app/Shared/jalali-datepicker/jalali-datepicker.component';
@Component({
  selector: 'app-actor-certificate',
  templateUrl: './actor-certificate.component.html',
  styleUrls: ['./actor-certificate.component.css']
})

  export class ActorCertificateComponent implements OnInit {
    @Input() InputParam;
    rowData: any;
    ActorId: any;
    alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
    PopUpType: string;
    HaveHeader: boolean;
    HaveMaxBtn: boolean;
    startLeftPosition: number;
    startTopPosition: number;
    isClicked;
    colDef;
    IsEditable;
    constructor(private Actor: ActorService,
                private router: Router,
                private CommonService: CommonServices) {
    this.colDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'نام گواهینامه',
        field: 'CertificateName',
        editable: true,
        width: 120,
        resizable: true
      },
      {
        headerName: 'تاریخ اخذ',
        field: 'CertificateDate',
        width: 120,
        resizable: true,
        editable: true,
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'CertificateDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPx: 120,
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
        headerName: 'مرجع صادرکننده',
        field: 'CertificateRefrence',
        editable: true,
        width: 120,
        resizable: true
      },
      {
        headerName: 'توضیحات',
        field: 'Note',
        editable: true,
        width: 440,
        resizable: true
      }
    ];
    }
    ngOnInit() {
      this.rowData = of([]);
    }
    onClose() {
      this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
    }
    popupclosed(event) {
      this.isClicked = false;
      this.PopUpType = '';
      this.HaveMaxBtn = false;
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
  // onReceiveDocArchiveClick() {
  //     this.PopUpType = 'archive-details';
  //     this.HaveHeader = true;
  //     this.isClicked = true;
  //     this.HaveMaxBtn = false;
  //     this.startLeftPosition = 307;
  //     this.startTopPosition = 10;
  //     this.PopupParam = {
  //      EntityID: this.ActorId,
  //       TypeCodeStr: '11-',
  //       DocTypeCode: 11,
  //       ModuleCode: 2785,
  //     };
  //   }
  onGridReady(params: { api: any; }) {
  }
  onCellValueChanged(event) {
  }
  onReceiveDocArchiveClick() {
  }
}
