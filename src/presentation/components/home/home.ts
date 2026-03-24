import {MatCardModule} from '@angular/material/card';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {Component, computed, signal, Signal, WritableSignal} from '@angular/core';
import {DateTime, Info, Interval} from 'luxon';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, NgOptimizedImage, NgClass],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeCalender {
  today: Signal<DateTime> = signal(DateTime.local());
  firstDayOfActiveMonth: WritableSignal<DateTime> = signal(
    this.today().startOf('month'),
  );
  weekDays: Signal<string[]> = signal(Info.weekdays('short'));
  daysOfMonth: Signal<DateTime[]> = computed(() => {
    return Interval.fromDateTimes(
      this.firstDayOfActiveMonth().startOf('week'),
      this.firstDayOfActiveMonth().endOf('month').endOf('week'),
    )

      .splitBy({day: 1})
      .map((d) => {
        if (d.start === null) {
          throw new Error('Wrong Dates')
        }
        return d.start;
      });
  });

  constructor() {
    console.log(this.daysOfMonth());
  }
}
