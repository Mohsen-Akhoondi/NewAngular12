import { Injectable } from '@angular/core';
import { BaseHttpClient } from '../BaseService/BaseHttpClient';
import { InvoiceDataModel } from 'src/app/Invoice/single-sale-invoice/InvoiceDataModel';
@Injectable({ providedIn: 'root' })
export class InvoiceService {
    constructor(private http: BaseHttpClient) {
    }

    GetInvoiceList(RegionCode: number) {
        return this.http.get(window.location.origin + '/Invoice/GetInvoiceList', { RegionCode });
    }

    DeleteInvoice(InvoiceID: number,ModuleCode: number) {
        return this.http.post(window.location.origin + '/Invoice/DeleteInvoice', { InvoiceID ,ModuleCode});
    }

    SaveInvoice(InvoiceObject : InvoiceDataModel, BankList: any, HaveBank: boolean = null) {
      return this.http.post(window.location.origin + '/Invoice/SaveInvoice', { InvoiceObject, BankList, HaveBank });
    }

    GetInvoice(InvoiceID : number){
        return this.http.get(window.location.origin + '/Invoice/GetInvoice', { InvoiceID });
    }
    GetInvoiceFooterTypeList(){
        return this.http.get(window.location.origin + '/Invoice/GetInvoiceFooterTypeList', null);
    }
    InvoiceSearch(
        RegionCode: number,
        FinYearCode = null,
        RegisterInvoiceDate,
        RegisterInvoiceCode = '',
        InvoiceCodeStr = '',
        ActorID: number = null,
        CostCenterID: number = null,
        SubCostCostCenterID: number = null,
        AdministrationActorID: number = null,
        EndWFCode = null,
        RequestedPersonID: number = null,
      SumFinalPrice: number=null
        ) {
        return this.http.get(window.location.origin + '/Invoice/InvoiceSearch',
            {
                RegionCode,
                FinYearCode,
                RegisterInvoiceDate,
                RegisterInvoiceCode,
                InvoiceCodeStr,
                ActorID,
                CostCenterID,
                SubCostCostCenterID,
                AdministrationActorID,
                EndWFCode,
                RequestedPersonID,
               SumFinalPrice
            });
    }

    InvoiceRevocation(VWWorkList: any, WorkFlowID: any, InvoiceID: any, WorkflowTypeCode: any) {
        return this.http.post(window.location.origin + '/Invoice/InvoiceRevocation', {
          VWWorkList,
          WorkFlowID,
          InvoiceID,
          WorkflowTypeCode
        });
      }
}
