import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './routes/app-routes.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ClothesCardComponent } from './components/clothes/clothes-card/clothes-card.component';
import { ClothesListComponent } from './components/clothes/clothes-list/clothes-list.component';
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from '@angular/material/grid-list';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { BasketComponent } from './components/basket/basket.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClothesCardComponent,
    ClothesListComponent,
    UserProfileComponent,
    FavoriteComponent,
    BasketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {  }
