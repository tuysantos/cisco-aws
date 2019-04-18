import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ISearchType } from 'src/app/core/models/searchType';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() searchEvent: EventEmitter<ISearchType> = new EventEmitter<ISearchType>();
  @Input() availableType: any[];
  @Input() selectedSearchType: string = '';
  searchText: string = '';
  
  seachCriteria : ISearchType = { type: '', searchText: ''};
  constructor() { }

  ngOnInit() {
  }

  searchCondition() {
    if(this.searchText.trim() != ''){
      this.seachCriteria = {type: this.selectedSearchType, searchText: this.searchText};
      this.searchEvent.emit(this.seachCriteria);
    }
    else {
      alert('You must insert a search text');
      this.searchText = '';
    }
  }

  resetList() {
    this.seachCriteria = { type: this.selectedSearchType, searchText: ''};
    this.searchText = '';
    this.selectedSearchType = this.availableType[0];
    this.searchEvent.emit(this.seachCriteria);
  }
}
