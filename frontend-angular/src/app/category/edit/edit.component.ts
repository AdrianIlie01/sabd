import {Component, OnInit} from '@angular/core';
import {Customer} from "../../customer/customer";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../category.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id!: string;
  category!: any;
  form!: FormGroup;
  submitted = false;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['categoryId'];
    console.log(this.id);
    this.categoryService.find(this.id).subscribe((data: Customer)=>{
      this.category = data;
    });

    this.form = new FormGroup({
      category_name: new FormControl('', {
          validators: [
            Validators.minLength(3),
          ],
        }
      ),

      description: new FormControl('', {
          validators: [
            Validators.minLength(3),
          ],
        }
      ),

    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    this.submitted = true;

    if (this.f['category_name']?.value === '') {
      this.form.get('category_name')?.setValue(this.category.category_name);
    }

    if (this.f['description']?.value === '') {
      this.form.get('description')?.setValue(this.category.description);
    }

    if (this.form.invalid) {
      return;
    }
    this.categoryService.update(this.id, this.form.value).subscribe(async (res: any) => {
      console.log('Category updated successfully!');
      await this.router.navigateByUrl('category/list');
    })
  }

}
