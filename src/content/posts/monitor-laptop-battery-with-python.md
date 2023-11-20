---
title: '讓 Python 自動提醒你幫電腦充電'
publishedAt: '2018-11-02T04:00:00.000Z'
slug: 'monitor-laptop-battery-with-python'
tags:
  - 'Python'
summary: '為了減緩手機和筆電電池的衰退速度，網路上流傳神秘的「40–80 法則」。簡單來說，盡可能讓電量維持在 40–80%，就能延長電池壽命。至於你信不信，反正我是信了啦！'
image:
  src: 'src/assets/images/monitor-laptop-battery-with-python/featured-image.webp'
---

# 讓 Python 自動提醒你幫電腦充電

為了減緩手機和筆電電池的衰退速度，網路上流傳神秘的「40–80 法則」。簡單來說，盡可能讓電量維持在 40–80%，就能延長電池壽命。至於你信不信，反正我是信了啦！

說起來簡單，做起來難。一忙的時候，我常會忽略電池電量，所以我需要一款 app 提醒我什麼時候充電、什麼時候停。到 App Store 找了一下，結果發現有這個功能的 app 滿多都要付費，至於免費的，要不是很久沒更新、功能不齊全，不然就是有 bug。唯一一款賭運氣買的 app 也只有頭兩天正常運作，之後就不斷漏通知⋯⋯

說起來簡單，做起來難。一忙的時候，我常會忽略電池電量，所以我需要一款 app 提醒我什麼時候充電、什麼時候停。到 App Store 找了一下，結果發現有這個功能的 app 滿多都要付費，至於免費的，要不是很久沒更新、功能不齊全，不然就是有 bug。唯一一款賭運氣買的 app 也只有頭兩天正常運作，之後就不斷漏通知⋯⋯

算了啦，我們用 Python 寫程式提醒自己。自己的電腦自己救！

```python
# Python 3.6.6 on macOS Mojave 10.14.1

import pync
import psutil
from time import sleep

def check_battery(low, high):
    # 獲得電池資訊
    battery = psutil.sensors_battery()
    charging = battery.power_plugged
    percent = battery.percent
    message = '目前電池電量為 ' + str(percent) + '%'

    # 判斷是否需要連接或移除電源線
    if percent <= low and not charging:
        return {'title': '電量不足', 'message': message}
    elif percent >= high and charging:
        return {'title': '電量充足', 'message': message}

while True:
    alert = check_battery(40, 80)
    if alert:
        pync.notify(alert['message'], title=alert['title'], sound='default')
    sleep(60)
```

---

## 事前規劃

別急著敲鍵盤，先稍微思考一下我們要程式幫我們做什麼吧。

### 初步構想

1. 在電池快沒電的時候提醒我充電
2. 在電池充飽電的時候提醒我拔掉電源線

因為要套用 40–80 法則，所以我們把「快沒電」定義成電量低於 40%，至於「充飽電」則定義為電量高於 80%。再回頭把初步構想變具體一點：

1. 如果電池電量低於 40%，就提醒我充電
2. 如果電池電量高於 80%，就提醒我拔掉電源線

現在我們清楚要用 Python 達成什麼目標了！不過其實還有一些隱藏條件我們知道但沒有明確講出來。例如：電量低於 40% 但已接上電源線充電時；電量高於 80%，但已經拔掉電源線時就不需要提醒。另外，我們希望程式頻繁地監視電池電量，可能每隔 30 秒、1 分鐘、五分鐘就檢查一次電量。這些也要詳細地寫進程式碼裡，否則電腦不知道我們想這樣做。

換位思考是很棒的練習，我們假裝自己是台電腦，把所有要做的事情鉅細彌遺地列出來吧。

### 「試簡述之」

1. **如果**電池電量低於 40%，**而且**目前**沒有**連接電源線，**就**提醒我充電
2. **如果**電池電量高於 80%，**而且**目前還連接著電源線，**就**提醒我拔掉電源線
3. 在我**喊卡之前**，**每分鐘**檢查一次電池電量

### 把概念寫出來

```python
get battery info

if battery <= 40 and not charging:
    tell me to charge
elif battery >=80 and charging:
    tell me to stop charging

pause for a while and repeat
```

最後只要再搞定兩個功能：

1. 獲得電池資訊（包含電量、目前是否連接電源線）
2. 彈出提醒通知

聽起來是大工程⋯⋯但 Python 的好處就是有數量眾多的函式庫 (libraries) 等著我們用。神人已經把輪子造好了，我們就不用自己從頭慢慢刻。

---

## 前置作業

這次要用到兩個第三方 libraries：

