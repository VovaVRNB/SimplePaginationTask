import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { EditComponent } from './edit/edit.component';
import { SearchComponent } from './search/search.component';
import { ViewComponent } from './view/view.component';
import { LoginComponent } from './login/login.component';
// import { AuthInterceptor } from "./auth/auth.interceptor";
// import { AuthorizationService } from "./auth/authorization.service";


@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    EditComponent,
    SearchComponent,
    ViewComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    // AuthorizationService,
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
