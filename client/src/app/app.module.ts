import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmationWindowComponent } from './components/confirmation-window/confirmation-window.component';
import { EditWindowComponent } from './components/edit-window/edit-window.component';
import { CardComponent } from './components/card/card.component';
import { LoginComponent } from './components/login/login.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationWindowComponent,
    EditWindowComponent,
    CardComponent,
    LoginComponent,
    CardListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
