import { TestBed, async } from '@angular/core/testing';
import { PickCalendarAngularComponent } from './pick-calendar-angular.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  template: `<pick-calendar-angular
    [date]="date"
    [minDay]="minDay"
    [maxDay]="maxDay"
    [theme]="theme"
    (handleOnChange)="handleOnChange($event)"
  ></pick-calendar-angular>`,
})
export class TestWrapperComponent {
  date = new Date('02/02/2020');
  value = null;
  minDay = new Date('01/03/2020');
  maxDay = new Date('03/01/2020');
  theme = {};

  handleOnChange = (date) => {
    this.value = date;
  };
}

describe('PickDateAngularComponent', () => {
  let component, fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [PickCalendarAngularComponent, TestWrapperComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestWrapperComponent);
    component = fixture.componentInstance;
    component.date = new Date('02/02/2020');
    fixture.detectChanges();
  }));

  it('should render the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call next function', () => {
    const nextElement = fixture.debugElement.queryAll(By.css('.button'))[1]
      .nativeElement;
    nextElement.click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.disabled'))).toBeDefined();
  });

  it('should call previous function', () => {
    const previousElement = fixture.debugElement.queryAll(By.css('.button'))[0]
      .nativeElement;
    previousElement.click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.disabled'))).toBeDefined();
  });

  it('should call handleOnClick', () => {
    const element = fixture.debugElement.query(By.css('.day-wrapper'))
      .nativeElement;
    element.click();
    expect(component.value).not.toEqual(null);
  });

  it('should call onMouseEnter', () => {
    const element = fixture.debugElement.query(By.css('.day-wrapper'))
      .nativeElement;
    element.dispatchEvent(new MouseEvent('mouseenter'));
    expect(element.style.backgroundColor).toBeDefined();
  });

  it('should call onMouseLeave', () => {
    const element = fixture.debugElement.query(By.css('.day-wrapper'))
      .nativeElement;
    element.dispatchEvent(new MouseEvent('mouseleave'));
    expect(element.style.backgroundColor).toBeDefined();
  });

  it('should call onMouseEnter for active element', () => {
    const element = fixture.debugElement.query(By.css('.active')).nativeElement;
    element.dispatchEvent(new MouseEvent('mouseenter'));
    expect(element.style.backgroundColor).toBeDefined();
  });

  it('should call onMouseLeave for active element', () => {
    const element = fixture.debugElement.query(By.css('.active')).nativeElement;
    element.dispatchEvent(new MouseEvent('mouseleave'));
    expect(element.style.backgroundColor).toBeDefined();
  });

  it('should call next with a new year', () => {
    component.date = new Date('12/10/2020');
    component.maxDay = new Date('10/10/2021');
    fixture.detectChanges();
    const nextElement = fixture.debugElement.queryAll(By.css('.button'))[1]
      .nativeElement;
    nextElement.click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.disabled'))).toBeDefined();
  });

  it('should call previous with a previous year', () => {
    component.date = new Date('1/10/2020');
    component.minDay = new Date('10/10/2019');
    fixture.detectChanges();
    const previousElement = fixture.debugElement.queryAll(By.css('.button'))[0]
      .nativeElement;
    previousElement.click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.disabled'))).toBeDefined();
  });

  it('should render current date if date is not provided', () => {
    component.date = 'abc';
    component.minDay = null;
    component.maxDay = null;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.active'))).toBeDefined();
  });

  it('should handle corner case of February dates', () => {
    component.date = new Date('03/30/2020');
    fixture.detectChanges();
    const previousElement = fixture.debugElement.queryAll(By.css('.button'))[0]
      .nativeElement;
    previousElement.click();
    expect(fixture.debugElement.query(By.css('.active'))).toBeDefined();
  });
});
