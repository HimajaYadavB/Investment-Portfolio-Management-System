import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { BrokerComponent } from './pages/broker/broker.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { AssetComponent } from './pages/asset/asset.component';
import { DividendComponent } from './pages/dividend/dividend.component';
import { BuyAssetComponent } from './pages/buy-asset/buy-asset.component';
import { AddPortfolioComponent } from './pages/add-portfolio/add-portfolio.component';
import { SellAssetComponent } from './pages/sell-asset/sell-asset.component';
import { GetTaxesComponent } from './pages/get-taxes/get-taxes.component';
import { BrokerLoginComponent } from './pages/broker-login/broker-login.component';
import { BrokerRegisterComponent } from './pages/broker-register/broker-register.component';
import { BrokerApprovalComponent } from './pages/broker-approval/broker-approval.component';
import { AdminAddDividendsComponent } from './pages/admin-add-dividends/admin-add-dividends.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { UserPaymentsComponent } from './pages/user-payments/user-payments.component';
import { TradeComponent } from './pages/trade/trade.component';
import { ApprovePortfolioComponent } from './pages/approve-portfolio/approve-portfolio.component';
import { AccountComponent } from './pages/account/account.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default Route
  { path: 'login', component: LoginComponent },
  { path: 'broker-dashboard', component: BrokerComponent },
  { path: 'user-register', component: RegisterComponent },
  { path: 'user-dashboard', component: DashboardComponent },
  { path: 'user-asset', component: AssetComponent },
  { path: 'user-dividend', component: DividendComponent },
  {path: 'buy-asset', component:BuyAssetComponent},
  {path:'add-portfolio', component: AddPortfolioComponent},
  {path:'sell-asset', component:SellAssetComponent},
  {path:'user-taxes',component:GetTaxesComponent},
  {path:'broker-login', component:BrokerLoginComponent},
  {path:'broker-register', component:BrokerRegisterComponent},
  {path:'approve-brokers', component:BrokerApprovalComponent},
  {path:'add-dividends', component:AdminAddDividendsComponent},
  {path:'admin-dashboard', component:AdminDashboardComponent},
  {path:'admin-login', component:AdminLoginComponent},
  {
    path: 'user-payments',
    component: UserPaymentsComponent, // the wrapper component
    children: [
      { path: '', redirectTo: 'dividends', pathMatch: 'full' }, // default sub-tab
      { path: 'dividends', component: DividendComponent },
      { path: 'taxes', component: GetTaxesComponent }
    ]
  },

  {
    path: 'user-trade',
    component: TradeComponent, // the wrapper component
    children: [
      { path: '', redirectTo: 'portfolios', pathMatch: 'full' }, // default sub-tab
      { path: 'portfolios', component: PortfolioComponent },
      { path: 'assets', component: AssetComponent }
    ]
  },
  { path: 'user-portfolios', 
    component: AccountComponent,
    children:[
      {path:'', redirectTo:'add', pathMatch:'full'},
      {path:'add', component: AddPortfolioComponent},
      {path:'approve', component:ApprovePortfolioComponent}
    ]
  }
  

];
