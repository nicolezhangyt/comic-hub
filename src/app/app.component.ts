import { Component, Input, ViewChild, AfterViewInit } from "@angular/core";
import { ComicsComponent } from "./comics/comics.component";
import { Comics } from './comics/types';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  comicTitle: string = "";
  title = "COMIC HUB";
}
