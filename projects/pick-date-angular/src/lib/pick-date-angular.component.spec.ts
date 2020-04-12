import { TestBed, async } from '@angular/core/testing';
import { PickDateAngularComponent } from './pick-date-angular.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('PickDateAngularComponent', () => {
  let component, fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [PickDateAngularComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(PickDateAngularComponent);
    component = fixture.componentInstance;
    component.date = new Date('02/02/2020');
    fixture.detectChanges();
  }));

  it('should render the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render calendar on click', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.click();
    expect(component.showCalendar).toEqual(true);
    document.dispatchEvent(new MouseEvent('click'));
    expect(component.showCalendar).toEqual(false);
  });

  it('should close calendar on click', () => {
    component.changeInputValue({ date: new Date(), nextOrPrevious: false });
    expect(component.showCalendar).toEqual(false);
  });

  it('should render the input value with the given value', () => {
    component.format = 'mm/dd/yyyy';
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = '08/08/2021';
    input.dispatchEvent(new Event('input'));
    expect(input.value).toEqual('08/08/2021');
  });

  it('should render input value but with a date less than minimum date', () => {
    component.minDay = new Date('02/01/2020');
    component.maxDay = new Date('03/03/2020');
    component.config = {};
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = '01/10/2020';
    input.dispatchEvent(new Event('input'));
    expect(input.value).toEqual('01/10/2020');
  });
});
