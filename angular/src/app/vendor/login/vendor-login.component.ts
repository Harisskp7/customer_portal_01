import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VendorService } from '../vendor.service';
import { VendorLogin } from '../vendor.model';

@Component({
  selector: 'app-vendor-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vendor-login.component.html',
  styleUrls: ['./vendor-login.component.css']
})
export class VendorLoginComponent {
  credentials: VendorLogin = {
    CUSTOMER_ID: '',
    PASSWORD: ''
  };

  isLoading = false;
  errorMessage = '';

  constructor(
    private vendorService: VendorService,
    private router: Router
  ) {}

  onLogin(): void {
    if (!this.credentials.CUSTOMER_ID || !this.credentials.PASSWORD) {
      this.errorMessage = 'Please enter both Customer ID and Password';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

<<<<<<< HEAD
    this.vendorService.login(this.credentials).subscribe({
=======
    this.vendorService.login({
      VENDOR_ID: this.credentials.CUSTOMER_ID,
      PASSWORD: this.credentials.PASSWORD
    } as any).subscribe({
>>>>>>> da19d0f4d5f0a180eeb580753ba1c94888582447
      next: (response) => {
        this.isLoading = false;
        console.log('Login response:', response);

<<<<<<< HEAD
        if (response && response.message === 'Login successful.') {
=======
        if (response && response.MESSAGE === 'Login successful') {
>>>>>>> da19d0f4d5f0a180eeb580753ba1c94888582447
          this.vendorService.setCurrentVendorId(this.credentials.CUSTOMER_ID);
          this.router.navigate(['/vendor/dashboard']).then(navigated => {
            console.log('Navigated to dashboard:', navigated);
          });
        } else {
<<<<<<< HEAD
          alert(response.message || 'Invalid login.');
=======
          alert(response.MESSAGE || 'Invalid login.');
>>>>>>> da19d0f4d5f0a180eeb580753ba1c94888582447
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Login failed. Please try again.';
        console.error('Login error:', error);
        alert(this.errorMessage);
      }
    });
  }
}