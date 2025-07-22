import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CrmService } from '../services/crm.service';

@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {
  leads: any[] = [];
  filteredLeads: any[] = [];
  leadForm!: FormGroup;
  isEditMode = false;
  editLeadId: string | null = null;

  currentPage = 1;
  itemsPerPage = 5;

  constructor(private fb: FormBuilder, private crmService: CrmService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadLeads();
  }

  initForm() {
    this.leadForm = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      contactDate: ['', Validators.required]
    });
  }

  loadLeads() {
    this.crmService.getLeads().subscribe(data => {
      this.leads = data;
      this.filteredLeads = data;
    });
  }

  searchLeads(term: string) {
    term = term.toLowerCase();
    this.filteredLeads = this.leads.filter(l =>
      l.name.toLowerCase().includes(term)
    );
    this.currentPage = 1;
  }

  get paginatedLeads() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredLeads.slice(start, end);
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.filteredLeads.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onSubmit() {
    if (this.leadForm.invalid) return;

    if (this.isEditMode && this.editLeadId) {
      this.crmService.updateLead(this.editLeadId, this.leadForm.value)
        .subscribe(() => {
          this.loadLeads();
          this.cancelEdit();
        });
    } else {
      this.crmService.addLead(this.leadForm.value).subscribe(() => {
        this.loadLeads();
        this.leadForm.reset();
      });
    }
  }

  editLead(lead: any) {
    this.isEditMode = true;
    this.editLeadId = lead._id;
    this.leadForm.patchValue(lead);
  }

  cancelEdit() {
    this.isEditMode = false;
    this.editLeadId = null;
    this.leadForm.reset();
  }

  deleteLead(id: string) {
    if (confirm('Are you sure?')) {
      this.crmService.deleteLead(id).subscribe(() => this.loadLeads());
    }
  }
}
