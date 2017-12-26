
export class ArticleModel {

  constructor(
    public title: string,
    public category: string,
    public created: any,
    public content: string,
    public moderation: boolean,
    public stars: number,
  ) {  }

}
