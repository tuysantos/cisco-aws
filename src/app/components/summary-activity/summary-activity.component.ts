import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-summary-activity',
  templateUrl: './summary-activity.component.html',
  styleUrls: ['./summary-activity.component.scss']
})
export class SummaryActivityComponent implements OnInit, OnChanges {

  @Input() totalRunning: number = 0;
  @Input() totalStop: number = 0;
  @Output() changeEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.changeEvent.emit("A new server status changed");
  }

}
