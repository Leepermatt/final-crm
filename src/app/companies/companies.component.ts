import { Component, OnInit } from '@angular/core';
import { CrmService } from '../services/crm.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-companies',
  imports: [CommonModule],
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  companies: any[] = [];

  constructor(private crmService: CrmService) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies() {
    this.crmService.getCompanies().subscribe({
      next: (data) => (this.companies = data),
      error: (err) => console.error('Error loading companies:', err)
    });
  }
}
