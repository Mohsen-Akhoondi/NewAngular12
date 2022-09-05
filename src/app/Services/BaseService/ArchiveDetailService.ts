import { Injectable } from '@angular/core';
import { BaseHttpClient } from './BaseHttpClient';

@Injectable({ providedIn: 'root' })

export class ArchiveDetailService {
  constructor(private http: BaseHttpClient) { }

  GetArchiveDetailList(archiveDetailCode: string) {
    return this.http.get(window.location.origin + '/Home/GetArchiveDetailList', {
      archiveDetailCode
    });
  }
  GetAllFileDocNames(archiveDetailCode: string, ParentDocTypes) {
    return this.http.get(window.location.origin + '/Home/GetAllFileDocNames', {
      archiveDetailCode,
      ParentDocTypes
    });
  }
  UploadFileToServer(AFile: FormData) {
    return this.http.post(window.location.origin + '/Home/GetFileNameFromClient', AFile);
  }
  UploadArchiveDoc(ArchiveDetailCode, DocumentTypeCode, FileName, FileBase64) {
    return this.http.post(window.location.origin + '/Home/UploadArchiveDoc',
      {
        ArchiveDetailCode,
        DocumentTypeCode,
        FileName,
        FileBase64
      });
  }
  DisplayFileFromServer(data) {
    return this.http.get(window.location.origin + '/Home/DisplayFile', data);
  }
  GetArchiveFileByDocID(DocumentID) {
    return this.http.get(window.location.origin + '/Home/GetArchiveFileByDocID', { DocumentID });
  }
  GetAllImgPDFFilesByArchiveDetailCode(archiveDetailCode, ParentDocTypes) {
    return this.http.get(window.location.origin + '/Home/GetAllImgPDFFilesByArchiveDetailCode', { archiveDetailCode, ParentDocTypes });
  }
  downloadFile(data: any) {

    // const b64toBlob = require('b64-to-blob');
    const byteCharacters = atob(data.FileBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const mimeType = data.Type;
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    // const url = window.URL.createObjectURL(blob);
    // window.open(url , '_blank');

    const FileSaver = require('file-saver');
    const file = new File([blob], data.FileName, { type: mimeType });
    FileSaver.saveAs(file);

  }

  DeleteFileFromDB(selectedData, ModuleCode) {
    return this.http
      .post(window.location.origin + '/Home/DeleteFile', { selectedData, ModuleCode });
  }

  GetArchiveDetailByFinYear(PriceListTopicID: number) {
    return this.http.get(
      window.location.origin + '/Home/GetArchiveDetailByFinYear',
      { PriceListTopicID }
    );
  }

  HasArchiveAccess(ModuleCode: number) {
    return this.http.get(
      window.location.origin + '/Home/HasArchiveAccess', { ModuleCode });
  }

  GetDocumentTypeList(ParentDocTypeCode,
    DocumentTypeCodeList,
    ArchiveDetailCode,
    RegionCode?: number) {
    return this.http.get(
      window.location.origin + '/Home/GetDocumentTypeList', {
      ParentDocTypeCode,
      DocumentTypeCodeList,
      ArchiveDetailCode,
      RegionCode
    });
  }
  GetListDocumentType(ParentDocTypeCodes: any) {
    return this.http.get(
      window.location.origin + '/Home/GetListDocumentType', { ParentDocTypeCodes });
  }

  GetADocumentType(DocTypeCode: number) {
    return this.http.get(
      window.location.origin + '/Common/GetADocumentType', { DocTypeCode });
  }

  GetPRoductRequestArchiveDetailList(CostFactorID: number) {
    return this.http.get(
      window.location.origin + '/ProductRequest/GetPRoductRequestArchiveDetailList', { CostFactorID });
  }
  GetRequestAllFileDocNames(CostFactorID: number) {
    return this.http.get(
      window.location.origin + '/ProductRequest/GetRequestAllFileDocNames', { CostFactorID });
  }
  // tslint:disable-next-line:max-line-length
  UpdateArchiveDetailAdvertising(ArchiveDetailList: any, OrginalModuleCode?: any, ProductRequestIsOnline?: boolean, ProductRequestCostFactorID?: number) {
    return this.http.post(window.location.origin +
      // tslint:disable-next-line:max-line-length
      '/ProductRequest/UpdateArchiveDetailAdvertising', { ArchiveDetailList, OrginalModuleCode, ProductRequestIsOnline, ProductRequestCostFactorID });
  }
  UpdatePRAllArchiveDetail(ArchiveDetailList: any, ProductRequestCostFactorID: number) {
    return this.http.post(window.location.origin +
      // tslint:disable-next-line:max-line-length
      '/ProductRequest/UpdatePRAllArchiveDetail', { ArchiveDetailList, ProductRequestCostFactorID });
  }
  GetADocTypeList(DocTypes: Array<number>) {
    return this.http.get(window.location.origin + '/Home/GetADocTypeList', { DocTypes });
  }
  SentToAdForum(ObjectID: number, ModuleCode: number) {
    return this.http.get(window.location.origin + '/Home/SentToAdForum', { ObjectID, ModuleCode });
  }
  GetSystemArchiveDetailBydDoctypeCode() {
    return this.http.get(window.location.origin + '/Home/GetSystemArchiveDetailBydDoctypeCode', null
    );
  }
  GetArchive(OrderCommitionID: number, ReportVer: number) {
    return this.http.get(window.location.origin + '/Home/GetArchive',
      {
        OrderCommitionID,
        ReportVer
      }
    );
  }
  GetArchiveDetailByID(ArchiveDetailID: number) {
    return this.http.get(window.location.origin + '/Home/GetArchiveDetailByID',
      {
        ArchiveDetailID
      }
    );
  }

  ReturnArchiveDetailToLast(OrderCommitionID: number) {
    return this.http.post(window.location.origin + '/ProductRequest/ReturnArchiveDetailToLast', { OrderCommitionID });
  }

  GetArchiveDetailByParentDocType(ParentDocType: number) {
    return this.http.get(
      window.location.origin + '/Home/GetArchiveDetailByParentDocType', { ParentDocType });
  }

  ProductRequestInvestArchiveDetailList(CostFactorID: number, ParentDocumentTypeList) {
    return this.http.get(
      window.location.origin + '/ProductRequest/ProductRequestInvestArchiveDetailList', { CostFactorID, ParentDocumentTypeList });
  }
}
