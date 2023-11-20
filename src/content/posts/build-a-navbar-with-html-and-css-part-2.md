---
title: '用 HTML 與 CSS 製作簡易導覽列（中）'
publishedAt: '2018-10-03T04:00:00.000Z'
slug: 'build-a-navbar-with-html-and-css-part-2'
tags:
  - 'CSS'
  - 'HTML'
summary: '繼上一篇文章做出導覽列的雛形後，現在要繼續往前囉！我們在這篇文章會分別用 flexbox 和 inline-block，讓導覽列裡的清單項目並排，並讓導覽列水平置中。'
---

# 用 HTML 與 CSS 製作簡易導覽列（中）

繼[上一篇文章](/blog/build-a-navbar-with-html-and-css-part-1)做出導覽列的雛形後，現在要繼續往前囉！

我們在這篇文章會分別用 `flexbox` 和 `inline-block`，讓導覽列裡的清單項目並排，並讓導覽列水平置中。

這篇文章預計達成的進度：

![](src/assets/images/build-a-navbar-with-html-and-css-part-2/result.webp)

---

## 目標

1. 讓導覽列裡的清單項目並排
2. 讓導覽列水平置中
3. 用 `flexbox` 和 `inline-block` 分別達成上述兩項目標

## Flexbox

首先我們在 `<ul>` 這層 container 加上 class name，名稱可以自訂沒關係。

```html
<nav>
  <ul class="flex-nav">
    <li><a href="#">電子商務</a></li>
    <li><a href="#">市場行銷</a></li>
    <li><a href="#">辦公室生產力</a></li>
    <li><a href="#">個人成長</a></li>
    <li><a href="#">設計</a></li>
    <li><a href="#">通訊工程與軟體</a></li>
  </ul>
</nav>
```

### 並排

要用 Flexbox 的話，只要在元素套用 `display: flex`，該元素就會變成 flex container，而它的子元素（只限第一層）則會自動變成 flex items。

所以我們只要簡單地加上這行指令，就可以輕鬆達到第一個目標囉！

```css
.flex-nav {
  display: flex;
}
```

![](src/assets/images/build-a-navbar-with-html-and-css-part-2/display-flex.webp)

### 置中

第二個目標是要讓導覽列置中。用 Flexbox 對齊元素也是超級方便的，使用 `justify-content: center` 即可達成。

![](src/assets/images/build-a-navbar-with-html-and-css-part-2/justify-content-center.webp)

如果想讓子元素分散到整條 navbar 的話，也可考慮以下值：

#### `space-between`

空間平均分配到子元素之間，頭尾和邊緣無間隔。如下圖：

![](src/assets/images/build-a-navbar-with-html-and-css-part-2/justify-content-space-between.webp)

#### `space-around`

空間平均分配到子元素之間，唯獨頭尾和邊緣之間保留少許間隔（寬度是其他間隔的一半）。如下圖：

![](src/assets/images/build-a-navbar-with-html-and-css-part-2/justify-content-space-around.webp)

#### `space-evenly`

空間平均分配到所有子元素之間，頭尾和邊緣之間也保留同樣寬度的間隔。如下圖：

![](src/assets/images/build-a-navbar-with-html-and-css-part-2/justify-content-space-evenly.webp)

Flexbox 部分就到這邊，接下來我們試試 inline-block。

---

## Inline-Block

為了不干擾前面寫的內容，我們重新創一個新的 `<nav>`，再加上不同的 class name。

```html
<nav>
  <ul class="inline-block-nav">
    <li><a href="#">電子商務</a></li>
    <li><a href="#">市場行銷</a></li>
    <li><a href="#">辦公室生產力</a></li>
    <li><a href="#">個人成長</a></li>
    <li><a href="#">設計</a></li>
    <li><a href="#">通訊工程與軟體</a></li>
  </ul>
</nav>
```

### 並排

由於 `<li>` 是 block-level element，預設是按順序往下疊。若要讓它們並排的話，我們可以使用 `display: inline-block` 來達成。

那 inline-block element 有什麼特別的地方嗎？簡單來說，它們基本上還是 inline-element，但不一樣的地方是，它們擁有一些 block-level element 的特性，例如 `margin`、`padding`、`width`、`height`，而 inline elements 就沒有寬高概念（所以才叫「行內」元素），只能設定左右 `margin` 和 `padding` 而已。

只要加上這行指令，就可以讓元素以 block 的樣子並排：

```css
.inline-block-nav > li {
  display: inline-block;
}
```

![](src/assets/images/build-a-navbar-with-html-and-css-part-2/display-inline-block.webp)

### 置中

前面提到，`inline-block` 其實還是 inline element，所以可以把它們想成是一行「看起來像 block 的文字」。那我們怎麼讓 container 裡面的文字置中呢？只要用 `text-align: center` 就行囉！

```css
.inline-block-nav {
  text-align: center;
}
```

![](src/assets/images/build-a-navbar-with-html-and-css-part-2/text-align-center.webp)

#### 問題來了

Navbar 置中了，但是整體寬度好像比用 Flexbox 做的寬耶。我們明明沒有動到 `padding` 或 `margin` 呀，怎麼回事？

![](src/assets/images/build-a-navbar-with-html-and-css-part-2/flex-inline-block-comparison.webp)

來幫 `<li>` 加個底色，這樣我們比較容易觀察到問題。

![](src/assets/images/build-a-navbar-with-html-and-css-part-2/flex-inline-block-comparison-highlighted.webp)

用 inline-block 做的導覽列，各元素之間有小小的空隙！

為什麼會這樣呢？原來 HTML 會自動把空格和換行視為一個小空格（連在一起的很多空格或換行，會只視為一個小空格），所以我們可以推測，元兇就是原始碼裡面 `</li>` 後面的換行還有縮排。

解決方法很多，我把網路上找到的整理在下方，大家可以試試看。

- 使用註解，不讓 `</li>` 和 `<li>` 之間產生空格

<!-- prettier-ignore-start -->
```html
<nav>
  <ul class="inline-block-nav">
      <li><a href="#">電子商務</a></li><!--
   --><li><a href="#">市場行銷</a></li><!--
   --><li><a href="#">辦公室生產力</a></li><!--
   --><li><a href="#">個人成長</a></li><!--
   --><li><a href="#">設計</a></li><!--
   --><li><a href="#">通訊工程與軟體</a></li>
  </ul>
</nav>
```
<!-- prettier-ignore-end -->

- 直接省略 `</li>`（[根據 W3C Recommendation，某些情況下可省略](https://www.w3.org/TR/2014/REC-html5-20141028/syntax.html#optional-tags)）

```html
<nav>
  <ul class="inline-block-nav">
    <li><a href="#">電子商務</a></li>
    <li><a href="#">市場行銷</a></li>
    <li><a href="#">辦公室生產力</a></li>
    <li><a href="#">個人成長</a></li>
    <li><a href="#">設計</a></li>
    <li><a href="#">通訊工程與軟體</a></li>
  </ul>
</nav>
```

- 把 `margin` 設為負值（`-4px` 只是範例，實際數值因狀況而異）

```css
.inline-block-nav > li {
  margin-right: -4px;
}
```

- 把母元素的 `font-size` 設為 0

```css
.inline-block-nav {
  font-size: 0;
  text-align: center;
}
```

因為我們有針對 `<a>` 設定 `font-size`，加上 `<ul>` 沒有其他元素，所以我決定採用最後一個方法。既不會影響到 `<a>` 的字型大小，也能消除換行及空格造成的空隙。

順利的話，會發現元素間的空隙消失了：

![](src/assets/images/build-a-navbar-with-html-and-css-part-2/flex-inline-block-comparison-spaces-removed.webp)

Inline-block 部分就到這邊啦！（[點我看完整原始碼](https://codepen.io/mingjunlu/pen/XxXBrP)）

---

## 成果

![](src/assets/images/build-a-navbar-with-html-and-css-part-2/result.webp)

我們在[下一篇文章](/blog/build-a-navbar-with-html-and-css-part-3)會用最「資深」的 `float`，讓導覽列裡的清單項目並排，並讓導覽列水平置中。

## 參考資料

- [Fighting the Space Between Inline Block Elements | CSS-Tricks](https://css-tricks.com/fighting-the-space-between-inline-block-elements)
- [A Complete Guide to Flexbox | CSS-Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox)
- [Flex - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex)
- [CSS display properties: block, inline, and inline-block — & how to tell the difference](https://medium.com/@DaphneWatson/css-display-properties-block-inline-and-inline-block-how-to-tell-the-difference-7d3a1e6e3051)
- [What is the difference between display: inline and display: inline-block? - Stack Overflow](https://stackoverflow.com/questions/8969381/what-is-the-difference-between-display-inline-and-display-inline-block)
- [Does the \<li\> tag in HTML have an ending tag? - Stack Overflow](https://stackoverflow.com/questions/20550788/does-the-li-tag-in-html-have-an-ending-tag)
- [Removing Gaps Between Inline and Inline-Block Elements | CSS Layout Basics | Treehouse](https://teamtreehouse.com/library/removing-gaps-between-inline-and-inlineblock-elements)
