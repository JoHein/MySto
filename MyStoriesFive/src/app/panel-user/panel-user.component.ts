import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article/article.service';
import { ArticleModel } from '../article/acticle.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-user',
  templateUrl: './panel-user.component.html',
  styleUrls: ['./panel-user.component.css']
})
export class PanelUserComponent implements OnInit {

  listArticle: any[];

  constructor(public router: Router, private articleService: ArticleService) { }

  getArticlesUser(): void {
      const emailuser = localStorage.getItem('emailuser');
      console.log(emailuser);
      this.articleService.listAllArticleUser(emailuser)
      .subscribe(result => {
        this.listArticle = result.listArtSubscriber;


        console.log('listArtSubscriber', result);
        // this.listArticle.forEach(function(item){
        //   const date = new Date(item.created);

        //   if (date.getDate() < 9 ) {
        //     day = '0' + date.getDate();
        //   }else {
        //     day = date.getDate();
        //   }
        //   if ( date.getMonth() < 9 ) {
        //     const month = '0' + (date.getMonth() + 1);
        //   }else {
        //     const month = (date.getMonth() + 1);
        //   }

        //   item.created = day + ' - ' + month + ' - ' + date.getFullYear();
        // });
      });
  }

  ngOnInit() {
      this.getArticlesUser();
  }

  writeOpen(): void {
    this.router.navigate(['/writearticle']);
  }

}
