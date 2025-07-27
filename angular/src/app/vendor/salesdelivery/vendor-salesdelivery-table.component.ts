import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VendorService } from '../vendor.service';
import { SalesDelivery } from '../vendor.model';

@Component({
  selector: 'app-vendor-salesdelivery-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vendor-salesdelivery-table.component.html',
  styleUrls: ['./vendor-salesdelivery-table.component.css']
})
export class VendorSalesdeliveryTableComponent implements OnInit {
  salesDeliveries: SalesDelivery[] = [];
  isLoading = true;
  vendorId: string | null = null;

  constructor(
    private vendorService: VendorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.vendorId = this.vendorService.getCurrentVendorId();
    if (!this.vendorId) {
      this.router.navigate(['/vendor/login']);
      return;
    }
    this.loadSalesDeliveries();
  }

  loadSalesDeliveries(): void {
    if (!this.vendorId) return;
    this.isLoading = true;
    this.vendorService.getVendorSalesDelivery(this.vendorId).subscribe({
      next: (salesDeliveries) => {
        this.salesDeliveries = salesDeliveries;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading Sales Deliveries:', error);
        this.isLoading = false;
      }
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    if (dateString.includes('/Date(')) {
      const timestamp = parseInt(dateString.replace(/[^0-9]/g, ''), 10);
      const date = new Date(timestamp);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  }

  goBack(): void {
    this.router.navigate(['/vendor/dashboard']);
  }
} 