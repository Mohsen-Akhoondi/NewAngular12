import { Injectable } from '@angular/core';
import { BaseHttpClient } from './BaseHttpClient';


@Injectable({ providedIn: 'root' })
export class UserSettingsService {
  constructor(private http: BaseHttpClient) {
  }
  GetCurrentUserDetails() {
    return this.http.get(window.location.origin + '/Account/UserDetails', null);
  }
  GetDateDetail() {
    return this.http.get(window.location.origin + '/Account/GetDateDetail', null);
  }
  LogOutExternalUser() {
    return this.http.post(window.location.origin + '/Account/ExternalLogOff', null);
  }
  LogOutUser() {
    window.location.href = window.location.origin + '/Account/LogOff';
  }
  GetCurrentUserMenu() {
    return this.http.get(window.location.origin + '/Home/GetMenuByUserRole', null);
  }
  GetFastAccessUserModule() {
    return this.http.get(window.location.origin + '/Home/FastUserModule', null);
  }
  // GetUserWorkList() {
  //   return this.http.get(window.location.origin + '/Home/UserWorkList', null);
  // }

  GetModuleList() {
    return this.http.get(window.location.origin + '/Home/GetModuleListByUserID', null);
  }
  GetPersonDetails(IdentityNo) {
    return this.http.get(window.location.origin + '/Home/GetPersonDetail', { IdentityNo: IdentityNo });
  }
  GetRoleList(IdentityNo) {
    return this.http.get(window.location.origin + '/Home/GetRoleList', { IdentityNo: IdentityNo });
  }
  GetPersonRoleList(ActorID, LoginName, IsLoading) {
    return this.http.get(window.location.origin + '/Home/GetPersonRoleList', { ActorID: ActorID, LoginName: LoginName }, IsLoading);
  }

  SaveFastMenuList(AFastMenuList: any) {
    return this.http.post(window.location.origin + '/Home/SaveFastMenuList', { AFastMenuList });
  }
  // GetUserFinishedWorkList() {
  //   return this.http.get(window.location.origin + '/Home/UserFinishedWorkList', null);
  // }
  UserNeedConfirmPhoneNumber() {
    return this.http.get(window.location.origin + '/Account/IsNeedConfirmPhoneNumber', null);
  }
  SaveUser(AFile: FormData) {
    return this.http.post(window.location.origin + '/Home/SaveUser', AFile);
  }
  CheckAdmin() {
    return this.http.get(window.location.origin + '/Home/CheckAdmin', null);
  }
  CheckAdminForUserModule() {
    return this.http.get(window.location.origin + '/Home/CheckAdminForUserModule', null);
  }
  GetModulOPByUser(ModuleCode: number) {
    return this.http.get(window.location.origin + '/Home/GetModulOPByUser', { ModuleCode });
  }
  GetUsers() {
    return this.http.get(window.location.origin + '/Home/GetUsers', null);
  }
  GetSysName() {
    return this.http.get(window.location.origin + '/Account/GetSysName', null);
  }

  SaveUserRole(UserID, UserRoleList) {
    return this.http.post(window.location.origin + '/Home/SaveUserRole', { UserID: UserID, UserRoleList: UserRoleList });
  }

  SaveUserObject(AUserObject: any, IsWFSendSms: any) {
    return this.http.post(window.location.origin + '/Actor/SaveUserObject', { AUserObject, IsWFSendSms });
  }

  ViewSpecialPermission() {
    return this.http.get(window.location.origin + '/Home/ViewSpecialPermission', null);
  }
  CheckAdminRole1253() { // RFC 52551
    return this.http.get(window.location.origin + '/Home/CheckAdminRole1253', null);
  }
  CheckAdminRole1255() {
    return this.http.get(window.location.origin + '/Home/CheckAdminRole1255', null);
  }
  CheckAdminRole1264() {  // RFC 53350
    return this.http.get(window.location.origin + '/Home/CheckAdminRole1264', null);
  }
  ChangeCartableUserPermission() {
    return this.http.get(window.location.origin + '/Home/ChangeCartableUserPermission', null);
  }
  GetUserList(RoleID: number) {
    return this.http.get(window.location.origin + '/Home/GetUserList', { RoleID });
  }

