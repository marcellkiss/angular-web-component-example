import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'wc-app-wc-wrapper',
  templateUrl: './wc-wrapper.component.html',
  styleUrls: ['./wc-wrapper.component.scss'],
})
export class WcWrapperComponent implements OnInit {
  @ViewChild('wcApp', { read: ElementRef, static: true })
  wcApp: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.listenToSubmitEvents();
  }

  // Note: This won't work, as Angular @Output events won't bubble up by default
  // listenToSubmitEvents() is the alternative solution
  @HostListener('submitEvent', ['$event.detail'])
  public onSubmitEvent(submitValue: string) {
    alert(
      `The event is catched in WcWrapperComponent.\nThe value was: ${submitValue}`
    );
  }

  private listenToSubmitEvents() {
    this.wcApp.nativeElement.addEventListener('submitEvent', (event: any) => {
      alert(`submitEvent got catched in the owner module: \n ${event.detail}`);
    });
  }
}
