import { bootstrap } from 'angular2/platform/browser';
import { enableProdMode, provide } from 'angular2/core';
import { RootComponent } from './components/root/root.component';
import { ROUTER_PROVIDERS } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';

bootstrap(RootComponent, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS
]).catch(err => console.error(err));
