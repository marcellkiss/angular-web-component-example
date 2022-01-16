import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'main-app-web-component-host',
  templateUrl: './web-component-host.component.html',
  styleUrls: ['./web-component-host.component.scss'],
})
export class WebComponentHostComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('wcApp', { read: ElementRef, static: true })
  wcApp: ElementRef;

  public message = "This is a simple test message in WcWrapperComponent's html";
  public routeInput: string;
  private subs: Subscription[] = [];
  private WEB_COMPONENT_BASE_URL = '/web-component-host';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.syncRouteInput();
  }

  ngAfterViewInit(): void {
    this.listenToWebComponentEvents();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  private syncRouteInput() {
    const routeSub = this.route.url.subscribe((url) => {
      // Pass on just the relative part, not the whole
      this.routeInput = this.router.url.split(this.WEB_COMPONENT_BASE_URL)[1];
    });

    this.subs.push(routeSub);
  }

  // Note: This won't work, as Angular @Output events won't bubble up by default
  // listenToWebComponentEvents() is the alternative solution
  @HostListener('submitEvent', ['$event.detail'])
  public onSubmitEvent(submitValue: string) {
    alert(
      `The event is catched in WcWrapperComponent.\nThe value was: ${submitValue}`
    );
  }

  private listenToWebComponentEvents() {
    this.wcApp.nativeElement.addEventListener('submitEvent', (event: any) =>
      this.onSubmitEvent(event.detail)
    );

    this.wcApp.nativeElement.addEventListener('routeChange', (event: any) => {
      // This is the relative url, compared to the Web Component
      console.log(`>>> [Platform]: new route arrived`, event.detail);
      this.navigateToUrl(event.detail);
    });
  }

  private navigateToUrl(relativeRoute: string): void {
    if (relativeRoute && relativeRoute.startsWith('/')) {
      this.router.navigateByUrl(this.WEB_COMPONENT_BASE_URL + relativeRoute, {
        replaceUrl: true, //event.replaceUrl || false,
      });
    } else {
      console.warn(`Invalid router event.`, event);
    }
  }

  public onChangeMessage() {
    this.message = `Message number ${Math.floor(Math.random() * 100)}`;
  }
}
