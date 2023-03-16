import {Component, OnInit} from '@angular/core';
import {Portfolio} from "../portfolio";
import {PortfolioService} from "../portfolio.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  portfolios: Portfolio[] = [];

  constructor(public portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.portfolioService.getAll().subscribe((data: Portfolio[])=>{
      this.portfolios = data;
    })
  }

  deleteCustomer(id: string){
    this.portfolioService.delete(id).subscribe(res => {
      this.portfolios = this.portfolios.filter(item => item.id !== id);
      console.log('Portfolio deleted successfully!');
    })
  }

}
