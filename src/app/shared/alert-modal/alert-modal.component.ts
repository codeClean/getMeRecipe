import { Component, OnInit, Input, Output,EventEmitter, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {

 @Input() message: string;
 @Input() type: string;

 // tslint:disable-next-line: no-output-native
 @Output() close = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
    console.log('error message ' + this.message);
  }
 onClose() {
   console.log('closing alert');
   this.close.emit();
  }
}
