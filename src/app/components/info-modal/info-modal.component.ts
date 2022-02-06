import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from 'src/app/entities/article.entity';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
})
export class InfoModalComponent implements OnInit {
  article = new Article();
  constructor(@Inject(MAT_DIALOG_DATA) public data: string, private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getSpecificArticle(this.data).subscribe((data) => {
      this.article = data;
    });
  }

  goToWebsite(): void {
    window.open(this.article.url, '_blank');
  }
}
