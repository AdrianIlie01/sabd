import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {Router} from "@angular/router";
import {CustomerService} from "../customer.service";
import {map} from "rxjs";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form!: FormGroup;
  submitted = false;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {
      this.form = new FormGroup({
      name: new FormControl('', {
        validators: [
       Validators.required,
       Validators.minLength(3)
        ],
        asyncValidators: [
          this.customerService.validateName(),
        ]
        }
      ),
      email: new FormControl('', [
        Validators.required,
        // checks for @x.com
        Validators.pattern(/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/),
      ]),
      websiteUrl: new FormControl('', [
        Validators.required,
      Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'),
  ]),
  });
}

get f(){
  return this.form.controls;
}

  submit(){
    console.log(this.form.value);
    this.submitted = true

    if (this.form.invalid) {
      // display error message
      console.log('Please fix the errors in the form');
      return;
    }

    this.customerService.create(this.form.value).subscribe(async (res:any) => {

      console.log('Customer created successfully!');
     await this.router.navigateByUrl('customer/list');
    })
  }

}
