# carrot-game refactoring 하기

## 💡새로 알게된 것

### Design Pattern 

[Builder Pattern]

디자인 패턴은 어떤 문제에 대한 해법이다. 어떤 문제를 해결할 수 있는 패턴을 알고 있으면 문제가 반복적으로 발생해도 같은 방법으로 해결할 수 있다.

Builder Pattern 은 디자인 패턴 중 하나로 복합 객체의 생성 과정과 표현 방법을 분리하여 동일한 생성 절차에서 서로 다른 표현 결과를 만들 수 있게 하는 패턴이다.  

#
* Design Pattern 사용 전  

    클래스 생성
    ```
    class Game{
    constructor(gameDuration, carrotCount, bugCount){
      this.gameDuration = gameDuration;
      this.carrotCount = carrotCount;
      this.bugCount = bugCount;
      }
    }
    ```

    클래스 메서드 사용
    ```
    const game = new Game(3,2,2);
    ```
    생성자에 이름 입력 없이 사용하면 가독성이 떨어지고 실수하기 쉽다.

#
* Design Pattern 사용 후 

    클래스 생성
    ```
    export default class GameBuilder{
      gameDuration(duration){
        this.gameDuration = gameDuration;
        return this;
      }
      carrotCount(duration){
        this.carrotCount = carrotCount;
        return this;
      }
      bugCount(duration){
        this.bugCount = bugCountn;
        return this;
      }

      build(){
        return new Game(
          this.gameDuration,
          this.carrotCount,
          this.bugCount
         )
      }
    }
    ```

    클래스 메서드 사용
    ```
    const game = newGameBuilder()
      .gameDuration(5)
      .carrotCount(3)
      .bugCount(3)
      .build();
    ```
