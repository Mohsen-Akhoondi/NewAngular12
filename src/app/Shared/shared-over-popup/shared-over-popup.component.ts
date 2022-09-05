import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArchiveDetailService } from 'src/app/Services/BaseService/ArchiveDetailService';

declare var $: any;

@Component({
  selector: 'app-shared-over-popup',
  templateUrl: './shared-over-popup.component.html',
  styleUrls: ['./shared-over-popup.component.css']
})
export class SharedOverPopupComponent implements OnInit {
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
  constructor(private route: ActivatedRoute,
    private ArchiveList: ArchiveDetailService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
      this.ModuleName = params['ModuleName'];
      console.log(this.ModuleCode);
      console.log(this.ModuleName);
    });

    console.log(this.PopupType);

    switch (this.PopupType) {
      case 'choose-report':
        this.PopupParam.ModuleCode = this.ModuleCode;
        this.PopupParam.ModuleName = this.ModuleName;
        break;
      case 'message-box':
        this.ModuleName = 'هشدار';
        break;
      case 'group-message-box':
        this.ModuleName = 'هشدار';
        break;
      case 'work-flow-send':
        this.ModuleName = this.PopupParam.Message;
        this.MainMaxwidthPixel = 913;
        break;
      case 'editor-select-price-list':
      case 'product-pattern':
        this.HeightPercentWithMaxBtn = 97;
        break;
      case 'workflow-type':
        this.HeightPercentWithMaxBtn = 87;
        break;
      case 'price-list-topic-dataentry-page':
        this.PixelWidth = 410;
        break;
      case 'product-request-page':
      case 'pure-product-request-page':
      case 'single-sale-invoice':
        if (!this.minWidthPixel) {
          this.minWidthPixel = 1345;
          this.MainMaxwidthPixel = 2000;
          this.PercentWidth = 90;
        }
        break;
      case 'contract-pay-details':
        {
          this.minWidthPixel = 1345;
          this.MainMaxwidthPixel = 2000;
          this.PercentWidth = 90;
        }
        break;
      case 'Cartable_contract_estimate':
        this.minWidthPixel = 1360;
        this.MainMaxwidthPixel = 2000;
        break;
      case 'product-request-suggestion':
        if (!this.minWidthPixel) {
          this.minWidthPixel = 1225;
        }
        break;
      case 'estate-recognition-evaluation':
        if (!this.minWidthPixel) {
          this.minWidthPixel = 1230;
          this.MainMaxwidthPixel = 2000;
          this.PercentWidth = 90;
          this.PixelHeight = 530;
        }
        break;
      case 'proposal-item-estimate':
        if (!this.MainMinwidthPixel) {
          this.MainMinwidthPixel = 1160;
        }
        break;
      case 'corporate2':
        this.MainMaxwidthPixel = 1400;
        break;
      case 'person2':
        this.MainMaxwidthPixel = 1400;
        break;
      case 'app-show-under-take-items':
        this.MainMaxwidthPixel = 1000;
        this.minHeightPixel = 500;
        break;
      case 'app-goods':
        this.PixelWidth = 500;
        break;
      case 'send-automation-letter':
        this.minHeightPixel = 500;
        break;
      case 'contract-case':
        this.MainMaxwidthPixel = 1290;
        break;
        case 'rich-text-box-input':
          this.PixelHeight = 290;
          break;
      default:
        break;
    }
    if (this.PopupParam && this.PopupParam.HeaderName) {
      this.HeaderName = this.PopupParam.HeaderName;
    } else {
      this.HeaderName = this.ModuleName;
    }

    if (this.PopupType === 'archive-details') {
      this.HeaderName = 'مستندات';
      // this.ArchiveList.HasArchiveAccess(this.ModuleCode).
      //   subscribe(res => {
      //     this.HeaderName = res ? 'مستندات فنی' : 'مشاهده مستندات فنی';
      //   });
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
