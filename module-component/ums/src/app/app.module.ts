import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersModule} from './users/users.module';
import { ThemeTogglerComponent } from './theme-toggler/theme-toggler.component';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ThemeTogglerComponent,
    FooterComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, //per json-server
    AppRoutingModule,
    UsersModule
   ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
