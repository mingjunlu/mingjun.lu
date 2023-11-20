---
title: 'Lazy Loading 延遲載入圖片'
publishedAt: '2019-08-08T04:00:00.000Z'
slug: 'lazy-loading-images-with-intersection-observer'
tags:
  - '前端'
summary: 'Lazy loading（延遲載入）是網頁開發很實用的技巧，如果用在圖片很多的網站，不僅可以大幅提升頁面載入速度，還能節省使用者和伺服器雙方的網路流量。'
image:
  src: 'src/assets/images/lazy-loading-images-with-intersection-observer/featured-image.webp'
---

# Lazy Loading 延遲載入圖片

Lazy loading（延遲載入）是網頁開發很實用的技巧，如果用在圖片很多的網站，不僅可以大幅提升頁面載入速度，還能節省使用者和伺服器雙方的網路流量。

提到 lazy loading，不少人都會利用第三方套件去做。不過 Chrome 在最近發布的幾個版本中，加入了原生的 lazy loading 實驗功能。如果將來其他主流瀏覽器也跟進的話，代表以後網頁開發者可能不需要額外寫 code 或用第三方套件，就能讓瀏覽器自動處理 lazy loading。

聽起來是不是很心動呀？

## Native Lazy Loading

### 啟用功能

這篇文章撰寫的當下，這項功能在 Chrome 貌似沒有預設開啟，必須由使用者手動啟用才行。方法不難，打開 Chrome 後到網址輸入 `chrome://flags`，接著搜尋「lazy」，再啟用這功能：

