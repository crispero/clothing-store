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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
import { ClothesSizeCountComponent } from './components/clothes/clothes-size-count/clothes-size-count.component';
import { ClothesInfoComponent } from './components/clothes/clothes-info/clothes-info.component';
import { BrandCardComponent } from './components/brand/brand-card/brand-card.component';
import { GridColsDirective } from "./directives/grid-cols-directive";
import { CommentCardComponent } from './components/comment/comment-card/comment-card.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommentExpansionListComponent } from './components/comment/comment-expansion-list/comment-expansion-list.component';
import { CommentDialogComponent } from './components/comment/comment-dialog/comment-dialog.component';
import { MatListModule } from '@angular/material/list';

export function tokenGetter(): string {
  return <string>localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    GridColsDirective,
    HeaderComponent,
    ClothesCardComponent,
    ClothesListComponent,
    UserProfileComponent,
    FavoriteComponent,
    BasketComponent,
    ClothesDialogComponent,
    RegisterComponent,
    LoginComponent,
    DialogConfirmComponent,
    ClothesSizeCountComponent,
    ClothesInfoComponent,
    BrandCardComponent,
    CommentCardComponent,
    CommentExpansionListComponent,
    CommentDialogComponent
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
    }),
    FormsModule,
    MatExpansionModule,
    MatListModule
  ],
  providers: [
    {
      provide: SERVICE_URL,
      useValue: environment.serviceUrl
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
