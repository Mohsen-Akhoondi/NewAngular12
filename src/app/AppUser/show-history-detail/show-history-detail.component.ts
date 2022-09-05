import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/Services/CommonService/CommonService';

@Component({
  selector: 'app-show-history-detail',
  templateUrl: './show-history-detail.component.html',
  styleUrls: ['./show-history-detail.component.css']
})
export class ShowHistoryDetailComponent implements OnInit {

  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() InputParam;
  ActorId;
  AuditcolDef;
  AuditrowData: any = [];
  AuditApi;
  AuditHeaderName = 'تاریخچه';

  AuditHistorycolDef;
  AuditHistoryrowData: any = [];
  AuditHistoryApi;
  AuditHistoryHeaderName = 'جزئیات تاریخچه';

  constructor(
    private Common: CommonService,
  ) {
    this.AuditcolDef = [
      {
        headerName: 'رديف',
        field: 'ItemNo',
        width: 50,
        resizable: true,
      },
      {
        headerName: 'تاریخ و زمان',
        field: 'AuditTime',
        width: 150,
        resizable: true,
        editable: false,
      },
      {
        headerName: 'عملیات',
        field: 'OperationName',
        width: 100,
        resizable: true,
        editable: false,
      },
      {
        headerName: 'ماژول',
        field: 'ModuleName',
        width: 120,
        resizable: true,
        editable: false,
      },
      {
        headerName: 'شخص',
        field: 'ActorName',
        width: 120,
        resizable: true,
        editable: false,
      },
      {
        headerName: 'نام کاربری شخص',
        field: 'LoginName',
        width: 120,
        resizable: true,
        editable: false,
      },
      {
        headerName: 'IP',
        field: 'IP',
        width: 120,
        resizable: true,
        editable: false,
      },
    ];
    this.AuditHistorycolDef = [
      {
        headerName: 'رديف',
        field: 'ItemNo',
        width: 50,
        resizable: true,
      },
      {
        headerName: 'نام شئ',
        field: 'PersianTableName',
        width: 130,
        resizable: true,
        editable: false,
      },
      {
        headerName: 'نام فیلد',
        field: 'CommentName',
        width: 130,
        resizable: true,
        editable: false,
      },
      {
        headerName: 'مقدار قدیم',
        field: 'OldValue',
        width: 130,
        resizable: true,
        editable: false,
      },
      {
        headerName: 'مقدار جدید',
        field: 'NewValue',
        width: 130,
        resizable: true,
        editable: false,
      },
    ];
  }

  ngOnInit() {
    this.AuditrowData = [];
    this.AuditHistoryrowData = [];
    if (this.InputParam && this.InputParam.ActorId) {
      this.ActorId = this.InputParam.ActorId;
      this.Common.GetAllByObjectID(this.ActorId, this.InputParam.ModuleCode).subscribe(res => {
        if (res) {
          this.AuditrowData = res;
          this.Common.GetAllAuditHistoryBySessionID(res[0].SessionID, this.ActorId, this.InputParam.ModuleCode).subscribe(res => {
            if (res) {
              this.AuditHistoryrowData = res;
            }
          });
        }
      });
    }
  }

  AuditRowClick(event) {
    this.AuditHistoryrowData = [];
    this.Common.GetAllAuditHistoryBySessionID(event.data.SessionID, this.ActorId, this.InputParam.ModuleCode).subscribe(res => {
      if (res) {
        this.AuditHistoryrowData = res;
      }
    });
  }

  AuditGridReady(event) {
    this.AuditApi = event.api;
  }

  AuditHistoryGridReady(event) {
    this.AuditHistoryApi = event.api;
  }

  onClose() {
    this.Closed.emit(true);
  }
}
