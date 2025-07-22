import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmService } from '../services/crm.service';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  companies: any[] = [];
  filteredCompanies: any[] = [];

  currentPage = 1;
  itemsPerPage = 5;

  constructor(private crmService: CrmService) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies() {
    this.crmService.getCompanies().subscribe(data => {
      this.companies = data;
      this.filteredCompanies = data;
    });
  }

  searchCompanies(term: string) {
    term = term.toLowerCase();
    this.filteredCompanies = this.companies.filter(c =>
      c.name.toLowerCase().includes(term)
    );
    this.currentPage = 1; // Reset pagination
  }

  get paginatedCompanies() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredCompanies.slice(start, end);
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.filteredCompanies.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
