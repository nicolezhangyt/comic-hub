import { Component, OnInit, Output } from "@angular/core";
import { Comics } from "./types";
import { ComicService } from "../comic.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-comics",
  templateUrl: "./comics.component.html",
  styleUrls: ["./comics.component.css"]
})
export class ComicsComponent implements OnInit {
  comics: Comics[];
  selectedComicTitle: string = "";
  constructor(
    private comicService: ComicService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.comicService.getComicsList().length) {
      this.comicService.getComics().subscribe(comics => {
        this.comicService.addComics(comics);
        this.comics = this.comicService.getComicsList();
      });
    } else {
      this.comics = this.comicService.getComicsList();
    }
  }

  onSelect = (comic: Comics) => {
    this.comicService.setSelectedComicId(comic.id, comic.name);
    this.router.navigate(["/comics", comic.name.replace(/[^a-z0-9]+/gi, "-"), comic.id]);
    this.selectedComicTitle = comic.name;
  };
}
