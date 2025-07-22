import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrmService } from '../services/crm.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {
  leads: any[] = [];
  leadForm!: FormGroup;
  isEditMode = false;
  editLeadId: string | null = null;

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
    this.crmService.getLeads().subscribe({
      next: (data) => (this.leads = data),
      error: (err) => console.error('Error loading leads:', err)
    });
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
