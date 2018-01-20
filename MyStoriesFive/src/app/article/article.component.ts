import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from './article.service';
import { ArticleModel } from './acticle.model';



@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  title = null;
  category: null;
  created: null;
  content: null;
  moderation= false;
  stars: 1;
  source: null;


  constructor(private router: Router, private articleService: ArticleService) { }

  goBack(): void {
    this.router.navigate(['/panelUser']);
  }

  submitArticle(): void {

    const savedArticle = new ArticleModel(this.title, this.category, this.content, this.moderation, this.stars, this.source);

    const emailuser = localStorage.getItem('emailuser');

    console.log(savedArticle);

    this.articleService.saveArticle( emailuser, savedArticle)
    .subscribe(result => console.log('result save', result));

  }

  ngOnInit() {
  }

}
