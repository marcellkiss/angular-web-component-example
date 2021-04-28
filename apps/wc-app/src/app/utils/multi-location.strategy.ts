import {
  APP_BASE_HREF,
  Location,
  LocationChangeListener,
  LocationStrategy,
  PlatformLocation,
} from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';

// TODO: Fix location change on navigation arrow click, increased navigationId and routing depth > 1
@Injectable()
export class MultiLocationStrategy extends LocationStrategy {
  private _baseHref: string;

  constructor(
    private _platformLocation: PlatformLocation,
    @Optional() @Inject(APP_BASE_HREF) href?: string
  ) {
    super();

    if (href == null) {
      href = this._platformLocation.getBaseHrefFromDOM();
    }

    if (href == null) {
      throw new Error(
        `No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.`
      );
    }

    this._baseHref = href;
  }

  onPopState(fn: LocationChangeListener): void {
    this._platformLocation.onPopState(fn);
    this._platformLocation.onHashChange(fn);
  }

  getBaseHref(): string {
    return this._baseHref;
  }

  prepareExternalUrl(internal: string, state?: any): string {
    return this.checkPathAndInternal(this.path(), internal, state);
  }

  checkPathAndInternal(path: string, internal: string, state: any): string {
    const openParenthesisIndex = internal.indexOf('(');
    const closedParenthesisIndex = internal.indexOf(')', openParenthesisIndex);
    const outlet = internal.substring(
      openParenthesisIndex,
      closedParenthesisIndex + 1
    );

    //Get navigationId from RouterState
    let navId = 0;
    if (state) {
      navId = state.navigationId;
    }

    // add internal route to base href
    if (path.startsWith('/') && path.length === 1) {
      return internal;
    }

    if (path.includes('(')) {
      //There's an outlet in the path => remove if necessary or on initial navigation
      return navId === -1 || navId === 1
        ? path
        : path.replace(/ *\([^)]*\) */g, '');
    }

    if (path === internal) {
      //don't append to prevent dublicated path e.g. /foo/foo
      return path;
    }

    if (outlet.length < 1) {
      return internal;
    } else {
      // append internal url to path
      return path + outlet;
    }
  }

  path(includeHash: boolean = false): string {
    const pathname =
      this._platformLocation.pathname +
      Location.normalizeQueryParams(this._platformLocation.search);
    const hash = this._platformLocation.hash;
    return hash && includeHash ? `${pathname}${hash}` : pathname;
  }

  pushState(state: any, title: string, url: string, queryParams: string) {
    const externalUrl = this.prepareExternalUrl(
      url + Location.normalizeQueryParams(queryParams),
      state
    );
    this._platformLocation.pushState(state, title, externalUrl);
  }

  replaceState(state: any, title: string, url: string, queryParams: string) {
    const externalUrl = this.prepareExternalUrl(
      url + Location.normalizeQueryParams(queryParams),
      state
    );
    this._platformLocation.replaceState(state, title, externalUrl);
  }

  forward(): void {
    this._platformLocation.forward();
  }

  back(): void {
    this._platformLocation.back();
  }
}
