---
title: 'Python 初學疑惑：為什麼要用函式？'
publishedAt: '2018-06-11T04:00:00.000Z'
slug: 'why-use-functions-in-python'
tags:
  - 'Python'
summary: '書上寫說，函式能讓程式碼比較不雜亂，之後要修改也比較方便。不過我當時覺得這說法好抽象，完全無法體會。如果你也有類似疑惑的話，沒關係，我們來看看這個例子'
image:
  src: 'src/assets/images/why-use-functions-in-python/featured-image.webp'
---

# Python 初學疑惑：為什麼要用函式？

之所以寫這篇文章，一方面是想重新整理自己目前所學的東西，另一方面也希望能夠幫助剛開始學習 Python 3 的朋友們。

如果你跟我一樣，不是唸本科系、沒有寫程式的經驗，也剛好在這裡卡住的話，別擔心，你並不孤單。試著多爬文，看看不同的解釋，說不定會突然茅塞頓開喔！

---

我第一個卡關的地方是「函式」（function）。

```python
def routine():
    print('吃飯')
    print('上課')
    print('休息')
```

上面這個程式列出了我大學同學某日上午的行程。（先承認我就是我同學好了⋯⋯）

撇開大學生會不會去上課這件事不談，我第一次看到「自訂函式」的概念時，內心的 OS 是：「為什麼搞這麼麻煩啊？還要先定義再呼叫它。這樣不是多此一舉嗎？直接用三行 `print()` 不就解決了？行數還更少耶！」

書上寫說，使用函式能讓程式碼比較不雜亂，之後要修改比較方便。不過我當時覺得這說法好抽象，完全無法體會。如果你也有類似疑惑的話，沒關係，我們來看看底下這個例子。我們把時間拉長，列出大學生一整天的行程：

```python
print('吃飯')
print('上課')
print('休息')
print('吃飯')
print('上課')
print('休息')
print('吃飯')
print('寫作業')
print('睡覺')
```

好像還行，不過有種密集恐懼症快發作的感覺⋯⋯如果我們改用自訂函式寫呢？先定義每日行程：

```python
def routine():
    print('吃飯')
    print('上課')
    print('休息')
    print('吃飯')
    print('上課')
    print('休息')
    print('吃飯')
    print('寫作業')
    print('睡覺')
```

之後如果要描述當天行程，我們只需呼叫函式：

```python
routine()
```

搞定。

---

要做的事變多時，我們可以把固定會一起出現的程式碼用函式綁在一起。如此一來，程式碼會變得**比較好讀**，我們也能省下一直複製貼上的時間，免得貼一貼貼錯就尷尬惹。

而生活中其實也有一個例子很能跟自訂函式呼應喔！那就是「歌詞」。以〈追光者〉這首歌為例，它的歌詞如下：

> 如果說你是海上的煙火
> 我是浪花的泡沫
> 某一刻你的光照亮了我
>
> 如果說你是遙遠的星河
> 耀眼得讓人想哭
> 我是追逐著你的眼眸
> 總在孤單時候眺望夜空
>
> 我可以跟在你身後
> 像影子追著光夢遊
> 我可以等在這路口
> 不管你會不會經過
>
> 每當我為你抬起頭
> 連眼淚都覺得自由
> 有的愛像陽光傾落
> 邊擁有邊失去著
>
> 如果說你是夏夜的螢火
> 孩子們為你唱歌
> 那麼我是想要畫你的手
>
> 你看我多麼渺小一個我
> 因為你有夢可做
> 也許你不會為我停留
> 那就讓我站在你的背後
>
> 我可以跟在你身後
> 像影子追著光夢遊
> 我可以等在這路口
> 不管你會不會經過
>
> 每當我為你抬起頭
> 連眼淚都覺得自由
> 有的愛像大雨滂沱
> 卻依然相信彩虹
>
> 我可以跟在你身後
> 像影子追著光夢遊
> 我可以等在這路口
> 不管你會不會經過
>
> 每當我為你抬起頭
> 連眼淚都覺得自由
> 有的愛像大雨滂沱
> 卻依然相信彩虹

