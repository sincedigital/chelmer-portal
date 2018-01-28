import { Component, OnInit } from '@angular/core';
import { Portfolio } from '../portfolio';
import { PORTFOLIOS } from '../mock-portfolios';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  
  portfolios: Portfolio[];
  
  selectedPortfolio: Portfolio;

  constructor(private portfolioService: PortfolioService) { }
  
  ngOnInit() {
    this.getPortfolios();
  }

  onSelect(portfolio: Portfolio): void {
    this.selectedPortfolio = portfolio;
  }
  
  getPortfolios(): void {
    this.portfolioService.getPortfolios().subscribe(portfolios => this.portfolios = portfolios);
  }

}
