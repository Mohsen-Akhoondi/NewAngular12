import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './Home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { UserDetailComponent } from './Users/user-detail.component';
import { AppMenuComponent } from './Shared/Menu/app-menu.component';
import { AppSidebarComponent } from './Shared/SideBar/app-sidebar.component';
import { AccessDeniedComponent } from './Shared/AccessControl/access-denied.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalTwoColComponent } from './Shared/modal-two-col/modal-two-col.component';
import { PriceListComponent } from './PriceList/price-list.component';
import { OverPopupComponent } from './Shared/OverPopUp/over-popup.component';
import { PriceListAnalayseComponent } from './Shared/price-list-analayse/price-list-analayse.component';
import { AnalayzePriceComponent } from './Shared/analayze-price/analayze-price.component';
import { ContractListPageComponent } from './Shared/contract-list-page/contract-list-page.component';
import { ContractEstimatePageComponent } from './Shared/contract-estimate-page/contract-estimate-page.component';
import { ModalArchiveYearComponent } from './Shared/modal-archive-year/modal-archive-year.component';
import { ModalApprPriceIndexComponent } from './Shared/modal-appr-price-index/modal-appr-price-index.component';
import { ContractPageComponent } from './Shared/contract-page/contract-page.component';
import { ContractPersonPageComponent } from './Shared/contract-person-page/contract-person-page.component';
import { CartableComponent } from './Cartable/cartable.component';
import { WorkflowSendComponent } from './WorkFlow/workflow-send/workflow-send.component';
import { CustomizedMenuComponent } from './Shared/CustomizedMenu/customized-menu/customized-menu.component';
import { NgSelectCellEditorComponent } from './Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { OverPopUpCellEditorComponent } from './Shared/OverPopUpcellEditor/over-pop-up-cell-editor.component';
import { UpdateWorkflowStatusComponent } from './WorkFlow/update-workflow-status/update-workflow-status.component';
import { UserRoleComponent } from './Users/UserRole/user-role.component';
import { WorkflowTypeFormComponent } from './WorkFlow/workflow-type/workflow-type-form/workflow-type-form.component';
import { UserConfirmPhoneNumberComponent } from './Users/ConfirmPhoneNumber/user-confirm-phone-number.component';
import { TemplateRendererComponent } from './Shared/grid-component/template-renderer/template-renderer.component';
import { LoadingComponent } from './Load/loading/loading.component';
import { LoadingService } from './Load/loading/LoadingService';
import { ContractCoefTypeComponent } from './Contract/Base_modules/contract-coef-type/contract-coef-type.component';
import { ChooseReportComponent } from './Shared/choose-report/choose-report.component';
import { ContractCoefComponent } from './Shared/contract-coef/contract-coef.component';
import { ContractOrderitemCoefComponent } from './Shared/contract-orderitem-coef/contract-orderitem-coef.component';
import { WorkflowStatusPageComponent } from './WorkFlow/workflow-status-page/workflow-status-page.component';
import { WorkflowOperationPageComponent } from './WorkFlow/workflow-operation-page/workflow-operation-page.component';
import { WorkflowNodePageComponent } from './WorkFlow/workflow-node-page/workflow-node-page.component';
import { WorkflowTransitionPageComponent } from './WorkFlow/workflow-transition-page/workflow-transition-page.component';
// tslint:disable-next-line:max-line-length
import { PriceListTopicDataentryPageComponent } from './PriceList/PriceListTopic/price-list-topic-dataentry-page/price-list-topic-dataentry-page.component';
import { NumberFieldEditableComponent } from './Shared/number-field-editable/number-field-editable.component';
import { PriceListTopicComponent } from './PriceList/price-list-topic/price-list-topic.component';
import { CheckboxFieldEditableComponent } from './Shared/checkbox-field-editable/checkbox-field-editable.component';
import { MessageService } from './Shared/message-box/MessageService';
// tslint:disable-next-line:max-line-length
import { ContractPayDetailsComponent } from './Contract/ContractPay/contract-pay/contract-pay-details.component';

