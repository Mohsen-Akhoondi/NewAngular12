import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class LoadingService {
  @Output() LoadingChange: EventEmitter<any> = new EventEmitter<any>();

   Show() {
     this.LoadingChange.emit(true);
  }
  Hide() {
     this.LoadingChange.emit(false);
  }
}
