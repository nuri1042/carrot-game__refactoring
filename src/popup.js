'use strict';

export default class PopUp {
  constructor() {
    this.popup = document.querySelector('.pop-up');
    this.popupText = document.querySelector('.pop-up__message');
    this.popupRefresh = document.querySelector('.pop-up__refresh');
    this.popupRefresh.addEventListener('click', () => {
      // this.onClick 에 콜백이 등록되어있으면, onClick의 함수 호출
      this.onClick && this.onClick();
      this.hide();
    });
  }
  setClickListener(onClick) {
    // 클래스 PopUp 안의 멤버변수 onClick 에 함수에서 전달받은 onClick 인자를 전달
    this.onClick = onClick;
  }
  showWithText(text) {
    this.popupText.innerText = text;
    this.popup.classList.remove('pop-up--hide');
  }
  hide() {
    this.popup.classList.add('pop-up--hide');
  }
}
