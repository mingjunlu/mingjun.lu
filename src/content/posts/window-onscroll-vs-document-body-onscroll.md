---
title: '你的 onscroll 不是你的 onscroll'
publishedAt: '2020-12-26T04:00:00.000Z'
slug: 'window-onscroll-vs-document-body-onscroll'
tags:
  - '前端'
summary: '前陣子同事處理滾動事件時，發現了 window.onscroll 跟 document.body.onscroll 的奇妙關係。我覺得很有趣，便嘗試釐清背後的原因，整理後跟大家分享。'
image:
  src: 'src/assets/images/window-onscroll-vs-document-body-onscroll/featured-image.webp'
  alt: 'Selective focus photography of person holding gray phone'
  credit: 'Photo by <a target="_blank" rel="noopener noreferrer" href="https://unsplash.com/@lishakov?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Andrej Lišakov</a> on <a target="_blank" rel="noopener noreferrer" href="https://unsplash.com/photos/selective-focus-photography-of-person-holding-gray-phone-XL-hPDNeZvs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>'
---

# 你的 onscroll 不是你的 onscroll

前陣子同事處理滾動事件時，發現了 `window.onscroll` 跟 `document.body.onscroll` 的奇妙關係。我覺得很有趣，便嘗試釐清背後的原因，整理後跟大家分享。

這篇文章偏向以流水帳方式紀錄我追蹤這個問題的過程，因此可能略顯冗長。若趕時間的話可以跳到文末的結論觀看。

---

## 先備知識 🍘

有兩種方法可以監聽 DOM 事件：

1. `addEventListener()`
2. `onevent` handler

而後者主要可透過兩種方法註冊：

1. 直接在 element tag 上面加 HTML attribute。例如：

```html
<button onclick="doSomeCoolStuff()">Click me</button>
```

2. 透過 JavaScript 選到元素後，置換它的 event handler。例如：

```javascript
const coolButton = document.querySelector('button');
coolButton.onclick = function (event) {
  // Do some cool stuff here
};
```

其他值得一提的還有：

- 同一種事件只能有一個 onevent handler。重複寫的話，後面寫的會覆蓋前面的。例如：

```javascript
coolButton.onclick = function () {
  alert('Hi');
};
coolButton.onclick = function () {
  console.log('Hello');
};

// 此時按下按鈕不會彈出跳窗，只有 console 會出現訊息
coolButton.click();
```

- 如果用 addEventListener() 註冊事件的話，同一種事件可以有很多個 handler，而且彼此不會覆蓋。例如：

```javascript
coolButton.addEventListener('click', function () {
  alert('Hi');
});
coolButton.addEventListener('click', function () {
  console.log('Hello');
});

// 此時按下按鈕會彈出跳窗，而 console 也會出現訊息
coolButton.click();
```

---

## 關於 onscroll 的奇妙現象

### 動動腦時間

假設頁面一開始沒有綁定任何事件，請問下列程式碼會分別在 console 顯示什麼訊息？

```javascript
window.onscroll = function handleScroll() {
  console.log('window.onscroll');
};

// 第一題
console.log(window.onscroll);

// 第二題
console.log(document.onscroll);

// 第三題
console.log(document.body.onscroll);
```

---

> 防
>
> 雷
>
> 線
>
> ⚡️
>
> 防
>
> 雷
>
> 線
>
> ⚡️
>
> 防
>
> 雷
>
> 線

---

#### 第一題答案

`console.log(window.onscroll)` 會顯示：

```javascript
ƒ handleScroll() {
  console.log('window.onscroll');
}
```

因為我們一開始就置換了 `window.onscroll`，所以理所當然地，console 會把 `handleScroll` 秀出來。

#### 第二題答案

`console.log(document.onscroll)` 會顯示：

<!-- prettier-ignore-start -->
```javascript
null
```
<!-- prettier-ignore-end -->

由於我們從未置換 `document.onscroll`，頁面也是乾淨的，就算要猜的話，應該會猜 `undefined` 或 `null`，對吧？

至此都算合理，直到⋯⋯

#### 第三題答案

`console.log(document.body.onscroll)` 會顯示：

