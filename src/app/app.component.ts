import { Component } from '@angular/core';
import { InstantiateExpr } from '@angular/compiler';

@Component({
  selector: 'app-root',
  template: `
  <div class="clock">
    <div class="analog-clock">
      <div class="hour hand" [style.transform]="'rotate(' + hourDeg +'deg)'"></div>
      <div class="minute hand" [style.transform]="'rotate(' + minuteDeg +'deg)'"></div>
      <div class="second hand" [style.transform]="'rotate(' + secondDeg +'deg)'"></div>
      <div class="center-circle"></div>
    </div>
    <div class="digital-clock">
      {{meridiem}} {{displayHour}}:{{displayMinute}}:{{displaySecond}}
    </div>
  </div>
  `,
  styles: [`.analog-clock {
    position: relative;
    margin: 100px auto 0;
    width: 200px;
    height: 200px;
    background-color: aliceblue;
    border-radius: 50%;
  }

  .hand {
    position: absolute;
    left: 50%;
    width: 1px;
    height: 100px;
    /* 자바스크립트에 의해 덮어써진다. */
    /* transform: translate3d(-50%, 0, 0); */
    transform-origin: 100% 100%;
  }

  .hour {
    background-color: #f44336;
  }

  .minute {
    background-color: #3f51b5;
  }

  .second {
    background-color: #9e9e9e;
    /* transform: rotate(720deg); */
  }

  .center-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 12px;
    height: 12px;
    background-color: black;
    border-radius: 50%;
  }

  .digital-clock {
    position: absolute;
    top: 350px;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    font-size: 2em;
    font-family: 'Source Code Pro', monospace;
  }`]
})
export class AppComponent {
  date: Date;
  second: number;
  minute: number;
  hour: number;

  hourDeg: number;
  minuteDeg: number;
  secondDeg: number;

  displaySecond: string;
  displayMinute: string;
  displayHour: string;

  meridiem: string;

  constructor() {
    setInterval(this.foo.bind(this), 1000);
    this.foo();
  }

  foo() {
    this.date = new Date();

    this.second = this.date.getSeconds();
    this.minute = this.date.getMinutes();
    this.hour = this.date.getHours();

    this.displayHour = ('0' + (this.hour > 12 ? this.hour - 12 : this. hour)).slice(-2);
    this.displayMinute = ('0' + this.minute).slice(-2);
    this.displaySecond = ('0' + this.second).slice(-2);

    this.hourDeg = 30 * this.hour + 0.5 * this.minute;
    this.minuteDeg = 6 * this.minute + 0.1 * this.second;
    this.secondDeg = 6 * this.second;

    this.meridiem = '';

    this.clock();
  }

  clock() {
    if (this.second < 59) {
      this.second += 1;
    } else if (this.second === 59) {
      this.minute += 1;
      this.second = 0;
    }

    if (this.minute === 60) {
      this.minute = 0;
      this.hour += 1;
    }

    if (this.hour === 24) { this.hour = 0; }

    if ( this.hour <= 12) {
      this.meridiem = '오전';
    } else {
      this.meridiem = '오후';
      this.hour = this.hour - 12;
    }
    // document.querySelector('.hour').style.transform = `rotate(${30 * hour + 0.5 * minute}deg)`;
    // document.querySelector('.minute').style.transform = `rotate(${6 * minute + 0.1 * second}deg)`;
    // document.querySelector('.second').style.transform = `rotate(${6 * second}deg)`;
  }
}
