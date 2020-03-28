/* sakura.8351.1.js にコメント入れたバージョン */
import * as $ from "jquery";
import {
  v4 as UUID
} from "uuid";
import Petal from "./lib/Petal";

// 描画エリアのID
const CONTAINER_ID = "js--sakura";
const $WRAPPER_DOM = $(`#${CONTAINER_ID}`);
// 初期生成する花びらの枚数
const INIT_PETALS_SIZE = 50;

// 横風
var wind = 0;

const socket = new WebSocket("wss://teens-town.me:5000/sakura/");

let users = [];

function isNewer(username, colorCode) {
  for (const user of users) {
    if (user.username == username && user.colorCode == colorCode) {
      return false;
    }
  }
  return true;
}

socket.addEventListener("open", ((ev) => {
  console.log("接続成功");
  console.log(ev);
}));

$(function () {
  let sakuraPetals = [];

  /**
   * 花びらの初期生成
   */
  function initPetals() {
    for (let i = 0; i < INIT_PETALS_SIZE; i++) {
      appendPetal();
    }
  }

  function appendPetal(holderName = null, colorCode = null) {
    const petal = new Petal(
      UUID(), // ユニークID
      holderName, // 持ち主ID
      colorCode,
      Math.random() * -1000, // 初期位置Y
      Math.random() * window.innerWidth, // 初期位置X
      null, // type
      null //yuragi
    );
    sakuraPetals.push(petal);
    $WRAPPER_DOM.append(petal.getDOM());
  }

  initPetals();

  socket.addEventListener("message", function (e) {
    const json = JSON.parse(e.data);
    console.log(json);
    if (json.username && json.colorCode && json.size) {
      if (isNewer(json.username, json.colorCode)) {
        $("#entering").append($("<div>").addClass("entering__item").text(`${json.username} さん`));
        users.push(json);
      }
      for (let i = 0; i < json.size; i++) {
        appendPetal(json.username, json.colorCode);
      }
    }
  });


  setInterval(() => {
    for (const petal of sakuraPetals) {
      if (!petal) {
        continue;
      }
      if (petal.move(wind)) { // 削除
        const idx = sakuraPetals.indexOf(petal);
        if (-1 < idx) {
          if (petal.holderName) {
            $(`#${petal.getID()}`).remove();
            delete sakuraPetals[idx];
          } else {
            $(`#${petal.getID()}`).remove();
            delete sakuraPetals[idx];
            appendPetal();
          }
        }
      }
    }
    $("#debugInfo").html("" +
      "[DEBUG]: petals:" + $(".hana").length
    );
  }, 45);
});
