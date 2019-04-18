import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event', () => {
    component.searchText = 'running';
    component.selectedSearchType = 'state';
    spyOn(component.searchEvent, 'emit').and.callThrough();
    component.searchCondition();

    expect(component.searchEvent.emit).toHaveBeenCalled();
    expect(component.searchEvent.emit).toHaveBeenCalledWith(component.seachCriteria);
    expect(component.seachCriteria.searchText).toBe(component.searchText);
  });

  it('should emit reset event', () => {
    component.searchText = 'running';
    component.selectedSearchType = 'state';
    component.availableType = ['name','id','type','az','publicIP','privateIP','state'];
    spyOn(component.searchEvent, 'emit').and.callThrough();
    component.resetList();

    expect(component.searchEvent.emit).toHaveBeenCalled();
    expect(component.searchEvent.emit).toHaveBeenCalledWith(component.seachCriteria);
    expect(component.searchText).toBe('');
  });
});
