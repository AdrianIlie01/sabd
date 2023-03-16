import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioRoutingModule } from './portfolio-routing.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddImageComponent } from './add-image/add-image.component';


@NgModule({
  declarations: [
    ListComponent,
    EditComponent,
    AddImageComponent
  ],
    imports: [
        CommonModule,
        PortfolioRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class PortfolioModule { }
