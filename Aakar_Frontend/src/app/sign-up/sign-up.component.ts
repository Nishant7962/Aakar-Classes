import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  signUpForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      className: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value;
      this.http.post('http://localhost:8080/api/users/register', formData, { observe: 'response' }).subscribe({
        next: (response) => {
          if (response.status === 200) {
            alert('Sign-up successful!');
            this.signUpForm.reset();
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error details:', error); // Log error details to the console
          if (error.status === 400) {
            alert('Bad Request: Please check your input fields.');
          } else if (error.status === 401) {
            alert('Unauthorized: Invalid credentials.');
          } else {
            alert('An error occurred: ' + error.message);
          }
        }
      });
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }

  // Getter for easier access to form controls
  get formControls() {
    return this.signUpForm.controls;
  }

}
