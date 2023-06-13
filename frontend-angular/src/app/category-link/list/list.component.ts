import {Component, OnInit} from '@angular/core';
import {CategoryLinkService} from "../category-link.service";
import {CategoryService} from "../../category/category.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  subcategories!: any;

  constructor(
    public categoryLinkService: CategoryLinkService,
    ) { }

  async ngOnInit() {
    this.categoryLinkService.getAll().subscribe(async (data: any) => {
      this.subcategories = data.map(async (subcategory: any) => {
        const sub = await firstValueFrom(this.categoryLinkService.find(subcategory.id));
        const categoryName = sub[0].category.category_name;
        const parentName = sub[0].parent.category_name;

        return {
          id: subcategory.id,
          category_name: categoryName,
          parent_name: parentName
        };
      });

      // Wait for all the asynchronous mapping operations to complete
      this.subcategories = await Promise.all(this.subcategories);
      console.log(this.subcategories);
    });
  }

  deleteCategory(id: string){
    this.categoryLinkService.delete(id).subscribe((res: any) => {
      this.subcategories = this.subcategories.filter((item: any) => item.id !== id);
      console.log('Category deleted successfully!');
    })
  }

}
