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
<<<<<<< HEAD
    path: 'vendor/salesorder',
    loadComponent: () =>
      import('./vendor/salesorder/vendor-salesorder-table.component').then(m => m.VendorSalesorderTableComponent)
=======
    path: 'vendor/rfq',
    loadComponent: () =>
      import('./vendor/rfq/vendor-rfq-table.component').then(m => m.VendorRfqComponent)
>>>>>>> da19d0f4d5f0a180eeb580753ba1c94888582447
  },
  {
    path: 'vendor/po',
    loadComponent: () =>
      import('./vendor/po/vendor-po-table.component').then(m => m.VendorpoComponent)
  },
  {
<<<<<<< HEAD
    path: 'vendor/inv',
    loadComponent: () =>
      import('./vendor/invoice/vendor-invoice-table.component').then(m => m.VendorInvoiceTableComponent)
=======
    path: 'vendor/gr',
    loadComponent: () =>
      import('./vendor/gr/vendor-gr-table.component').then(m => m.VendorgrComponent)
  },

  {
    path: 'vendor/inv',
    loadComponent: () =>
      import('./vendor/invoice/vendor-inv-table.component').then(m => m.VendorinvComponent)
>>>>>>> da19d0f4d5f0a180eeb580753ba1c94888582447
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
<<<<<<< HEAD
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
=======
>>>>>>> da19d0f4d5f0a180eeb580753ba1c94888582447
  { path: '**', redirectTo: '/vendor/login' }
];
