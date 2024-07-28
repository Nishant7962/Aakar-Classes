import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signInForm.valid) {
      const signInObj = this.signInForm.value;
      this.http.post("http://localhost:8080/api/users/login", signInObj, { observe: 'response' }).subscribe({
        next: (res: any) => {
          if (res.status === 200) {
            alert("Sign in successful.");
            this.router.navigate(['/dashboard']);
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

  get formControls() {
    return this.signInForm.controls;
  }
}
