import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { HttpClientModule } from '@angular/common/http';
import { BookService } from './services/book.service';
import { ReduceTextPipe } from './reduce-text.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ReduceTextPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PagesModule
  ],
  providers: [
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
