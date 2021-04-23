# Web Component as an nx app

The goal of this project is to showcase an nx workspace, where the main-app (`main-app`) uses a web-component, which is the result of the build process of another app (`wc-app`)

## Getting started

Run `npx nx serve main-app` and `npx nx serve wc-app`

Playground app will run on `port 4200` and wc-app will run on `port 4210`.

Open `http://localhost:4200` in the browser and have a look at it.

Note: main-app has to be manually refreshed in the browser if a change is made to wc-app.

## Build process

The build process of the `wc-app` uses an npm plugin called `ngx-build-plus` to extend the default behaviour.

We use two flags of the plugin:

- singleBuild
- keepStyles

You can find both of these settings in the `angular.json` file.

## Useful links

- [Multiple Angular Apps on a single page](https://medium.com/swlh/multiple-angular-apps-on-a-single-page-9f49bc863177)
- [ngx-build-plus](https://github.com/manfredsteyer/ngx-build-plus)
- [Official Angular Elements Docs](https://angular.io/guide/elements)
- [Building Web Components with Angular](https://buddy.works/tutorials/building-web-components-with-angular#installing-setting-up-angular-elements)

## Feedback

Did I forget something? Drop a PR or a message: [marcell.kiss.extern@signal-iduna.de](mailto:marcell.kiss.extern@signal-iduna.de)
