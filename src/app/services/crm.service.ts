import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrmService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Customers
  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/customers`);
  }

  addCustomer(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/customers`, data);
  }

  updateCustomer(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/customers/${id}`, data);
  }

  deleteCustomer(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/customers/${id}`);
  }

  // Leads
  getLeads(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/leads`);
  }

  addLead(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/leads`, data);
  }

  updateLead(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/leads/${id}`, data);
  }

  deleteLead(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/leads/${id}`);
  }

  // Companies
  getCompanies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/companies`);
  }
}
