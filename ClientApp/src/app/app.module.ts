import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
