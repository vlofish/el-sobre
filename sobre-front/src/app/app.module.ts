import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatButtonModule, MatCheckboxModule } from '@angular/material';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule
  ],
  schemas:[ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
