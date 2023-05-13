const myCards = document.getElementById("container");
const text = document.getElementById("text");// المان متن برای نمایش نتیجه
const appendTens = document.getElementById("tens");// المان مربوط به دهم ثانیه
const appendSeconds = document.getElementById("seconds");// المان مربوط به ثانیه
let resultsArray = [];// آرایه برای نگهداری نتایج کلیک کاربر
let counter = 0;// شمارنده برای تعداد جفت کارت‌های مطابقت داده شده
let seconds = 0;// شمارنده ثانیه
let tens = 0;// شمارنده دهم ثانیه
let Interval;// شمارنده برای شروع شدن زمان‌سنج
const images = ["sass", "git", "gulp", "css", "grunt"];// تصاویر مربوط به کارت‌ها
const cards = [...images, ...images].sort(() => Math.random() - 0.5);//images.concat(clone); // merge to arrays // ترکیب دو آرایه
// let clone = [...images];//images.slice(0); // duplicate array // تکثیر آرایه images

// Shufffel function// تابع shuffle برای تصادفی کردن ترتیب کارت‌ها
// function shuffle(o) {
//   for (let j, i = o.length;i;j = Math.floor(Math.random() * i), [o[i],o[j]]=[o[j],o[--i]]);
//   // x = o[--i], o[i] = o[j], o[j] = x
//   // return o;
// }
// shuffle(cards);// تصادفی کردن ترتیب کارت‌ها با استفاده از تابع shuffle

// ایجاد کارت‌ها و اضافه کردن آنها به المان کانتینر
for (let i = 0; i < cards.length; i++) {
  card = document.createElement("div");//creat div "card"
  card.dataset.item = cards[i];
  card.dataset.view = "card";
  myCards.appendChild(card);

  // تابع onclick برای کلیک بر روی هر کارت
  card.addEventListener("click",function () {
    if(typeof Interval !== "number")Interval = setInterval(startTimer, 10);
    if (this.className != "flipped" && this.className != "correct") {
      this.className = "flipped";
      let result = this.dataset.item;
      resultsArray.push(result);
      // clearInterval(Interval);
      // Interval = setInterval(startTimer, 10);
    }

    if (resultsArray.length > 1) {
      if (resultsArray[0] === resultsArray[1]) {
        check("correct");
        counter++;
        win();
        resultsArray = [];
      } else {
        check("reverse");
        resultsArray = [];
      }
    }
  });
}

// تابع check برای چک کردن اصلاح کلاس المان‌های flipped
let check = function (className) {
  let x = document.getElementsByClassName("flipped");
  setTimeout(function () {
    for (let i = x.length - 1; i >= 0; i--) {
      x[i].className = className;
    }
  }, 500);
};

// تابع win برای بررسی پایان بازی
let win = function () {
  if (counter === 5) {
    clearInterval(Interval);
    text.innerHTML = "Your time was " + seconds + ":" + tens;
  }
};

// تابع شمارش زمان
// function startTimer() {
//   tens++;

//   tens < 9 ? appendTens.innerHTML = "0" + tens:appendTens.innerHTML = tens;

//   // if (tens < 9) {
//   //   appendTens.innerHTML = "0" + tens;
//   // }

//   // if (tens > 9) {
//   //   appendTens.innerHTML = tens;
//   // }
//   if (tens > 99) {
//     seconds++;
//     seconds < 9 ? appendSeconds.innerHTML = "0" + seconds : appendSeconds.innerHTML = seconds;
//     // if (seconds < 9) {
//     //   appendSeconds.innerHTML = "0" + seconds;
//     // }
//     // else {appendSeconds.innerHTML = seconds;}
//     tens = 0;
//     appendTens.innerHTML = "0" + 0;
//   }


// }
function startTimer() {
  tens++;

  appendTens.innerHTML = tens < 10 ? "0" + tens : tens;

  if (tens <= 99) return;

  seconds++;
  appendSeconds.innerHTML = seconds < 10 ? "0" + seconds : seconds;

  tens = 0;
  appendTens.innerHTML = "00";
}