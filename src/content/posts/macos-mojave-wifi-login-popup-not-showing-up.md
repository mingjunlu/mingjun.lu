---
title: 'macOS Mojave Wi-Fi 認證視窗無法載入'
publishedAt: '2018-11-07T04:00:00.000Z'
slug: 'macos-mojave-wifi-login-popup-not-showing-up'
tags:
  - '疑難雜症'
summary: '前陣子升上 macOS Mojave 之後，一直有個問題困擾著我：當我連線到需要認證的 Wi-Fi 熱點時，自動彈出的認證視窗無法載入頁面。'
---

# macOS Mojave Wi-Fi 認證視窗無法載入

前陣子升上 macOS Mojave 之後，一直有個問題困擾著我：當我連線到需要認證的 Wi-Fi 熱點時，自動彈出的認證視窗無法載入頁面。

![](src/assets/images/macos-mojave-wifi-login-popup-not-showing-up/the-web-page-couldnt-be-loaded.webp)

## 症狀

我使用的版本是 macOS Mojave 10.14.1，連上需要認證的 Wi-Fi 熱點之後，自動彈出的認證視窗無法載入頁面。錯誤訊息只有寫：

> 發生問題。無法載入網頁。

但如果直接輸入認證頁面的網址（例如 [Taipei Free 的認證頁面](https://auth.wifi.taipei)），就能順利顯示頁面並完成認證。

## 是熱點的問題嗎？

我試了幾個無線網路熱點，例如公家的 TPE-Free、iTaiwan，實踐大學和銘傳大學的校內無線網路，還有星巴克提供的 Starbucks_Free_WiFi，通通都會發生相同的狀況。

五個熱點同時都出包，這樣的機率應該相對較低。

## 是網路設定的問題嗎？

我是沒有改過 DNS 或 IP 啦⋯⋯我從 OS X El Capitan 一路用到 macOS High Sierra，都沒有遇過跟網路有關的問題，所以不太可能改到設定。一升上 macOS Mojave，馬上就出現這個狀況。不過既然都懷疑是網路設定了，那就重置系統吧，設定神馬都是浮雲！

## 是作業系統的問題嗎？

保險起見我重置了系統，還原到 OS X El Capitan，問題就不見了。立馬再升到 macOS Mojave，一樣的問題又發生了。

看起來比較有可能是 macOS Mojave 的問題。

---

## 應急方法

雖然問題目前無解，但有個方法能應急，步驟如下：

1. 打開瀏覽器 Safari
2. 輸入網址：http://captive.apple.com/hotspot-detect.html
3. 耐心等候幾秒，網頁會自動導向認證頁面

雖然自動彈出的認證視窗依舊無法載入，不過沒關係，至少有免費 Wi-Fi 可用，撿便宜什麼的最棒惹。

---

【2019/4/10 更新】

今天在星巴克測試，已經不會跳出錯誤視窗了。不過有時候連上 Wi-Fi 之後，打開瀏覽器仍然無法自動跳轉到登入畫面，而是呈現「Safari 無法打開網頁」，如下圖：

![](src/assets/images/macos-mojave-wifi-login-popup-not-showing-up/safari-cant-open-the-page.webp)

但這不是大問題，只要連到 http://captive.apple.com/hotspot-detect.html 一樣可以手動導向。

---

## 參考資料

- [MacOS 10.14 Mojave public beta public Wi-Fi problem](https://apple.stackexchange.com/questions/329163/macos-10-14-mojave-public-beta-public-wi-fi-problem)
- [MacOS 10.14 Mojave public beta captive portal Wi-Fi issue](https://apple.stackexchange.com/questions/329421/macos-10-14-mojave-public-beta-captive-portal-wi-fi-issue)
- [MacOS Mojave 10.14.1 Captive Wi-Fi Problem](https://apple.stackexchange.com/questions/341406/macos-mojave-10-14-1-captive-wi-fi-problem)
- [majove beta2 无法加载任何需网页认证的 WiFi](https://www.v2ex.com/t/465368)
