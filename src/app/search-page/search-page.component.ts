import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Article } from '../entities/article.entity';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  articles: Article[] = [];
  limit = 10;
  startFrom = 0;
  loading = false;
  sort = '';
  sortFilter = '';
  operator = '';
  searchForm = this.formBuilder.group({
    name: ['', [Validators.required]],
  });

  constructor(private articleService: ArticleService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loading = !this.loading;
    this.articleService
      .getArticles(this.limit, this.startFrom, undefined, undefined, undefined, undefined)
      .subscribe((data) => {
        this.articles = data;
        this.loading = !this.loading;
      });
  }

  loadMoreArticles(): void {
    this.loading = !this.loading;
    this.startFrom += this.limit;
    this.articleService
      .getArticles(this.limit, this.startFrom, this.sort, 'title', this.searchForm.value.name, 'contains')
      .subscribe((data) => {
        data.forEach((article) => {
          this.articles.push(article);
        });
        this.loading = !this.loading;
      });
  }

  sortFromOlder(): void {
    this.loading = !this.loading;
    this.sort = 'publishedAt:asc';
    this.startFrom = 0;
    this.articleService
      .getArticles(this.limit, this.startFrom, this.sort, this.sortFilter, this.searchForm.value.name, this.operator)
      .subscribe((data) => {
        this.articles = data;
        this.loading = !this.loading;
      });
  }

  sortFromNewer(): void {
    this.loading = !this.loading;
    this.sort = 'publishedAt:desc';
    this.startFrom = 0;
    this.articleService
      .getArticles(this.limit, this.startFrom, this.sort, this.sortFilter, this.searchForm.value.name, this.operator)
      .subscribe((data) => {
        this.articles = data;
        this.loading = !this.loading;
      });
  }

  search(): void {
    this.loading = !this.loading;
    this.startFrom = 0;
    this.sortFilter = 'title';
    this.operator = 'contains';
    this.articleService
      .getArticles(this.limit, this.startFrom, this.sort, this.sortFilter, this.searchForm.value.name, this.operator)
      .subscribe((data) => {
        this.articles = data;
        this.loading = !this.loading;
      });
  }
}
