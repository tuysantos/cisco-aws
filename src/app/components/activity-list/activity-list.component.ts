import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUC2Instance } from 'src/app/core/models/uc2Instance';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {

  @Input() activityList: IUC2Instance[];
  @Output() sortEvent: EventEmitter<string> = new EventEmitter<string>();
  totalRunning: number = 0;
  totalStop: number = 0;

  constructor() { }

  ngOnInit() {
  }

  sort(prop: string) {
    this.sortEvent.emit(prop);
  }
}
