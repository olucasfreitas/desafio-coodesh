import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ArticleService } from './article.service';
import { Article } from '../entities/article.entity';

describe('ArticleService', () => {
  let articleService: ArticleService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    httpTestingController = TestBed.inject(HttpTestingController);

    articleService = TestBed.inject(ArticleService);
  });

  it('should be created', () => {
    expect(articleService).toBeTruthy();
  });

  it('Should GET all the articles staring from the 10th', () => {
    const expected: Article[] = [new Article()];
    articleService
      .getArticles(10, 10, undefined, undefined, undefined, undefined)
      .subscribe((data) => expect(data).toEqual(expected));

    const req = httpTestingController.expectOne(`${articleService.url}?_limit=10&_start=10`);
    expect(req.request.method).toEqual('GET');

    req.flush(expected);
  });

  it('Should GET all the articles from newer to older', () => {
    const expected: Article[] = [new Article()];
    articleService
      .getArticles(10, undefined, 'publishedAt:desc', undefined, undefined, undefined)
      .subscribe((data) => expect(data).toEqual(expected));

    const req = httpTestingController.expectOne(`${articleService.url}?_limit=10&_sort=publishedAt:desc`);
    expect(req.request.method).toEqual('GET');

    req.flush(expected);
  });

  it('Should GET all the articles with NASA on the title', () => {
    const expected: Article[] = [new Article()];
    articleService
      .getArticles(10, undefined, undefined, 'title', 'NASA', 'contains')
      .subscribe((data) => expect(data).toEqual(expected));

    const req = httpTestingController.expectOne(`${articleService.url}?_limit=10&title_contains=NASA`);
    expect(req.request.method).toEqual('GET');

    req.flush(expected);
  });

  it('Should GET specific article', () => {
    const expected = new Article();
    articleService.getSpecificArticle('id').subscribe((data) => expect(data).toEqual(expected));

    const req = httpTestingController.expectOne(`${articleService.url}/id`);
    expect(req.request.method).toEqual('GET');

    req.flush(expected);
  });
});
