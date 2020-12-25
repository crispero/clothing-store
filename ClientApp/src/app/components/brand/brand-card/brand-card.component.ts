import { Component, Input, OnInit } from '@angular/core';
import { BrandModel } from "../../../models/brand.model";

@Component({
  selector: 'app-brand-card',
  templateUrl: './brand-card.component.html',
  styleUrls: ['./brand-card.component.scss']
})
export class BrandCardComponent implements OnInit {
  @Input() brand: BrandModel;

  constructor() { }

  ngOnInit(): void {
  }

}