1. [psutil](https://github.com/giampaolo/psutil)
2. [pync](https://github.com/SeTeM/pync)

因為它們不是內建的，所以不能直接 import，要先「安裝」才可以匯入。安裝的方法也很簡單，用 Python 內附的 pip，只要兩行指令就可以了。

```sh
pip3 install psutil
pip3 install pync
```

> 備註：如果電腦同時存有 Python 2 和 3 的話，建議用 pip3 較能確保安裝的是 Python 3 版本；如果電腦只有 Python 3 的話，用 pip 即可。

---

## psutil

psutil (python system and process utilities) 可以用來監測執行中的程序以及系統資訊，例如 CPU、記憶體、儲存空間、網路活動，最棒的是它可以監測電池！

### 用法示範

```python
>>> import psutil
>>> battery = psutil.sensors_battery()
>>> battery
sbattery(percent=66, secsleft=22560, power_plugged=False)
>>> battery.percent
66
>>> battery.secsleft
22560
>>> battery.power_plugged
False
```

### 放進程式裡

```python
import psutil

battery = psutil.sensors_battery()
charging = battery.power_plugged
percent = battery.percent

if percent <= 40 and not charging:
    print('電量不足，請充電')
elif percent >= 80 and charging:
    print('電量充足，請拔掉電源線')
```

現在我們能抓到電池的電量了，接下來是傳送通知的功能。

---

## pync

pync 可以讓我們傳送自訂訊息通知到 macOS 10.10+ 通知中心，送出指令後螢幕右上方會跳通知出來。

### 用法示範

```python
>>> import pync
>>> pync.notify('安安你好')
```

預設的通知樣式，訊息會在螢幕右上角出現：

![](src/assets/images/monitor-laptop-battery-with-python/default-notification.webp)

### 自訂樣式

除了最基本的預設樣式，pync 還能讓我們自訂一些細節，例如修改標題、增加副標題、播放聲音提示等。我理想中的通知是有標題和提示音的：

```python
>>> pync.notify('認同請分享', title='早安您好', sound='default')
```

自訂後的樣式：

![](src/assets/images/monitor-laptop-battery-with-python/notification-with-custom-message.webp)

由於 pync 不能直接更改 macOS 通知中心的「提示樣式」，如果想讓通知持續停留在螢幕右上角，直到使用者關閉的話，我們得到「系統偏好設定／通知」頁面，在左側點選 terminal-notifier 後，把提示樣式從「橫幅」改為「提示」才行。如下圖：

將提示樣式改為「提示」，避免通知自動消失：

![](src/assets/images/monitor-laptop-battery-with-python/notification-settings.webp)

更改提示樣式後，訊息就會持續停留在螢幕右上角：

![](src/assets/images/monitor-laptop-battery-with-python/customized-notification.webp)

### 放進程式裡

```python
import pync
import psutil

battery = psutil.sensors_battery()
charging = battery.power_plugged
percent = battery.percent
message = '目前電池電量為 ' + str(percent) + '%'

if percent <= 40 and not charging:
    pync.notify(message, title='電量不足', sound='default')
elif percent >= 80 and charging:
    pync.notify(message, title='電量充足', sound='default')
```

理想的通知樣式：

![](src/assets/images/monitor-laptop-battery-with-python/result.webp)

---

## 讓程式重複執行

因為我想要讓 Python 持續監測電池情形，直到關機，所以我寫了無窮迴圈 (infinite loop) 讓程式一直跑。為了避免程式佔用太多資源，設定每檢查一次電量後要等待一分鐘。

```python
import pync
import psutil
from time import sleep

while True:
    battery = psutil.sensors_battery()
    charging = battery.power_plugged
    percent = battery.percent
    message = '目前電池電量為 ' + str(percent) + '%'

    if percent <= 40 and not charging:
        pync.notify(message, title='電量不足', sound='default')
    elif percent >= 80 and charging:
        pync.notify(message, title='電量充足', sound='default')

    sleep(60)
```

至此，一個簡單的充電提醒程式就完成囉！如果中途想要停止的話可以用快捷鍵 Control (⌃) + C 強制停止。

---

## 整理程式碼

為了讓日後維護輕鬆一點，我們可以用 function 稍微整理一下程式碼。

```python
# Python 3.6.6 on macOS Mojave 10.14.1

import pync
import psutil
from time import sleep

def check_battery(low, high):
    # 獲得電池資訊
    battery = psutil.sensors_battery()
    charging = battery.power_plugged
    percent = battery.percent
    message = '目前電池電量為 ' + str(percent) + '%'

    # 判斷是否需要連接或移除電源線
    if percent <= low and not charging:
        return {'title': '電量不足', 'message': message}
    elif percent >= high and charging:
        return {'title': '電量充足', 'message': message}

while True:
    alert = check_battery(40, 80)
    if alert:
        pync.notify(alert['message'], title=alert['title'], sound='default')
    sleep(60)
```

這樣就大功告成囉。

---

## 參考資料

- [giampaolo/psutil: Cross-platform lib for process and system monitoring in Python - GitHub](https://github.com/giampaolo/psutil)
- [SeTeM/pync: Python wrapper for Mac OS 10.8 Notification Center - GitHub](https://github.com/SeTeM/pync)
- [Python post osx notification - Stack Overflow](https://stackoverflow.com/questions/17651017/python-post-osx-notification)
- [How to get battery percentage with python? - Stack Overflow](https://stackoverflow.com/questions/45626937/how-to-get-battery-percentage-with-python)
