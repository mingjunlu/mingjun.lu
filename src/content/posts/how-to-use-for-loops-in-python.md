---
title: 'Python 初學疑惑：For 迴圈怎麼用？'
publishedAt: '2018-08-15T04:00:00.000Z'
slug: 'how-to-use-for-loops-in-python'
tags:
  - 'Python'
summary: '繼函式通關後，for 迴圈笑著向我招手。我學 while 迴圈的時候還沒卡住，可能因為 while 這個字比較好理解它的意思吧？「當發生什麼事的時候，就怎樣怎樣。」但是 for 迴圈好像就沒那麼直覺了。'
---

# Python 初學疑惑：For 迴圈怎麼用？

繼 [Python 初學疑惑：為什麼要用函式？](/blog/why-use-functions-in-python)通關後，for 迴圈笑著向我招手。

我學「while 迴圈」的時候還沒卡住，可能因為 while 這個字比較好理解它的意思吧？「當發生什麼事的時候，就怎樣怎樣⋯⋯」

```python
while happy:
    eat_something()
else:
    eat_more()
```

`while` 之後接的是某個條件，每次迴圈執行的時候就會去檢查是否符合這個條件，符合的才會繼續執行迴圈的內容。

但是 for 迴圈好像就沒那麼直覺了。[Python 官方說明文件](https://docs.python.org/3/tutorial/controlflow.html#the-range-function)上有很「精美」的範例：

```python
>>> for i in range(5):
...     print(i)
...
0
1
2
3
4
```

> 蛤？看不懂啦。

這就是我當時的真實反應。這寫在官方文件上看起來的確是簡潔優美，但對初學者來說沒那麼友善。尤其是那個 `range(5)` 看起來尤其讓人煩躁⋯⋯

我遇到看不懂的例子時，會試著把看不懂的地方替換成我熟悉的東西，或設想現實生活中的情境。不然我們先換個例子：

假裝你是一位老師，上課前要點名。

```python
classroom = ['詠晴', '品妍', '宥蓁', '柏睿', '宥廷', '柏宇']

for i in classroom:
    print(i)
```

> 咦？好像突然變簡單了？

這樣短短四行完成了。不過那個 i 還是很令人在意啊⋯⋯萬一我從小就對代數有著莫名的恐懼，怎辦？（苦笑）

沒關係，換掉、都換掉。

## 範例一

```python
classroom = ['詠晴', '品妍', '宥蓁', '柏睿', '宥廷', '柏宇']

for each_student in classroom:
    print(each_student)
```

### 超譯程式碼

> 教室裡有這些學生：詠晴、品妍、宥蓁、柏睿、宥廷、柏宇。針對每一位在教室裡的學生，逐一叫出他們的名字。

把變數替換成熟悉的字後，是不是變得更容易理解了？

## 範例二

接下來回想小時候苦讀英文，死背單字的美好時光吧。假裝我們拿到一個單字表，裡面有五個單字，每個單字要唸過一遍才會有印象：

```python
wordbook = ['apple', 'ball', 'cat', 'dog', 'elephant']

for each_word in wordbook:
    print(each_word)
```

### 超譯程式碼

> 單字表裡有這些單字：apple, ball, cat, dog, elephant。針對每一個在單字表裡的單字，逐一唸出它們。

---

For 迴圈的核心重點是兩個「一」：**每一**、**逐一**。

每一個學生的名字都會叫，這個名字叫完就換下一個；每個單字都要唸，這個單字唸完再換下一個。

> Wait, wait… What? ✋ 不對欸～
> 我用 while 迴圈也能寫出同樣的功能啊，這樣不行嗎？

```python
wordbook = ['apple', 'ball', 'cat', 'dog', 'elephant']

count = 0 # 計數器
while count < len(wordbook):
    print(wordbook[count])
    count = count + 1 # 更新計數器
```

咳咳，光是行數就多兩行了 XD

其實在這個例子當中，除了用 for 迴圈寫比較簡潔之外，另一個好處是，指派「迭代變數」(iteration variable) 之後（例如前面出現的 `each_student` 和 `each_word`），Python 就會自動幫你更新這個變數了，不像上面的例子還要另外加一行 `count = count + 1` 去更新 `count` 這個變數。

---

記得〈 Python 初學疑惑：為什麼要用函示？〉文末提到的狀況嗎？

```python
# 助理先檢查論文，之後回報結果是通過/不通過
def check(paper):
    try:
        檢查錯字()
        檢查文法()
    except:
        劣退()
        return False
    return True

thesis = 學生論文
no_error = check(thesis)
if no_error:
    回信給學生()
```

萬一研究生不只一位，有很多學生交論文的時候，要怎麼用迴圈寫？

用 for 迴圈和 while 迴圈都能寫出來，不過兩種寫法會不太一樣。

假如學生交論文的時間不固定，助理等到有學生寄論文才會檢查。那我們程式大概會長這樣：

```python
def check_mail():
    if got_thesis:
        return mail
    else:
        return None

while True:
    thesis = check_mail():
    if thesis:
        no_error = check(thesis)
        if no_error:
        回信給學生()
    hold_on()
```

助理一直**等到**有人寄論文過來，**才**會啟動檢查程序，否則就繼續等待。

---

假如教授有規定學生每週二要統一寄論文，那程式大概會長這樣：

```python
theses = []

def check_mail():
    if got_thesis:
        theses.append(mail) # 把收到的 mail 加入 theses 裡

for each_thesis in theses:
    no_error = check(each_thesis)
    if no_error:
        回信給學生()
```

助理每週二固定收一次信，並把收到的論文都存進 list，再用 for 迴圈逐一處理。

---

> 那兩種迴圈差在哪裡？哪個比較好？

For 迴圈和 while 迴圈同樣都是重複執行某一段程式碼。差別在於，for 迴圈是針對一個「序列」（sequence）裡每一個項目逐一進行處理；while 迴圈則是每次迭代都會針對某種「條件」（condition）下判斷，重複執行到不符那個該條件為止。

至於用哪個比較好？其實沒有優劣之分，這兩種迴圈都只是「方法」而已。我們該問的是：「現在這種情況，適合用哪種迴圈？」

如果要永無止境的重複，直到某種情況發生／不符合某種情形時，這時候 while 迴圈就派上用場了；但若有 1,000 筆資料，每一筆都要進行固定的運算，那麼這時候可以優先考慮用 for 迴圈。
