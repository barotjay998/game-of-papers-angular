import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PapersService } from './services/papers.service';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { AgRowComponent } from './ag-row/ag-row.component';
import { ViewComponent } from './view/view.component';
import { AgRecRowComponent } from './ag-rec-row/ag-rec-row.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    routingComponents,
    AgRowComponent,
    ViewComponent,
    AgRecRowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule,
    FormsModule
  ],
  providers: [PapersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
