import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public value: string;

  @Output() public onChangeSearchValue = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onSearchChange() {
    this.onChangeSearchValue.emit(this.value);
  }

  onSearchClear() {
    this.value = "";
    this.onSearchChange();
  }

}
