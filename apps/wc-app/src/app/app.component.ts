import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.initialNavigation(); // Manually triggering initial navigation for @angular/elements
  }

  public onSubmit() {
    this.submitEvent.next(this.inputModel);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`ngOnChanges in Web Component`);
  }
}
