import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ComicsComponent } from "./comics/comics.component";
import { ComicDetailComponent } from "./comic-detail/comic-detail.component";

const routes: Routes = [
  {
    path: "",
    component: ComicsComponent
  },
  { path: "comics/:name", component: ComicDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