- Enable lazy image loading (#enable-lazy-image-loading)

#### 使用方法

只要在 HTML 的 `<img>` 標籤加上 `loading="lazy"` 就行了，超簡單！

```html
<img src="my-image.jpg" loading="lazy" />
```

`loading` 屬性共有三種值供我們選擇，分別是：

- `lazy`：延遲載入畫面外的圖片
- `eager`：不管元素在哪裡都會立即載入圖片
- `auto`：讓瀏覽器自行決定（Chrome 預設值是 `eager`）

#### 判斷瀏覽器是否支援

```javascript
if ('loading' in HTMLImageElement.prototype) {
  // 支援原生 lazy loading
} else {
  // 不支援，改用其他備案
}
```

這篇文章撰寫的當下，[Can I Use](https://caniuse.com/#feat=loading-lazy-attr) 上面支援度是 0%，表示現階段還是必須手動或用套件處理 lazy loading。倘若未來其他瀏覽器也陸續跟進的話，對網頁開發者來說肯定是一大福音。

既然 native lazy loading 普及還要再等等，我們來了解一下怎麼 lazy loading 背後是怎麼實作的吧。

---

Lazy loading 常見的做法有三種：

1. 使用第三方套件（例如 [lazysizes](https://github.com/aFarkas/lazysizes)、[Lozad.js](https://github.com/ApoorvSaxena/lozad.js)）
2. 監聽 `scroll`、`resize` 和 `orientationchange` 事件（不推薦 🙁）
3. 使用 [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

第一種最簡單，所以這邊就不多說。

而第二種方法不推薦的原因，是因為 scroll event 只要使用者滑一下就會排山倒海地觸發，這種情況下很容易導致效能問題。以至於通常要監聽的話，都會搭配 debouncing 或 throttling 去抑制觸發的次數或頻率，不過那樣會把 code 搞得更複雜，所以不太推薦。

至於第三種方法，用起來算直覺，沒有什麼複雜的計算，也不用太擔心效能問題，重點是不少瀏覽器都有支援，值得一試。

根據 [Can I Use](https://caniuse.com/#feat=intersectionobserver) 的資料，除了 Internet Explorer 不支援外，其他主流的瀏覽器都有支援，整體支援度落在 84–88% 之間。如果萬不得已、情勢所逼、出於無奈，或業力引爆的關係必須要支援舊版 IE 的話，也有 [polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) 可以用，最早支援到 IE 7。所以，大膽用吧！

## 透過 Intersection Observer API 實作 Lazy Loading

### 成品預覽

![](src/assets/images/lazy-loading-images-with-intersection-observer/demo.gif)

這個網頁一口氣塞了 60 張貓貓圖片，如果沒有 lazy loading 的話，瀏覽器在連到頁面後就會拼了命似地把 60 張圖片全部下載回來，反之則可以先下載有在畫面中出現的圖片後就停住，等使用者滑到其他圖片時再繼續載入。

Lazy loading 的實際效果可以[移駕至這邊觀看](https://mingjunlu.github.io/lazy-loading-example)，或[點我看原始碼](https://github.com/mingjunlu/lazy-loading-example)。另外文末有附上懶人包，趕時間的客倌可以直接滑到最下面 💁‍♂️

### 拆解步驟

Lazy loading 這個詞聽起來很炫炮，但其實它主要做的事情只有三件：

1. 不讓圖片正常載入
2. 監視圖片元素，判斷它們是否進入到畫面中
3. 元素進入畫面後，載入圖片

其中最麻煩的第二步，我們有 Intersection Observer API 可以用，所以不用太緊張。剩下的就是一些條件判斷還有 DOM 的操作而已。

### 不讓圖片正常載入

回想生活中的例子，什麼情況會看到網頁破圖？

1. 頁面載入的時候斷線或網路不穩
2. 連線錯誤
3. 圖片路徑有誤

常見的大概是這幾種情形吧，那這三個情形有什麼特徵或共同點呢？都是瀏覽器拿不到資料。要刻意營造前兩種情形，對開發者和使用者都沒有好處，因為就算真的做到，很有可能會導致使用者根本看不到頁面或卡住無法操作。

這樣一比對，似乎最好達成的是第三種情況。

不過我們的做法稍微不同，我們「完全不放路徑」，也就是說連 `src` 這個屬性都沒有。取而代之的是叫做 `data-src` 的自訂資料屬性，我們把圖片網址暫時存在這邊。

圖片一旦沒了 `src`，自然就不會、也沒辦法載入。而等到我們真正需要載入圖片時（第三步驟），再把 `data-src` 的值取出來、塞回給 `src`，這時候圖片拿到 `src`，就會自動開始載入了。

> 註：不一定要命名成 `data-src`，只要符合 `data-*` 這個命名規則，就算要用 `data-unicorn` 也是沒問題的哦 🦄

```html
<!-- 正常的圖片 -->
<img class="img lazy" src="cat.jpg" />

<!-- 無法載入的圖片 -->
<img class="img lazy" data-src="cat.jpg" />
```

### 監視圖片元素

1. 創造一個 `IntersectionObserver` instance
2. 傳入一個 callback function 給它，等偵測到元素進入畫面時會觸發該 function
3. 使用 instance 的 `observe` method 開始監視元素

```javascript
const watcher = new IntersectionObserver(onEnterView);
const lazyImages = document.querySelectorAll('img.lazy');
for (const image of lazyImages) {
  watcher.observe(image);
}
```

### 載入圖片

1. 判斷目標是否進入畫面
2. 確認目標進入畫面後，把 `data-src` 的值取出，放到 src
3. 用 `unobserve` method 取消監視元素

特別提醒一下，圖片進入畫面後記得要取消監視，否則等圖片載入完後，Intersection Observer 還是會持續監視元素、重複觸發 callback function。

```javascript
function onEnterView(entries, observer) {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.setAttribute('src', img.dataset.src);
      observer.unobserve(img);
    }
  }
}
```

## 懶人包

1. 用 `data-src` 代替圖片的 `src`
2. 透過 `Intersection Observer` API 監視圖片
3. 圖片進入畫面後，透過 DOM 把 `data-src` 的值塞給 src

> 恭喜！你已經完成炫炮的 lazy loading 功能了 🎉

---

## 參考資料

- [AddyOsmani.com - Native image lazy-loading for the web!](https://addyosmani.com/blog/lazy-loading)
- [Lazily load iframes and images via ‘loading’ attribute - Chrome Platform Status](https://chromestatus.com/feature/5645767347798016)
- [Native Lazy Loading | CSS-Tricks](https://css-tricks.com/native-lazy-loading)
- [Intersection Observer API - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Lazy Loading Images and Video | Web Fundamentals | Google Developers](https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video)
- [Native lazy-loading for the web | web.dev](https://web.dev/articles/browser-level-image-lazy-loading)
