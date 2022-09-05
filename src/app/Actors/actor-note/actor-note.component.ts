import { Component, OnInit,EventEmitter,Output,Input } from '@angular/core';

@Component({
  selector: 'app-actor-note',
  templateUrl: './actor-note.component.html',
  styleUrls: ['./actor-note.component.css']
})
export class ActorNoteComponent implements OnInit {
  @Output() TextSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() InputParam;

  Note = null;
  ActorNote = null;
  IsEditable = true;
  IsDisplay = false;
  IsEditableForType3 = false;


  constructor() { 

  }

  ngOnInit() { 

    this.IsEditable = this.InputParam.IsEditable;
    this.IsDisplay = this.InputParam.IsDisplay;
    this.IsEditableForType3 = this.InputParam.IsEditableForType3;

    this.Note =this.InputParam.Note;
    this.ActorNote =this.InputParam.ActorNote;
  }

  Add(){

    const obj = {
      Note: this.Note ,
      ActorNote : this.ActorNote

    };
    this.TextSelected.emit(obj);
    this.Closed.emit(true);


  }
  close(): void {
    this.Closed.emit(true);
  }
}
