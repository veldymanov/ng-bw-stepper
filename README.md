# BwreportApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## VS Code
  ### Extensions
```
    Angular Language Service
    Angular V6 Snippets (John Papa)
    ESLint
    Import Cost
    TSLint
    ? TypeScript Hero
```
  ### File/Preferances/Settings
```
    {
      // "editor.renderWhitespace": "all",
      "editor.detectIndentation": false,
      // Insert spaces when pressing Tab. This setting is overriden
      // based on the file contents when `editor.detectIndentation` is true.
      "editor.insertSpaces": true,
      // The number of spaces a tab is equal to. This setting is overriden
      // based on the file contents when `editor.detectIndentation` is true.
      "editor.tabSize": 2,

      // When opening a file, `editor.tabSize` and `editor.insertSpaces`
      // will be detected based on the file contents. Set to false to keep
      // the values you've explicitly set, above.
      // "editor.detectIndentation": false,

      "files.trimTrailingWhitespace": true,
      "files.exclude": {
        "**/.git": true,
        "**/.vscode": true,
      },
      "git.autorefresh": true,
      "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
      "terminal.integrated.shellArgs.osx": [
          "-l"
      ],
      "tslint.rulesDirectory": "./node_modules/codelyzer",
      "typescript.tsdk": "node_modules/typescript/lib",
      "window.zoomLevel": -0.2,
    }
```

## NPM Global
  npm i -g @angular/cli
  npm i -g angular-cli-ghpages
  npm i -g codelyzer
  npm i -g rxjs-tslint

  npm i -g npm-check-updates (ncu)

  npm i -g browser-sync
  npm i -g eslint
  npm i -g gulp
  npm i -g outdated

  npm i -g http-server

## Application Setup
  1. Update angular cli
    npm uninstall -g @angular/cli
    npm cache verify
    npm install -g @angular/cli@latest
      ng --version
  2. Create new project and push it on GitHub
    ng new test-isi --routing --style=scss ( --skip-tests )
    git remote add origin https://github.com/veldymanov/test-isi.git
    git push -u origin master
  3. scss
      - ng g component log-in --style=scss
      - agular.json:
          options: {
            styles:{
              "src/styles.scss"
            }
  4. Setup "app-routing.module.ts"
      - npm i @angular/router
  5. Create "shared" and "core" modules
    ng g module shared
      - ng g module shared
      - componets, pipes, directives
      - commonly used modules
    ng g module core
      - ng g module core
      - services, classes, interfaces, enums, guards, validators, resolvers
      - modules to import only once: HttpClientModule, BrowserAnimationsModule, NoopAnimationsModule
      - CommonModule (only when the module's component needs common directives)
  6. Add and setup "feature" module
    ng g module vehicles --routing
    6.1. Import "SharedModule" to "FeatureModule"; remove "CommonModule" from "FeatureModule"
    6.2. Import feature module to "app-routing.module.ts"
    6.3. Create feature 'main' component
      ng g component vehicles
  7. Create "lazy-loaded" folder
  8. app.component.html, app.component.scss, app.component.ts to app.component.ts

## Angular Material Setup: "ng add @angular/material" or:
  npm install @angular/material @angular/cdk
  1. Import BrowserAnimationsModule into Core Module
  2. Include a theme to "styles.scss"
    @import "~@angular/material/prebuilt-themes/indigo-pink.css";
  3. Gestture support
    npm i hammerjs
  4. Add Material Icons to "index.html"
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <i class="material-icons">done_all</i>
    <i class="material-icons">clear</i>
  5. Adjust material theams
  6. Import "material component modules" to "shared.module"
```
    import {
      MatTableModule, MatPaginatorModule, MatSortModule,
      } from '@angular/material';
```