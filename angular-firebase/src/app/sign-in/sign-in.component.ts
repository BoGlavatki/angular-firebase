import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  fb = inject(FormBuilder);
  http = inject(HttpClient);
    authService = inject(AuthService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  
  errorMessage: string | null = null;

  onSubmit(): void {
    const rawForm = this.form.getRawValue()
    this.authService.login(rawForm.email, rawForm.password).subscribe({
      next: () => {
      this.router.navigateByUrl('/');
    },
  error: (err) =>{
    this.errorMessage = err.code;
  }
  })
  
    
  }
}