---
title: 'CSS :has() 選擇器'
publishedAt: '2024-02-21T10:22:14.694Z'
slug: 'how-to-use-css-has-selector'
tags:
  - 'CSS'
summary: '我們寫 CSS 時常常需要往下層選元素，例如「套用樣式到 <article> 底下的 <h1>」。如果能根據下層元素改變上層的樣式，一定很方便吧？這樣的需求，現在可以透過純 CSS 做到囉！CSS :has() 選擇器某種程度可以做到「往上層選」的效果，快來看看怎麼用吧。'
---

# CSS :has() 選擇器

我們寫 CSS 時常常需要往下層選元素，例如「套用樣式到 `<article>` 底下的 `<h1>`」。如果能根據下層元素改變上層的樣式，一定很方便吧？這樣的需求，現在可以透過純 CSS 做到囉！CSS `:has()` 選擇器某種程度可以做到「往上層選」的效果，快來看看怎麼用吧。

## 懶人包

`.parent` 底下有 `.child` 時，對 `.parent` 套用樣式。

```css
.parent:has(.child) {
  /* styles */
}
```

## 使用情境範例

### Modal Dialog 打開時，防止使用者捲動畫面

如果網站是[以 \<dialog\> 實作 modal dialog](https://mingjun.lu/blog/how-to-create-a-modal-dialog) 的話，搭配 `:has()` 可以輕鬆達成這個效果喔！

```css
body:has(dialog:modal[open]) {
  overflow: hidden;
}
```

### 圖片附有說明時，替容器加上內距

<!-- prettier-ignore-start -->
```html
<figure>
  <img src="..." alt="..." />
</figure>
<figure>
  <img src="..." alt="..." />
  <figcaption>...</figcaption> <!-- 有說明文字 -->
</figure>
```
<!-- prettier-ignore-end -->

```css
figure:has(figcaption) {
  padding: 16px;
}
```

### 還沒有內容時，替容器套用不同樣式

不管是動態載入的內容，或是那一區還沒決定要放什麼，都滿適合的。

<!-- prettier-ignore-start -->
```html
<div class="container">
  <div class="content">...</div>
</div>
<div class="container">
  <div class="content">...</div>
</div>
<div class="container">
  <div class="content"></div> <!-- 內容為空 -->
</div>
```
<!-- prettier-ignore-end -->

```css
.container:has(.content:empty) {
  /* skeleton styles */
}
```

## 進階用法

CSS `:has()` 選擇器搭配 sibling combinator（[`+`](https://developer.mozilla.org/en-US/docs/Web/CSS/Next-sibling_combinator) 和 [`~`](https://developer.mozilla.org/en-US/docs/Web/CSS/Subsequent-sibling_combinator)）還能玩出更多花樣。以下是網路上一些酷酷的範例：

- [當 \<h1\> 後面緊鄰 \<h2\> 時，調整前者的下方間距](https://developer.mozilla.org/en-US/docs/Web/CSS/:has#with_the_sibling_combinator)
- [選擇前面的同層元素](https://tobiasahlin.com/blog/previous-sibling-css-has/)
- [實作類似 macOS Dock 放大效果的列表](https://codepen.io/smashingmag/pen/rNrpymj?editors=1100)

## 語法支援度

本文撰寫當下，[Can I Use](https://caniuse.com/css-has) 的資料顯示 `:has()` 支援度為 91.9%。

## 參考資料

- [The advanced guide to the CSS :has() selector - LogRocket Blog](https://blog.logrocket.com/advanced-guide-css-has-selector)
- [The CSS :has Selector (and 4+ Examples) | CSS-Tricks - CSS-Tricks](https://css-tricks.com/the-css-has-selector)
- [:has() - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:has)
- [Hiding empty elements with CSS :empty and :has()](https://tobiasahlin.com/blog/hiding-an-element-if-its-empty)
- [Selecting previous siblings with CSS :has()](https://tobiasahlin.com/blog/previous-sibling-css-has)
- [Using :has() as a CSS Parent Selector and much more | WebKit](https://webkit.org/blog/13096/css-has-pseudo-class)
- [Level Up Your CSS Skills With The :has() Selector — Smashing Magazine](https://www.smashingmagazine.com/2023/01/level-up-css-skills-has-selector)
- [An Introduction to the :has() Selector in CSS — SitePoint](https://www.sitepoint.com/has-selector-in-css)
