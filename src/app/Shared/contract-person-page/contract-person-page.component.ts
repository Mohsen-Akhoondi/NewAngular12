import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { ActorService } from 'src/app/Services/BaseService/ActorService';


@Component({
  selector: 'app-contract-person-page',
  templateUrl: './contract-person-page.component.html',
  styleUrls: ['./contract-person-page.component.css']
})
export class ContractPersonPageComponent implements OnInit {
RolesSet;
PersonSet;
selectPersonID;
selectPersonName;
selectedRoleID;
selectedRoleName;
@Input() rowSelected;
@Output() ContractEstimateClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
@Output() OutPutParam: EventEmitter<any> = new EventEmitter<any>();

constructor(private ContractList: ContractListService, private Actor: ActorService) { }

  ngOnInit() {
    this.ContractList.GetRolesList().subscribe(res => {
      this.RolesSet = res;
    });
    this.Actor.GetPersonList(1,null, null, false).subscribe(res => {
      for (const i of res) {
        i.PersonName = i.FirstName + ' ' + i.LastName;
      }
      this.PersonSet = res;
    });
    if (this.rowSelected.data !== null ) {
       this.selectedRoleID = this.rowSelected.data.RoleID;
       this.selectPersonID = this.rowSelected.data.ActorID;
  }
}

  close() {
    this.ContractEstimateClosed.emit(true);
   }

   BtnOkclick() {
     if (this.selectedRoleID == null) {
       alert('نوع نقش را مشخص کنید');
       return;
     }
     if (this.selectPersonID == null) {
      alert('شخص را مشخص کنید');
      return;
    }
    this.setPersonName(this.selectPersonID);
    this.setRoleName(this.selectedRoleID);
     this.OutPutParam.emit( {RoleID : this.selectedRoleID ,
                             RoleName : this.selectedRoleName,
                             ActorID : this.selectPersonID,
                             PersonName : this.selectPersonName
                            }
                          );
     this.close();
   }

   onChangPersonObj(PersonID) {
   this.setPersonName(PersonID);
  }

  setPersonName(PersonID) {
    if (this.PersonSet && PersonID) {
      this.selectPersonID = PersonID;
      const status = this.PersonSet.find(s => s.ActorId === PersonID);
       if (status) {
         this.selectPersonName = status.FirstName + ' ' + status.LastName;
      }
    } else {
        this.selectPersonName = '';
    }
  }

  onChangRoleObj(RoleID) {
   this.setRoleName(RoleID);
  }

  setRoleName(RoleID) {
    if (this.RolesSet && RoleID) {
      this.selectedRoleID = RoleID;
      const status = this.RolesSet.find(s => s.RoleID === RoleID);
       if (status) {
         this.selectedRoleName = status.RoleName;
      }
    } else {
        this.selectedRoleName = '';
    }
  }
}
