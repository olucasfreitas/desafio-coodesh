import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchPageComponent } from './search-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from '../services/article.service';
import { of } from 'rxjs';
import { Article } from '../entities/article.entity';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;
  let articleService: jasmine.SpyObj<ArticleService>;

  beforeEach(async () => {
    const articleServiceSpy = jasmine.createSpyObj('ArticleService', ['getArticles']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SearchPageComponent],
      providers: [{ provide: ArticleService, useValue: articleServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    articleService = TestBed.inject(ArticleService) as jasmine.SpyObj<ArticleService>;
    articleService.getArticles.and.returnValue(of([new Article()]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load articles onto page', () => {
    articleService.getArticles.and.returnValue(of([new Article()]));
    component.ngOnInit();
    expect(articleService.getArticles).toHaveBeenCalled();
    expect(component.articles).toEqual([new Article()]);
  });

  it('should load more articles onto page', () => {
    articleService.getArticles.and.returnValue(of([new Article()]));
    component.loadMoreArticles();
    expect(articleService.getArticles).toHaveBeenCalled();
    expect(component.articles).toContain(new Article());
    expect(component.startFrom).toEqual(10);
  });

  it('should load articles from oldest to newest', () => {
    articleService.getArticles.and.returnValue(of([new Article()]));
    component.sortFromOlder();
    expect(articleService.getArticles).toHaveBeenCalled();
    expect(component.articles).toContain(new Article());
    expect(component.startFrom).toEqual(0);
    expect(component.sort).toEqual('publishedAt:asc');
  });

  it('should load articles from oldest to newest', () => {
    articleService.getArticles.and.returnValue(of([new Article()]));
    component.sortFromNewer();
    expect(articleService.getArticles).toHaveBeenCalled();
    expect(component.articles).toContain(new Article());
    expect(component.startFrom).toEqual(0);
    expect(component.sort).toEqual('publishedAt:desc');
  });

  it('should search for article that contain the input value', () => {
    articleService.getArticles.and.returnValue(of([new Article()]));
    component.search();
    expect(articleService.getArticles).toHaveBeenCalled();
    expect(component.articles).toContain(new Article());
    expect(component.startFrom).toEqual(0);
    expect(component.sortFilter).toEqual('title');
    expect(component.operator).toEqual('contains');
  });
});
