import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PortfolioService} from "../portfolio.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit{

  id!: string;
  selectedImage!: File;
  form!: FormGroup;


  constructor(
    public portfolioService: PortfolioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {

    this.id = this.route.snapshot.params['portfolioId'];
    this.form = new FormGroup({
      image: new FormControl(''),
    });

  }

  get f(){
    return this.form.controls;
  }

  selectImage(event: any) {
    const file = event.target.files[0];
    this.selectedImage = file;
  }

  onSubmit(){

    const formData = new FormData();
    formData.append('file', this.selectedImage);

    this.portfolioService.uploadImage(this.id, formData).subscribe(async (res: any) => {
      console.log(this.selectedImage);
      console.log('Image added successfully!');
      await this.router.navigateByUrl('portfolio/list');
    })
  }

}