// tslint:disable-next-line:max-line-length
import { ChildPriceListTopicPageComponent } from './PriceList/PriceListTopic/child-price-list-topic-page/child-price-list-topic-page.component';
import { ContractPayListComponent } from './Contract/ContractPay/contract-pay-list/contract-pay-list.component';
import { ContractPayTypesComponent } from './Contract/ContractPay/contract-pay-types/contract-pay-types.component';
import { SelecetContractEstimateComponent } from './Contract/ContractPay/selecet-contract-estimate/selecet-contract-estimate.component';
import { ChoosenContractPayRepComponent } from './Contract/ContractPay/Report/choosen-contract-pay-rep/choosen-contract-pay-rep.component';
import { UsersSearchComponent } from './Users/users-search/users-search.component';
import { ContractCaseListComponent } from './Contract/Base_modules/contract-case-list/contract-case-list.component';
import { ContractCaseComponent } from './Contract/Base_modules/contract-case/contract-case.component';
import { ContractEstimateViewComponent } from './Contract/Base_modules/contract-estimate-view/contract-estimate-view.component';
import { ContractNoEstimateViewComponent } from './Contract/Base_modules/contract-no-estimate-view/contract-no-estimate-view.component';
import { PriceListRelatedListComponent } from './PriceList/price-list-related-list/price-list-related-list.component';
// tslint:disable-next-line:max-line-length
import { ContractPayItemEstimatePageComponent } from './Contract/ContractPay/contract-pay-item-estimate-page/contract-pay-item-estimate-page.component';
import { ContractAgentComponent } from './Contract/Base_modules/contract-agent/contract-agent/contract-agent.component';
import { ContractAgentRoleComponent } from './Contract/Base_modules/contract-agent-role/contract-agent-role/contract-agent-role.component';
import { PriceListPatternGoodsComponent } from './PriceList/price-list-pattern-goods/price-list-pattern-goods.component';
import { WorkglowTypeModuleComponent } from './WorkFlow/workglow-type-module/workglow-type-module.component';
import { RoadTypeComponent } from './Contract/ContractPay/road-type/road-type.component';
import { TransferDistanceItemComponent } from './PriceList/transfer-distance-item/transfer-distance-item.component';
import { ContractPayShipmentComponent } from './Contract/ContractPay/contract-pay-shipment/contract-pay-shipment.component';
import { SummaryQuantitySurveyingComponent } from './Contract/ContractPay/summary-quantity-surveying/summary-quantity-surveying.component';
import { FinancialSheetComponent } from './Contract/ContractPay/financial-sheet/financial-sheet.component';
import { SelectContractPayComponent } from './Contract/ContractPay/select-contract-pay/select-contract-pay.component';
import { ContractMinutesListComponent } from './Contract/ContractMinutes/contract-minutes-list/contract-minutes-list.component';
// tslint:disable-next-line:max-line-length
import { ContractMinutesItemListPageComponent } from './Contract/ContractMinutes/contract-minutes-item-list-page/contract-minutes-item-list-page.component';
// tslint:disable-next-line:max-line-length
import { SetContractPriceListPatternComponent } from './Contract/Base_modules/set-contract-price-list-pattern/set-contract-price-list-pattern.component';
import { RefreshServices } from './Services/BaseService/RefreshServices';
// tslint:disable-next-line:max-line-length
import { SetInvalidContractEstimateComponent } from './Contract/Estimate/set-invalid-contract-estimate/set-invalid-contract-estimate.component';
import { SelectContractMinutesComponent } from './Contract/ContractMinutes/select-contract-minutes/select-contract-minutes.component';
import { SelectContractAgentComponent } from './Contract/ContractPay/select-contract-agent/select-contract-agent.component';
// tslint:disable-next-line:max-line-length
import { ContractPayDistanceResultComponent } from './Contract/ContractPay/contract-pay-distance-result/contract-pay-distance-result.component';
// tslint:disable-next-line:max-line-length
import { ContractIdentityPresenterComponent } from './Contract/Base_modules/contract-identity-presenter/contract-identity-presenter.component';
// tslint:disable-next-line:max-line-length
import { ChoosenContractEstimateRepComponent } from './Contract/ContractPay/Report/choosen-contract-estimate-rep/choosen-contract-estimate-rep.component';
import { ConsultPersonComponent } from './Actors/consult-person/consult-person.component';
import { ContractVehicleEstimateComponent } from './Contract/Estimate/contract-vehicle-estimate/contract-vehicle-estimate.component';
import { ContractPersonEstimateComponent } from './Contract/Estimate/contract-person-estimate/contract-person-estimate.component';
import { ContractPayItemHourComponent } from './Contract/ContractPay/contract-pay-item-hour/contract-pay-item-hour.component';
import { GroupMessageBoxComponent } from './Shared/group-message-box/group-message-box.component';
import { MonthWorkHourComponent } from './Contract/FinYear/month-work-hour/month-work-hour.component';
// tslint:disable-next-line:max-line-length
import { ContractSupervisionListComponent } from './Contract/ContractSupervision/contract-supervision-list/contract-supervision-list.component';
// tslint:disable-next-line:max-line-length
import { ContractSupervisionItemListComponent } from './Contract/ContractSupervision/contract-supervision-item-list/contract-supervision-item-list.component';
import { ContractWorkOrderListComponent } from './Contract/ContractWorkOrder/contract-work-order-list/contract-work-order-list.component';
// tslint:disable-next-line:max-line-length
import { ContractWorkOrderItemListComponent } from './Contract/ContractWorkOrder/contract-work-order-item-list/contract-work-order-item-list.component';
import { ContractOrderItemDeductionComponent } from './Shared/contract-order-item-deduction/contract-order-item-deduction.component';
import { ContractPayFeeDetailsComponent } from './Contract/ContractPay/contract-pay-fee-details/contract-pay-fee-details.component';
import { ContractPayTransportComponent } from './Contract/ContractPay/contract-pay-transport/contract-pay-transport.component';
// tslint:disable-next-line:max-line-length
import { ContractPayVoucherDetailsComponent } from './Contract/ContractPay/contract-pay-voucher-details/contract-pay-voucher-details.component';
import { ShowFeeDetailsComponent } from './Contract/show-fee-details/show-fee-details.component';
import { ProductRequestPageComponent } from './ProductRequest/product-request-page/product-request-page.component';
import { WorkflowLogComponent } from './WorkFlow/workflow-log/workflow-log.component';
import { DealMethodComponent } from './Supply/deal-method/deal-method.component';
import { NgxTreeSelectModule, ExpandMode } from './Shared/ngx-tree-select/src';
import { TreeSelectComponent } from './Shared/tree-select/tree-select.component';
import { ProductRequestSuggestionComponent } from './ProductRequest/product-request-suggestion/product-request-suggestion.component';
import { CommonServices } from './Services/BaseService/CommonServices';
import { CustomCheckboxModule } from './Shared/custom-checkbox/src/public_api';
import { ProductRequestCoefTypeComponent } from './ProductRequest/product-request-coef-type/product-request-coef-type.component';
import { ProductRequestCoefComponent } from './ProductRequest/product-request-coef/product-request-coef.component';
import { ProductRequestCostComponent } from './ProductRequest/product-request-cost/product-request-cost.component';
import { ProductRequestPersonItemComponent } from './ProductRequest/product-request-person-item/product-request-person-item.component';
import { ContractPersonRepComponent } from './Contract/Report/contract-person-rep/contract-person-rep.component';
import { ProductRequestContractComponent } from './ProductRequest/product-request-contract/product-request-contract.component';
// tslint:disable-next-line:max-line-length
import { RequestContractWithoutFlowComponent } from './ProductRequest/request-contract-without-flow/request-contract-without-flow.component';
import { ProductRequestListComponent } from './ProductRequest/product-request-list/product-request-list.component';
import { ContractWithoutFlowListComponent } from './ProductRequest/contract-without-flow-list/contract-without-flow-list.component';
import { OrderPageComponent } from './ProductRequest/order-page/order-page.component';
// tslint:disable-next-line:max-line-length
import { ProductRequestPageWithoutFlowComponent } from './ProductRequest/product-request-page-without-flow/product-request-page-without-flow.component';
import { RequestProposalItemComponent } from './ProductRequest/request-proposal-item/request-proposal-item.component';
import { CommissionPageComponent } from './ProductRequest/order-page/commission-page/commission-page.component';
import { ProductRequestEstimateComponent } from './ProductRequest/product-request-estimate/product-request-estimate.component';
// tslint:disable-next-line:max-line-length
import { ProductRequestPersonEstimateComponent } from './ProductRequest/product-request-person-estimate/product-request-person-estimate.component';
import { ProposalItemEstimateComponent } from './ProductRequest/ProPosal/proposal-item-estimate/proposal-item-estimate.component';
import { ProposalPersonEstimateComponent } from './ProductRequest/ProPosal/proposal-person-estimate/proposal-person-estimate.component';
// tslint:disable-next-line:max-line-length
import { SelectProductRequestEstimateComponent } from './ProductRequest/ProPosal/select-product-request-estimate/select-product-request-estimate.component';
import { ProductRequestProvisionComponent } from './ProductRequest/product-request-provision/product-request-provision.component';
import { AutomationComponent } from './Automation/automation/automation.component';
import { AutomationButtonComponent } from './Automation/automation-button/automation-button.component';
import { UserWorkLogContractPayComponent } from './WorkFlow/user-work-log-Contract-Pay/user-work-log-Contract-Pay.component';
import { UserWorkLogContractOrderComponent } from './WorkFlow/user-work-log-Contract-Order/user-work-log-Contract-Order.component';
import { UserWorkLogProductRequestComponent } from './WorkFlow/user-work-log-Product-Request/user-work-log-Product-Request.component';
import { DocumentTypeMasterComponent } from './Common/app-document-type-master/app-document-type-master.component';
// tslint:disable-next-line: max-line-length
import { DocumentTypeMasterMandatoryComponent } from './Common/app-document-type-master-mandatory/app-document-type-master-mandatory.component';
import { from } from 'rxjs';
import { ProvisionComponent } from './ProductRequest/provision/provision.component';
import { AdvertisingComponent } from './ProductRequest/advertising/advertising.component';
import { NewsPaperPageComponent } from './ProductRequest/news-paper-page/news-paper-page.component';
import { GeneralTenderComponent } from './ProductRequest/ProPosal/general-tender/general-tender.component';
import { ContractPayCoefComponent } from './Contract/ContractPay/contract-pay-coef/contract-pay-coef.component';
import { AdvertisingSearchComponent } from './ProductRequest/ProPosal/advertising-search/advertising-search.component';
import { AdvertisingListComponent } from './ProductRequest/ProPosal/advertising-list/advertising-list.component';
import { InuirySearchListComponent } from './ProductRequest/ProPosal/inuiry-search-list/inuiry-search-list.component';
import { ActorInquiryComponent } from './Actors/actor-inquiry/actor-inquiry.component';
import { PersonComponent } from './Actors/person/person.component';
import { CommitionComponent } from './ProductRequest/ProPosal/commition/commition.component';
import { CorporateComponent } from './Actors/corporate/corporate.component';
import { InquiryListComponent } from './ProductRequest/ProPosal/inquiry-list/inquiry-list.component';
import { UsersComponent } from './Actors/users/users.component';
import { SendLetterPageComponent } from './Common/send-letter-page/send-letter-page.component';
import { LetterTypeComponent } from './Common/LetterType/letter-type.component';
// tslint:disable-next-line: max-line-length
import { CumulativeContractPayListComponent } from './Contract/ContractPay/cumulative-contract-pay-list/cumulative-contract-pay-list.component';
// tslint:disable-next-line: max-line-length
import { CumulativeContractPayItemEstimateComponent } from './Contract/ContractPay/cumulative-contract-pay-item-estimate/cumulative-contract-pay-item-estimate.component';
import { ModuleViewTypeComponent } from './Common/ModuleViewType/module-view-type.component';
import { UserSelectComponent } from './Actors/user-select/user-select.component';
// tslint:disable-next-line: max-line-length
import { CumulativeContractPayDetailsComponent } from './Contract/ContractPay/cumulative-contract-pay-details/cumulative-contract-pay-details.component';
// tslint:disable-next-line: max-line-length
import { ProductRequestEstateComponent } from './ProductRequest/ProductRequestEstate/product-request-estate/product-request-estate.component';
import { EstateSearchComponent } from './ProductRequest/ProductRequestEstate/estate-search/estate-search.component';
import { ProductRequestInvestPageComponent } from './ProductRequest/product-request-invest-page/product-request-invest-page.component';
import { InvestUsageTypeComponent } from './ProductRequest/Invest/invest-usage-type/invest-usage-type.component';
// tslint:disable-next-line:max-line-length
import { ContractProvisionRemainPageComponent } from './ProductRequest/contract-provision-remain-page/contract-provision-remain-page.component';
import { InvestTypeComponent } from './ProductRequest/Invest/invest-type/invest-type.component';
import { CreateContractOnFlowComponent } from './ProductRequest/create-contract-on-flow/create-contract-on-flow.component';
import { ContractTypeComponent } from './Contract/contract-type/contract-type.component';
import { Person2Component } from './Actors/person/person2/person2.component';
// tslint:disable-next-line: max-line-length
import { ProductRequestArchiveDetailComponent } from './ProductRequest/product-request-archive-detail/product-request-archive-detail/product-request-archive-detail.component';
import { Corporate2Component } from './Actors/corporate2/corporate2.component';
// tslint:disable-next-line: max-line-length
import { ProductRequestShowDetailsPageComponent } from './ProductRequest/product-request-show-details-page/product-request-show-details-page.component';
// tslint:disable-next-line:max-line-length
import { ProductRequestArticle48PageComponent } from './ProductRequest/product-request-article-48-page/product-request-article-48-page.component';
// tslint:disable-next-line:max-line-length
import { GeneralTenderReadOnlyModeComponent } from './ProductRequest/ProPosal/general-tender-read-only-mode/general-tender-read-only-mode.component';
import { ShareTypeComponent } from './Common/share-type/share-type.component';
import { UnivercityComponent } from './Common/univercity/univercity.component';
import { FieldComponent } from './Common/field/field.component';
import { GradeComponent } from './Common/grade/grade.component';
import { MainPageComponent } from './Advertising/main-page/main-page.component';
import { TenderPageComponent } from './Advertising/tender-page/tender-page.component';
import { DealDetailsComponent } from './Advertising/deal-details/deal-details.component';
import { LoginComponent } from './Advertising/login/login.component';
import { DealUploadDocsComponent } from './Advertising/deal-upload-docs/deal-upload-docs.component';
import { ActorCertificateComponent } from './Actors/actor-certificate/actor-certificate.component';
import { PriceListBusinessPatternComponent } from './Common/price-list-business-pattern/price-list-business-pattern.component';
import { GroundDeliveryMinutesComponent } from './Contract/ContractMinutes/ground-delivery-minutes/ground-delivery-minutes.component';
import { AdvertisingArchiveComponent } from './Advertising/advertising-archive/advertising-archive.component';
import { ContractMinutesTypeComponent } from './Contract/ContractMinutes/contract-minutes-type/contract-minutes-type.component';
import { CommitionTypeComponent } from './ProductRequest/Commition-type/commition-type/commition-type.component';
import { CommitionMemberComponent } from './ProductRequest/Commition-type/commition-member/commition-member.component';
import { DealTypeMethodComponent } from './ProductRequest/deal-type-method/deal-type-method.component';
import { AcceptRulesComponent } from './Advertising/accept-rules/accept-rules.component';
import { WarrantyItemComponent } from './ProductRequest/ProPosal/Warranty-item/warranty-item.component';
import { CommitionPrintComponent } from './ProductRequest/ProPosal/commition-print/commition-print.component';
// tslint:disable-next-line:max-line-length
import { ChooseReportProductRequestItemComponent } from './Shared/choose-report-product-request-item/choose-report-product-request-item.component';
import { ChoosenRequestRevocationComponent } from './ProductRequest/choosen-request-revocation/choosen-request-revocation.component';
// tslint:disable-next-line: max-line-length
import { ProductRequestPageProposalComponent } from './ProductRequest/product-request-page-proposal/product-request-page-proposal.component';
import { ApplicationNoteComponent } from './Cartable/application-note/application-note.component';
// tslint:disable-next-line: max-line-length
import { EstateRecognitionSearchComponent } from './ProductRequest/ProductRequestEstate/estate-recognition-search/estate-recognition-search.component';
import { RoleSearchComponent } from './Actors/role-search/role-search.component';
import { ProductRequestWFDetailComponent } from './WorkFlow/product-request-wf-detail/product-request-wf-detail.component';
import { CreatedUserLogComponent } from './Actors/created-user-log/created-user-log.component';
import { UsersRolesInRegionListComponent } from './Actors/users-roles-in-region-list/users-roles-in-region-list.component';
import { CorrectionContractEstimateComponent } from './WorkFlow/correction-contract-estimate/correction-contract-estimate.component';
import { ProductRequestItemCoefComponent } from './ProductRequest/product-request-item-coef/product-request-item-coef.component';
import { PriceListCorrectionComponent } from './PriceList/price-list-correction/price-list-correction.component';
import { PriceListTopicSelectComponent } from './PriceList/price-list-topic-select/price-list-topic-select.component';
import { UrbanServicesActivitiesLogComponent } from './WorkFlow/urban-services-activities-log/urban-services-activities-log.component';
// tslint:disable-next-line:max-line-length
import { ProductRequestPageWithoutFlowProposalComponent } from './ProductRequest/product-request-page-without-flow-proposal/product-request-page-without-flow-proposal.component';
import { Article31PageComponent } from './ProductRequest/article31-page/article31-page.component';
// tslint:disable-next-line:max-line-length
import { EstateRecognitionEvaluationComponent } from './ProductRequest/ProductRequestEstate/estate-recognition-evaluation/estate-recognition-evaluation.component';
// tslint:disable-next-line:max-line-length
import { ProductRequestRelatedItemsComponent } from './ProductRequest/product-request-related-items/product-request-related-items.component';
import { FilterDocumentTypeComponent } from './Common/filter-document-type/filter-document-type.component';
import { CorporatePersonnelTypeComponent } from './Common/corporate-personnel-type/corporate-personnel-type.component';
// tslint:disable-next-line:max-line-length
import { AdjustmentPriceRangeFormulasPageComponent } from './ProductRequest/ProPosal/adjustment-price-range-formulas-page/adjustment-price-range-formulas-page.component';
// tslint:disable-next-line:max-line-length
import { RemoveContractFromClarificationComponent } from './ProductRequest/remove-contract-from-clarification/remove-contract-from-clarification.component';
import { CorporateCapacityComponent } from './Actors/corporate-capacity/corporate-capacity.component';
import { CorporateCapacityListComponent } from './Actors/corporate-capacity-list/corporate-capacity-list.component';
import { PureProductRequestPageComponent } from './ProductRequest/pure-product-request-page/pure-product-request-page.component';
import { DailyBookComponent } from './Accounting/DailyBook/daily-book.component';
import { ContractPeriodReportComponent } from './ProductRequest/contract-period-report/contract-period-report.component';
import { LedgerAccBookComponent } from './Accounting/LedgerAccBook/ledger-acc-book.component';
import { GlobalChoosePageComponent } from './Shared/global-choose-page/global-choose-page.component';
import { ConsultantSelectTypeComponent } from './ProductRequest/consultant-select-type/consultant-select-type.component';
import { SubLedgerAccBookComponent } from './Accounting/SubLedgerAccBook/sub-ledger-acc-book.component';
import { AccountTurnoverComponent } from './Accounting/account-turnover/account-turnover.component';
import { DetailAccBookComponent } from './Accounting/DetailAccBook/detail-acc-book.component';
import { ProviderAssetTypeComponent } from './Common/provider-asset-type/provider-asset-type.component';
import { ContractingCardSearchComponent } from './Actors/contracting-card-search/contracting-card-search.component';
import { ContractorCardListComponent } from './Actors/contractor-card-list/contractor-card-list.component';
import { CarTagComponent } from './Shared/car-tag/car-tag.component';
import { MovablePropertyPageComponent } from './Actors/movable-property-page/movable-property-page.component';
import { RequestItemEntityPageComponent } from './ProductRequest/request-item-entity-page/request-item-entity-page.component';
import { ProvidersSearchPageComponent } from './Actors/providers-search-page/providers-search-page.component';
import { ManagementTypePageComponent } from './Actors/management-type-page/management-type-page.component';
import { ResponsibilityTypePageComponent } from './Actors/responsibility-type-page/responsibility-type-page.component';
import { ProductEntityPageComponent } from './ProductRequest/product-entity-page/product-entity-page.component';
// tslint:disable-next-line: max-line-length
import { ResearcherProductRequestListComponent } from './ProductRequest/researcher-product-request-list/researcher-product-request-list.component';
import { EndOfContractComponent } from './Contract/Base_modules/end-of-contract/end-of-contract.component';
import { SendSmsComponent } from './Shared/send-sms/send-sms.component';
import { ControlProjectBgtInfoPageComponent } from './Budget/control-project-bgt-info-page/control-project-bgt-info-page.component';
import { CivilProjectPageComponent } from './Budget/civil-project-page/civil-project-page.component';
import { RequestEvaluateListComponent } from './ProductRequest/request-evaluate-list/request-evaluate-list.component';
import { RequestEvaluateComponent } from './ProductRequest/request-evaluate/request-evaluate.component';
import { EstatePropertyTypePageComponent } from './ProductRequest/estate-property-type-page/estate-property-type-page.component';
import { EvaluateTypePageComponent } from './ProductRequest/evaluate-type-page/evaluate-type-page.component';
import { EvaluateMethodPageComponent } from './ProductRequest/evaluate-method-page/evaluate-method-page.component';
import { EntityTypeComponent } from './ProductRequest/Entity-Type/entity-type.component';
import { AssetIncomeComponent } from './Assets/asset-income/asset-income.component';
import { AssetIncomeListComponent } from './Assets/asset-income/asset-income-list/asset-income-list.component';
import { ArchiveYearDocumentComponent } from './Shared/archive-year-document/archive-year-document.component';
import { SupplierWorkFlowComponent } from './Actors/supplier-work-flow/supplier-work-flow.component';
import { FeePageComponent } from './Accounting/fee-page/fee-page.component';
import { OtherContractDocsListComponent } from './Contract/OtherContractDocuments/OtherContractDocsList/other-contract-docs-list/other-contract-docs-list.component';
import { OtherContractDocumentsComponent } from './Contract/OtherContractDocuments/other-contract-documents/other-contract-documents.component';
import { OtherContractDocsTypeComponent } from './Contract/OtherContractDocuments/other-contract-docs-type/other-contract-docs-type.component';
import { VariableTypeComponent } from './ProductRequest/ProPosal/variable/variable-type/variable-type.component';
import { CommitionProceedVariableComponent } from './ProductRequest/ProPosal/variable/commition-proceed-variable/commition-proceed-variable.component';
import { ComprehensiveStatusReportComponent } from './Shared/comprehensive-status-report/comprehensive-status-report.component';
import { SelectActorForSmsComponent } from './Actors/select-actor-for-sms/select-actor-for-sms.component';
import { ContractPayWorkReportComponent } from './Shared/contract-pay-work-report/contract-pay-work-report.component';
import { SendToClarificationRepComponent } from './Contract/SendToClarificationReport/send-to-clarification-rep/send-to-clarification-rep.component';
import { RankCalcComponent } from './Actors/rank-calc/rank-calc.component';
import { RankParameterComponent } from './Common/rank-parameter/rank-parameter.component';
import { PrePayComponent } from './Contract/ContractPay/pre-pay/pre-pay.component';
import { CompletionContractInfoComponent } from './ProductRequest/completion-contract-info/completion-contract-info.component';
import { SingleSaleInvoiceComponent } from './Invoice/single-sale-invoice/single-sale-invoice.component';
import { InvoiceListComponent } from './Invoice/invoice-list/invoice-list.component';
import { ShowUnderTakeItemsComponent } from './Contract/ContractPay/show-under-take-items/show-under-take-items.component';
import { ContractOrderOnWithoutFlowComponent } from './ProductRequest/contract-order-on-without-flow/contract-order-on-without-flow.component';
import { ReopeningTenderEnvekopesComponent } from './ProductRequest/ProPosal/reopening-tender-envekopes/reopening-tender-envekopes.component';
import { GoodsComponent } from './Actors/goods/goods.component';
import { UserWorkLogInvoiceComponent } from './Invoice/user-work-log-invoice/user-work-log-invoice.component';
import { ContractorSendSMSComponent } from './Actors/contractor-send-sms/contractor-send-sms.component';
import { SendAutomationLetterComponent } from './Automation/send-automation-letter/send-automation-letter.component';
import { ChooseReportCOntractPayItemEstimateComponent } from './Shared/choose-report-contract-pay-item-estimate/choose-report-contract-pay-item-estimate/choose-report-contract-pay-item-estimate.component';
import { TenderEncryptedFilesListComponent } from './ProductRequest/ProPosal/tender-encrypted-files-list/tender-encrypted-files-list.component';
import { DataDictionaryPageComponent } from './Budget/data-dictionary-page/data-dictionary-page.component';
import { ViewActorRankComponent } from './Actors/view-actor-rank/view-actor-rank.component';
import { CompleteContractListReportComponent } from './Contract/complete-contract-list-report/complete-contract-list-report.component';
import { ContractWfReportLevel2Component } from './Contract/contract-wf-report-level2/contract-wf-report-level2.component';
import { ContractWfReportLevel3Component } from './Contract/contract-wf-report-level3/contract-wf-report-level3.component';
import { ReportAverageWorkflowObjectsComponent } from './WorkFlow/report-average-workflow-objects/report-average-workflow-objects.component';
import { AdjustmentPriceRangeFormulasComponent } from './ProductRequest/ProPosal/adjustment-price-range-formulas/adjustment-price-range-formulas.component';
import { ContractStatusSummaryRepPageComponent } from './ProductRequest/contract-status-summary-rep-page/contract-status-summary-rep-page.component';
import { ContractStatusSummarySearchPageComponent } from './ProductRequest/contract-status-summary-search-page/contract-status-summary-search-page.component';
import { ModuleViewTypeDocumentComponent } from './Common/module-view-type-document/module-view-type-document.component';
import { WorkflowActionComponent } from './WorkFlow/workflow-action/workflow-action.component';
import { CostCenterPageRepComponent } from './ProductRequest/cost-center-page-rep/cost-center-page-rep.component';
import { WorkflowObjectComponent } from './WorkFlow/workflow-object/workflow-object.component';
import { SacleComponent } from './Supply/sacle/sacle.component';
import { ModuleComponent } from './AppUser/module/module/module.component';
import { WorkflowStatusComponent } from './WorkFlow/workflow-status/workflow-status.component';
import { ProductSearchComponent } from './Supply/product-search/product-search.component';
import { GoodsRequestComponent } from './Supply/goods-request/goods-request.component';
import { AppInputAdjustmentPriceRangeComponent } from './ProductRequest/ProPosal/app-input-adjustment-price-range/app-input-adjustment-price-range.component';
import { ExternalUserDetailComponent } from './Actors/external-user-detail/external-user-detail.component';
import { RelationTypeComponent } from './Common/relation-type/relation-type.component';
import { CurrentSuppliersContractComponent } from './Actors/current-suppliers-contract/current-suppliers-contract.component';
import { ShowContractListComponent } from './ProductRequest/show-contract-list/show-contract-list.component';
import { ApplicantOutCostCenterRepComponent } from './ProductRequest/applicant-out-cost-center-rep/applicant-out-cost-center-rep.component';
import { ProductReceiveDocComponent } from './ProductRequest/product-receive-doc/product-receive-doc.component';
import { AssetPageComponent } from './Assets/asset-page/asset-page.component';
import { AssetPageSearchComponent } from './Assets/asset-page-search/asset-page-search.component';
import { ChangeCartableUserComponent } from './Cartable/change-cartable-user/change-cartable-user.component';
import { DeadlineContractListComponent } from './Contract/deadline-contract-list/deadline-contract-list.component';
import { RichTextBoxInputPageComponent } from './Shared/rich-text-box-input-page/rich-text-box-input-page.component';
import { ApplicationLinkPageComponent } from './AppUser/application-link-page/application-link-page.component';
import { ShowHistoryDetailComponent } from './AppUser/show-history-detail/show-history-detail.component';
import { ShowOpenContractComponent } from './Contract/show-open-contract/show-open-contract.component';
import { ConditionRegionReportComponent } from './Contract/condition-region-report/condition-region-report.component';
import { RenewRequestsRepComponent } from './WorkFlow/renew-requests-rep/renew-requests-rep.component';
import { NgSelectModule } from './Shared/ng-select/public-api';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { MaintenanceVolumeGreenSpaceComponent } from './Contract/Base_modules/maintenance-volume-green-space/maintenance-volume-green-space.component';
import { ContractInfoLimitedChangePageComponent } from './ProductRequest/contract-info-limited-change-page/contract-info-limited-change-page.component';
import { ContractSupervisionComponent } from './Contract/ContractSupervision/contract-supervision/contract-supervision.component';
import { ApplicationNoteFormComponent } from './AppUser/application-note-form/application-note-form.component';
import { ApplicationNoteListComponent } from './AppUser/application-note-list/application-note-list.component';
import { RequestPeriodReportComponent } from './ProductRequest/request-period-report/request-period-report.component';
import { ProdutRequestCommitionMemberReportComponent } from './ProductRequest/produt-request-commition-member-report/produt-request-commition-member-report.component';
import { RouteNavigateComponent } from './Shared/route-navigate/route-navigate.component';
import { ActorNoteComponent } from './Actors/actor-note/actor-note.component';
import { ContractDealMethodBaseReportComponent } from './Contract/Report/contract-deal-method-base-report/contract-deal-method-base-report.component';
import { ChangeContractStatusComponent } from './WorkFlow/change-contract-status/change-contract-status.component';
import { ProxyContractListComponent } from './ProductRequest/proxy-contract-list/proxy-contract-list.component';
import { ShowContractRelationComponent } from './Contract/show-contract-relation/show-contract-relation.component';
import { CustomerExpertsEntryComponent } from './CRM/customer-experts-entry/customer-experts-entry.component';
import { CorporateWithoutInquiryComponent } from './Actors/corporate-without-inquiry/corporate-without-inquiry.component';
import { PersonWithoutInquiryComponent } from './Actors/person/person-without-inquiry/person-without-inquiry.component';
import { ContractArchiveListComponent } from './Contract/contract-archive-list/contract-archive-list.component';
import { ContractPayDeductionComponent } from './Contract/ContractPay/contract-pay/contract-pay-deduction/contract-pay-deduction.component';
import { ContractComponent } from './Contract/contract/contract.component';
import { GeneralSearchContractRequestComponent } from './WorkFlow/general-search-contract-request/general-search-contract-request.component';
import { ProductRequestInvestArchiveComponent } from './ProductRequest/product-request-invest-archive/product-request-invest-archive.component';
import { ShowHistoryComponent } from './Common/show-history/show-history.component';
import { ProductRequestInvestArchiveListComponent } from './ProductRequest/product-request-invest-archive-list/product-request-invest-archive-list.component';
import { CommonModule } from '@angular/common';
import { GridComponent } from '../app/Shared/grid-component/grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { NgSelectVirtualScrollComponent } from '../app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { JalaliDatepickerComponent } from '../app/Shared/jalali-datepicker/jalali-datepicker.component';
import { DpDatePickerModule } from '../app/Shared/jalali-angular-datepicker';
import { NumberInputComponentComponent } from '../app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';
import { CustomizedTreeComponent } from '../app/Shared/customized-tree/customized-tree.component';
import { MyTreeComponent } from '../app/Shared/tree-component/tree.component';
import { TreeModule } from '@circlon/angular-tree-component';
import { Tree2Component } from '../app/Advertising/tree2/tree2.component';
import { FileViwerPageComponent } from '../app/shared/file-viwer-page/file-viwer-page.component';
import { ImageViewerModule } from '@udhsin/ngx-image-viewer';
import { MessageBoxComponent } from '../app/Shared/message-box/message-box.component';
import { SharedOverPopupComponent } from '../app/Shared/shared-over-popup/shared-over-popup.component';
import { UsersOrganizationSignComponent } from '../app/AppUser/users-organization-sign/users-organization-sign.component';
import { PDFViewerComponent } from '../app/Shared/pdfviewer/pdfviewer.component';
import { ModalArchiveComponent } from '../app/Shared/modal-archive/modal-archive.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { CustomCheckBoxComponent } from '../app/Shared/CustomComponent/custom-check-box/custom-check-box.component';
import { UserWorkLogDetailGraphLineComponent } from '../app/WorkFlow/user-work-log-detail-graph-line/user-work-log-detail-graph-line.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { UserWorkLogDetailGraphComponent } from '../app/WorkFlow/user-work-log-detail-graph/user-work-log-detail-graph.component';
import { UserWorkLogDetailComponent } from '../app/WorkFlow/user-work-log-detail/user-work-log-detail.component';
import { WorkFlowTransitionComponent } from '../app/WorkFlow/work-flow-transition/work-flow-transition.component';
import { ExcelLoadDataComponent } from '../app/Shared/excel-load-data/excel-load-data.component';
import { NgGraphComponent } from '../app/Shared/ng-graph/ng-graph.component';
import { RadioBoxComponentComponent } from '../app/Shared/Radio-Box/Radio-Box-Component/radio-box-component.component';
import { MutualContractInfoComponent } from './Contract/mutual-contract-info/mutual-contract-info.component';
import { SetMainContractorComponent } from './Contract/set-main-contractor/set-main-contractor.component';
import { ContractOverPopupComponent } from './Contract/contract-over-popup/contract-over-popup.component';
import { AddToGroupComponent } from './CRM/add-to-group/add-to-group.component';
import { TextRequestPageComponent } from './CRM/text-request-page/text-request-page.component';
import { CustomerOrderListComponent } from './CRM/customer-order-list/customer-order-list.component';
import { CustomerOrderComponent } from './CRM/customer-order/customer-order.component';
import { CfmOverPopupComponent } from './CRM/cfm-over-popup/cfm-over-popup.component';
import { ProductPatternEntryComponent } from './CRM/product-pattern-entry/product-pattern-entry.component';
import { ProductPatternProductEntryComponent } from './CRM/product-pattern-product-entry/product-pattern-product-entry.component';
import { ProductPatternComponent } from './CRM/product-pattern/product-pattern.component';
import { CfmWorkflowSendComponent } from './CRM/cfm-workflow-send/cfm-workflow-send.component';
import { CustomerFileComponent } from './CRM/customer-file/customer-file.component';
import { CustomerOrderProductRequestComponent } from './CRM/customer-order-product-request/customer-order-product-request.component';
import { CustomerOrderSearchComponent } from './CRM/customer-order-search/customer-order-search.component';
import { CustomerProductRequestPageComponent } from './CRM/customer-product-request-page/customer-product-request-page.component';
import { InventoryQtyPageComponent } from './CRM/inventory-qty-page/inventory-qty-page.component';
import { RouterModule } from '@angular/router';
import { ApprovalPriceIndexDetailComponent } from './ProductRequest/ProPosal/approval-price-index-detail/approval-price-index-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDetailComponent,
    WorkflowObjectComponent,
    GridComponent,
    NgSelectVirtualScrollComponent,
    JalaliDatepickerComponent,
    NumberInputComponentComponent,
    CustomizedTreeComponent,
    MyTreeComponent,
    Tree2Component,
    FileViwerPageComponent,
    MessageBoxComponent,
    SharedOverPopupComponent,
    UsersOrganizationSignComponent,
    PDFViewerComponent,
    ModalArchiveComponent,
    CustomCheckBoxComponent,
    UserWorkLogDetailGraphLineComponent,
    UserWorkLogDetailGraphComponent,
    UserWorkLogDetailComponent,
    WorkFlowTransitionComponent,
    ExcelLoadDataComponent,
    NgGraphComponent,
    RadioBoxComponentComponent,
    HomeComponent,
    AppMenuComponent,
    AppSidebarComponent,
    AccessDeniedComponent,
    ModalTwoColComponent,
    PriceListComponent,
    OverPopupComponent,
    PriceListAnalayseComponent,
    AnalayzePriceComponent,
    ContractListPageComponent,
    ContractEstimatePageComponent,
    ModalArchiveYearComponent,
    ModalApprPriceIndexComponent,
    ContractPageComponent,
    ContractPersonPageComponent,
    CartableComponent,
    WorkflowSendComponent,
    WorkglowTypeModuleComponent,
    CustomizedMenuComponent,
    NgSelectCellEditorComponent,
    OverPopUpCellEditorComponent,
    UpdateWorkflowStatusComponent,
    UserConfirmPhoneNumberComponent,
    UserRoleComponent,
    TemplateRendererComponent,
    LoadingComponent,
    WorkflowTypeFormComponent,
    ContractCoefTypeComponent,
    ChooseReportComponent,
    WorkflowTypeFormComponent,
    ContractCoefComponent,
    ContractOrderitemCoefComponent,
    WorkflowStatusPageComponent,
    WorkflowOperationPageComponent,
    WorkflowNodePageComponent,
    WorkflowTransitionPageComponent,
    PriceListTopicDataentryPageComponent,
    NumberFieldEditableComponent,
    PriceListTopicComponent,
    CheckboxFieldEditableComponent,
    ContractPayListComponent,
    ContractPayDetailsComponent,
    ChildPriceListTopicPageComponent,
    ContractPayTypesComponent,
    SelecetContractEstimateComponent,
    ChoosenContractPayRepComponent,
    UsersSearchComponent,
    ContractCaseListComponent,
    ContractCaseComponent,
    ContractEstimateViewComponent,
    ContractNoEstimateViewComponent,
    ContractPayItemEstimatePageComponent,
    ContractAgentComponent,
    ContractAgentRoleComponent,
    PriceListRelatedListComponent,
    ContractPayItemEstimatePageComponent,
    RoadTypeComponent,
    TransferDistanceItemComponent,
    PriceListPatternGoodsComponent,
    RoadTypeComponent,
    ContractPayShipmentComponent,
    SummaryQuantitySurveyingComponent,
    FinancialSheetComponent,
    SelectContractPayComponent,
    ContractMinutesListComponent,
    ContractMinutesItemListPageComponent,
    SetContractPriceListPatternComponent,
    SetInvalidContractEstimateComponent,
    SelectContractMinutesComponent,
    SelectContractAgentComponent,
    ContractPayDistanceResultComponent,
    MonthWorkHourComponent,
    ContractPersonEstimateComponent,
    ContractVehicleEstimateComponent,
    ContractIdentityPresenterComponent,
    MonthWorkHourComponent,
    ChoosenContractEstimateRepComponent,
    MonthWorkHourComponent,
    ConsultPersonComponent,
    MonthWorkHourComponent,
    ContractPayItemHourComponent,
    GroupMessageBoxComponent,
    ContractSupervisionListComponent,
    ContractSupervisionItemListComponent,
    ContractWorkOrderListComponent,
    ContractWorkOrderItemListComponent,
    ContractOrderItemDeductionComponent,
    ContractPayFeeDetailsComponent,
    ContractPayTransportComponent,
    ContractPayVoucherDetailsComponent,
    ShowFeeDetailsComponent,
    WorkflowLogComponent,
    ShowFeeDetailsComponent,
    ProductRequestPageComponent,
    DealMethodComponent,
    TreeSelectComponent,
    ProductRequestSuggestionComponent,
    ProductRequestCoefTypeComponent,
    ProductRequestCoefComponent,
    ProductRequestCostComponent,
    ProductRequestPersonItemComponent,
    UserWorkLogContractPayComponent,
    UserWorkLogContractOrderComponent,
    UserWorkLogProductRequestComponent,
    DocumentTypeMasterComponent,
    DocumentTypeMasterMandatoryComponent,
    ContractPersonRepComponent,
    ProductRequestContractComponent,
    RequestContractWithoutFlowComponent,
    ProductRequestListComponent,
    ContractWithoutFlowListComponent,
    OrderPageComponent,
    ProductRequestPageWithoutFlowComponent,
    RequestProposalItemComponent,
    CommissionPageComponent,
    ProductRequestEstimateComponent,
    ProductRequestPersonEstimateComponent,
    ProposalItemEstimateComponent,
    ProposalPersonEstimateComponent,
    SelectProductRequestEstimateComponent,
    ProductRequestProvisionComponent,
    AutomationComponent,
    AutomationButtonComponent,
    ProvisionComponent,
    AdvertisingComponent,
    NewsPaperPageComponent,
    GeneralTenderComponent,
    ContractPayCoefComponent,
    AdvertisingSearchComponent,
    AdvertisingListComponent,
    CorporateComponent,
    InuirySearchListComponent,
    ActorInquiryComponent,
    PersonComponent,
    CommitionComponent,
    InquiryListComponent,
    UsersComponent,
    CommitionComponent,
    LetterTypeComponent,
    SendLetterPageComponent,
    ModuleViewTypeComponent,
    UserSelectComponent,
    CumulativeContractPayListComponent,
    CumulativeContractPayItemEstimateComponent,
    ModuleViewTypeComponent,
    CumulativeContractPayDetailsComponent,
    ProductRequestEstateComponent,
    EstateSearchComponent,
    ProductRequestInvestPageComponent,
    InvestUsageTypeComponent,
    ContractProvisionRemainPageComponent,
    InvestTypeComponent,
    CreateContractOnFlowComponent,
    ContractTypeComponent,
    Person2Component,
    ProductRequestArchiveDetailComponent,
    Corporate2Component,
    GeneralTenderReadOnlyModeComponent,
    ProductRequestShowDetailsPageComponent,
    ProductRequestArticle48PageComponent,
    ShareTypeComponent,
    UnivercityComponent,
    FieldComponent,
    GradeComponent,
    ActorCertificateComponent,
    MainPageComponent,
    TenderPageComponent,
    DealDetailsComponent,
    LoginComponent,
    DealUploadDocsComponent,
    ActorCertificateComponent,
    GroundDeliveryMinutesComponent,
    PriceListBusinessPatternComponent,
    AdvertisingArchiveComponent,
    ContractMinutesTypeComponent,
    CommitionTypeComponent,
    CommitionMemberComponent,
    DealTypeMethodComponent,
    AcceptRulesComponent,
    WarrantyItemComponent,
    CommitionPrintComponent,
    ChooseReportProductRequestItemComponent,
    ProductRequestPageProposalComponent,
    ApplicationNoteComponent,
    ChoosenRequestRevocationComponent,
    ProductRequestPageProposalComponent,
    EstateRecognitionSearchComponent,
    RoleSearchComponent,
    ProductRequestWFDetailComponent,
    CreatedUserLogComponent,
    UsersRolesInRegionListComponent,
    CorrectionContractEstimateComponent,
    ProductRequestItemCoefComponent,
    PriceListCorrectionComponent,
    PriceListTopicSelectComponent,
    UrbanServicesActivitiesLogComponent,
    ProductRequestPageWithoutFlowProposalComponent,
    Article31PageComponent,
    EstateRecognitionEvaluationComponent,
    ProductRequestRelatedItemsComponent,
    FilterDocumentTypeComponent,
    CorporatePersonnelTypeComponent,
    AdjustmentPriceRangeFormulasPageComponent,
    RemoveContractFromClarificationComponent,
    PureProductRequestPageComponent,
    DailyBookComponent,
    CorporateCapacityComponent,
    CorporateCapacityListComponent,
    ContractPeriodReportComponent,
    LedgerAccBookComponent,
    PureProductRequestPageComponent,
    GlobalChoosePageComponent,
    ConsultantSelectTypeComponent,
    SubLedgerAccBookComponent,
    AccountTurnoverComponent,
    DetailAccBookComponent,
    ProviderAssetTypeComponent,
    ContractingCardSearchComponent,
    ContractorCardListComponent,
    CarTagComponent,
    MovablePropertyPageComponent,
    RequestItemEntityPageComponent,
    ProvidersSearchPageComponent,
    ManagementTypePageComponent,
    ResponsibilityTypePageComponent,
    ProductEntityPageComponent,
    ResearcherProductRequestListComponent,
    EndOfContractComponent,
    SendSmsComponent,
    ControlProjectBgtInfoPageComponent,
    CivilProjectPageComponent,
    RequestEvaluateListComponent,
    RequestEvaluateComponent,
    EstatePropertyTypePageComponent,
    EvaluateTypePageComponent,
    EvaluateMethodPageComponent,
    AssetIncomeComponent,
    AssetIncomeListComponent,
    EntityTypeComponent,
    ArchiveYearDocumentComponent,
    SupplierWorkFlowComponent,
    FeePageComponent,
    OtherContractDocsListComponent,
    OtherContractDocumentsComponent,
    OtherContractDocsTypeComponent,
    VariableTypeComponent,
    CommitionProceedVariableComponent,
    ComprehensiveStatusReportComponent,
    SelectActorForSmsComponent,
    ContractPayWorkReportComponent,
    SendToClarificationRepComponent,
    RankCalcComponent,
    RankParameterComponent,
    PrePayComponent,
    CompletionContractInfoComponent,
    SingleSaleInvoiceComponent,
    InvoiceListComponent,
    ShowUnderTakeItemsComponent,
    ContractOrderOnWithoutFlowComponent,
    ReopeningTenderEnvekopesComponent,
    GoodsComponent,
    UserWorkLogInvoiceComponent,
    ContractorSendSMSComponent,
    SendAutomationLetterComponent,
    ChooseReportCOntractPayItemEstimateComponent,
    TenderEncryptedFilesListComponent,
    DataDictionaryPageComponent,
    ViewActorRankComponent,
    CompleteContractListReportComponent,
    ContractWfReportLevel2Component,
    ContractWfReportLevel3Component,
    ReportAverageWorkflowObjectsComponent,
    AdjustmentPriceRangeFormulasComponent,
    ContractStatusSummaryRepPageComponent,
    ContractStatusSummarySearchPageComponent,
    ModuleViewTypeDocumentComponent,
    WorkflowActionComponent,
    CostCenterPageRepComponent,
    ModuleComponent,
    GoodsRequestComponent,
    WorkflowStatusComponent,
    ProductSearchComponent,
    SacleComponent,
    AppInputAdjustmentPriceRangeComponent,
    ExternalUserDetailComponent,
    RelationTypeComponent,
    CurrentSuppliersContractComponent,
    ShowContractListComponent,
    ApplicantOutCostCenterRepComponent,
    ProductReceiveDocComponent,
    AssetPageComponent,
    AssetPageSearchComponent,
    ChangeCartableUserComponent, 
    DeadlineContractListComponent,
    RichTextBoxInputPageComponent,
    ShowHistoryDetailComponent,
    ShowOpenContractComponent,
    ApplicationLinkPageComponent,
    ConditionRegionReportComponent,
    RenewRequestsRepComponent,
    ContractInfoLimitedChangePageComponent,
    MaintenanceVolumeGreenSpaceComponent,
    ApplicationNoteFormComponent,
    ApplicationNoteListComponent,
    ContractSupervisionComponent,
    RequestPeriodReportComponent,
    ProdutRequestCommitionMemberReportComponent,
    RouteNavigateComponent,
    ActorNoteComponent,
    ContractDealMethodBaseReportComponent,
    ChangeContractStatusComponent,
    ProxyContractListComponent,
    ShowContractRelationComponent,
    CustomerExpertsEntryComponent,
    CorporateWithoutInquiryComponent,
    PersonWithoutInquiryComponent,
    ContractArchiveListComponent,
    ContractPayDeductionComponent,
    ContractComponent,
    GeneralSearchContractRequestComponent,
    ProductRequestInvestArchiveComponent,
    ShowHistoryComponent,
    ProductRequestInvestArchiveListComponent,
    MutualContractInfoComponent,
    SetMainContractorComponent,
    ContractOverPopupComponent,
    AddToGroupComponent,
    TextRequestPageComponent,
    CustomerOrderListComponent,
    CustomerOrderComponent,
    CfmOverPopupComponent,
    ProductPatternEntryComponent,
    ProductPatternProductEntryComponent,
    ProductPatternComponent,
    CustomerOrderProductRequestComponent,
    CustomerOrderSearchComponent,
    InventoryQtyPageComponent,
    CustomerProductRequestPageComponent,
    CfmWorkflowSendComponent,
    CustomerFileComponent,
    ApprovalPriceIndexDetailComponent
  ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,    
    NgxTreeSelectModule.forRoot({
      allowFilter: true,
      filterPlaceholder: 'مقدار مورد نظر را وارد نمایید...',
      maxVisibleItemCount: 5,
      idField: '',
      textField: '',
      childrenField: '',
      allowParentSelection: true,
      expandMode: ExpandMode.None
    }),
    CustomCheckboxModule,
    NgSelectModule,
    MalihuScrollbarModule.forRoot(),
    CommonModule,
    BrowserModule,
    AgGridModule.withComponents([]),
    DpDatePickerModule,
    TreeModule,
    // ImageViewerModule,
    NgxExtendedPdfViewerModule,
    NgxGraphModule
  ],
  providers: [
    RefreshServices,
    LoadingService,
    MessageService,
    CommonServices,
    JalaliDatepickerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
