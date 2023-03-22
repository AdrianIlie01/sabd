import {Component, OnInit} from '@angular/core';
import {Customer} from "../customer";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../customer.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id!: string;
  customer!: Customer;
  form!: FormGroup;
  submitted = false;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['customerId'];
    console.log(this.id);
    this.customerService.find(this.id).subscribe((data: Customer)=>{
      this.customer = data;
    });

    this.form = new FormGroup({
      name: new FormControl('', {
        validators: [
          Validators.minLength(3),
        ],
        asyncValidators: [
          this.customerService.nameValidUpdate(this.id),
        ]
        }
      ),
      email: new FormControl('', [
        // checks for @x.com
        Validators.pattern(/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/),
      ]),
      websiteUrl: new FormControl('', [
        Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'),
      ]),
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    this.submitted = true;

    if (this.f['name']?.value === '') {
      this.form.get('name')?.setValue(this.customer.name);
    }

    if (this.f['email']?.value === '') {
      this.form.get('email')?.setValue(this.customer.email);
    }

    if (this.f['websiteUrl']?.value === '') {
      this.form.get('websiteUrl')?.setValue(this.customer.website_url);
    }

    if (this.form.invalid) {
      return;
    }
    this.customerService.update(this.id, this.form.value).subscribe(async (res: any) => {
      console.log('Customer updated successfully!');
      await this.router.navigateByUrl('customer/list');
    })
  }

}
