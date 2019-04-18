import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/services/activity.service';
import { SorterService } from 'src/app/services/sorter.service';
import { IUC2Instance } from 'src/app/core/models/uc2Instance';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-aws',
  templateUrl: './dashboard-aws.component.html',
  styleUrls: ['./dashboard-aws.component.scss']
})
export class DashboardAwsComponent implements OnInit {

  constructor(private activityService: ActivityService,
    private sorterService: SorterService) { }

  totalRunning: number = 0;
  totalStop: number = 0;
  uc2Instances: IUC2Instance[];
  uc2ActiveList: IUC2Instance[];
  totalRecords: number = 0;
  pageSize: number = 10;

  ngOnInit() {
    this.totalStop = 0;
    this.totalRunning = 0;
    this.uc2Instances = [];
    this.activityService.getActiveInstances()
        .pipe(take(1))
        .subscribe( (res: IUC2Instance[]) => {
          this.uc2Instances = res;
          this.getSummary();
          this.buildActiveList(0);
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

}
