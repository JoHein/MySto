
export class ArticleModel {

  constructor(
    public title: string,
    public category: string,
    public content: string,
    public moderation: boolean,
    public stars: number,
    public source?: Array<string>[],
    public created?: any,
  ) {  }

}
