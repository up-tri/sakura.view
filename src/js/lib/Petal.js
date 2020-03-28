import * as $ from "jquery";

const Z_INDEX = 9999;
const WINDOW_HEIGHT = window.innerHeight;

/**
 * @class Petal
 * 
 * 1枚の花びらを実装
 * 
 * @since 2020.03.28
 * @author Kohei Seta <kohei.s@wannagrow.co.jp>
 */
export default class Petal {
  constructor(uuid, holderName, colorCode, positionTop, positionLeft, petalType = null, yuragiType = null) {
    // UUID
    this.uuid = uuid;
    // 持ち主ID
    this.holderName = holderName;
    // 初期位置(Y座標)
    this.positionTop = positionTop;
    // 初期位置(X座標)
    this.positionLeft = positionLeft;
    // 花びらタイプ
    this.petalType = petalType || (Math.floor(Math.random() * 6) + 1);
    // 花びら揺らぎタイプ
    this.yuragiType = yuragiType || (Math.floor(Math.random() * 6) + 1);

    // ゆらぎカウンター
    this.yuragiCount = 0;

    // 落下スピード変化量
    this.speedDiv = Math.random() * 5 + 2;
    // 揺らぎ変化量
    this.yuragiDiv = Math.random() * 40 + 5;

    // 落下判定
    this.stop = false;

    this.dom = $("<div>");
    this.dom.attr("id", this.getID());
    this.dom.addClass(`hana ${this.getColorClassName()} ${this.getYuragiTypeClassName()}`);
    this.dom.css({
      top: this.positionTop,
      left: this.positionLeft,
      zIndex: Z_INDEX
    });
    if (this.holderName) {
      this.dom.append($("<div>").addClass("text").css({
        color: colorCode
      }).text(this.holderName));
    }
  }

  /**
   * @method getID
   * 
   * 花びらの制御に用いるDOM IDを返却
   * 
   * @since 2020.03.28
   * @author Kohei Seta <kohei.s @wannagrow.co.jp>
   */
  getID() {
    return `petal__${this.uuid}`;
  }

  /**
   * @method getColorClassName
   * 
   * 花びらの色制御に用いるDOM classを返却
   * 
   * @since 2020.03.28
   * @author Kohei Seta <kohei.s @wannagrow.co.jp>
   */
  getColorClassName() {
    return `t${this.petalType}`;
  }

  /**
   * @method getYuragiTypeClassName
   * 
   * 花びらの色制御に用いるDOM classを返却
   * 
   * @since 2020.03.28
   * @author Kohei Seta <kohei.s @wannagrow.co.jp>
   */
  getYuragiTypeClassName() {
    return `y${this.yuragiType}`;
  }

  /**
   * @method getDOM
   * 
   * 花びらのDOMを返却
   * 
   * @since 2020.03.28
   * @author Kohei Seta <kohei.s @wannagrow.co.jp>
   */
  getDOM() {
    return this.dom[0];
  }

  /**
   * @method move
   * 
   * 花びらの位置を更新
   * 
   * @since 2020.03.28
   * @author Kohei Seta <kohei.s @wannagrow.co.jp>
   */
  move(wind = 0) {
    let shouldRemove = false;

    /**
     * 通常の落下
     */
    let yuragiSize = 0.5 + Math.random() * 0.5;
    if (this.positionTop < WINDOW_HEIGHT) { // 花びらが画面内の時
      if (this.yuragiCount < this.yuragiDiv) { // 右へ揺らぎ
        this.positionLeft += yuragiSize;
      } else {
        this.positionLeft -= yuragiSize;
      }
      if (this.yuragiDiv * 2 <= this.yuragiCount) {
        // 揺らぎ幅2倍以上の時はカウンターリセット
        this.yuragiCount = 0;
      }
    } else {
      shouldRemove = true;
    }

    /**
     * 横風
     */
    if (wind >= 100 && wind <= 110) {
      this.positionLeft += 1;
      this.positionTop += Math.random() * 0.4 * 1;
    } else if (wind >= 111 && wind <= 120) {
      this.positionLeft += 3;
      this.positionTop += Math.random() * 0.4 * 3;
    } else if (wind >= 121 && wind <= 129) {
      this.positionLeft += 5;
      this.positionTop += Math.random() * 0.4 * 5;
    } else if (wind >= 130 && wind <= 137) {
      this.positionLeft += 7;
      this.positionTop += Math.random() * 0.4 * 7;
    } else if (wind >= 138 && wind <= 144) {
      this.positionLeft += 9;
      this.positionTop += Math.random() * 0.4 * 9;
    } else if (wind >= 145 && wind <= 300) {
      this.positionLeft += 11;
      this.positionTop += Math.random() * 0.4 * 11;
    } else if (wind >= 301 && wind <= 311) {
      this.positionLeft += 9;
      this.positionTop += Math.random() * 0.4 * 9;
    } else if (wind >= 312 && wind <= 322) {
      this.positionLeft += 7;
      this.positionTop += Math.random() * 0.4 * 7;
    } else if (wind >= 323 && wind <= 335) {
      this.positionLeft += 5;
      this.positionTop += Math.random() * 0.4 * 5;
    } else if (wind >= 336 && wind <= 349) {
      this.positionLeft += 3;
      this.positionTop += Math.random() * 0.4 * 3;
    } else if (wind >= 350 && wind <= 354) {
      this.positionLeft += 1;
      this.positionTop += Math.random() * 0.4 * 1;
    }

    /* 風カウンターの数値により左への移動を加算 */
    else if (wind >= 500 && wind <= 510) {
      this.positionLeft -= 1;
      this.positionTop -= Math.random() * 0.4 * 1;
    } else if (wind >= 511 && wind <= 520) {
      this.positionLeft -= 3;
      this.positionTop -= Math.random() * 0.4 * 3;
    } else if (wind >= 521 && wind <= 529) {
      this.positionLeft -= 5;
      this.positionTop -= Math.random() * 0.4 * 5;
    } else if (wind >= 530 && wind <= 537) {
      this.positionLeft -= 7;
      this.positionTop -= Math.random() * 0.4 * 7;
    } else if (wind >= 538 && wind <= 544) {
      this.positionLeft -= 9;
      this.positionTop -= Math.random() * 0.4 * 9;
    } else if (wind >= 545 && wind <= 700) {
      this.positionLeft -= 11;
      this.positionTop -= Math.random() * 0.4 * 1;
    } else if (wind >= 701 && wind <= 711) {
      this.positionLeft -= 9;
      this.positionTop -= Math.random() * 0.4 * 9;
    } else if (wind >= 712 && wind <= 722) {
      this.positionLeft -= 7;
      this.positionTop -= Math.random() * 0.4 * 7;
    } else if (wind >= 723 && wind <= 735) {
      this.positionLeft -= 5;
      this.positionTop -= Math.random() * 0.4 * 5;
    } else if (wind >= 736 && wind <= 749) {
      this.positionLeft -= 3;
      this.positionTop -= Math.random() * 0.4 * 3;
    } else if (wind >= 750 && wind <= 754) {
      this.positionLeft -= 1;
      this.positionTop -= Math.random() * 0.4 * 1;
      // } else if (wind >= 900) {
      //   shouldResetWind = true;
    } /* カウンターリセット */

    /**
     * 移動の実装
     */
    // 落下
    this.positionTop += this.speedDiv;

    // style更新
    this.dom.css({
      top: this.positionTop,
      left: this.positionLeft
    });
    this.yuragiCount++;

    return shouldRemove;
  }

  delete() {
    this.dom.remove();
  }
}
