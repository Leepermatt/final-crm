import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CrmService } from '../services/crm.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  customersCount = 0;
  leadsCount = 0;
  companiesCount = 0;

  constructor(private crmService: CrmService) {}

  ngOnInit(): void {
    this.loadCounts();
  }

  loadCounts() {
    this.crmService.getCustomers().subscribe(data => this.customersCount = data.length);
    this.crmService.getLeads().subscribe(data => this.leadsCount = data.length);
    this.crmService.getCompanies().subscribe(data => this.companiesCount = data.length);
  }
}
