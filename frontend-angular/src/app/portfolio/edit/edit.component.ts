import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Portfolio} from "../portfolio";
import {PortfolioService} from "../portfolio.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id!: string;
  portfolio!: Portfolio;
  form!: FormGroup;
  submitted = false;

  constructor(
    public portfolioService: PortfolioService,
    private route: ActivatedRoute,
    private router: Router
) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['portfolioId'];
    this.portfolioService.find(this.id).subscribe((data: Portfolio)=>{
    this.portfolio = data;
      console.log(this.portfolio);
    });

    this.form = new FormGroup({
      title: new FormControl('', {
        asyncValidators: [
          this.portfolioService.validateTitleUpdate(this.id)
        ]
      }),
      description: new FormControl('')
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    this.submitted = true

    if (this.f['title']?.value === '') {
      this.form.get('title')?.setValue(this.portfolio.title);
    }

    if (this.f['description']?.value === '') {
      this.form.get('description')?.setValue(this.portfolio.description);
    }

    if (this.form.invalid) {
      console.log('Please fix the errors in the form');
      return;
    }
    this.portfolioService.update(this.id, this.form.value).subscribe(async (res: any) => {
      console.log('Portfolio updated successfully!');
      await this.router.navigateByUrl('portfolio/list');
    })
  }

}
