(function() {
    "use strict";
  
    function Carousel(setting) {
      if(document.querySelector(setting.wrap) === null) {
        console.error(`Carousel not fount selector ${setting.wrap}`);
        return;
      }
  
      /* Scope privates methods and properties */
      let privates = {};
  
  
      /* Public methods */
      // Prev slide
      this.prev_slide = () => {
        --privates.opt.position;
  
        if(privates.opt.position < 0) {
          privates.sel.wrap.classList.add('s-notransition');
          privates.opt.position = privates.opt.max_position - 1;
        }
  
        privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
      };
  
  
      // Next slide
      this.next_slide = () => {
        ++privates.opt.position;
  
        if(privates.opt.position >= privates.opt.max_position) {
          privates.opt.position = 0;
        }
  
        privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
      };
  
  
  
      /* Privates properties */
      privates.setting = setting;
  
      privates.sel = {
        "main": document.querySelector(privates.setting.main),
        "wrap": document.querySelector(privates.setting.wrap),
        "children": document.querySelector(privates.setting.wrap).children,
        "prev": document.querySelector(privates.setting.prev),
        "next": document.querySelector(privates.setting.next)
      };
  
      privates.opt = {
        "position": 0,
        "max_position": document.querySelector(privates.setting.wrap).children.length
      };
  
      // Control
      if(privates.sel.prev !== null) {
        privates.sel.prev.addEventListener('click', () => {
          this.prev_slide();
        });
      }
  
      if(privates.sel.next !== null) {
        privates.sel.next.addEventListener('click', () => {
          this.next_slide();
        });
      }
  
    }
  
  
    let a = new Carousel({
      "main": ".js-carousel",
      "wrap": ".js-carousel__wrap",
      "prev": ".js-carousel__prev",
      "next": ".js-carousel__next"
    });
  
  })();

  class CountdownTimer {
    constructor(deadline, cbChange, cbComplete) {
      this._deadline = deadline;
      this._cbChange = cbChange;
      this._cbComplete = cbComplete;
      this._timerId = null;
      this._out = {
        days: '', hours: '', minutes: '', seconds: '',
        daysTitle: '', hoursTitle: '', minutesTitle: '', secondsTitle: ''
      };
      this._start();
    }
    static declensionNum(num, words) {
      return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }
    _start() {
      this._calc();
      this._timerId = setInterval(this._calc.bind(this), 1000);
    }
    _calc() {
      const diff = this._deadline - new Date();
      const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
      const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
      const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
      const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
      this._out.days = days < 10 ? '0' + days : days;
      this._out.hours = hours < 10 ? '0' + hours : hours;
      this._out.minutes = minutes < 10 ? '0' + minutes : minutes;
      this._out.seconds = seconds < 10 ? '0' + seconds : seconds;
      this._out.daysTitle = CountdownTimer.declensionNum(days, ['день', 'дня', 'дней']);
      this._out.hoursTitle = CountdownTimer.declensionNum(hours, ['час', 'часа', 'часов']);
      this._out.minutesTitle = CountdownTimer.declensionNum(minutes, ['минута', 'минуты', 'минут']);
      this._out.secondsTitle = CountdownTimer.declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
      this._cbChange ? this._cbChange(this._out) : null;
      if (diff <= 0) {
        clearInterval(this._timerId);
        this._cbComplete ? this._cbComplete() : null;
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {

    // .timer-1 (на минуту)
    const elDays1 = document.querySelector('.timer-1 .timer__days');
    const elHours1 = document.querySelector('.timer-1 .timer__hours');
    const elMinutes1 = document.querySelector('.timer-1 .timer__minutes');
    const elSeconds1 = document.querySelector('.timer-1 .timer__seconds');
    const deadline1 = new Date(Date.now() + (60 * 1000 + 999));
    new CountdownTimer(deadline1, (timer) => {
      elDays1.textContent = timer.days;
      elHours1.textContent = timer.hours;
      elMinutes1.textContent = timer.minutes;
      elSeconds1.textContent = timer.seconds;
      elDays1.dataset.title = timer.daysTitle;
      elHours1.dataset.title = timer.hoursTitle;
      elMinutes1.dataset.title = timer.minutesTitle;
      elSeconds1.dataset.title = timer.secondsTitle;
    }, () => {
      document.querySelector('.timer-1 .timer__result').textContent = 'Таймер завершился!';
    });

    // .timer-2 (до конца месяца)
    const elDays2 = document.querySelector('.timer-2 .timer__days');
    const elHours2 = document.querySelector('.timer-2 .timer__hours');
    const elMinutes2 = document.querySelector('.timer-2 .timer__minutes');
    const elSeconds2 = document.querySelector('.timer-2 .timer__seconds');
    const deadline2 = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 01);
    new CountdownTimer(deadline2, (timer) => {
      elDays2.textContent = timer.days;
      elHours2.textContent = timer.hours;
      elMinutes2.textContent = timer.minutes;
      elSeconds2.textContent = timer.seconds;
      elDays2.dataset.title = timer.daysTitle;
      elHours2.dataset.title = timer.hoursTitle;
      elMinutes2.dataset.title = timer.minutesTitle;
      elSeconds2.dataset.title = timer.secondsTitle;
    }, () => {
      document.querySelector('.timer-2 .timer__result').textContent = 'Таймер завершился!';
    });

  });