import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-contract-over-popup',
  templateUrl: './contract-over-popup.component.html',
  styleUrls: ['./contract-over-popup.component.css'],
})
export class ContractOverPopupComponent implements OnInit {
  ModuleCode: number;
  ModuleName;
  HeaderName;
  popupMaximized;
  private sub: any;
  @Input() zIndex = null;
  @Input() PopupType;
  @Input() PopupParam;
  @Input() startLeftPosition;
  @Input() startTopPosition;
  @Input() minHeightPixel;
  @Input() MainMaxwidthPixel;
  @Input() MainMinwidthPixel;
  @Input() PixelHeight = null;
  @Input() PercentWidth = null;
  @Input() PixelWidth = null;
  @Input() HaveMaxBtn = false;
  @Input() HaveExitBtn = true;
  @Input() HaveHeader = true;
  @Input() HeightPercentWithMaxBtn = 85;
  @Input() minWidthPixel;
  @Output() PopupOutPutParam: EventEmitter<any> = new EventEmitter<any>();
  @Output() popupclosed: EventEmitter<any> = new EventEmitter<any>();

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.ModuleCode = +params['ModuleCode'];
      this.ModuleName = params['ModuleName'];
      console.log(this.ModuleCode);
      console.log(this.ModuleName);
    });

    switch (this.PopupType) {
      case 'message-box':
        this.ModuleName = 'هشدار';
        break;
      case 'group-message-box':
        this.ModuleName = 'هشدار';
        break;
      default:
        break;
    }
    if (this.PopupParam && this.PopupParam.HeaderName) {
      this.HeaderName = this.PopupParam.HeaderName;
    } else {
      this.HeaderName = this.ModuleName;
    }
  }
    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit(): void {
      const CurrType = this.PopupType;
      $('#modal-' + CurrType).fadeIn(300);
      $('.modal-trigger').click(function (e) {
        const dataModal = $(this).attr('data-modal');
        $('#' + dataModal).css({
          display: 'block'
        });
      });
      $('#modal-' + CurrType).draggable({
        handle: '#header'
      });
    }
    closeModal(param) {
      if (param) {
        this.popupclosed.emit(param);
      } else {
        this.popupclosed.emit(true);
      }
    }
    MaximizeModal() {
      $('#modal-' + this.PopupType).toggleClass('full');
      $('.over-popup-modal-container').toggleClass('full');
      $('#modal-' + this.PopupType).draggable({
        disabled: $('.over-popup-modal-container').hasClass('full')
      });
      this.popupMaximized = $('.over-popup-modal-container').hasClass('full');
    }
    getOutPutParam(event) {
      this.PopupOutPutParam.emit(event);
    }
    // tslint:disable-next-line:use-life-cycle-interface
    ngOnChanges(changes: SimpleChanges) {
      if (changes.PixelWidth && changes.PixelWidth.currentValue) {
        this.PixelWidth = changes.PixelWidth.currentValue;
      }
    }
}
