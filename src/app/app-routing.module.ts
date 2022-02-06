import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';

const routes: Routes = [
  { path: 'search_article', component: SearchPageComponent },
  { path: '', redirectTo: '/search_article', pathMatch: 'full' },
  { path: '**', redirectTo: '/search_article', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
