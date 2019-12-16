import { Component, OnInit, Input, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { character } from "../comics/types";
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
  newCharacter = {};
  selectedComicTitle: string = " ";

  constructor(private comicService: ComicService, public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCharacterDialog, {
      width: "250px",
      data: this.newCharacter
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.name) {
        console.log("result", result);
        result.id = this.newCharactersList ? this.newCharactersList.length : 0;
        this.comicService.addNewCharacter(result);
        this.newCharactersList = this.comicService.getNewCharacterList();
      }
      this.newCharacter = {};
    });
  }

  openDeleteDialog(id: number): void {
    const deleteDialogRef = this.dialog.open(DeleteCharacterDialog, {
      width: "250px",
      data: id
    });
    deleteDialogRef.afterClosed().subscribe(result => {
      console.log("resultofdelete", result);
      if (result === "yes") {
        this.comicService.delelteNewCharacter(id);
        this.newCharactersList = this.comicService.getNewCharacterList();
      }
    });
  }

  ngOnInit(): void {
    this.characters = this.comicService.getCharacters();
    this.newCharactersList = this.comicService.getNewCharacterList();
    this.selectedComicTitle = this.comicService.getSelectedComicName();
  }
}

@Component({
  selector: "add-character-dialog",
  templateUrl: "add-character-dialog.html"
})
export class AddCharacterDialog {
  constructor(
    public dialogRef: MatDialogRef<AddCharacterDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: "delete-character-dialog",
  templateUrl: "delete-character-dialog.html"
})
export class DeleteCharacterDialog {
  constructor(
    public deleteDialogRef: MatDialogRef<DeleteCharacterDialog>,
    private comicService: ComicService
  ) {}

  onNoClick(): void {
    this.deleteDialogRef.close();
  }

  onSubmit() {
    this.deleteDialogRef.close("yes");
  }
}
