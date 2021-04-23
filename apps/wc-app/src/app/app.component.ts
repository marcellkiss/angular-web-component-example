import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'wc-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @Input()
  message: string;

  @Output()
  submitEvent = new EventEmitter();

  public inputModel: string;

  constructor() {}

  public onSubmit() {
    this.submitEvent.next(this.inputModel);
  }
}
