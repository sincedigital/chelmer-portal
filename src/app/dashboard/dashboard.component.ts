import { Component, OnInit } from '@angular/core';
import { Portfolio } from '../portfolio';
import { PortfolioService } from '../portfolio.service';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  portfolios: Portfolio[] = [];
 
  constructor(private portfolioService: PortfolioService) { }
 
  ngOnInit() {
    this.getPortfolios();
  }
 
  getPortfolios(): void {
    this.portfolioService.getPortfolios()
      .subscribe(portfolios => this.portfolios = portfolios.slice(1, 5));
  }
}
