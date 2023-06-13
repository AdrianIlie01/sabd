import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CategoryService} from "../category.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form!: FormGroup;
  submitted = false;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      category_name: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(3)
          ],
        }
      ),
      description: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(3)
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

    this.categoryService.create(this.form.value).subscribe(async (res:any) => {

      console.log('Category created successfully!');
      await this.router.navigateByUrl('category/list');
    })
  }

}
