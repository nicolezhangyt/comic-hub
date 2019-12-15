import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComicsComponent } from './comics/comics.component';
import { ComicDetailComponent } from './comic-detail/comic-detail.component';


const routes: Routes = [
  {
    path: '', component: ComicsComponent,
    data:{
      breadcrum:'Home'
    }
  },
  { path: 'detail/:id', component: ComicDetailComponent ,
  data:{
    breadcrum:'Comic'
  }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 