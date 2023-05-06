import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BorrowedComponent } from './components/borrowed/borrowed.component';
import { MainComponent } from './components/main/main.component';
import { AboutComponent } from './components/about/about.component';
import { StoresComponent } from './components/stores/stores.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InstrumentsComponent } from './components/instruments/instruments.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'borrowed', component: BorrowedComponent },
  { path: 'about', component: AboutComponent },
  { path: 'stores', component: StoresComponent },
  { path: 'store/{storeid}', component: InstrumentsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
