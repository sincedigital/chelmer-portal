import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PortfolioDetailComponent } from './portfolio-detail/portfolio-detail.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'portfolios', component: PortfolioComponent, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: PortfolioDetailComponent, canActivate: [AuthGuard] },
];

//
//
// {path: 'login', component: HomeComponent},
//  { path: '', redirectTo: 'mainpage', pathMatch: 'full' },
//  {
//    path: 'mainpage',
//    component: MainPageComponent,
//    canActivate:[AuthGuard],
//    children: [
//      {path: 'order', component: OrderComponent},
//      {path: 'dashboard', component: DashboardComponent},
//      {path: 'stock', component: StockComponent},
//      {path: 'Report/sales', component: SalesComponent},
//      {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
//      {path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
//    ]
//  },
//  { path: '**', redirectTo: 'mainpage' } // this needs to be after other routes


@NgModule({
  providers: [AuthGuard],
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}


