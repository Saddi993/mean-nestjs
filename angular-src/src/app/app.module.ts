import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatButtonModule, MatInputModule, MatSnackBarModule, MatTableModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { RegisterComponent } from './pages/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProductListComponent,
    ProductAddComponent,
    ProductDetailComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
