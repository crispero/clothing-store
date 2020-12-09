import { Component, Input, OnInit } from '@angular/core';
import { ClothesModel } from "../../../models/clothes.model";

@Component({
  selector: 'app-clothes-card',
  templateUrl: './clothes-card.component.html',
  styleUrls: ['./clothes-card.component.scss']
})
export class ClothesCardComponent implements OnInit {
  @Input() public clothes: ClothesModel;

  constructor() { }

  ngOnInit(): void {
  }

  addToFavorite(): void {

  }

  addToBasket(): void {

  }
}
