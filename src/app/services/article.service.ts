import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from '../entities/article.entity';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  url = `${environment.apiBaseUrl}/articles`;
  constructor(private http: HttpClient) {}

  getArticles(
    limit: number,
    startFrom: number | undefined,
    sort: string | undefined,
    sortFilter: string | undefined,
    wantedValue: string | undefined,
    operator: string | undefined,
  ): Observable<Article[]> {
    let params = new HttpParams();
    params = params.append('_limit', limit);
    if (startFrom) {
      params = params.append('_start', startFrom);
    }
    if (sort) {
      params = params.append('_sort', sort);
    }
    if (wantedValue) {
      params = params.append(`${sortFilter}_${operator}`, wantedValue);
    }

    console.log(this.url + params);
    return this.http.get<Article[]>(this.url, {
      params,
    });
  }

  getSpecificArticle(id: string): Observable<Article> {
    return this.http.get<Article>(`${this.url}/${id}`);
  }
}
