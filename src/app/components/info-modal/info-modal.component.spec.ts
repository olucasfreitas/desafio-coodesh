import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Article } from 'src/app/entities/article.entity';
import { ArticleService } from 'src/app/services/article.service';

import { InfoModalComponent } from './info-modal.component';

describe('InfoModalComponent', () => {
  let component: InfoModalComponent;
  let fixture: ComponentFixture<InfoModalComponent>;
  let articleService: jasmine.SpyObj<ArticleService>;

  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    const articleServiceSpy = jasmine.createSpyObj('ArticleService', ['getSpecificArticle']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { data: MAT_DIALOG_DATA } },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: ArticleService, useValue: articleServiceSpy },
      ],
      declarations: [InfoModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoModalComponent);
    component = fixture.componentInstance;
    articleService = TestBed.inject(ArticleService) as jasmine.SpyObj<ArticleService>;
    articleService.getSpecificArticle.and.returnValue(of(new Article()));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set article data', () => {
    articleService.getSpecificArticle.and.returnValue(of(new Article()));
    component.ngOnInit();
    expect(articleService.getSpecificArticle).toHaveBeenCalled();
    expect(component.article).toEqual(new Article());
  });
  it('should set article data', () => {
    spyOn(window, 'open').and.callThrough();
    component.goToWebsite();
    expect(window.open).toHaveBeenCalled();
  });
});