  GetUser(UserID: number) {
    return this.http.get(window.location.origin + '/Home/GetUser', { UserID });
  }
  GetUserWorkListForRevocation(ObjectID, RegionCode) {
    return this.http.get(window.location.origin + '/Home/GetUserWorkListForRevocation', { ObjectID, RegionCode });
  }
  RegionHasOnlineCommition(RegionCode: number) {
    return this.http.get(window.location.origin + '/Home/RegionHasOnlineCommition', { RegionCode });
  }
  CreatedUserList() {
    return this.http.get(window.location.origin + '/Actor/CreatedUserList', null);
  }
  SearchUsersRole(CountRegion, RegionCode = null, RoleID = null, CostCenterId = null, SubCostCenterId = null) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(window.location.origin + '/Actor/SearchUsersRoleList', { CountRegion, RegionCode, RoleID, CostCenterId, SubCostCenterId });
  }
  GetUserWorkListForReturnRevocation(ObjectID, RegionCode) {
    return this.http.get(window.location.origin + '/Home/GetUserWorkListForReturnRevocation', { ObjectID, RegionCode });
  }
  // GetUserInProgressWorkList() {
  //   return this.http.get(window.location.origin + '/Home/UserInProgressWorkList', null);
  // }
  GetUserRegionCodeByWorkflowTransitionID(WorkflowLogID) {
    return this.http.get(window.location.origin + '/Home/GetUserRegionCodeByWorkflowTransitionID', { WorkflowLogID });
  }
  GetCurrentUserGUIDForProvider() {
    return this.http.get(window.location.origin + '/Home/GetCurrentUserGUIDForProvider', {});
  }
  GetUserWorkList(WorkflowObjectCodeList: any) {
    return this.http.get(window.location.origin + '/Home/UserCurrentWorkList', { WorkflowObjectCodeList });
  }
  GetcurrUserWorkListByUserID(AUserId: number, WorkflowObjectCode: any) {
    return this.http.get(window.location.origin + '/Home/GetcurrUserWorkListByUserID', {
      AUserId,
      WorkflowObjectCode
    });
  }
  GetUserFinishedWorkList(WorkflowObjectCodeList: any) {
    return this.http.get(window.location.origin + '/Home/GetUserFinishedWorkList', { WorkflowObjectCodeList });
  }
  GetUserInProgressWorkList(WorkflowObjectCodeList: any) {
    return this.http.get(window.location.origin + '/Home/UserInProgressWorkList', { WorkflowObjectCodeList });
  }
  GetAllRole() {
    return this.http.get(window.location.origin + '/Actor/GetAllRole', null);
  }
  CheckIsAdmin() {
    return this.http.get(window.location.origin + '/Home/CheckIsAdmin', null);
  }
  GetActiveActorID() {
    return this.http.get(window.location.origin + '/Home/GetActiveActorID', null);
  }
  GetUserDeleteddWorkList(WorkflowObjectCodeList: any) {
    return this.http.get(window.location.origin + '/Home/GetUserDeleteddWorkList', { WorkflowObjectCodeList });
  }
  GetPDFDigestForDigitalSign(Certificate) {
    return this.http.post(window.location.origin + '/Home/GetPDFDigestForDigitalSign', { Certificate });
  }
  GetPDFSignerInfo(AFile) {
    return this.http.post(window.location.origin + '/Home/GetPDFSignerInfo', AFile);
  }
  SignedPDFData(Certificate, Signature, LoadedPDFName) {
    return this.http.post(window.location.origin + '/Home/SignedPDFData', { Certificate, Signature, LoadedPDFName });
  }
  CheckNewNotif() {
    return this.http.get(window.location.origin + '/Home/CheckNewNotif', null);
  }
  CheckAdminForConfirmArchive() {
    return this.http.get(window.location.origin + '/Home/CheckAdminForConfirmArchive', null);
  }
}
