import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryActivityComponent } from './summary-activity.component';

describe('SummaryActivityComponent', () => {
  let component: SummaryActivityComponent;
  let fixture: ComponentFixture<SummaryActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event', () => {
    spyOn(component.changeEvent, 'emit').and.callThrough();
    component.totalRunning = 3;
    component.ngOnChanges();

    expect(component.changeEvent.emit).toHaveBeenCalled();
    expect(component.changeEvent.emit).toHaveBeenCalledWith('A new server status changed');
  });
});
