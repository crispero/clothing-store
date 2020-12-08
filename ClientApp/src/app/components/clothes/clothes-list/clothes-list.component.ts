import { Component, OnInit } from '@angular/core';
import { ClothesService } from "../../../services/clothes.service";
import { ClothesModel } from "../../../models/clothes.model";

@Component({
  selector: 'app-clothes-list',
  templateUrl: './clothes-list.component.html',
  styleUrls: ['./clothes-list.component.scss']
})
export class ClothesListComponent implements OnInit {
  public clothesList: ClothesModel[] = [];

  constructor(
    private clothesService: ClothesService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.clothesList = await this.clothesService.getAll();
  }

}
