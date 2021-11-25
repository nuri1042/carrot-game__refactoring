'use strict';
import { Gamefield, ItemType } from './game_field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  cancel: 'cancel',
});

// Builder Pattern
export class GameBuilder {
  gameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }
  carrotCount(num) {
    this.carrotCount = num;
    return this;
  }
  bugCount(num) {
    this.bugCount = num;
    return this;
  }
  build() {
    return new Game(
      this.gameDuration, //
      this.carrotCount, //
      this.bugCount
    );
  }
}
class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameBtn = document.querySelector('.game__button');
    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');
    this.started = false;
    this.score = 0;
    this.timer = undefined;

    this.gameField = new Gamefield(carrotCount, bugCount);

    this.gameField.setClickListener(this.onItemClick);
    this.gameBtn.addEventListener('click', () => {
      if (this.started) {
        this.stop(Reason.cancel);
      } else {
        this.start();
      }
    });
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === ItemType.carrot) {
      this.score++;
      this.updateScoreBoard();
      if (this.score === this.carrotCount) {
        this.stop(Reason.win);
      }
    } else if (item === ItemType.bug) {
      this.stop(Reason.lose);
    }
  };

  start() {
    this.started = true;
    this.init();
    this.showStopButton();
    this.showTimerAndScore();
    this.startTimer();
    sound.playBackground();
  }
  stop(reason) {
    this.started = false;
    this.stopTimer();
    this.hideButton();
    sound.stopBackground();

    this.onGameStop && this.onGameStop(reason);
  }

  hideButton() {
    this.gameBtn.style.visibility = 'hidden';
  }
  showStopButton() {
    this.gameBtn.style.visibility = 'visible';
    const icon = this.gameBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
  }
  showTimerAndScore() {
    this.gameTimer.style.visibility = 'visible';
    this.gameScore.style.visibility = 'visible';
  }
  startTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.stop(this.score === this.carrotCount ? Reason.win : Reason.lose);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.timer);
  }
  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }
  updateScoreBoard() {
    this.gameScore.innerText = this.carrotCount - this.score;
  }
  init() {
    this.score = 0;
    this.gameScore.innerText = this.carrotCount;
    this.gameField.init();
  }
}
