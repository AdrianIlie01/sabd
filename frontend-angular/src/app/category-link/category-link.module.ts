import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryLinkRoutingModule } from './category-link-routing.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ListComponent,
    EditComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    CategoryLinkRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CategoryLinkModule { }
