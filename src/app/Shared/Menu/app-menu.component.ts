import { Component, OnInit } from '@angular/core';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { Router } from '@angular/router';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';

declare var $: any;
@Component({
  selector: 'app-user-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent implements OnInit {

  Menudata;
  SubMenuWidth = 0;
  IsFirstItem;
  constructor(private UserDetails: UserSettingsService, private _router: Router, private CommonService: CommonServices, private RefreshService: RefreshServices,) { }
  getMenu(parentID) {
    return this.Menudata.filter((node) => (node.ParentID === parentID)).map((node) => {
      const exists = this.Menudata.some(function (childNode) { return childNode.ParentID === node.MenuID; });

      const subMenu = (node.IsPopUp) ?
        '<ul class="dropdown-menu custom-menu" aria-labelledby="navbarDropdownMenuLink">'
        + this.getMenu(node.MenuID).join('') + '</ul>' : '';

      if (!exists && node.ParentID === 0) {
        return '<li _ngcontent-c3 class="nav-item">' + '<a class="nav-link" href="' + node.Url + '">' + node.MenuName + '</a></li>';
      } else
        if (node.IsPopUp && node.ParentID === 0) {
          return '<li _ngcontent-c3 class="nav-item dropdown"><a class="nav-link dropdown-toggle"' +
            'id="navbarDropdownMenuLink" href="/Finance/Home(PopUp:PopUp/2627)"'
            + 'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
            + node.MenuName + '</a>' + subMenu;
        } else if (!node.IsPopUp) {
          return '<li _ngcontent-c3><a class="dropdown-item" href="/Finance/Home(PopUp:PopUp/2627)">' + node.MenuName + '</a></li>';
        } else {
          return '<li _ngcontent-c3 class="dropdown-submenu"><a _ngcontent-c3 class="dropdown-item dropdown-toggle">'
            + node.MenuName + '</a><ul _ngcontent-c3 class="dropdown-menu">' + this.getMenu(node.MenuID).join('') + '</ul></li>';
        }
    });
  }
  ngOnInit() {
    this.BuildMenu();
    this.RefreshService.UserMenuChange.subscribe(res => 
      { this.BuildMenu(); });
  }
  OnMouseOver(e) {
    const JqSubMenu = $(e.target).next('.dropdown-menu');
    JqSubMenu.css('margin-right', e.target.offsetWidth - 3 + 'px');
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewChecked(): void {
    /*$('.dropdown-menu a.dropdown-toggle').on('mouseover', function() {
      const $subMenu = $(this).next('.dropdown-menu');
      $subMenu.css('margin-right', $(this).width() + 12.5 + 'px');
    });*/
  }
  On2865Click() {
    this.UserDetails.GetCurrentUserGUIDForProvider().subscribe(res => {
      window.open('http://contracts.tehran.iri/DesktopModules/Contract/Controls/Contractors/ConfirmContractor/?Param=' + res, '_blank');
    });
  }

  On3064Click() {
    window.open("https://finance.tehran.iri:8085/Accounting/FeePage",
    "_blank",
     "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no,top=50,left=300,width=700,height=500");
  }

  BuildMenu() {
    this.UserDetails.GetCurrentUserMenu()
      .subscribe(res => {
        if (!res || res.length === 0) {
          this._router.navigate(['AccessDenid']);
        } else {
          this.Menudata = this.CommonService.FlatlistToTree(res, 'MenuID', 'ParentID');
        }
      });
  }
}
