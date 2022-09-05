import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartableServices } from 'src/app/Services/WorkFlowService/CartableServices';

@Component({
  selector: 'app-application-note',
  templateUrl: './application-note.component.html',
  styleUrls: ['./application-note.component.css']
})
export class ApplicationNoteComponent implements OnInit {
  @Input() PopupParam;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  columnDef;
  private AppNotegridApi;
  ApplicationNoteRow: any = [];
  Note;
  defaultSelectedRowIndex: number;

  constructor(private Cartable: CartableServices) {
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: false,
      },
      {
        headerName: 'تاریخ انتشار',
        field: 'PersianHistoryDate',
        width: 95,
        resizable: false,
      },
      {
        headerName: 'متن اطلاعیه',
        field: 'Note',
        width: 650,
        resizable: true,
        editable: false
      },
    ];
  }

  onGridReady(params: { api: any; }) {
    this.AppNotegridApi = params.api;
  }

  ngOnInit() {
    if (this.PopupParam.res) {
      this.ApplicationNoteRow = this.PopupParam.res;
      this.defaultSelectedRowIndex = 0;
    }
  }

  closeModal() {
      this.Closed.emit(true);
  }

  RowClick(event) {
    this.Note = event.data.Note;
  }
}
