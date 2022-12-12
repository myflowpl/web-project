import { Component, inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {

  fb = inject(UntypedFormBuilder);

  form = this.fb.group({
    name: ['', [Validators.required], []],
    email: ['', [Validators.required, Validators.email], []],
    password: ['', [Validators.required, Validators.minLength(4)], []],
  });

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.form.value);
  }

}
