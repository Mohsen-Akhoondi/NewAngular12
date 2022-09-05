import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
declare var $: any;

@Component({
  selector: 'app-modal-two-col',
  templateUrl: './modal-two-col.component.html',
  styleUrls: ['./modal-two-col.component.css']
})
export class ModalTwoColComponent implements OnInit, OnDestroy {

  @Output() poutputParam;
  ModuleCode: number;
  ModuleName;
  widthPX;
  heightPC;
  IsMaximized = false;
  MainwidthPC;
  minheightPC;
  minwidthPX;
  minheightPX;
  maxheightPX;
  height;
  TopPX = 10;
  IsShow = false;
  private sub: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private UserDetails: UserSettingsService,
    private Workflow: WorkflowService,
    private RegionList: RegionListService,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
      this.ModuleName = params['ModuleName'];
      console.log(this.ModuleCode);
      console.log(this.ModuleName);
      switch (this.ModuleCode) {
        case 2866: // noeentekhabemoshaver
          this.widthPX = 530;
          this.heightPC = 85;
          break;
        case 41:
          this.MainwidthPC = 86;
          this.heightPC = 82;
          break;
        case 2677:
        case 3000:
        case 2935:
        case 2691:
        case 2692:
        case 2697:
        case 2698:
        case 2733:
        case 2763:
        case 2774:
        case 2775:
        case 2854:
        case 2856:
        case 2894:
        case 2902:
        case 2904:
        case 2924:
        case 3002:
        case 1271:
        case 3001:
          this.widthPX = 510;
          this.heightPC = 85;
          break;
        case 1960:
          this.widthPX = 1100;
          this.heightPC = 95;
          break;
        case 2696:
        case 2695:
          this.widthPX = 800;
          this.heightPC = 85;
          break;
        case 2835:
          this.MainwidthPC = 95;
          this.heightPC = 95;
          this.widthPX = 1290;
          this.minwidthPX = 1250;
          break;
        case 2824:
        case 2627:
        case 2727:
        case 2842:
        case 2948:
        case 2949:
        case 2756:
        case 2764:
        case 2681:
        case 2682:
        case 2739: // gharardadbedonegardesh
        case 2730: // darkhasteMoamele
        case 2939:
        case 2951:
        case 2793:
        case 2755:
        case 2875:
        case 2896:
        case 2838: // Jostojoo-dastrasiMahdood
        case 2844: // Jostojoo-MoavenatKhadamatShahri
        case 2784: // TaminKonande-Haghighi
        case 2862:
        case 2883: // Mojoodiat-e-Baravord-e-Darkhast
        case 2912: // Noe Mojudiat
        case 2885: // Jostojoo-TaminKonande
        case 3092:
        case 2893: // E'mal-e-Zarfiat-e-Mazad
        case 2895: // Pajooheshi
        case 2934: // Pajooheshi-chabook
        case 2910: // Datkhast-e Moameleye Ba Gardesh
        case 1273:
        case 3017:
        case 2980: // جستجوی درخواست معامله ملکی
        case 2996: // جستجوی چاپ مجدد
        case 1618:
        case 3029:
        case 3033:
        case 3037:
        case 3051:
        case 3056:
        case 2705:
        case 3094: // درخواست مشارکتی
        case 3090: // Emzaye electronic Commition
          this.MainwidthPC = 95;
          this.heightPC = 98;
          this.widthPX = 1290;
          this.minwidthPX = 1290;
          break;
          break;
        case 2707:
        case 2903:
          this.widthPX = 620;
          this.heightPC = 85;
          break;
        case 2676:
        case 2811:
        case 2816:
        case 2807:
        case 2808:
        case 2809:
        case 2870:
        case 2810:
        case 2899:
        case 2925:
          this.widthPX = 750;
          this.heightPC = 85;
          break;
        case 2660:
          this.widthPX = 1000;
          this.heightPC = 85;
          break;
        case 2699:
        case 3088:
          this.widthPX = 1300;
          this.heightPC = 95;
          break;
        case 2700:
          this.widthPX = 980;
          this.heightPC = 85;
          break;
        case 2711:
          this.maxheightPX = 400;
          this.widthPX = 360;
          this.minwidthPX = 300;
          break;
        case 1109:
          this.UserDetails.CheckAdminForUserModule().subscribe(res => {
            if (res) {
              this.widthPX = 600;
              this.minheightPX = 360;
              this.minwidthPX = 300;
              this.maxheightPX = 545;
            } else {
              this.maxheightPX = 360;
              this.widthPX = 600;
              this.minwidthPX = 300;
            }
          });
          break;
        case 2730:
        case 1206:
        case 2785:
        case 3010:
        case 3045:
        case 3011:
        case 2375:
        case 3090: // Emzaye electronic Commition
          this.MainwidthPC = 95;
          this.heightPC = 98;
          this.widthPX = 1390;
          this.minwidthPX = 1290;
          break;
        case 2741:
          this.MainwidthPC = 95;
          this.heightPC = 98;
          this.widthPX = 1290;
          this.minwidthPX = 1290;
          break;
        case 1204:
        case 3012:
          // this.MainwidthPC = 95;
          this.maxheightPX = 445;
          this.widthPX = 900;
          this.minwidthPX = 900;
          break;
        case 2114:
          this.maxheightPX = 330;
          this.widthPX = 900;
          this.minwidthPX = 900;
          break;
        case 2999:
          // this.MainwidthPC = 95;
          this.maxheightPX = 600;
          this.widthPX = 900;
          this.minwidthPX = 900;
          break;
        case 2784:
          // this.MainwidthPC = 95;
          this.maxheightPX = 690;
          this.minheightPX = 650;
          this.widthPX = 840;
          this.minwidthPX = 840;
          break;
        case 2674:
          this.heightPC = 100;
          this.widthPX = 1100;
          this.TopPX = 0;
          break;
        case 2822:
          this.MainwidthPC = 60;
          this.heightPC = 90;
          this.widthPX = 580;
          this.minwidthPX = 580;
          break;
        case 2823:
          this.widthPX = 1240;
          this.heightPC = 90;
          break;
        case 2773:
          this.minheightPX = 655;
          this.widthPX = 1140;
          break;
        case 2850:
        case 2987:
          this.widthPX = 940;
          this.heightPC = 90;
          break;
        case 2861:
          this.MainwidthPC = 95;
          this.heightPC = 80;
          this.widthPX = 760;
          this.minwidthPX = 760;
          break;
        case 2649:
          this.widthPX = 1040;
          this.heightPC = 90;
          break;
        case 2863:
          this.MainwidthPC = 70;
          this.heightPC = 80;
          this.widthPX = 980;
          this.minwidthPX = 980;
          break;
        case 2864:
        case 3031:
        case 3042:
        case 3043:
        case 3044:
        case 2944:
        case 3052:
        case 3086:
        case 3087:
          this.MainwidthPC = 60;
          break;
        case 3025:
        case 3003:
        case 3004:
          this.widthPX = 620;
          this.heightPC = 35;
          break;
        case 2907:
          this.MainwidthPC = 52;
          this.heightPC = 38;
          break;
        case 2922:
        case 2926:
          this.MainwidthPC = 50;
          this.heightPC = 40;
          break;
        case 2501:
        case 3096:
        case 2645:
        case 2646:
        case 2647:
        case 2648:
        case 2805:
        case 2516:
        case 2876:
        case 2654:
        case 2769:
        case 2921:
        case 2687:
        case 3008:
        case 3065:
        case 3067:
        case 3005:
        case 3071: // ابزار راهبری نظارت
          this.widthPX = 1140;
          this.heightPC = 90;
          let RegionList = [];
          this.RegionList.GetRegionList(this.ModuleCode, false).subscribe(res => {
            RegionList = res;
            this.poutputParam = {
              RegionList: RegionList
            };
            this.IsShow = true;
          });
          break;
        case 2943:
          this.minwidthPX = 1295;
          this.widthPX = 1300;
          this.heightPC = 98.5;
          this.poutputParam = {
            FileName: null,
            HaveEstimate: false,
            HaveSign: true,
            PDFSignersInfo: null,
            HaveUpload: true,
            SignByFile: true,
            HaveDownload: true
          };
          break;
        case 2950:
          this.widthPX = 1140;
          this.heightPC = 80;
          break;
        case 2964:
        case 2965:
          this.heightPC = 98;
          this.widthPX = 1344;
          this.MainwidthPC = 97;
          this.minwidthPX = 1340;
          break;
        case 3007:
          this.heightPC = 33;
          this.widthPX = 595;
          this.minwidthPX = 500;
          break;
        case 2979: // Gozaresh_Kholase_Vaziat_e_Gharadad
          this.heightPC = 15;
          this.widthPX = 550;
          this.minwidthPX = 500;
          this.minheightPX = 185;
          this.TopPX = 200;
          break;
        case 3009:
          this.heightPC = 40;
          this.widthPX = 850;
          this.minwidthPX = 840;
          this.minheightPX = 330;
          this.TopPX = 100;
          break;
        default:
          this.widthPX = 1140;
          this.heightPC = 90;
          break;
      }
    });

    $(document).ready(function () {
      $('.modal-trigger').click(function (e) {

        const dataModal = $(this).attr('data-modal');

        $('#' + dataModal).css({
          'display': 'block'
        });

      });
      // $('.modal').draggable({
      //   handle: '#header'
      // });
      $('.modal-container').draggable({
        handle: '#header'
      });
    }
    );
  }
  ModalMaximized() {
    this.IsMaximized = !this.IsMaximized;
    $('#modal-name').toggleClass('full');
    $('.modal-container').toggleClass('full');
    $('.modal').draggable({
      disabled: $('.modal-container').hasClass('full'),
    });
  }
  closeModal() {
    $('.modal').fadeOut(300);
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