假如今天我們要寫一個小程式顯示歌詞，一種方式是把上面每一行歌詞都加上 `print()`。雖然能達成目的，但如果仔細觀察，我們會發現歌詞有地方是類似、重複的。這時候我們可以改用自訂函式喔！

以流行歌的結構來看，常見的要素有：前奏、主歌、副歌、橋段、尾奏。〈追光者〉這首歌有歌詞的部分，大略可以看成只出現在主歌跟副歌，不過主、副歌都各自有 part A & B。

如果要自訂函式的話，一種方法是把 A 部分和 B 部分寫成不同函式，例如 `verse_a()`、`verse_b()`。由於這首歌除了主歌之外，連副歌都有 A、B 兩部分，所以我們也可以改用另一種方式：不把 A、B 兩部分拆成不同函式，而是在函式裡**加入參數和條件式**，讓函式根據參數判別應該呈現哪一部份的歌詞。這邊我用後者的方式去寫，先定義函式：

```python
# 主歌歌詞（分 A、B 兩部分）
def verse(part):
    if part == 'A':
        print('如果說你是海上的煙火')
        print('我是浪花的泡沫')
        print('某一刻你的光照​​亮了我')
        print('如果說你是遙遠的星河')
        print('耀眼得讓人想哭')
        print('我是追逐著你的眼眸')
        print('總在孤單時候眺望夜空')
    elif part == 'B':
        print('如果說你是夏夜的螢火')
        print('孩子們為你唱歌')
        print('那麼我是想要畫你的手')
        print('你看我多麼渺小一個我')
        print('因為你有夢可做')
        print('也許你不會為我停留')
        print('那就讓我站在你的背後')
    print() # 空一行分段

# 副歌歌詞（分 A、B 兩部分）
def chorus(part):
    print('我可以跟在你身後')
    print('像影子追著光夢遊')
    print('我可以等在這路口')
    print('不管你會不會經過')
    print('每當我為你抬起頭')
    print('連眼淚都覺得自由')
    if part == 'A':
        print('有的愛像陽光傾落')
        print('邊擁有邊失去著')
    elif part == 'B':
        print('有的愛像大雨滂沱')
        print('卻依然相信彩虹')
    print() # 空一行分段
```

定義完函式後，程式的主體就被我們簡化成這樣：

```python
verse('A')
chorus('A')
verse('B')
chorus('B')
chorus('B')
```

五行解決，hen 棒。

---

我在當研究助理的時候，發現教授大概每隔幾個禮拜就會抱怨，說研究生交論文給他的時候，都沒有先仔細檢查。有時候是錯字，有時候是文法⋯⋯他常常要額外花時間幫他們修正，加上他又不只一個指導學生，搞得心力交瘁。

如果你是教授，可能每隔一個禮拜就要經歷以下狀況（為簡化情況，許多內容以中文呈現）：

```python
# 學生 A 寄論文來了
no_error = False
thesis = 學生A論文
try:
    檢查錯字()
    檢查文法()
    no_error = True
except:
    劣退()
if no_error is True:
    回信給學生()

# 學生 B 寄論文來了
no_error = False
thesis = 學生B論文
try:
    檢查錯字()
    檢查文法()
except:
    劣退()
if no_error is True:
    回信給學生()

# 學生 C 寄論文來了
no_error = False
thesis = 學生C論文
try:
    檢查錯字()
    檢查文法()
except:
    劣退()
    pass = False
if no_error is True:
    回信給學生()
```

假如收到論文之後，能先有人幫忙檢查，那該有多好？我們不妨就試著把函式想成是一個虛擬助理，讓他幫我們處理這些瑣碎的例行公事。怎麼做呢？先定義函式：

```python
# 助理先檢查論文，之後回報結果是通過／不通過
def check(paper):
    try:
        檢查錯字()
        檢查文法()
    except:
        劣退()
        return False
    return True
```

等到收到學生論文的時候再呼叫函式：

```python
# 學生 A 寄論文來了
thesis = 學生A論文
no_error = check(thesis) # 助理檢查完的結果存到變數裡
if no_error is True:
    回信給學生()

# 學生 B 寄論文來了
thesis = 學生B論文
no_error = check(thesis)
if no_error is True:
    回信給學生()

# 學生 C 寄論文來了
thesis = 學生C論文
no_error = check(thesis)
if no_error is True:
    回信給學生()
```

