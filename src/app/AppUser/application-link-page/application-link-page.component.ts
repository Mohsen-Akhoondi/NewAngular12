import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { CommonService } from "src/app/Services/CommonService/CommonService";

@Component({
  selector: "app-application-link-page",
  templateUrl: "./application-link-page.component.html",
  styleUrls: ["./application-link-page.component.css"],
})
export class ApplicationLinkPageComponent implements OnInit {
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  columnDef = [];
  ApplicationLinkRow = [];
  private AppLinkgridApi;
  isClicked = false;
  PopUpType = "";
  HaveMaxBtn = false;
  startLeftPosition: number;
  startTopPosition: number;
  PopupParam;
  alertMessageParams = {
    HaveOkBtn: true,
    HaveYesBtn: false,
    HaveNoBtn: false,
    message: "",
    IsMultiLine: false,
  };
  HaveHeader = false;
  PixelHeight: number;
  MainMaxwidthPixel: number;
  PercentWidth: number;
  MinHeightPixel: number;
  OverMainMinwidthPixel: number;
  PixelWidth: number;

  constructor(private CommonSrv: CommonService) {
    this.columnDef = [
      {
        headerName: "ردیف",
        field: "ItemNo",
        width: 50,
        resizable: false,
      },
      {
        headerName: "موضوع",
        field: "LinkLable",
        width: 480,
        resizable: true,
        editable: false,
      },
    ];
  }

  ngOnInit() {
    this.CommonSrv.GetAllNotifList().subscribe((res) => {
      if (res) {
        this.ApplicationLinkRow = res;
      }
    });
  }
  onGridReady(params: { api: any }) {
    this.AppLinkgridApi = params.api;
  }

  RowClick(event) {
    if (
      event.data.ModuleCode === 3031 ||
      event.data.ModuleCode === 3042 ||
      event.data.ModuleCode === 3043 ||
      event.data.ModuleCode === 3044 ||
      event.data.ModuleCode === 3052
    ) {
      // قراردادهای در شرف خاتمه
      this.isClicked = true;
      this.PopUpType = 'deadline-contract';
      this.HaveHeader = true;
      this.HaveMaxBtn = true;
      this.startLeftPosition = 150;
      this.startTopPosition = 10;
      this.PixelWidth = 1000;
      this.MinHeightPixel = 550;
      this.PopupParam = {
        ShortDate: event.data.ShortDate,
        DefaultRegionCode: event.data.DefaultRegionCode,
        HeaderName: event.data.ModuleName,
        ModuleCode: event.data.ModuleCode,
      };
    }
  }
  popupclosed(event) {
    this.isClicked = false;
    this.PopUpType = '';
    this.HaveMaxBtn = false;
    this.HaveHeader = false;
    this.PixelHeight = null;
    this.MainMaxwidthPixel = null;
    this.PercentWidth = null;
    this.MinHeightPixel = null;
    this.OverMainMinwidthPixel = null;
    this.PixelWidth = null;
  }
  closeModal() {
    this.Closed.emit(true);
  }
}
