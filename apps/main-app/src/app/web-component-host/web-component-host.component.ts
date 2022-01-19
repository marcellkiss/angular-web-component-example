import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'main-app-web-component-host',
  templateUrl: './web-component-host.component.html',
  styleUrls: ['./web-component-host.component.scss'],
})
export class WebComponentHostComponent implements OnInit, OnDestroy {
  public message = '';
  public outputMessage = '';
  public routeInput: string;
  private subs: Subscription[] = [];
  private WEB_COMPONENT_BASE_URL = '/web-component-host';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.syncRouteInput();
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

  public onSubmitEvent(submitValue: string) {
    console.log({ submitValue });
    this.outputMessage = `${submitValue}`;
  }

  public onRouteChange(relativeRoute: string): void {
    console.log(`>>> [Platform]: new route arrived`, relativeRoute);
    if (relativeRoute && relativeRoute.startsWith('/')) {
      this.router.navigateByUrl(this.WEB_COMPONENT_BASE_URL + relativeRoute, {
        replaceUrl: true, //event.replaceUrl || false,
      });
    } else {
      console.warn(`Invalid router event.`, event);
    }
  }

  public onChangeMessage() {
    const words = [
      'Hallo Welt',
      'Moin Welt',
      'Grüß Gott Welt',
      'Szia Világ',
      'Hello World',
      'Hola Mundo',
      'Bonjour le monde',
      'Ciao mondo',
    ];
    const randomIndex = Math.floor(Math.random() * words.length);
    this.message = `${words[randomIndex]}`;
  }
}
