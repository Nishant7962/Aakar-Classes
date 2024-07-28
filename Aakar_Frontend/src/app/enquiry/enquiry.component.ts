import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enquiry',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './enquiry.component.html',
  styleUrl: './enquiry.component.css'
})
export class EnquiryComponent implements OnInit {
  admissionForm: FormGroup;
  admissionObj: any = {
    firstName: '',
    lastName: '',
    email: '',
    className: '',
    schoolName: '',
    studentMobileNumber: '',
    parentNumber: '',
    gender: '',
    pincode: '',
    address: ''
  };

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.admissionForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      className: ['', Validators.required],
      schoolName: ['', Validators.required],
      studentMobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      parentNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      gender: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      address: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.admissionForm.valid) {
      this.admissionObj = this.admissionForm.value;
      this.http.post("http://localhost:8080/api/enquiries/submit", this.admissionObj, { observe: 'response' }).subscribe({
        next: (res: any) => {
          if (res.status === 200) {
            alert("Admission form submitted successfully...");
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error details:', error);  // Log error details to the console
          if (error.status === 400) {
            alert("Bad Request: Please check your input fields.");
          } else if (error.status === 401) {
            alert("Unauthorized: Invalid credentials");
          } else {
            alert("An error occurred: " + error.message);
          }
        }
      });
    } else {
      alert("Please fill in all required fields correctly.");
    }
  }
  

  // Getter for easier access to form controls in the template
  get formControls() {
    return this.admissionForm.controls;
  }
}

