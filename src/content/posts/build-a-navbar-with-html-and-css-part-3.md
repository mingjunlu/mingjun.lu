---
title: '用 HTML 與 CSS 製作簡易導覽列（下）'
publishedAt: '2018-10-04T04:00:00.000Z'
slug: 'build-a-navbar-with-html-and-css-part-3'
tags:
  - 'CSS'
  - 'HTML'
summary: '我們在上一篇文章分別用 flexbox 和 inline-block 做出導覽列，這次我們要用 float 試試看。'
---

# 用 HTML 與 CSS 製作簡易導覽列（下）

我們在[上一篇文章](/blog/build-a-navbar-with-html-and-css-part-2)分別用 flexbox 和 inline-block 做出導覽列，這次我們要用 float 試試看。

這篇文章預計達成的進度：

![](src/assets/images/build-a-navbar-with-html-and-css-part-3/result.webp)

## 目標

1. 讓導覽列裡的清單項目並排
2. 讓導覽列水平置中
3. 用 `float` 達成上述兩項目標

## Float

在開始之前，我們得先認清 `float` 原本的功能：「文繞圖」。

![](src/assets/images/build-a-navbar-with-html-and-css-part-3/wrap-text-around-image.webp)

但以前還沒有 flexbox 這麼方便的功能，所以不少版面都是用 `float` 慢慢刻出來的。而現在排版已經很方便了，所以可預期的是，繼續使用 `float` 排版的情況會逐漸減少。以下練習的內容只是讓我們知道有這樣的方式可以達成同樣的目標而已，平時還是盡量讓 `float` 的功能單純點，除非不得已的情框下才用它去排版。

---

了解 `float` 原先的用途後，我們怎麼用 `float` 完成導覽列呢？

首先老樣子，我們重新創一個新的 `<nav>`，再加上 class name

```html
<nav>
  <ul class="float-nav">
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

使用 `float: left` 讓 container 裡的元素「浮起來」靠左。

```css
.float-nav {
  float: left;
}
```

使用 `float` 之後，元素會脫離 normal flow（簡單來說就是網頁預設的排版形式，元素遵循「由左至右」、「由上往下」的排序方向）。當元素脫離 normal flow 之後，就不再遵守原本的排序規則。

舉個生活的例子，normal flow 就像是交通規則，平時大家都須遵從交通號誌，不能闖紅燈、不能超速行駛。而脫離 normal flow 的元素就像載送傷患到醫院的救護車，可以不受紅綠燈、行車速度的限制。

#### 問題來了

項目已並排，不過底色怎麼不見了？

![](src/assets/images/build-a-navbar-with-html-and-css-part-3/float-left.webp)

如果打開「開發者工具」檢查元件的話，會發現之前的 `background-color` 並沒有被劃掉，只是我們現在看不到它的影響了。究竟發生什麼事？

![](src/assets/images/build-a-navbar-with-html-and-css-part-3/float-left-inspected-styles.webp)

> 因為容器爆掉惹 囧

我們可以把 container 想像是有著玻璃心的壯漢 (?)，在正常情況下，壯漢很罩，會把子元素包起來保護他們，子元素也會在背後默默支持。

今天我們讓子元素 `<li>` 浮起來、脫離 normal flow 後，container 就跟著被掏空了。壯漢雖然很坦，但沒人 support 讓他玻璃心碎滿地，於是它就塌陷 (collapse) 了。要注意的是， `<ul>` 塌陷後，`<nav>` 裡面也沒東西了，所以 `<nav>` 也跟著塌陷（塌！都塌！）。

容器崩塌後，油漆顏色永遠塗不上去。就像破掉的瓶子，水永遠裝不滿。雖然它在那，但也不在那 (??)。

咳咳⋯⋯上述只是我理解的方式啦，非常不精準，大家笑笑就好 XD

---

那我們怎麼處理容器塌陷無法上色的問題呢？方法很多，可以指派高度給它，或在裡面加別的元素等等。

我們還可以考慮用 `overflow: auto`，它會創造一個新的 [block formatting context](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context)，把容器撐住（很抽象，我也看得霧煞煞）。

我的理解是，它會建立一個獨立運作的區域，像一個牢不可破的 block。在這個區域裡的子元素不會跑出去干擾其他元素或排版（世外桃源？），這個特性同時也會消除子元素 `float` 後帶來的影響，達到 `clear` 消除浮動的效果，一舉兩得！

知道這個方法後，我們給外面的 `<nav>` 一個新的 class name，再加上 `overflow: auto` 和`background-color` 屬性，就可以對導覽列重新上色，同時一併消除浮動效果囉。

先給 `<nav>` 一個新的 class name：

```html
<nav class="float-nav-outer">
  <ul class="float-nav">
    <li><a href="#">電子商務</a></li>
    <li><a href="#">市場行銷</a></li>
    <li><a href="#">辦公室生產力</a></li>
    <li><a href="#">個人成長</a></li>
    <li><a href="#">設計</a></li>
    <li><a href="#">通訊工程與軟體</a></li>
  </ul>
