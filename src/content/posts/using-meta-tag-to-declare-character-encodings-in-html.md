---
title: 'HTML 初學疑問：網頁變亂碼怎麼辦？'
publishedAt: '2018-09-06T04:00:00.000Z'
slug: 'using-meta-tag-to-declare-character-encodings-in-html'
tags:
  - 'HTML'
summary: '最近初學 HTML，按照國外課程的教學寫了 Hello World。一切都很正常，直到我把文字改成中文（母語還是比較親切嘛）⋯⋯它就變成一堆亂碼。'
---

# HTML 初學疑問：網頁變亂碼怎麼辦？

最近初學 HTML，按照國外課程的教學，寫了第一個 Hello World：

```html
<html>
  <head>
    <title>Hello from the Other Side</title>
  </head>
  <body>
    <h1>Hello World</h1>
    <p>That's it. Nothing more.</p>
  </body>
</html>
```

一切都很正常，直到我把文字改成中文（母語還是比較親切嘛）：

```html
<html>
  <head>
    <title>哈囉</title>
  </head>
  <body>
    <h1>安安您好</h1>
    <p>認同請分享</p>
  </body>
</html>
```

它就變成一堆亂碼。

![](src/assets/images/using-meta-tag-to-declare-character-encodings-in-html/garbled-text.webp)

我當時是使用 macOS High Sierra 10.13.6，瀏覽器是內建的 Safari 版本 11.1.2 (13605.3.8)；如果是在 Windows 10 1803 版本，用 Vivaldi 瀏覽器（版本 1.15.1147.64）打開的話則可以正常顯示中文字。

另外，我發現如果手動把頁面的文字編碼設定成 UTF-8，也可以正常顯示。不過這樣很煩躁啊！如果我不想換瀏覽器的話，難道我每次寫出來的中文網頁都只能再手動設定編碼嗎？

速速拜了 Google 大神，得到解決方法是：

在 `<head>` 標籤內加入 `<meta>`，再用 `charset` 這個屬性要求瀏覽器以特定文字編碼方式顯示網頁。

寫法如下：

```html
<html>
  <head>
    <meta charset="utf-8" />
    <title>哈囉</title>
  </head>
  <body>
    <h1>安安您好</h1>
    <p>認同請分享</p>
  </body>
</html>
```

改成這樣，瀏覽器就會以 UTF-8 來載入頁面了：

![](src/assets/images/using-meta-tag-to-declare-character-encodings-in-html/normal-text.webp)

原來沒有指定編碼方式的話，瀏覽器會自動「猜」頁面的編碼方式，猜對的時候沒問題，但要是猜錯就會出現亂碼。

保險起見，以後要寫中文內容的話，建議在 HTML 裡加 `<meta charset="utf-8">` 指名編碼方式。

## 參考資料

- [\<meta\>: The metadata element - HTML: HyperText Markup Language | MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta)
- [how to display chinese character in HTML - Stack Overflow](https://stackoverflow.com/questions/20670034/how-to-display-chinese-character-in-html)
