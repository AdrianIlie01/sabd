import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../category/category.service";
import {Router} from "@angular/router";
import {CategoryLinkService} from "../category-link.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form!: FormGroup;
  submitted = false;

  constructor(
    private categoryLinkService: CategoryLinkService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      category: new FormControl('', {
          validators: [
            Validators.required,
          ],
        }
      ),
      parent: new FormControl('', {
          validators: [
            Validators.required,
          ],
        }
      ),
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

    this.categoryLinkService.create(this.form.value).subscribe(async (res:any) => {

      console.log('Subcategory created successfully!');
      await this.router.navigateByUrl('category-link/list');
    })
  }

}