</nav>
```

再加上這段：

```css
.float-nav-outer {
  background-color: rgb(230, 230, 230);
  overflow: auto;
}
```

![](src/assets/images/build-a-navbar-with-html-and-css-part-3/overflow-auto.webp)

### 置中

要用 `float` 做出置中效果⋯⋯

> 很麻煩！很麻煩！很麻煩！

太麻煩了所以要講三遍。

常用的 `text-align: center` 和 `margin: 0 auto` 這兩種方法都起不了作用，後來找到了 [Horizontally Centered Menus with no CSS hacks](https://matthewjamestaylor.com/css-centred-menus) 這篇文章。作者先用 `position: relative` 把子元素往右、往左各推 50%，最後巧妙地達成水平置中。

我們也來試試這個方法吧！

首先在 `<ul>` 也加上 `float:left`，讓 `<ul>` 也浮起來，它跟 `<li>` 碰在一起的時候，就會解除容器塌陷的狀態了。

```css
.float-nav {
  float: left;
}
```

接著加上 `position: relative` 和 `left: 50%`，把 `<ul>` 從原本的位置往右推 viewport 的 50%。

```css
.float-nav {
  float: left;
  left: 50%;
  position: relative;
}
```

![](src/assets/images/build-a-navbar-with-html-and-css-part-3/left-50.webp)

#### 問題來了

Navbar 下方出現橫向捲軸 (scrollbar) 了，怎麼回事？

這表示我們的 `<ul>` 超出 `<nav>` 的範圍。由於 `<nav>` 有設定 `overflow: auto`，它的預設行為是當內容超出容器範圍時，會自動加上捲軸，讓使用者可以透過 scrolling 檢視超出範圍的內容，所以我們才會看到 scrollbar。

要移除很簡單，改成 `overflow: hidden` 就行了。它的意思是：把超出範圍的部分隱藏起來。而且這個方法一樣會創造前面提到的 BFC，因此浮動的子元素依然不會影響母元素之外的其他元素。

```css
.float-nav-outer {
  background-color: rgb(230, 230, 230);
  overflow: hidden;
}
```

![](src/assets/images/build-a-navbar-with-html-and-css-part-3/overflow-hidden.webp)

下一步，我們把 `<li>` 從原來的位置往左拉 50%，就完成水平置中囉！

```css
.float-nav > li {
  float: left;
  position: relative;
  right: 50%; /* left: -50% 也有同樣效果 */
}
```

![](src/assets/images/build-a-navbar-with-html-and-css-part-3/result.webp)

終於順利用 `float` 做出導覽列啦！跟 `flexbox` 和 `inline-block` 比起來，應該有感受到以前排版的艱辛吧！希望 `float` 排版的方式漸漸走入歷史，等到文繞圖或非不得已再用它吧 QAQ

## 成果

![](src/assets/images/build-a-navbar-with-html-and-css-part-3/flex-inline-block-float-comparison.webp)

製作簡易導覽列系列文到此告一段落，感謝收看！（[點我看完整原始碼](https://codepen.io/mingjunlu/pen/ePZRKb)）

## 參考資料

- [Fix Collapsing Parents | CSS Snippets](http://css-snippets.com/collapsing)
- [The Clearfix: Force an Element To Self-Clear its Children | CSS-Tricks](https://css-tricks.com/snippets/css/clear-fix)
- [Normal Flow - Learn web development | MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Normal_Flow)
- [Float - CSS: Cascading Stlye Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/float)
- [Overflow - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
- [Block formatting context - Developer guides | MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context)
- [Horizontally Centered Menus with no CSS hacks](https://matthewjamestaylor.com/css-centred-menus)
- [Should the float attribute be avoided in modern CSS and why? - Quora](https://www.quora.com/Should-the-float-attribute-be-avoided-in-modern-CSS-and-why)
- [Why does overflow: hidden have the unexpected side-effect of growing in height to contain floated elements? - Stack Overflow](https://stackoverflow.com/questions/12783064/why-does-overflow-hidden-have-the-unexpected-side-effect-of-growing-in-height-t)
- [CSS background color with floating elements - Stack Overflow](https://stackoverflow.com/questions/20180081/css-background-color-with-floating-elements)
- [Floating elements within a div, floats outside of div. Why? - Stack Overflow](https://stackoverflow.com/questions/2062258/floating-elements-within-a-div-floats-outside-of-div-why)
- [Why do floating parent with floating children does not collapse? - Stack Overflow](https://stackoverflow.com/questions/47554888/why-do-floating-parent-with-floating-children-does-not-collapse)
- [How To Clear Floats (Clearfix)](https://www.w3schools.com/howto/howto_css_clearfix.asp)
- [Describe BFC (Block Formatting Context) and How It Works - YouTube](https://www.youtube.com/watch?v=F86kgfhS-Vk)
- [CSS中为什么overflow:hidden能清除浮动(float)的影响？原理是什么？ - 知乎](https://www.zhihu.com/question/30938856)
