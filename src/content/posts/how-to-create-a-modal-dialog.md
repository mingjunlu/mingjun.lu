---
title: '以 <dialog> 實作 Modal Dialog'
publishedAt: '2023-10-22T09:59:15.850Z'
slug: 'how-to-create-a-modal-dialog'
tags:
  - 'HTML'
summary: '以往實作 modal dialog 時，通常得搭配 position: fixed 以及 z-index，做出「覆蓋在目前畫面之上」的對話框。如今只要透過 <dialog> 元素，就可以更輕鬆地做到同樣效果喔！'
---

# 以 \<dialog\> 實作 Modal Dialog

以往實作 modal dialog 時，通常得搭配 `position: fixed` 以及 `z-index`，做出「覆蓋在目前畫面之上」的對話框。如今只要透過 `<dialog>` 元素，就可以更輕鬆地做到同樣效果喔！

## 刻出 modal dialog 外觀

首先是 dialog 本身：

```html
<dialog class="dialog">
  <!-- 可以自由決定 dialog 裡面要放什麼 -->
  <div>Would you like to close this dialog?</div>
  <div>
    <button class="cancel">Cancel</button>
    <button class="confirm">Confirm</button>
  </div>
</dialog>
```

`<dialog>` 預設有邊框，位置在畫面正中央。另外，modal dialog 後面常伴隨一層較暗的半透明 overlay，這可以透過 CSS `::backdrop` 偽元素設定樣式：

```css
.dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.2); /* 底色 */
  backdrop-filter: blur(2px); /* 模糊效果 */
}
```

接著是觸發開啟 dialog 的元素。這邊以按鈕為例：

```html
<button type="button" class="open">Open modal</button>
```

## 透過 JavaScript 開啟與關閉 modal dialog

外觀刻好後，接下來透過 JavaScript 讓使用者能夠開啟或關閉 modal dialog。具體來說，呼叫 `<dialog>` 的 `.showModal()` 與 `.close()` method。

```javascript
const dialog = document.querySelector('.dialog');
const cancelButton = document.querySelector('.cancel');
const confirmButton = document.querySelector('.confirm');
const openButton = document.querySelector('.open');

openButton.addEventListener('click', () => {
  dialog.showModal();
});
cancelButton.addEventListener('click', () => {
  dialog.close();
});
confirmButton.addEventListener('click', () => {
  dialog.close();
});
```

一個陽春的 modal dialog 就做好啦！給自己一點掌聲 👏

## 其他酷酷的知識

### Modal？Dialog？Popup？搞得我好亂啊

查資料時很多名詞混在一起。一番搜尋過後，目前我的理解如下，如果有誤請不吝指正：

- Dialog 是一種彈窗（popup），用途是讓使用者跟系統互動，例如顯示警告訊息或向使用者取的資料
- Dialog 有兩種形式：
  - Modal dialog：中斷使用者目前在做的事，強制把焦點移到打開的 dialog，且在 dialog 關閉前不能與背景畫面互動
  - Non-modal (modeless) dialog：不影響使用者操作，就算 dialog 打開仍然能跟背景畫面互動
- 也有人把 modal dialog 簡稱為「modal」

### 用 `.showModal()` 打開的 dialog 不會被一般元素的 z-index 影響

透過 `showModal()` 打開的 dialog 會顯示在一個叫 [top layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer) 的地方，它位於其他 layer 之上。`::backdrop` 同樣也歸在該處，因此不會被一般元素的 z-index 影響。就算畫面有個 `z-index` 超高的元素，也不用擔心 modal dialog 被覆蓋。

```css
.fixed-element {
  position: fixed;
  inset: 0;
  z-index: 99999;
}
```

### 不透過 JavaScript 關閉 dialog 的方法

有兩種方法可以做到：

- 按下 `Esc` 鍵
- 透過 `<dialog>` 的 `open` 屬性、`<form method="dialog">`，再搭配 `<button>` 觸發「送出表單後關閉 dialog」行為

```html
<dialog open>
  <div>I'll be gone soon</div>
  <form method="dialog">
    <button>OK</button>
  </form>
</dialog>
```

不過，以上兩種做法在關閉 dialog 之後，就沒有其他方法能重新打開了。要重新打開還是得仰賴 JavaScript，這點需要特別留意。

## 語法支援度

本文撰寫當下，[Can I Use](https://caniuse.com/mdn-html_elements_dialog) 的資料顯示 `<dialog>` 支援度為 93.2%。

## 參考資料

- [Modals Will Never Be The Same - HTML dialog Element](https://blog.webdevsimplified.com/2023-04/html-dialog)
- [Meet the top layer: a solution to z-index:10000 - Chrome for Developers](https://developer.chrome.com/blog/what-is-the-top-layer)
- [::backdrop - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/::backdrop)
- [\<dialog\>: The Dialog element - HTML: HyperText Markup Language | MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
- [Top layer - MDN Web Docs Glossary: Definitions of Web-related terms | MDN](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer)
- [Modal & Nonmodal Dialogs: When (& When Not) to Use Them](https://www.nngroup.com/articles/modal-nonmodal-dialog)
- [Dialog (Modal) Pattern | APG | WAI | W3C](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal)
