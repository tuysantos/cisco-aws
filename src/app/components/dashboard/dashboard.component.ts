import { Component, OnInit } from '@angular/core';
import { IUC2Instance } from 'src/app/core/models/uc2Instance';
import { ActivityService } from 'src/app/services/activity.service';
import { take } from 'rxjs/operators';
import { SorterService } from 'src/app/services/sorter.service';
import { ISearchType } from 'src/app/core/models/searchType';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private activityService: ActivityService,
    private sorterService: SorterService) { }

  totalRunning: number = 0;
  totalStop: number = 0;
  originalList: IUC2Instance[];
  uc2Instances: IUC2Instance[];
  uc2ActiveList: IUC2Instance[];
  totalRecords: number = 0;
  pageSize: number = 10;
  availableType: string[] = ['name','id','type','az','publicIP','privateIP','state'];

  ngOnInit() {
    this.totalStop = 0;
    this.totalRunning = 0;
    this.uc2Instances = [];
    this.uc2ActiveList = [];
    this.activityService.getActiveInstances()
        .pipe(take(1))
        .subscribe( (res: IUC2Instance[]) => {
          console.log('res', res);
          //this.uc2Instances = this.originalList = res;
          //this.getSummary();
          //this.buildActiveList(0);
        });
  }

  getSummary(): void {
    this.totalRunning = 0;
    this.totalStop = 0;
    this.totalRecords = 0;
    for(var i=0; i< this.uc2Instances.length; i++) {
      if(this.uc2Instances[i].state === 'running') {
        this.totalRunning++;
      }
      else {
        this.totalStop++;
      }
    }
    this.totalRecords = this.totalRunning + this.totalStop;
  }

  buildActiveList(start: number) {
    this.uc2ActiveList = [];
    const max = this.pageSize;
    let counter = 0;
    for(var i=start; i< this.uc2Instances.length; i++){
      if(counter < max) {
        this.uc2ActiveList[this.uc2ActiveList.length] = this.uc2Instances[i];
      }
      counter++;
    }
  }

  sortList(prop: string) {
    this.sort(prop);
  }

  sort(prop: string) {
    this.sorterService.sort(this.uc2Instances, prop);
    this.buildActiveList(0);
  }

  nextPreviousPage(id: number) {
    let page = (id - 1) * this.pageSize;
    this.buildActiveList(page);
  }

  pageChanged(page: number) {
    this.nextPreviousPage(page);
  }

  searchItem(item: ISearchType): void {
    this.uc2Instances = [];

    if(item.searchText === ''){
      this.reset();
      return;
    }

    for(var i=0; i < this.originalList.length; i++) {
      for(var record in this.originalList[i]){
        if((record === item.type) && (this.originalList[i][record] === item.searchText)){
          this.uc2Instances[this.uc2Instances.length] = this.originalList[i];
        }
      }
    }
    this.getSummary();
    this.buildActiveList(0);
  }

  reset(): void {
    this.uc2Instances = this.originalList;
    this.getSummary();
    this.buildActiveList(0);
  }

}
