import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListComponent} from "./list/list.component";
import {EditComponent} from "./edit/edit.component";
import {AddImageComponent} from "./add-image/add-image.component";

const routes: Routes = [
  { path: 'portfolio', redirectTo: 'portfolio/list', pathMatch: 'full' },
  { path: 'portfolio/list', component: ListComponent },
  { path: 'portfolio/:portfolioId/edit', component: EditComponent },
  { path: 'portfolio/:portfolioId/addImage', component: AddImageComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule { }
