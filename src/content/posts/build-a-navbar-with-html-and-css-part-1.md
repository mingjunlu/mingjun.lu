---
title: '用 HTML 與 CSS 製作簡易導覽列（上）'
publishedAt: '2018-10-02T04:00:00.000Z'
slug: 'build-a-navbar-with-html-and-css-part-1'
tags:
  - 'CSS'
  - 'HTML'
summary: '導覽列 (navbar) 是網頁很常見的元素。學會 HTML 和 CSS 基本的語法後，來試著做一個簡單的 navbar 看看吧！'
---

# 用 HTML 與 CSS 製作簡易導覽列（上）

導覽列 (navbar) 是網頁很常見的元素。學會 HTML 和 CSS 基本的語法後，來試著做一個簡單的 navbar 看看吧！

這篇文章預計達成的進度：

![](src/assets/images/build-a-navbar-with-html-and-css-part-1/result.gif)

---

## 目標

1. 完成導覽列的 HTML 架構（清單形式）
2. 用 CSS 改變導覽列的外觀，讓它看起來不那麼可怕

## HTML 架構

要用 CSS 幫網頁「上妝」之前，得有讓我們上妝的對象，也就是 HTML。有了 HTML 當作骨骼，我們才能幫它披上外皮（CSS）。

首先做一個清單，用 `<ul>` 包 `<li>`，文字內容可以依自己喜歡修改（這邊用的文字是某次逛 [Udemy](https://www.udemy.com/) 時，他們的導覽列顯示的課程類別）。

```html
<ul>
  <li>電子商務</li>
  <li>市場行銷</li>
  <li>辦公室生產力</li>
  <li>個人成長</li>
  <li>設計</li>
  <li>通訊工程與軟體</li>
</ul>
```

我們希望每個選項都是可以按的連結，所以要把文字用 `<a>` 包起來。

```html
<ul>
  <li><a href="#">電子商務</a></li>
  <li><a href="#">市場行銷</a></li>
  <li><a href="#">辦公室生產力</a></li>
  <li><a href="#">個人成長</a></li>
  <li><a href="#">設計</a></li>
  <li><a href="#">通訊工程與軟體</a></li>
</ul>
```

為了讓這個 `<ul>` 有別於一般清單，我們用 `<nav>` 作容器（container），再把 `<ul>` 放進 container，這樣瀏覽器就知道這個清單是導覽用途囉！

```html
<nav>
  <ul>
    <li><a href="#">電子商務</a></li>
    <li><a href="#">市場行銷</a></li>
    <li><a href="#">辦公室生產力</a></li>
    <li><a href="#">個人成長</a></li>
    <li><a href="#">設計</a></li>
    <li><a href="#">通訊工程與軟體</a></li>
  </ul>
</nav>
```

Navbar「素顏」的樣子：

![](src/assets/images/build-a-navbar-with-html-and-css-part-1/html-only.webp)

---

## CSS 修飾

為了保護大家的眼睛，我們需要一點 CSS 修飾，來達成下列目標：

1. 移除超連結的顏色和底線
2. 移除 `<ul>` 預設的項目樣式（●）
3. 調整背景顏色、字型大小、`padding`、`margin`
4. 滑鼠游標移至連結時，改變導覽列項目的字和背景顏色

### 移除超連結的效果

```css
nav a {
  color: inherit; /* 移除超連結顏色 */
  text-decoration: none; /* 移除超連結底線 */
}
```

### 移除清單預設的項目樣式

```css
nav > ul {
  list-style: none; /* 移除項目符號 */
}
```

### 調整背景顏色、字型大小、padding、margin：

```css
nav > ul {
  background-color: rgb(230, 230, 230);
  list-style: none; /* 移除項目符號 */
  margin: 0;
  padding: 0;
}
nav a {
  color: inherit; /* 移除超連結顏色 */
  font-size: 1.2rem;
  text-decoration: none; /* 移除超連結底線 */
}
```

### 加入 hover 效果

```css
/* 滑鼠移到 `<a>` 時變成深底淺色 */
nav a:hover {
  background-color: rgb(115, 115, 115);
  color: white;
}
```

### 問題來了

上完底妝後，我們發現當滑鼠游標移到文字，顏色和底色會跟著改變，但是當游標移到空格處時，效果就不見了。如下圖：

![](src/assets/images/build-a-navbar-with-html-and-css-part-1/anchor-tag-width-problem.gif)

這其實很合理，因為我們使用的 CSS 選擇器 (selector) 是 `nav a:hover`，而 `<a>` 會隨著裡面的文字長度而調整寬度。那如果改成 `nav li:hover` 呢？

![](src/assets/images/build-a-navbar-with-html-and-css-part-1/li-hover-problem.gif)

顏色是改變了。但如果在空格處點擊，並不會出現超連結的效果，這也沒解決問題⋯⋯繞了半天，基本上我們的問題就是 `<a>` 不夠寬。

### 為什麼會這樣呢？

因為 `<a>` 是行內元素 ([inline element](https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements))，所以文字多長，它就多寬。

我們可以透過 `display: block` 把它改成區塊級元素 ([block-level element](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements))。再加上 `padding` 調整一下，整個 navbar 的雛形就完成囉！（[點我看完整原始碼](https://codepen.io/mingjunlu/pen/jebGmm)）

```css
nav a {
  color: inherit; /* 移除超連結顏色 */
  display: block; /* 讓 <a> 填滿 <li> */
  font-size: 1.2rem;
  padding: 10px;
  text-decoration: none; /* 移除超連結底線 */
}
```

## 成果

![](src/assets/images/build-a-navbar-with-html-and-css-part-1/result.gif)

我們在[下一篇文章](/blog/build-a-navbar-with-html-and-css-part-2)會分別用 `flexbox` 和 `inline-block`，讓導覽列裡的清單項目並排，並讓導覽列水平置中。

## 參考資料

- [Display - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
- [Block-level elements - HTML: HyperText Markup Language | MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements)
- [Inline elements - HTML: HyperText Markup Language | MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements)
- [Wrap anchor tag around li element - Stack Overflow](https://stackoverflow.com/questions/12086453)
- [How to increase width of anchor tag inside li to li width - Stack Overflow](https://stackoverflow.com/questions/14994999)
