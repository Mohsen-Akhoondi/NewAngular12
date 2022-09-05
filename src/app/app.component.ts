import { Component, OnInit } from '@angular/core';
import { UserSettingsService } from './Services/BaseService/UserSettingsService';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { MessageService } from './Shared/message-box/MessageService';
import { LoadingService } from './Load/loading/LoadingService';
import { DealsHallService } from './Services/ContractService/DealsHall/DealsHallService';
import { CommonServices } from './Services/BaseService/CommonServices';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '';
  IsAdvertising;
  NeedsPhoneNumber = false;
  ShowMessage = false;
  IsShow = false;
  IsTestMode = false;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  IsShowVersion = false;
  UrlIsProviders;
  IsCrm;
  constructor(private router: Router,
    private UserSettings: UserSettingsService,
    private titleService: Title,
    private Message: MessageService,
    private DealsHall: DealsHallService,
    private CommonService: CommonServices,
    private IsLoading: LoadingService) {
  }
  ngOnInit() {
    this.IsLoading.LoadingChange.subscribe(IsShow => { this.IsShow = IsShow; });
    this.IsAdvertising = environment.IsAdvertising;
    this.UrlIsProviders = environment.UrlIsProviders;
    this.IsCrm = environment.IsCrm;
    this.UserSettings.GetSysName().subscribe(res => {
      this.title = res.SysName;
      this.titleService.setTitle(res.SysName);
      environment.IsExternal = res.IsExternal;
      environment.IsExternalForSSO = res.IsExternalForSSO;
      environment.IsTestMode = this.IsTestMode = res.IsTestMode;
    });
    this.Message.MessageChange.subscribe(res => {
      this.ShowMessage = res.IsShow;
      this.alertMessageParams.message = res.Message;
    });
    if (this.IsAdvertising || this.UrlIsProviders) {
      this.IsShowVersion = false;

    } else {
      this.IsShowVersion = true;
    }
  }
  popupclosed(event) {
    this.ShowMessage = false;
  }
  onDownloadHellpFiles(DocTypeCode) {
    this.DealsHall.DownloadHelpArchiveFile(DocTypeCode).subscribe(res => {
      this.CommonService.downloadFile(res);
    });
  }
}
