import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';

@Component({
  selector: 'app-contractor-send-sms',
  templateUrl: './contractor-send-sms.component.html',
  styleUrls: ['./contractor-send-sms.component.css']
})
export class ContractorSendSMSComponent implements OnInit {
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  ModuleCode;
  Note;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  ShowMessage = false;
  RegionItems;
  RegionParams = {
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    Required: true,
    clearable: false
  };
  constructor(
    private ActorServices: ActorService,
    private router: Router,
    private route: ActivatedRoute,
    private RegionList: RegionListService
  ) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }

  ngOnInit() {
    this.RegionList.GetRegionList(this.ModuleCode, false).subscribe(res => {
      this.RegionItems = res;
      this.RegionParams.selectedObject = 0;
    });
  }
  close(): void {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }
  onSend() {
    if (!this.Note) {
      this.ShowMessage = true;
      this.alertMessageParams.message = 'متن پیام را وارد کنید';
      return;
    }
    this.ActorServices.SendSmsForContractContractors(this.Note, this.RegionParams.selectedObject).subscribe(res => {
      this.ShowMessage = true;
      this.alertMessageParams.message = 'ارسال پیامک با موفقیت انجام شد';
    });
  }
  popupclosed(event) {
    this.ShowMessage = false;
  }
}
