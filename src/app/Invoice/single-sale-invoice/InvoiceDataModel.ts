import { InvoiceFooterDataModel } from './InvoiceFooterDataModel';
import { InvoiceItemDataModel } from './InvoiceItemDataModel';

export class InvoiceDataModel {
    RegionCode: number;
    FinYearCode: number;
    InvoiceCode: number;
    InvoiceDate: string;
    Subject: string;
    IsValid: boolean;
    RegisterInvoiceDate: string;
    ShortRegisterInvoiceDate: string;
    PersianRegisterInvoiceDate: string;
    IsSale: boolean;
    CostCostFactorID: number;
    RegisterInvoiceCode: number;
    InvoiceID: number;
    ActorID: number;
    SubCostCenterID: number;
    RequestedPersonID: number;
    IsContractorFill: boolean;
    IsConfirm: number;
    SubCostCenterObject;
    RegionObject;
    ActorType: boolean;
    InvoiceItemList: InvoiceItemDataModel [];
    InvoiceFooterList: InvoiceFooterDataModel [];
    AdministratorActorID: number;
    ShortInvoiceDate: string;
    IsReturn: boolean;
    IsMultiInvoice: boolean;
   public Init() {
        this.RegionCode = null;
        this.FinYearCode = null;
        this.InvoiceCode = null;
        this.InvoiceDate = null;
        this.Subject = null;
        this.IsValid = true;
        this.RegisterInvoiceDate = null;
        this.IsSale = true;
        this.CostCostFactorID = null;
        this.RegisterInvoiceCode = null;
        this.InvoiceID = -1;
        this.ActorID = null;
        this.SubCostCenterID = null;
        // tslint:disable-next-line: no-unused-expression
        this.RequestedPersonID;
        this.SubCostCenterObject = null;
        this.RegionObject = null;
        this.IsConfirm = 0;
        this.IsContractorFill = false;
        this.ActorType = true;
        this.InvoiceItemList = [];
        this.ShortRegisterInvoiceDate = null;
        this.InvoiceFooterList = [];
        this.PersianRegisterInvoiceDate = null;
        this.AdministratorActorID = null;
        this.ShortInvoiceDate = null;
        this.IsReturn = false;
        this.IsMultiInvoice = false;
    }
}
