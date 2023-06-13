import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../category.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  categories!: any;

  constructor(public categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((data: any)=>{
      this.categories = data;
      console.log(data);
    })
  }

  deleteCategory(id: string){
    this.categoryService.delete(id).subscribe((res: any) => {
      this.categories = this.categories.filter((item: any) => item.id !== id);
      console.log('Category deleted successfully!');
    })
  }

}
