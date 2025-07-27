import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/vendor/login', pathMatch: 'full' },
  {
    path: 'vendor/login',
    loadComponent: () =>
      import('./vendor/login/vendor-login.component').then(m => m.VendorLoginComponent)
  },
  
  {
    path: 'vendor/dashboard',
    loadComponent: () =>
      import('./vendor/dashboard/vendor-dashboard.component').then(m => m.VendorDashboardComponent)
  },
  {
    path: 'vendor/profile',
    loadComponent: () =>
      import('./vendor/profile/vendor-profile.component').then(m => m.VendorProfileComponent)
  },
  {
    path: 'vendor/salesorder',
    loadComponent: () =>
      import('./vendor/salesorder/vendor-salesorder-table.component').then(m => m.VendorSalesorderTableComponent)
  },
  {
    path: 'vendor/po',
    loadComponent: () =>
      import('./vendor/po/vendor-po-table.component').then(m => m.VendorpoComponent)
  },
  {
    path: 'vendor/inv',
    loadComponent: () =>
      import('./vendor/invoice/vendor-invoice-table.component').then(m => m.VendorInvoiceTableComponent)
  },
  {
    path: 'vendor/memo',
    loadComponent: () =>
      import('./vendor/memo/vendor-memo-table.component').then(m => m.VendormemoComponent)
  },
  {
    path: 'vendor/pay',
    loadComponent: () =>
      import('./vendor/pay/vendor-pay-table.component').then(m => m.VendorpayComponent)
  },
  {
    path: 'vendor/salesdelivery',
    loadComponent: () =>
      import('./vendor/salesdelivery/vendor-salesdelivery-table.component').then(m => m.VendorSalesdeliveryTableComponent)
  },
  {
    path: 'vendor/inquiry',
    loadComponent: () =>
      import('./vendor/inquiry/vendor-inquiry-table.component').then(m => m.VendorInquiryTableComponent)
  },
  { path: '**', redirectTo: '/vendor/login' }
];
