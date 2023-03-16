import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CustomerService} from "../customer.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form!: FormGroup;


  constructor(
    public customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      websiteUrl: new FormControl('', Validators.required),
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.customerService.create(this.form.value).subscribe(async (res:any) => {
      if (this.form.invalid) {
        // display error message
        console.log('Please fix the errors in the form');
        return;
      }

      console.log('Customer created successfully!');
     await this.router.navigateByUrl('customer/list');
    })
  }

}
