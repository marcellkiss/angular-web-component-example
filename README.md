# Web Component as an nx app

The goal of this project is to showcase an nx workspace, where the main-app (`main-app`) uses a web-component, which is the result of the build process of another app (`wc-app`)

## Getting started

Run `npx nx serve main-app` and `npx nx serve wc-app`

Playground app will run on `port 4200` and wc-app will run on `port 4210`.

Note: main-app has be manually refreshed in the browser if a change was made to wc-app.

## Useful links

- [Multiple Angular Apps on a single page](https://medium.com/swlh/multiple-angular-apps-on-a-single-page-9f49bc863177)
- [ngx-build-plus](https://github.com/manfredsteyer/ngx-build-plus)
