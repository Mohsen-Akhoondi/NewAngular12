import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';

@Component({
  selector: 'app-estate-recognition-evaluation',
  templateUrl: './estate-recognition-evaluation.component.html',
  styleUrls: ['./estate-recognition-evaluation.component.css']
})
export class EstateRecognitionEvaluationComponent implements OnInit {
  @Input() PopupParam;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  ColDef;
  RowData = [];
  constructor(private ProductRequest: ProductRequestService) {
    this.ColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'عنوان بسته دارایی',
        field: 'PackageKey',
        width: 150,
        resizable: true
      },
      {
        headerName: 'شماره درخواست ارزیابی',
        field: 'RequestID',
        width: 150,
        resizable: true
      },
      {
        headerName: 'تاریخ ارزیابی هیئت ارزیابی',
        field: 'EvaluationGroupDate',
        width: 150,
        resizable: true
      },
      {
        headerName: 'عنوان ماهیت ارزیابی',
        field: 'EaluationNatureTitle',
        width: 150,
        resizable: true
      }, {
        headerName: 'توضیحات ارزیابی',
        field: 'EvaluatorDesc',
        width: 150,
        resizable: true
      },
      {
        headerName: 'نظریه کارشناس ارزیابی',
        field: 'ExpertTheory',
        width: 150,
        resizable: true
      },
      {
        headerName: 'قیمت نهایی ارزیابی',
        field: 'TotalPrice',
        width: 150,
        resizable: true
      },
      {
        headerName: 'شماره ابلاغیه',
        field: 'NotificationNumber',
        width: 150,
        resizable: true
      },
      {
        headerName: 'تاریخ ابلاغ ارزیابی',
        field: 'NotificationDate',
        width: 150,
        resizable: true
      },
    ];
  }

  ngOnInit() {
    this.ProductRequest.GetEvaluationList(this.PopupParam.EstateRecognitionID).subscribe( res => {
      this.RowData = res;
    });
  }

  onClose() {
    this.Closed.emit(true);
  }

}
