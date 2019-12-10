import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComicsComponent } from './comics/comics.component';
import { ComicDetailComponent } from './comic-detail/comic-detail.component';


const routes: Routes = [
  {
    path: 'comics', component: ComicsComponent
  },
  { path: 'detail/:id', component: ComicDetailComponent },
  { path: 'comics', component: ComicsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
