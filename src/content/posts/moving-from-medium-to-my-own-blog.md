---
title: '從 Medium 到自架部落格'
publishedAt: '2023-07-31T03:37:27.801Z'
slug: 'moving-from-medium-to-my-own-blog'
tags:
  - '心得'
summary: '從 2018 年開始在 Medium 寫文章後，我的寫作頻率逐年下滑。回顧起來，我認為根本原因是在 Medium 寫技術文章的體驗不佳。因此，我決定脫離 Medium 經營自己的部落格。歡迎舊雨新知到 mingjun.lu 觀看文章。'
---

# 從 Medium 到自架部落格

我決定脫離 Medium 經營自己的部落格了！

## 搬家原因

從 2018 年開始在 Medium 寫文章後，我的寫作頻率逐年下滑。回顧起來，撇除惰性的影響後，我認為主要原因是在 Medium 寫技術文章的體驗不佳。

以下是我的痛點：

1. Syntax highlighting 支援有限
2. 不支援 Markdown 語法
3. 無法在 Safari 用注音輸入法寫作

### Syntax Highlighting 支援有限

之前要放 code snippet 的話，常見的做法有：

1. 在 GitHub 新增 gist，再把連結貼到文章裡
2. 直接截圖程式碼，並在文章中插入圖片
3. 直接用 Medium 的 code block

不論採用哪一種做法，作者和觀眾至少有一方的體驗會下降。

雖然 Medium 在 2022 年 11 月推出 [Code blocks with syntax highlighting](https://blog.medium.com/code-blocks-with-syntax-highlighting-53343df53c4f) 功能，但支援的語法仍有限，例如 JSX 或 TSX 就不在其中，令人遺憾。

### 不支援 Markdown 語法

我很常使用 Markdown 寫筆記，可惜 Medium 的編輯器不支援。

> 註：在寫這篇文章的時候我才注意到有 [Markdown To Medium](https://github.com/JacobBennett/MarkdownToMedium) 和 [Markdium](http://markdium.dev) 這些酷酷的服務，但我沒試用過所以不評論。

### 無法在 Safari 用注音輸入法寫作

不知道是 Medium 沒有處理好 [CompositionEvent](https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent)，還是 Safari 有什麼 bug。如果使用 Safari 搭配注音輸入法的話，基本上是無法在 Medium 寫作的。我只有在開發時會用 Chrome，日常主要還是使用 Safari，因此這個狀況讓我非常困擾。

## 替代方案

[DEV](https://dev.to) 和 [Hashnode](https://hashnode.com) 這兩個平台看起來都不錯，兩者的客群都是主打開發者。前者有支援 JSX / TSX，美中不足的是客製化程度偏低，而剛好我不是很喜歡它偏左的版型；後者客製化程度很高，但不支援 JSX / TSX。

不過兩者的中文社群都非常小，中文文章佔比極低。

於是我最終還是起了自架部落格的念頭。

## 自架部落格

自架的好處就是擁有絕對的自由與彈性，不必擔心被平台綁死。不過相對地，什麼都得自己來。

考慮到網站大部分是靜態內容，[Astro](https://astro.build) 應該是最適合的選擇。然而現階段我更想接觸 [Next.js](https://nextjs.org)，於是最終選擇了後者。目前暫時把 [HackMD](https://hackmd.io) 當成簡易的 CMS，並初步處理了 syntax highlighting 和 dark mode。其他功能和頁面之後會陸續補上，敬請期待 🙏

---

【2023/11/20 更新】

部落格已經改用 Astro 👨‍🚀

---

## 誌謝

- 感謝 Gwen 幫我設計網站和 logo 👩‍🎨
- 感謝 Kate 讓我諮詢 UI/UX 細節 🧞‍♀️