我們一開始先交代助理要檢查論文，之後只要問助理有沒有檢查通過的論文要看。看完後，再回信給學生。這樣教授不用發脾氣，學生也不會被唸。恭喜老爺！賀喜夫人！

自從有了助理之後，教授再也不用親自檢查研究生寄出的「原始版論文」；研究生寄信的時候也不用膽戰心驚，因為論文寄出後會先由助理把關，若有錯也能及時攔截。換句話說，函式大幅簡化了教授的工作流程。他原本要一個項目一個項目檢查，判斷有沒有錯，再決定要不要回信，現在只要問助理：「有沒有我要看的論文？」就可以了。

---

過了兩個月後，教授覺得研究生最近容易出現的錯誤是：標點符號和參考文獻的格式，他想要增加這兩個檢查項目。

如果我們沒有用函式寫的話，我們要先逐行瀏覽之前的程式碼，找到要更動的地方後，再一個一個修正：

```python
# 學生 A 寄論文來了
no_error = False
thesis = 學生A論文
try:
    檢查錯字()
    檢查文法()
    檢查標點符號()    # 新增這行
    檢查文獻格式()    # 新增這行
    no_error = True
except:
    劣退()
if no_error is True:
    回信給學生()

# 學生 B 寄論文來了
no_error = False
thesis = 學生B論文
try:
    檢查錯字()
    檢查文法()
    檢查標點符號()    # 新增這行
    檢查文獻格式()    # 新增這行
except:
    劣退()
if no_error is True:
    回信給學生()

# 學生 C 寄論文來了
no_error = False
thesis = 學生C論文
try:
    檢查錯字()
    檢查文法()
    檢查標點符號()    # 新增這行
    檢查文獻格式()    # 新增這行
except:
    劣退()
    pass = False
if no_error is True:
    回信給學生()
```

每次只要些微更改，這些步驟就得重來一遍。但如果當初我們是用自訂函式寫的話，我們就只要修改「函式」本身，也就是跟助理交代新的檢查項目：

```python
# 助理先檢查論文，之後回報結果是通過／不通過
def check(paper):
    try:
        檢查錯字()
        檢查文法()
        檢查標點符號()    # 新增這行
        檢查文獻格式()    # 新增這行
    except:
        劣退()
        return False
    return True
```

收到論文後的流程依然沒有差別：

```python
# 學生 A 寄論文來了
thesis = 學生A論文
no_error = check(thesis) # 助理檢查完的結果存到變數裡
if no_error is True:
    回信給學生()

# 學生 B 寄論文來了
thesis = 學生B論文
no_error = check(thesis)
if no_error is True:
    回信給學生()

# 學生 C 寄論文來了
thesis = 學生C論文
no_error = check(thesis)
if no_error is True:
    回信給學生()
```

這樣處理，不僅省下逐行瀏覽的時間，還能減少筆誤改錯的機會。這也是使用函式另一個更重要的優點：程式碼**容易維護**。

簡而言之，函式在做的事情，就是把冗長的程式拆成一個一個「零件」。我們造好零件、確定可以使用後，就暫時不需要管它們。等遇到狀況再回去檢查零件就行。

用教授的例子來說，隨著計畫愈做愈大，要做的事就愈多。一個人處理不來時就會需要聘用助理。助理們分工合作，教授只要定期詢問助理的狀況，其他時間都能專注在構思研究的走向。若計畫方向更動，也只要重新跟助理交代新的工作即可。

---

> 哦哦我好像懂了什麼！話說自訂函式的寫法雖然比較簡潔，但只要遇到不同的學生寄論文來，就要再重複寫這幾行：

```python
# 學生寄論文來了
thesis = 學生論文
no_error = check(thesis)
if no_error is True:
    回信給學生()
```

> 如果有十個學生，我不就要重複十次？

好問題！遇到要一直重複做某件事的時候，「迴圈」（loop）就派上用場了。不過那應該在下一篇文章才會提到。

我[第二個卡關的地方](/blog/how-to-use-for-loops-in-python)，就是「for 迴圈」。
