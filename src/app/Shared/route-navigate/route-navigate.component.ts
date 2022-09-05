import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-route-navigate',
  templateUrl: './route-navigate.component.html',
  styleUrls: ['./route-navigate.component.css']
})
export class RouteNavigateComponent implements OnInit {
  ModuleCode;
  ModuleName: any;

  constructor(private router: Router,
    private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe((params: any) => {
      this.ModuleCode = params.get('ModuleCode');
      this.ModuleName = params.get('ModuleName');
    });
  }

  ngOnInit() {
   this.router.navigate([{ outlets: {  PopUp: ['PopUp',this.ModuleCode,this.ModuleName] } }]);
   

  }

}
