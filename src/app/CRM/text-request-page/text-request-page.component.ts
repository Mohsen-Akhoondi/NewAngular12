import { Component, OnInit,Output,Input, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-text-request-page',
  templateUrl: './text-request-page.component.html',
  styleUrls: ['./text-request-page.component.css']
})
export class TextRequestPageComponent implements OnInit {
  @Output() TextSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() InputParam;
  Note = null;
  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() { 
    this.Note =this.InputParam.Note; 
  }

  Add(){
    this.TextSelected.emit(this.Note);
    this.Closed.emit(true);
  }
  close(): void {
    this.Closed.emit(true);
  }

}
