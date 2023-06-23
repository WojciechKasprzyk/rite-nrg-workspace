import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { DepartmentsModule } from "@rite-nrg-workspace/departments";
import { UsersModule } from "@rite-nrg-workspace/users";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

const COMPONENTS = [
  DepartmentsModule,
  UsersModule,
]

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {initialNavigation: 'enabledBlocking'}),
    ...COMPONENTS,

    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    // HAS TO BE USED UNDER PRODUCTION FLAG
    StoreDevtoolsModule.instrument({
      maxAge: 50,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
