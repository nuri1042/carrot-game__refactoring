'use strict';
import * as sound from './sound.js';

const CARROT_SIZE = 80;

export const ItemType = Object.freeze({
  carrot: 'carrot', //
  bug: 'bug',
});

export class Gamefield {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();

    // <this>
    // js에서 어떤 클래스 내의 함수를 누군가에게 콜백함수로 전달할 때는 클래스 정보가 무시됨
    // 함수와 클래스를 묶어주는 '바인딩'을 해줘야 함
    // binding 방법 (3가지)
    // 1.
    //  this.onClick = this.onClick.bind(this);
    //2. arrow function
    //  Arrow function은 this 가 유지됨
    //  this.field.addEventListener('click', (event) => this.onClick(event));
    // 3. 함수를 arrow function 으로 선언
    this.field.addEventListener('click', this.onClick);
  }
  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  init() {
    this.field.innerHTML = '';
    this._addItem('carrot', this.carrotCount, 'img/carrot.png');
    this._addItem('bug', this.bugCount, 'img/bug.png');
  }
  //onClick 이라는 멤버변수를 만들고 arrow function을 가리키게함
  onClick = (event) => {
    const target = event.target;
    if (target.matches('.carrot')) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  };
  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }
}
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
