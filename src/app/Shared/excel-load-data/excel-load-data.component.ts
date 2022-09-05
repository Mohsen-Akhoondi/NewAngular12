import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { utils, read } from 'xlsx';
import { ExcelService } from 'src/app/Services/BaseService/ExcelService';
import { LoadingService } from 'src/app/Load/loading/LoadingService';

declare var $: any;

@Component({
  selector: 'app-excel-load-data',
  templateUrl: './excel-load-data.component.html',
  styleUrls: ['./excel-load-data.component.css'],
  providers: [ExcelService]
})

export class ExcelLoadDataComponent implements OnInit {
  @Input() Excel_Header_Param: any;
  @Output() ExcelData: EventEmitter<any> = new EventEmitter<any>();
  @Output() ExcelLoadDataClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  selectedFile: File;
  arrayBuffer: any;
  rows = [];
  final_rows = [];
  intersect = [];
  headr_in_excel: any;
  list = new Array(1);
  current_row: any[];
  jsonData = {};
  isLoading = false;
  isClicked = false;
  HaveHeader = true;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  type: string;
  messageBoxResult: any;
  startLeftPosition: number;
  startTopPosition: number;
  ModuleCode: number;

  constructor(private excelService: ExcelService, private Loading: LoadingService) { }

  ngOnInit() {
    if (this.Excel_Header_Param && this.Excel_Header_Param.ModuleCode) {
      this.ModuleCode = this.Excel_Header_Param.ModuleCode;
    }
    $(document).ready(function () {
      $('.custom-file-input').on('change', function () {
        const fileName = $(this)
          .val()
          .split('\\')
          .pop();
        $(this)
          .next('.custom-file-label')
          .addClass('selected')
          .html(fileName);
      });
    });
  }

  onFileChanged(event: { target: { files: File[] } }) {
    this.selectedFile = event.target.files[0];
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes) {
    if (changes.Excel_Header_Param && changes.Excel_Header_Param.currentValue) {
      this.Excel_Header_Param = changes.Excel_Header_Param.currentValue;
    }
  }
  onUpload() {
    if (this.selectedFile === undefined) {
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = 'ابتدا فایل مورد نظر را انتخاب کنید';
      this.isClicked = true;
      this.startLeftPosition = 449;
      this.startTopPosition = 87;
    } else {
      this.isLoading = true;
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        const data = new Uint8Array(this.arrayBuffer);
        const arr = new Array();
        for (let i = 0; i !== data.length; ++i) {
          arr[i] = String.fromCharCode(data[i]);
        }
        const bstr = arr.join('');
        const workbook = read(bstr, { type: 'binary' });
        const first_sheet_name = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[first_sheet_name];
        const x = utils.sheet_to_json(worksheet, { raw: true, header: 1 });
        this.headr_in_excel = x.shift();
        this.intersect = this.Excel_Header_Param.colDef2.filter(value => this.headr_in_excel.indexOf(value.headerName) !== -1);
        if (this.intersect.length === 0 || (this.intersect.length !== this.headr_in_excel.length)) {
          this.ShpoMessage('نام ستون های فایل اکسل درست نمیباشد');
          return;
        }
        let rowNum;
        let colNum;
        let colName;
        const range = utils.decode_range(worksheet['!ref']);
        for (rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
          this.current_row = [];
          this.jsonData = {};
          for (colNum = range.s.c; colNum <= range.e.c; colNum++) {
            const nextCell = worksheet[utils.encode_cell({ r: rowNum, c: colNum })];

            colName = worksheet[utils.encode_cell({ r: 0, c: colNum })].h;

            if (typeof nextCell === 'undefined') {
              this.current_row.push(void 0);
            } else {
              if (this.ModuleCode === 2645) {
                // RFC 61129
                if (rowNum > 0 && (colNum === 0)) {
                  if (nextCell.w.includes(' ') || isNaN(nextCell.w)) {
                    this.ShpoMessage(' در ردیف ' + rowNum + ' مقدار ردیف  فهرست اشتباه وارد شده است ');
                    return;
                  }
                } else if (rowNum > 0 && colNum === 2) {
                  if (nextCell.w.includes(' ') || isNaN(nextCell.w)) {
                    this.ShpoMessage(' در ردیف ' + rowNum + ' مقدار مبلغ واحد اشتباه وارد شده است ');
                    return;
                  }
                } else if (rowNum > 0 && colNum === 3) {
                  if (nextCell.w.includes(' ') || isNaN(nextCell.w)) {
                    this.ShpoMessage(' در ردیف ' + rowNum + ' مقدار اشتباه وارد شده است ');
                    return;
                  }
                }
              }

              for (let i = 0; i < this.headr_in_excel.length; i++) {
                for (let j = 0; j < this.intersect.length; j++) {
                  if (this.intersect[j].headerName === colName) {
                    const columnName = this.intersect[j].field;
                    this.jsonData[columnName] = nextCell.w;
                    break;
                  }
                }
              }
            }
          }

          if (rowNum > 0) {
            this.final_rows.push(this.jsonData);
          }
        }
        this.ExcelData.emit(this.final_rows);
        this.ExcelLoadDataClosed.emit(true);
      };
      fileReader.readAsArrayBuffer(this.selectedFile);
    }
  }

  close() {
    this.ExcelLoadDataClosed.emit(true);
  }

  popupclosed() {
    this.isClicked = false;
    this.isLoading = false;
  }

  getTemplate() {
    const ColumnTemp = {};
    if (this.Excel_Header_Param && this.Excel_Header_Param.colDef2) {
      this.Excel_Header_Param.colDef2.forEach(element => {
        if (element.editable) {
          ColumnTemp[element.headerName] = '';
        }
      });
      this.excelService.exportAsExcelFile([ColumnTemp], 'Template');
    }
  }

  ShpoMessage(message) {
    this.type = 'message-box';
    this.HaveHeader = true;
    this.alertMessageParams.message = message;
    this.isClicked = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
  }
}
