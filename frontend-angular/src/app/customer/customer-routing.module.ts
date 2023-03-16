import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListComponent} from "./list/list.component";
import {EditComponent} from "./edit/edit.component";
import {CreateComponent} from "./create/create.component";
import {AddWorkComponent} from "./add-work/add-work.component";

const routes: Routes = [
  { path: 'customer', redirectTo: 'customer/list', pathMatch: 'full' },
  { path: 'customer/list', component: ListComponent },
  { path: 'customer/create', component: CreateComponent },
  { path: 'customer/:customerId/edit', component: EditComponent },
  { path: 'customer/:customerId/addWork', component: AddWorkComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
