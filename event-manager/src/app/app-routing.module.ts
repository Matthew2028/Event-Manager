import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './app/auth/auth.guard';
import { ChatComponent } from './app/shared/components/chat/chat.component';
import { MainComponent } from './app/shared/components/main/main.component';
import { ProfileComponent } from './app/shared/components/profile/profile.component';
import { RegisterComponent } from './app/shared/components/register/register.component';
import { ShopComponent } from './app/shared/components/shop/shop.component';

const routes: Routes = [
  { path: '', component: RegisterComponent},
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'chat', component: ChatComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'shop', component: ShopComponent},
  { path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
