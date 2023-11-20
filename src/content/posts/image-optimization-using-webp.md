---
title: '使用 WebP 格式減少圖片載入時間'
publishedAt: '2019-09-06T04:00:00.000Z'
slug: 'image-optimization-using-webp'
tags:
  - '前端'
summary: '圖片通常是消耗網路流量、減緩頁面載入速度的頭號嫌犯，而圖文並茂的部落格、展示眾多商品的電子商務網站往往深受其害。要解決這個問題，其中一種常見的做法是壓縮圖片，也就是幫圖片「瘦身」。'
image:
  src: 'src/assets/images/image-optimization-using-webp/featured-image.webp'
  credit: 'Image by <a target="_blank" rel="noopener noreferrer" href="https://www.logo.wine/logo/WebP">Logo Wine</a>'
---

# 使用 WebP 格式減少圖片載入時間

圖片通常是消耗網路流量、減緩頁面載入速度的頭號嫌犯，而圖文並茂的部落格、展示眾多商品的電子商務網站往往深受其害。要解決這個問題，其中一種常見的做法是壓縮圖片，也就是幫圖片「瘦身」。

不過圖片壓縮到一定程度之後，可能會發生圖片失真（細節變得模糊或出現鋸齒狀），或是檔案瘦不了多少的情形。考慮到上述限制，除了繼續使用常見的 JPEG 和 PNG 格式之外，或許可以嘗試另一個選擇：WebP。

