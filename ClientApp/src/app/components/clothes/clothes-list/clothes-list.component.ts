import { Component, OnInit } from '@angular/core';
import { ClothesService } from "../../../services/clothes.service";
import { ClothesModel } from "../../../models/clothes.model";
import { Observable } from "rxjs";
import { GenderType } from "../../../utils/GenderType";
import { ApplicationUtils } from "../../../utils/ApplicationUtils";

@Component({
  selector: 'app-clothes-list',
  templateUrl: './clothes-list.component.html',
  styleUrls: ['./clothes-list.component.scss']
})
export class ClothesListComponent implements OnInit {
  public clothesList: ClothesModel[] = [];
  public currentGenderType: Observable<GenderType>;

  constructor(
    private clothesService: ClothesService,
    private readonly applicationUtils: ApplicationUtils,
  ) {
    this.currentGenderType = this.applicationUtils.currentGenderType;
    this.currentGenderType.subscribe(value => console.log(value === GenderType.Woman));
  }

  async ngOnInit(): Promise<void> {
   //  this.clothesList = await this.clothesService.getAll();
   // this.currentGenderType = this.applicationUtils.currentGenderType;
  }

}
