import { Component, OnInit } from '@angular/core';
import { ClothesModel } from "../../../models/clothes.model";
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ClothesDialogComponent } from "../clothes-dialog/clothes-dialog.component";
import { IClothesDto } from "../../../dto/clothes.dto";
import { ClothesRepository } from "../../../repositories/clothes.repository";
import { GenderType } from "../../../dto/gender-type";
import { ApplicationUtils } from "../../../utils/application.utils";

@Component({
  selector: 'app-clothes-list',
  templateUrl: './clothes-list.component.html',
  styleUrls: ['./clothes-list.component.scss']
})
export class ClothesListComponent implements OnInit {
  public clothesList: ClothesModel[] = [];
  public currentGenderType: GenderType;

  constructor(
    private clothesRepository: ClothesRepository,
    private readonly applicationUtils: ApplicationUtils,
    private dialog: MatDialog
  ) {
    this.applicationUtils.currentGenderType.subscribe(value => { this.currentGenderType = value; console.log(this.currentGenderType) });
  }

  async ngOnInit(): Promise<void> {
    try {
      this.clothesList = await this.clothesRepository.getClothesWithParams({ genderType: this.currentGenderType });
      console.log(this.clothesList);
    } catch (e) {
      console.log(e);
    }

   // this.currentGenderType = this.applicationUtils.currentGenderType;
  }

  openClothesDialog(): void {
    const dialogRef = this.dialog.open(ClothesDialogComponent, { autoFocus: false });

    dialogRef.afterClosed().subscribe(async (clothesDto: Partial<IClothesDto>) => {
      if (!!clothesDto) {
        const newClothes = await this.clothesRepository.create(clothesDto);
        this.clothesList.push(newClothes);
      }
    });
  }

  async onChangeSearchValue(value: string): Promise<void> {
    this.clothesList = await this.clothesRepository.getClothesWithParams({ name: value, genderType: this.currentGenderType });
  }
}
