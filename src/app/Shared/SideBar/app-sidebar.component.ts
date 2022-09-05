import { Component, OnInit } from '@angular/core';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.css']
})
export class AppSidebarComponent implements OnInit {
  public scrollbarOptions = { axis: 'y', theme: 'inset-2-dark', scrollButtons: { enable: true } };
  constructor(private UserDetails: UserSettingsService, private router: Router) { }
  FastAccessMenu;
  cnt = 0;
  ngOnInit() {
    this.UserDetails.GetFastAccessUserModule().subscribe(res => {
      this.FastAccessMenu = res;
      if (!res || res.length <= 0) {
        $('.sidebar').css('min-width', '5px');
        $('.sidebar').css('width', '5px');
        $('.sidebar').css('margin-right', '2px');
        $('.side-icon').css('background', 'url("assets/Icons/mini-left.gif") no-repeat right');
      } else {
        $('.sidebar').css('min-width', '125px');
        $('.sidebar').css('width', '235px');
        $('.side-icon').css('background', 'url("assets/Icons/mini-right.gif") no-repeat right');
      }
    });
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    $('.sidebar').resizable({
      handles: 'w',
      resize: function (event, ui) {
        ui.position.left = ui.originalPosition.left;
        ui.size.width = (ui.size.width
          - ui.originalSize.width) * 2
          + ui.originalSize.width;
        if (ui.size.width === 15) {
          $('.sidebar').css('min-width', '125px');
          $('.side-icon').css('background', 'url("assets/Icons/mini-right.gif") no-repeat right');
        }
      }
    });
    $('.ui-resizable-w').append('<span class="side-icon"><span>');
    $('.side-icon').on('click', function () {
      if ($('.sidebar').css('min-width') === '125px') {
        $('.sidebar').css('min-width', '5px');
        $('.sidebar').css('width', '5px');
        $('.sidebar').css('margin-right', '2px');
        $('.side-icon').css('background', 'url("assets/Icons/mini-left.gif") no-repeat right');
      } else {
        $('.sidebar').css('min-width', '125px');
        $('.sidebar').css('width', '235px');
        $('.side-icon').css('background', 'url("assets/Icons/mini-right.gif") no-repeat right');
      }
    });
  }
  getImagesSeq() {
    this.cnt = this.cnt === 9 ? 0 : this.cnt;
    this.cnt++;
    return this.cnt;
  }
}
