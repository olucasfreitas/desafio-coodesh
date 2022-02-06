import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Article } from 'src/app/entities/article.entity';
import { InfoModalComponent } from '../info-modal/info-modal.component';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent {
  @Input() articleInfo = new Article();
  constructor(public dialog: MatDialog) {}

  openModal(): void {
    this.dialog.open(InfoModalComponent, {
      height: '50%',
      width: '75%',
      data: this.articleInfo.id,
    });
  }
}
