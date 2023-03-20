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
    public customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['customerId'];
    this.customerService.find(this.id).subscribe((data: Customer)=>{
      this.customer = data;
    });

    this.form = new FormGroup({
      name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]
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
    this.submitted = true

    if (this.form.invalid) {
      return;
    }
    this.customerService.update(this.id, this.form.value).subscribe(async (res: any) => {
      console.log('Customer updated successfully!');
      await this.router.navigateByUrl('customer/list');
    })
  }

}
