# carrot-game refactoring νκΈ°

## π‘μλ‘ μκ²λ κ²

### Design Pattern 

[Builder Pattern]

λμμΈ ν¨ν΄μ μ΄λ€ λ¬Έμ μ λν ν΄λ²μ΄λ€. μ΄λ€ λ¬Έμ λ₯Ό ν΄κ²°ν  μ μλ ν¨ν΄μ μκ³  μμΌλ©΄ λ¬Έμ κ° λ°λ³΅μ μΌλ‘ λ°μν΄λ κ°μ λ°©λ²μΌλ‘ ν΄κ²°ν  μ μλ€.

Builder Pattern μ λμμΈ ν¨ν΄ μ€ νλλ‘ λ³΅ν© κ°μ²΄μ μμ± κ³Όμ κ³Ό νν λ°©λ²μ λΆλ¦¬νμ¬ λμΌν μμ± μ μ°¨μμ μλ‘ λ€λ₯Έ νν κ²°κ³Όλ₯Ό λ§λ€ μ μκ² νλ ν¨ν΄μ΄λ€.  

#
* Design Pattern μ¬μ© μ   

    ν΄λμ€ μμ±
    ```javascript
    class Game{
    constructor(gameDuration, carrotCount, bugCount){
      this.gameDuration = gameDuration;
      this.carrotCount = carrotCount;
      this.bugCount = bugCount;
      }
    }
    ```

    ν΄λμ€ λ©μλ μ¬μ©
    ```javascript
    const game = new Game(3,2,2);
    ```
    μμ±μμ μ΄λ¦ μλ ₯ μμ΄ μ¬μ©νλ©΄ κ°λμ±μ΄ λ¨μ΄μ§κ³  μ€μνκΈ° μ½λ€.

#
* Design Pattern μ¬μ© ν 

    ν΄λμ€ μμ±
    ```javascript
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

    ν΄λμ€ λ©μλ μ¬μ©
    ```javascript
    const game = newGameBuilder()
      .gameDuration(5)
      .carrotCount(3)
      .bugCount(3)
      .build();
    ```