```javascript
ƒ handleScroll() {
  console.log('window.onscroll');
}
```

![](src/assets/images/window-onscroll-vs-document-body-onscroll/wait-what.webp)

我們從頭到尾都沒碰 `document.body.onscroll`，但它竟然不是預設值 `null`！

等等，那如果反過來操作，先置換 `document.body.onscroll`，再去看 `window.onscroll` 呢？

```javascript
location.reload(); // 重新整理，確保這頁是乾淨的

document.body.onscroll = function handleScroll() {
  console.log('document.body.onscroll');
};

console.log(window.onscroll); // 猜猜這行會輸出什麼？
```

聰明的各位應該能猜到 console 的訊息：

```javascript
ƒ handleScroll() {
  console.log('document.body.onscroll');
}
```

---

## 謎之現象

看來，`window.onscroll` 似乎和 `document.body.onscroll` 連動，改了其中一個，另一個就會跟著變動。

那其他事件呢，該不會也都存在類似現象吧？

```javascript
window.onclick = function handleClick() {
  console.log('window.onclick');
};
console.log(document.body.onclick); // null

location.reload(); // 重新整理，確保這頁是乾淨的

document.body.onclick = function handleClick() {
  console.log('document.body.onclick');
};
console.log(window.onclick); // null
```

看起來 onclick 沒有這種連動的情況⋯⋯

![](src/assets/images/window-onscroll-vs-document-body-onscroll/i-dont-understand-any-of-this.webp)

---

## 到底怎麼一回事呢？

我試著查了 [Stack Overflow](https://stackoverflow.com/)，但網友的回答通常是提供解決方法（例如建議發問者改用 `addEventListener()` 去監聽滾動事件），並沒有闡述造成類似現象背後的理由。而 [MDN](https://developer.mozilla.org/en-US) 上面我一時也找不到相關的說明。

> 沒辦法，只好硬著頭皮讀 [HTML Specification](https://html.spec.whatwg.org/multipage/) 了。

我先搜尋「event handler」，發現[這個頁面](https://html.spec.whatwg.org/multipage/webappapis.html#event-handlers-on-elements,-document-objects,-and-window-objects)有列出各種 event handler，其中有幾種非常特別，甚至有自己獨特的稱呼。

| Event Handler | Event Type |
| :-----------: | :--------: |
|    onblur     |    blur    |
|    onerror    |   error    |
|    onfocus    |   focus    |
|    onload     |    load    |
|   onresize    |   resize   |
|   onscroll    |   scroll   |

> We call the set of the names of the event handlers listed in the first column of this table the _Window-reflecting body element event handler set_.

看名字大概就能猜到一些端倪 😆

---

接著我去追查了這個酷酷的名詞（Window-reflecting body element event handler set），發現在講 body 的頁面提到：

> The body element exposes as event handler content attributes a number of the event handlers of the Window object. It also mirrors their event handler IDL attributes.
>
> The event handlers of the Window object named by the Window-reflecting body element event handler set, exposed on the body element, replace the generic event handlers with the same names normally supported by HTML elements.

大概有點頭緒了。

---

## 結論

讀過 HTML Specification 的說明後，我的理解如下：

- 我們可透過 `document.body.onxxx` 或 `<body onxxx="">` 去存取或置換 Window 的某些 event handler
- `onblur`、`onerror`、`onfocus`、`onload`、`onresize` 與 `onscroll`，稱作 Window-reflecting body element event handler set
- 當我們在 body 存取或置換 Window-reflecting body element event handler set 時，我們存取或置換的其實不是 body 的 event handler，而是 Window 的 event handler

如此一來 `window.onscroll` 和 `document.body.onscroll` 的關係也明瞭了：

- 由於 `document.body.onscroll` 指向的是 `window.onscroll`，因此當我們置換前者時，我們置換的其實是後者
- 當我們置換 `window.onscroll` 後，`document.body.onscroll` 會反映前者的變動，因此 `document.body.onscroll` 也跟著改變

![](src/assets/images/window-onscroll-vs-document-body-onscroll/weird-knowledge-increased.webp)
