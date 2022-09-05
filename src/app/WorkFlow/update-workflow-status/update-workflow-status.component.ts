import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-update-workflow-status',
  templateUrl: './update-workflow-status.component.html',
  styleUrls: ['./update-workflow-status.component.css']
})
export class UpdateWorkflowStatusComponent implements OnInit {
  @Input() InputParam;
  @Output() UpdateWorkflowStatusClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  Note;
  ReferenceUserName;
  RoleName;
  isClicked = false;
  type;
  startLeftPosition;
  startTopPosition;
  HeightPercentWithMaxBtn: number;
  MinHeightPixel: number;
  constructor() { }

  ngOnInit() {
    this.Note = this.InputParam.Note;
    this.ReferenceUserName = this.InputParam.ReferenceUserName;
    this.RoleName = this.InputParam.ReferenceRoleName;
  }

  close() {
    this.UpdateWorkflowStatusClosed.emit(true);
  }

  onOkClick() {
    this.HeightPercentWithMaxBtn = 95;
    this.MinHeightPixel = null;
    if (this.InputParam.selectedRow && this.InputParam.selectedRow.data.WorkflowObjectCode === 1) {
      this.type = 'Cartable_contract_estimate';
    }

    if (this.InputParam.WorkflowObjectCode === 2) {

      if (this.InputParam.ContractTypeCode === 26 || this.InputParam.ContractTypeCode === 29) {
        this.type ='contract-pay-details'; // 'contract-pay-item-hour';
      }
      if (this.InputParam.ContractTypeCode === 27 || this.InputParam.ContractTypeCode === 28) {
        this.type = 'contract-pay-details';
      }
      if (!this.InputParam.PriceListPatternID) {
        this.type = 'contract-pay-details';
      }

      if (this.InputParam.PriceListPatternID &&
        this.InputParam.ContractTypeCode !== 26 &&
        this.InputParam.ContractTypeCode !== 29) {
        // this.type = 'contract-pay-item-estimate-page';
        this.type = 'contract-pay-details';
      }
      this.startLeftPosition = 59;
      this.startTopPosition = 20;
    }

    if (this.InputParam.WorkflowObjectCode === 3 || this.InputParam.WorkflowObjectCode === 5 || this.InputParam.WorkflowObjectCode === 7 || this.InputParam.WorkflowObjectCode === 31) {
      this.type = 'product-request-page';
      this.HeightPercentWithMaxBtn = 97;
      this.MinHeightPixel = 645;
      this.startLeftPosition = 10;
      this.startTopPosition = 5;
    }
    if (this.InputParam.WorkflowObjectCode === 4 || this.InputParam.WorkflowObjectCode === 6 || this.InputParam.WorkflowObjectCode === 9) {
      this.type = 'product-request-page-without-flow';
      this.HeightPercentWithMaxBtn = 97;
      this.MinHeightPixel = 645;
      this.startLeftPosition = 59;
      this.startTopPosition = 20;
    }
    if (this.InputParam.WorkflowObjectCode === 8) {
      this.type = 'ground-delivery-minutes';
      this.startLeftPosition = 110;
      this.startTopPosition = 5;
      this.HeightPercentWithMaxBtn = 97;
      this.MinHeightPixel = 645;
    }

    this.isClicked = true;

  }
  popupclosed() {
    this.isClicked = false;
    this.UpdateWorkflowStatusClosed.emit(true);
  }

}
