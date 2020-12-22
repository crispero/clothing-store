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
import { ClothesDialogComponent } from './components/clothes/clothes-dialog/clothes-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule} from "@angular/material/select";
import { MatOptionModule} from "@angular/material/core";
import { RegisterComponent } from './components/register/register.component';
import { MatInputModule } from "@angular/material/input";
import { LoginComponent } from './components/login/login.component';
import { environment } from "../environments/environment";
import { SERVICE_URL } from "./app-injection-tokens";
import { JwtModule } from "@auth0/angular-jwt";
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';

export function tokenGetter(): string {
  return <string>localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClothesCardComponent,
    ClothesListComponent,
    UserProfileComponent,
    FavoriteComponent,
    BasketComponent,
    ClothesDialogComponent,
    RegisterComponent,
    LoginComponent,
    DialogConfirmComponent
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
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.jwtAllowedDomains
      }
    })
  ],
  providers: [
    {
      provide: SERVICE_URL,
      useValue: environment.serviceUrl
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {  }
