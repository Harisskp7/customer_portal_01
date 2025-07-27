import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map,catchError  } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Observable, of, delay } from 'rxjs';
import { 
  VendorLogin, 
  VendorProfile, 
  RFQ, 
<<<<<<< HEAD
  SalesOrder,
=======
>>>>>>> da19d0f4d5f0a180eeb580753ba1c94888582447
  PO, 
  GR, 
  DashboardTile, 
  INV,
  MEMO,
<<<<<<< HEAD
  PAY,
  SalesDelivery,
  Inquiry
=======
  PAY
>>>>>>> da19d0f4d5f0a180eeb580753ba1c94888582447
} from './vendor.model';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
<<<<<<< HEAD
=======
  private baseUrl = '/sap/opu/odata/sap/ZVENDOR_632_SRV';
>>>>>>> da19d0f4d5f0a180eeb580753ba1c94888582447
  private currentVendorId: string | null = null;

 constructor(private http: HttpClient, private router: Router) {}
  


  login(credentials: VendorLogin): Observable<any> {
<<<<<<< HEAD
    return this.http.post<any>('http://localhost:5000/api/customer/login', {
      CUSTOMER_ID: credentials.CUSTOMER_ID,
=======
    return this.http.post<any>('/api/customer/login', {
      VENDOR_ID: credentials.CUSTOMER_ID,
>>>>>>> da19d0f4d5f0a180eeb580753ba1c94888582447
      PASSWORD: credentials.PASSWORD
    });
  }

  setCurrentVendorId(id: string): void {
  this.currentVendorId = id;
<<<<<<< HEAD
  localStorage.setItem('customerId', id); // ✅ store in localStorage
=======
  localStorage.setItem('vendorId', id); // ✅ store in localStorage
>>>>>>> da19d0f4d5f0a180eeb580753ba1c94888582447
}
 
  getCurrentVendorId(): string | null {
  if (!this.currentVendorId) {
<<<<<<< HEAD
    this.currentVendorId = localStorage.getItem('customerId'); // ✅ read from localStorage
=======
    this.currentVendorId = localStorage.getItem('vendorId'); // ✅ read from localStorage
>>>>>>> da19d0f4d5f0a180eeb580753ba1c94888582447
  }
  return this.currentVendorId;
}

 logout(): void {
  this.currentVendorId = null;
<<<<<<< HEAD
  localStorage.removeItem('customerId'); // ✅ clear it
=======
  localStorage.removeItem('vendorId'); // ✅ clear it
>>>>>>> da19d0f4d5f0a180eeb580753ba1c94888582447
  this.router.navigate(['/vendor/login']);
}

  // getDashboardTiles(): Observable<any> {
  //   return this.http.get<any>('http://localhost:5000/api/vendor/dashboard-tiles');
  // }


  // Vendor Profile
getVendorProfile(vendorId: string): Observable<VendorProfile> {
<<<<<<< HEAD
  return this.http.post<{ success: boolean; data: VendorProfile }>(
    `http://localhost:5000/api/customer/profile`,
    { CUSTOMER_ID: vendorId }
=======
  return this.http.get<{ success: boolean; data: VendorProfile }>(
    `/api/customer/profile/${vendorId}`
>>>>>>> da19d0f4d5f0a180eeb580753ba1c94888582447
  ).pipe(
    map(response => response.data)
  );
}
  // Dashboard Tiles
  getDashboardTiles(): Observable<DashboardTile[]> {
    const tiles: DashboardTile[] = [
      {
<<<<<<< HEAD
        title: 'Sales Order',
        count: 12,
        route: '/vendor/salesorder',
        color: '#3b82f6'
      },
      {
        title: 'Sales Delivery',
        count: 8,
        route: '/vendor/salesdelivery',
        color: '#10b981'
      },
      {
        title: 'Inquiry',
        count: 7,
        route: '/vendor/inquiry',
=======
        title: 'Request for Quotation',
        count: 12,
        route: '/vendor/rfq',
        color: '#3b82f6'
      },
      {
        title: 'Purchase Orders',
        count: 8,
        route: '/vendor/po',
        color: '#10b981'
      },
      {
        title: 'Goods Receipt',
        count: 5,
        route: '/vendor/gr',
>>>>>>> da19d0f4d5f0a180eeb580753ba1c94888582447
        color: '#f59e0b'
      },
      {
        title: 'Finance',
        count: 3,
        route: '/vendor/finance',
        color: '#8b5cf6'
      }
    ];
    
    return of(tiles).pipe(delay(500));
  }

  getVendorRfq(vendorId: string): Observable<RFQ[]> {
  return this.http.get<{ success: boolean; data: RFQ[] }>(
<<<<<<< HEAD
    `http://localhost:5000/api/vendor/rfq/${vendorId}`
  ).pipe(
    map(response => response.data)
  );
}

getVendorSalesOrder(vendorId: string): Observable<SalesOrder[]> {
  return this.http.post<{ success: boolean; data: SalesOrder[] }>(
    `http://localhost:5000/api/customer/salesorder`,
    { CUSTOMER_ID: vendorId }
=======
    `/api/customer/rfq/${vendorId}`
>>>>>>> da19d0f4d5f0a180eeb580753ba1c94888582447
  ).pipe(
    map(response => response.data)
  );
}

getVendorPO(vendorId: string): Observable<PO[]> {
  return this.http.get<{ success: boolean; data: PO[] }>(
<<<<<<< HEAD
    `http://localhost:5000/api/vendor/po/${vendorId}`
=======
    `/api/customer/po/${vendorId}`
>>>>>>> da19d0f4d5f0a180eeb580753ba1c94888582447
  ).pipe(
    map(response => response.data)
  );
}

getVendorGR(vendorId: string): Observable<GR[]> {
  return this.http.get<{ success: boolean; data: GR[] }>(
<<<<<<< HEAD
    `http://localhost:5000/api/vendor/gr/${vendorId}`
=======
    `/api/customer/gr/${vendorId}`
>>>>>>> da19d0f4d5f0a180eeb580753ba1c94888582447
  ).pipe(
    map(response => response.data)
  );
}

  // Financial Data
getVendorINV(vendorId: string): Observable<INV[]> {
<<<<<<< HEAD
  return this.http.post<{ success: boolean; data: INV[] }>(
    `http://localhost:5000/api/customer/inv`,
    { CUSTOMER_ID: vendorId }
=======
  return this.http.get<{ success: boolean; data: INV[] }>(
    `/api/customer/inv/${vendorId}`
>>>>>>> da19d0f4d5f0a180eeb580753ba1c94888582447
  ).pipe(
    map(response => response.data)
  );
}

  getVendorPAY(vendorId: string): Observable<PAY[]> {
<<<<<<< HEAD
  return this.http.post<{ success: boolean; data: PAY[] }>(
    `http://localhost:5000/api/customer/pay`,
    { CUSTOMER_ID: vendorId }
=======
  return this.http.get<{ success: boolean; data: PAY[] }>(
    `/api/customer/pay/${vendorId}`
>>>>>>> da19d0f4d5f0a180eeb580753ba1c94888582447
  ).pipe(
    map(response => response.data)
  );
}
  getVendorMEMO(vendorId: string): Observable<MEMO[]> {
<<<<<<< HEAD
  return this.http.post<{ success: boolean; data: MEMO[] }>(
    `http://localhost:5000/api/customer/memo`,
    { CUSTOMER_ID: vendorId }
  ).pipe(
    map(response => response.data)
  );
}

  getVendorSalesDelivery(vendorId: string): Observable<SalesDelivery[]> {
  return this.http.post<{ success: boolean; data: SalesDelivery[] }>(
    `http://localhost:5000/api/customer/salesdelivery`,
    { CUSTOMER_ID: vendorId }
  ).pipe(
    map(response => response.data)
  );
}

  getVendorInquiry(vendorId: string): Observable<Inquiry[]> {
  return this.http.post<{ success: boolean; data: Inquiry[] }>(
    `http://localhost:5000/api/customer/inquiry`,
    { CUSTOMER_ID: vendorId }
=======
  return this.http.get<{ success: boolean; data: MEMO[] }>(
    `/api/customer/memo/${vendorId}`
>>>>>>> da19d0f4d5f0a180eeb580753ba1c94888582447
  ).pipe(
    map(response => response.data)
  );
}

  getInvoicePdf(belnr: string): Observable<{ success: boolean; belnr: string; pdfBase64: string }> {
    return this.http.get<{ success: boolean; belnr: string; pdfBase64: string }>(
<<<<<<< HEAD
      `http://localhost:5000/api/vendor/form/${belnr}`
=======
      `/api/customer/form/${belnr}`
>>>>>>> da19d0f4d5f0a180eeb580753ba1c94888582447
    );
  }


}