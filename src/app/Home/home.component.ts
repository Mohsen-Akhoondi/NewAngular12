import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSettingsService } from '../Services/BaseService/UserSettingsService';
import { LoadingService } from '../Load/loading/LoadingService';
import { MessageService } from '../Shared/message-box/MessageService';

declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  NeedsPhoneNumber;
  constructor(private router: Router,
    private UserSettings: UserSettingsService,
    private IsLoading: LoadingService,
    private Message: MessageService) { }

  ngOnInit() {
    // this.router.navigate([{outlets: {primary: 'Home' , PriceList: 'Home'}}]);
    this.UserSettings.UserNeedConfirmPhoneNumber().subscribe(res => this.NeedsPhoneNumber = res ? 1 : 0);
  }
  popupclosed(event) {
  }
}
