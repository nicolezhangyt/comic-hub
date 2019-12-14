import { Component, OnInit, Input, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { character, NewCharacter } from "../comics/types";
import { ComicService } from "../comic.service";

export interface DialogData {
  name: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: "app-comic-detail",
  templateUrl: "./comic-detail.component.html",
  styleUrls: ["./comic-detail.component.css"]
})
export class ComicDetailComponent implements OnInit {
  name: string;
  description: string;
  imageUrl: string;
  characters: character[];
  newCharactersList = [];
  newCharacter: NewCharacter = {};

  constructor(private comicService: ComicService, public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCharacterDialog, {
      width: "250px",
      data: this.newCharacter
    });

    dialogRef.afterClosed().subscribe(result => {
    
      // Object.assign(result, {id: makeCounter()});

      if (result) {
        result.id = this.newCharactersList ? this.newCharactersList.length : 0;
        this.comicService.addNewCharacter(result);
        this.newCharactersList = this.comicService.getNewCharacterList();
      }
      console.log("The dialog was closed", result);
      this.newCharacter = {};
    });

  }

  ngOnInit(): void {
    this.characters = this.comicService.getCharacters();
    this.newCharactersList = this.comicService.getNewCharacterList();
  }

  onDeleteCharacter(id): void {
    this.comicService.delelteNewCharacter(id);
    this.newCharactersList = this.comicService.getNewCharacterList();
  }
}

@Component({
  selector: "add-character-dialog",
  templateUrl: "add-character-dialog.html"
})
export class AddCharacterDialog {
  constructor(
    private comicService: ComicService,
    public dialogRef: MatDialogRef<AddCharacterDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  // handleAdd(): void {
  //   this.comicService.addNewCharacter(this.data);
  // }
  
}
