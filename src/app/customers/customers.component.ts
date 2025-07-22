import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrmService } from '../services/crm.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: any[] = [];
  customerForm!: FormGroup;
  isEditMode = false;
  editCustomerId: string | null = null;

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
    this.crmService.getCustomers().subscribe({
      next: (data) => (this.customers = data),
      error: (err) => console.error('Error loading customers:', err)
    });
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
