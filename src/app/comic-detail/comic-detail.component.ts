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
  // @Input() comics: Comics[];
  // comic: Comics;
  characters;
  constructor(
    private route: ActivatedRoute,
    private comicService: ComicService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.characters = this.comicService.getCharacters();
  }

  // getComic(): void {
  //   const id = +this.route.snapshot.paramMap.get("id");
  //   this.comicService.getComic(id).subscribe(comic => (this.comic = comic));
  // }

  // getComic():void{

  // }

  goBack(): void {
    this.location.back();
  }

  // save(): void {
  //   this.comicService.updateComic(this.comic).subscribe(() => this.goBack());
  // }
}
