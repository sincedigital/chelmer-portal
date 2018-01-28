import { Component, OnInit, Input } from '@angular/core';
import { Portfolio } from '../portfolio';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-portfolio-detail',
  templateUrl: './portfolio-detail.component.html',
  styleUrls: ['./portfolio-detail.component.css']
})
export class PortfolioDetailComponent implements OnInit {

  @Input() portfolio: Portfolio;
  
  constructor(
  private route: ActivatedRoute,
  private portfolioService: PortfolioService,
  private location: Location
) {}

  ngOnInit(): void {
  this.getPortfolio();
}
  
  getPortfolio(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.portfolioService.getPortfolio(id)
      .subscribe(portfolio => this.portfolio = portfolio);
  }
  goBack(): void {
    this.location.back();
  }

}
