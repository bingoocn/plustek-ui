import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-deficiency-suggestion',
  templateUrl: './deficiency-suggestion.component.html',
  styleUrls: ['./deficiency-suggestion.component.scss'],
})
export class DeficiencySuggestionComponent implements OnInit {

  public reviewId:string;
  public suggestions: any = [];

  constructor(public routeInfo:ActivatedRoute,private router: Router,public http: HttpService) { }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => this.reviewId = params['reviewId']);
    if(this.reviewId){
      this.http.getRequest('/expert_reviews/' + this.reviewId).then((response:any) => {
        if(response && response.suggestions && response.suggestions.length > 0) {
          this.suggestions = response.suggestions;
        }
      });
    }
  }

}
