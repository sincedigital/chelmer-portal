import { Injectable } from '@angular/core';
import { Portfolio } from './portfolio';
import { PORTFOLIOS } from './mock-portfolios';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';

@Injectable()
export class PortfolioService {

  getPortfolios(): Observable<Portfolio[]> {
    // Todo: send the message _after_ fetching the heroes
    this.messageService.add('PortfolioService: fetched portfolios');
    return of(PORTFOLIOS);
  }
  
  getPortfolio(id: number): Observable<Portfolio> {
  // Todo: send the message _after_ fetching the hero
  this.messageService.add(`PortfolioService: fetched portfolio id=${id}`);
  return of(PORTFOLIOS.find(hero => hero.id === id));
}
  
  constructor(private messageService: MessageService) { }

}
