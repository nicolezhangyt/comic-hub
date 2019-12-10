import { Component, OnInit } from "@angular/core";
import { COMICS } from "./mock-comics";
import { Comics } from "./comics";
import { ComicService } from "../comic.service";

@Component({
  selector: "app-comics",
  templateUrl: "./comics.component.html",
  styleUrls: ["./comics.component.css"]
})
export class ComicsComponent implements OnInit {
  comics: Comics[];
  constructor(private comicService: ComicService) {}

  ngOnInit() {
    this.getComics();
  }


  getComics(): void {
    this.comicService.getComics().subscribe(comics => (this.comics = comics));
  }
  
}
