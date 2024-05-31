import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select'; // Import MatSelectModule




function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const phoneNumber = control.value;
    const phoneNumberRegex = /^[0-9]{2}-[0-9]{6}$/; // Define your phone number format regex

    // Check if phone number is empty
    if (!phoneNumber) {
      return { required: true };
    }

    // Check if phone number format is invalid
    if (!phoneNumberRegex.test(phoneNumber)) {
      return { invalidPhoneNumber: true };
    }

    return null;
  };
}

function emailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const email = control.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Define your email format regex

    // Check if email format is invalid
    if (email && !emailRegex.test(email)) {
      return { invalidEmail: true };
    }

    return null;
  };
}

function dobValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
      const dob = control.value;
      const twelveYearsAgo = new Date();
      twelveYearsAgo.setFullYear(twelveYearsAgo.getFullYear() - 12);
      const currentDate = new Date();

      if (!dob) {
          return { required: true };
      }

      if (dob >= currentDate) {
          return { futureDate: true };
      }

      if (dob >= twelveYearsAgo) {
          return { minDate: true };
      }

      return null;
  };
}

function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.value;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!password) {
      return { required: true };
    }

    if (!passwordRegex.test(password)) {
      return { invalidPassword: true };
    }

    return null;
  };
}

function confirmPasswordValidator(passwordControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const confirmPassword = control.value;

    if (!confirmPassword) {
      return { required: true };
    }

    if (confirmPassword !== passwordControl.value) {
      return { passwordsDoNotMatch: true };
    }

    return null;
  };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatInputModule, 
    MatButtonModule, 
    FormsModule, 
    MatIconModule,
    MatFormFieldModule, 
    CommonModule, 
    MatCheckboxModule,  
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  options = [
    { value: 'Akkar', label: 'Akkar' },
    { value: 'Baalbek-Hermel', label: 'Baalbek-Hermel' },
    { value: 'Beirut', label: 'Beirut' },
    { value: 'Beqaa', label: 'Beqaa' },
    { value: 'Keserwan-Jbeil', label: 'Keserwan-Jbeil' },
    { value: 'Mount Lebanon', label: 'Mount Lebanon' },
    { value: 'Nabatieh', label: 'Nabatieh' },
    { value: 'North', label: 'North' },
    { value: 'South', label: 'South' },
  ];

  districts: string[] = ['Akkar', 'Baalbeck', 'Hermel']; 
  regions: string[] = ['Halba', 'Baalbeck', 'Hermel']; 

  registerForm!: FormGroup;
  hide: boolean = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, passwordValidator(), Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, confirmPasswordValidator(this.registerForm?.get('password')!)]],
      email: ['', emailValidator()],
      phone: ['', [Validators.required, phoneValidator()]],
      dob: ['',[Validators.required, dobValidator()]],
      governorate: ['', Validators.required],
      district: ['', Validators.required],
      region: ['', Validators.required],
      details: ['', Validators.required]
    });

    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.registerForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  toggleVisibility() {
    this.hide = !this.hide;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      // Implement registration logic here
    }
  }
}
