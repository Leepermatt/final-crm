import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CrmService } from '../services/crm.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: any[] = [];
  filteredCustomers: any[] = [];
  customerForm!: FormGroup;
  isEditMode = false;
  editCustomerId: string | null = null;

  // Pagination
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private fb: FormBuilder, private crmService: CrmService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCustomers();
  }

  initForm() {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: [''],
      notes: ['']
    });
  }

  loadCustomers() {
    this.crmService.getCustomers().subscribe(data => {
      this.customers = data;
      this.filteredCustomers = data;
    });
  }

  searchCustomers(term: string) {
    term = term.toLowerCase();
    this.filteredCustomers = this.customers.filter(c =>
      c.name.toLowerCase().includes(term)
    );
    this.currentPage = 1; // Reset to first page after search
  }

  get paginatedCustomers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredCustomers.slice(start, end);
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.filteredCustomers.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onSubmit() {
    if (this.customerForm.invalid) return;

    if (this.isEditMode && this.editCustomerId) {
      this.crmService.updateCustomer(this.editCustomerId, this.customerForm.value)
        .subscribe(() => {
          this.loadCustomers();
          this.cancelEdit();
        });
    } else {
      this.crmService.addCustomer(this.customerForm.value).subscribe(() => {
        this.loadCustomers();
        this.customerForm.reset();
      });
    }
  }

  editCustomer(customer: any) {
    this.isEditMode = true;
    this.editCustomerId = customer._id;
    this.customerForm.patchValue(customer);
  }

  cancelEdit() {
    this.isEditMode = false;
    this.editCustomerId = null;
    this.customerForm.reset();
  }

  deleteCustomer(id: string) {
    if (confirm('Are you sure?')) {
      this.crmService.deleteCustomer(id).subscribe(() => this.loadCustomers());
    }
  }
}
