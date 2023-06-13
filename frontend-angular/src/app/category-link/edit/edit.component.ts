import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../../customer/customer";
import {CategoryLinkService} from "../category-link.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id!: string;
  subcategory!: any;
  form!: FormGroup;
  submitted = false;

  constructor(
    private categoryLinkService: CategoryLinkService,
    private route: ActivatedRoute,
    private router: Router
) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['subcategoryId'];
    console.log(this.id);
    this.categoryLinkService.find(this.id).subscribe((data: Customer)=>{
      this.subcategory = data;
    });

    this.form = new FormGroup({
      category: new FormControl('', {
          validators: [
            Validators.minLength(3),
          ],
        }
      ),

      parent: new FormControl('', {
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
      this.form.get('category_name')?.setValue(this.subcategory.category);
    }

    if (this.f['description']?.value === '') {
      this.form.get('description')?.setValue(this.subcategory.parent);
    }

    if (this.form.invalid) {
      return;
    }
    this.categoryLinkService.update(this.id, this.form.value).subscribe(async (res: any) => {
      console.log('Category updated successfully!');
      await this.router.navigateByUrl('category-link/list');
    })
  }

}
