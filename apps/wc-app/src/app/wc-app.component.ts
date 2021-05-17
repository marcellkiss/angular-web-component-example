import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'wc-app',
  templateUrl: './wc-app.component.html',
  styleUrls: ['./wc-app.component.scss'],
})
export class WcAppComponent {
  // Routing i/o
  @Input() route: string;
  @Output() routeChange: EventEmitter<string> = new EventEmitter();

  // Test i/o
  @Input() message: string;
  @Output() submitEvent: EventEmitter<string> = new EventEmitter();

  public inputModel: string;

  constructor(private router: Router) {}

  ngOnInit() {
    this.forwardRouteChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`ngOnChanges in Web Component`);

    // Reac on route changes
    if (changes['route']) {
      console.log(
        `>>> [WebComponent]: Incoming route change: ${changes['route'].currentValue}`
      );
      this.router.navigateByUrl(changes['route'].currentValue, {
        state: { fromPlatform: true },
      });
    }
  }

  private forwardRouteChanges() {
    this.router.events.subscribe((event) => {
      if (
        event instanceof RoutesRecognized &&
        (!this.isFromPlatform() || this.isRedirect(event))
      ) {
        console.log(
          `>>> [WebComponent]: Outgoing route change: ${event.urlAfterRedirects}`
        );
        this.routeChange.next(event.urlAfterRedirects);
      }
    });
  }

  public onSubmit() {
    this.submitEvent.next(this.inputModel);
  }

  isFromPlatform(): boolean {
    return this.router.getCurrentNavigation()?.extras?.state?.fromPlatform;
  }

  isRedirect(event: RoutesRecognized): boolean {
    return event.url !== event.urlAfterRedirects;
  }
}
