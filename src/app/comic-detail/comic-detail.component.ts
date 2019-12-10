import { Component, OnInit, Input } from "@angular/core";
import { Comics } from "../comics/comics";
import { ActivatedRoute } from "@angular/router";
import { ComicService } from "../comic.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-comic-detail",
  templateUrl: "./comic-detail.component.html",
  styleUrls: ["./comic-detail.component.css"]
})
export class ComicDetailComponent implements OnInit {
   comic: Comics;

  constructor(
    private route: ActivatedRoute,
    private comicService: ComicService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getComic();
  }

  getComic(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.comicService.getComic(id).subscribe(comic => (this.comic = comic));
  }
  
  goBack() :void {
    this.location.back();
  }

  save(): void {
    this.comicService.updateComic(this.comic)
      .subscribe(() => this.goBack());
  }
}
