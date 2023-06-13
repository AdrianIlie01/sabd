import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListComponent} from "./list/list.component";
import {CreateComponent} from "./create/create.component";
import {EditComponent} from "./edit/edit.component";

const routes: Routes = [
  { path: 'category-link', redirectTo: 'category-link/list', pathMatch: 'full' },
  { path: 'category-link/list', component: ListComponent },
  { path: 'category-link/create', component: CreateComponent },
  { path: 'category-link/:subcategoryId/edit', component: EditComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryLinkRoutingModule { }
