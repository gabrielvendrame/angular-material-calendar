import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { MatCalendar } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-custom-calendar-header',
  styles: [`
    .custom-header {
      display: flex;
      align-items: center;
      padding: 0.5em;
    }

    .custom-header-label {
      flex: 1;
      height: 1em;
      font-weight: 500;
      text-align: center;
    }

    .custom-double-arrow .mat-icon {
      margin: -22%;
    }
  `],
  template: `
    <div class="custom-header">
      <button mat-icon-button class="custom-double-arrow" (click)="previousClicked('year')">
        <mat-icon>keyboard_arrow_left</mat-icon>
        <mat-icon>keyboard_arrow_left</mat-icon>
      </button>
      <button mat-icon-button (click)="previousClicked('month')">
        <mat-icon>keyboard_arrow_left</mat-icon>
      </button>
      <span class="custom-header-label">{{periodLabel}}</span>
      <button mat-icon-button (click)="nextClicked('month')">
        <mat-icon>keyboard_arrow_right</mat-icon>
      </button>
      <button mat-icon-button class="custom-double-arrow" (click)="nextClicked('year')">
        <mat-icon>keyboard_arrow_right</mat-icon>
        <mat-icon>keyboard_arrow_right</mat-icon>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomCalendarHeaderComponent<D> implements OnDestroy {
  private destroyed = new Subject<void>();

  constructor(
    private calendar: MatCalendar<D>, private dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private dateFormats: MatDateFormats, cdr: ChangeDetectorRef) {
    calendar.stateChanges
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => cdr.markForCheck());
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  get periodLabel(): any {
    return this.dateAdapter
      .format(this.calendar.activeDate, this.dateFormats.display.monthYearLabel)
      .toLocaleUpperCase();
  }

  previousClicked(mode: 'month' | 'year'): void {
    this.calendar.activeDate = mode === 'month' ?
      this.dateAdapter.addCalendarMonths(this.calendar.activeDate, -1) :
      this.dateAdapter.addCalendarYears(this.calendar.activeDate, -1);
  }

  nextClicked(mode: 'month' | 'year'): void {
    this.calendar.activeDate = mode === 'month' ?
      this.dateAdapter.addCalendarMonths(this.calendar.activeDate, 1) :
      this.dateAdapter.addCalendarYears(this.calendar.activeDate, 1);
  }
}