WebP 是 Google 在 2010 年釋出的圖片格式，和傳統的 JPEG 格式相比之下檔案更小，同時能兼顧影像品質。按照 [Chrome Developers](https://developers.google.com/web/tools/lighthouse/audits/webp) 的說法，WebP、JPEG 2000、JPEG XR 這三種圖片格式的壓縮率通常比 JPEG 和 PNG 來得好。也就是說，使用前三種格式的話，可能減少載入時間和網路消耗量。

而根據 [Can I Use](https://caniuse.com/#feat=webp) 的資料，雖然目前 JPEG 2000 和 JPEG XR 的瀏覽器支援度都不太理想，但本文撰寫當下，WebP 的支援程度已經達到 80%，除了 IE 和 Safari 不支援外，主流瀏覽器都可以使用。

---

## 轉換格式

要用 WebP 之前首先要把原本的圖片轉成 `.webp` 格式，以下幾種方式可以參考看看：

### [Convertio](https://convertio.co/jpg-webp/)

不用註冊就能用的線上轉檔服務，不過要注意檔案大小限制。

### [File Format plugin by Telegraphics](http://telegraphics.com.au/sw/product/WebPFormat)

PhotoShop 的外掛，安裝後可以把圖片轉存成 WebP 格式，但上次更新不知道是多久以前，不確定新版 PhotoShop CC 能不能使用。

### [cwebp Encoder](https://developers.google.com/speed/webp/docs/cwebp)

Google 官方的 command line utility，好像是滿熱門的選擇。

```bash
# 安裝
$ brew install webp

# 轉檔
$ cwebp -q 75 input.jpg -o output.webp
```

### [imagemin-webp](https://github.com/imagemin/imagemin-webp)

如果想單純用 Node.js 也可以哦！先安裝這兩個套件：

```bash
$ npm install imagemin imagemin-webp
```

接著動手寫 script：
下面這段程式碼會把 input 資料夾裡所有 .jpg 和 .png 圖片轉換成 .webp（影像品質設定為 75），再存到 output 資料夾。

```javascript
// webp-convert.js
const imagemin = require('imagemin');
const webp = require('imagemin-webp');

async function convertImages() {
  const files = ['./input/*.{jpg,png}'];
  const config = {
    destination: './output',
    plugins: [webp({ quality: 75 })],
  };
  console.log('開始轉換圖片⋯⋯');
  await imagemin(files, config);
  console.log('已將圖片轉成 WebP！');
}

convertImages();
```

最後只要執行這支程式就行了：

```bash
$ node webp-convert.js
```

---

## 在 HTML 使用 WebP 圖片

### 不要這樣做 🚫

下面這個寫法只有支援 WebP 的瀏覽器會正常顯示圖片，不支援的瀏覽器會直接擺爛（例如 IE、Safari）。

```html
<img src="bad.webp" alt="母湯哦" />
```

### 請這樣做 ✅

改成這個寫法後，支援 WebP 的瀏覽器會使用 `good.webp`，而不支援 WebP 或不支援 `<picture>` 的瀏覽器會採用 `<img>`，顯示 `fallback.jpg`。

```html
<picture>
  <source srcset="good.webp" type="image/webp" />
  <img src="fallback.jpg" alt="想不到吧" />
</picture>
```

有用其他圖片格式的話，可以在 `<picture>` 裡面多放幾個 `<source>`，要注意瀏覽器讀取的順序是由上而下，直到遇見支援的格式為止。

```html
<!-- 讀取順序：WebP、JPEG 2000、JPEG XR、JPEG -->
<picture>
  <source srcset="good.webp" type="image/webp" />
  <source srcset="good.jp2" type="image/jp2" />
  <source srcset="good.jxr" type="image/vnd.ms-photo" />
  <img src="fallback.jpg" alt="想不到吧" />
</picture>
```

---

## 在 CSS 使用 WebP 圖片

有時候可能因為畫面設計或其他因素，沒辦法只用 HTML 達成想要的效果，而改用 CSS 的 `background-image` 去呈現圖片。由於 CSS 不像 HTML 能利用 `<picture>` 和 `<source>` 建立 fallback 機制，這時候事情會變得比較麻煩一點。

### 不要這樣做 🚫

用下面這個寫法的話，瀏覽器只會載入最後一行 background-image 指定的圖片。瀏覽器不支援 WebP 的話，never-loaded.jpg 也不會自動補上。

```css
.div-with-background {
  background-image: url('never-loaded.jpg');
  background-image: url('bad.webp');
}
```

### 請這樣做 ✅

首先調整 CSS。思路是這樣：支援 WebP 的情況下，套用某一條 CSS 規則；不支援的情況下，套用另一條規則。

```css
.webp .div-with-background {
  background-image: url('good.webp');
}

.no-webp .div-with-background {
  background-image: url('fallback.jpg');
}
```

接下來要透過 JavaScript 去偵測瀏覽器能不能正常讀取 WebP 圖片，做法是實際載入一張 WebP 圖，然後根據載入成功與否，在 `<html` 加上對應的 class name。可以選擇用第三方套件，或自己手寫。

### 使用套件偵測 WebP

不想重複造輪子的話，可以直接使用 [Modernizr](https://modernizr.com/) 這個專門負責偵測瀏覽器功能的套件。我們只需要偵測 WebP，可以不用把整個 library 匯進來。請[先到這邊](https://modernizr.com/download/?webp-setclasses=)，點選右上角的「BUILD」，再點選第一列的「Download」，就能拿到「只偵測 WebP」的程式碼片段。

![](src/assets/images/image-optimization-using-webp/download-build.webp)

```html
<!-- 引入下載回來的 modernizr-custom.js -->
<body>
  <div class="div-with-background"></div>
  <script src="modernizr-custom.js"></script>
</body>
```

如果瀏覽器支援 WebP 的話，Modernizr 會在 `<html>` 加上 `.webp` 和其他相關的 class name；如果不支援，則會加 `.no-webp`。

### 手動偵測 WebP

若不想用套件，或想了解背後可能的運作機制也行。以下程式碼會：

1. 監聽 DOMContentLoaded 事件
2. 事件觸發後，預先載入一張 1×1 像素的迷你 WebP 圖
3. 圖片順利載入就在 `<html>` 的 class name 加上 `.webp`，反之則加上 `.no-webp`

<!-- prettier-ignore-start -->
```javascript
// webp-detect.js
window.addEventListener('DOMContentLoaded', async () => {
  const hasSupport = await new Promise((resolve) => {
    const imgSrc = 'data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA';
    const pixel = new Image();
    pixel.addEventListener('load', () => {
      const isSuccess = pixel.width > 0 && pixel.height > 0;
      resolve(isSuccess);
    });
    pixel.addEventListener('error', () => {
      resolve(false);
    });
    pixel.setAttribute('src', imgSrc); // 開始載入測試圖
  });
  document.documentElement.classList.add(hasSupport ? 'webp' : 'no-webp');
});
```
<!-- prettier-ignore-end -->

```html
<!-- 引入剛剛寫的 code -->
<body>
  <div class="div-with-background"></div>
  <script src="webp-detect.js"></script>
</body>
```

搞定。這樣就能在 CSS 使用 WebP 背景圖片，遇到不支援 WebP 的瀏覽器也能顯示 JPEG 等傳統圖片格式。

---

> 等等，萬一使用者沒啟用 JavaScript 怎麼辦？

![](src/assets/images/image-optimization-using-webp/one-does-not-simply-disable-javascript.webp)

`<html>` 的 class name 是由 JavaScript 動態加上的，停用 JavaScript 的話，表示我們沒辦法動態增減任何 class name。這下有點尷尬，我們已經把 CSS 的 `background-image` 去掉了，所以畫面上不會有任何圖片。除非⋯⋯

> 我們假設使用者一開始就沒啟用 JavaScript。

---

### 沒有 JavaScript 的備案

- 手動在 `<html>` 的 class name 加上 `.no-js`（預設使用者停用 JavaScript）
  ```html
  <html class="no-js">
    <!-- ... -->
  </html>
  ```
- 新增 CSS 規則顯示 JPEG 圖：
  ```css
  .no-js .div-with-background {
    background-image: url('fallback.jpg');
  }
  ```
- 在 CSS 和其他 `<script>` 載入前，試圖移除 `.no-js`（見第 4 行）

<!-- prettier-ignore-start -->
```html
<html class="no-js">
  <head>
    <!-- ⬇️ 嘗試移除 html tag 的 .no-js -->
    <script>document.documentElement.classList.remove('no-js');</script>
    <link rel="stylesheet" href="..." />
  </head>
  <body>
    <div class="div-with-background"></div>
    <script src="..."></script>
  </body>
</html>
```
<!-- prettier-ignore-end -->

如此一來，假設使用者停用 JavaScript，第 4 行的 code 就會被忽略，而 `.no-js .div-with-background` 這條新規則會讓 `fallback.jpg` 正常載入。

假如使用者啟用 JavaScript，第 4 行的 code 會把 `.no-js` 拿掉，導致新增的 CSS 規則毫無作用。換句話說，原本就能正常瀏覽的使用者完全不受這次改動影響，可以放心。

---

## 成果

1. 支援 WebP 的瀏覽器只載入 WebP 圖片，不載入 JPEG
2. 不支援 WebP 的瀏覽器退而求其次，載入 JPEG
3. 停用 JavaScript 的瀏覽器也能照常載入 JPEG

## 延伸閱讀

使用 WebP 圖片格式節省網路流量、加快圖片載入速度之餘，不妨考慮透過[Lazy Loading 延遲載入圖片](/blog/lazy-loading-images-with-intersection-observer)。畢竟，快還要更快，對吧？

## 參考資料

- [Using WebP Images | CSS-Tricks](https://css-tricks.com/using-webp-images/)
- [Detect WEBP Support with JavaScript](https://davidwalsh.name/detect-webp)
- [Frequently Asked Questions | WebP | Google Developers](https://developers.google.com/speed/webp/faq)
- [Image Optimization | Web Fundamentals | Google Developers](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization)
- [Serve Images in Next-Gen Formats | Tools for Web Developers | Google Developers](https://developers.google.com/web/tools/lighthouse/audits/webp)
- [Converting Images To WebP — Smashing Magazine](https://www.smashingmagazine.com/2018/07/converting-images-to-webp/)
