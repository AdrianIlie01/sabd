import {Component, OnInit} from '@angular/core';
import {Customer} from "../customer";
import {CustomerService} from "../customer.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  customers: Customer[] = [];

  constructor(public customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getAll().subscribe((data: Customer[])=>{
      this.customers = data;
    })
  }

  deleteCustomer(id: string){
    this.customerService.delete(id).subscribe(res => {
      this.customers = this.customers.filter(item => item.id !== id);
      console.log('Customer deleted successfully!');
    })
  }

}
