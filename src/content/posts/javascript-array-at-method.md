---
title: '透過 Array.at 存取陣列裡的值'
publishedAt: '2023-09-06T13:49:56.239Z'
slug: 'javascript-array-at-method'
tags:
  - 'JavaScript'
summary: '一講到透過 index 存取 JavaScript 陣列裡的值，應該不少人第一個念頭是用 bracket notation（中括號）吧？今天要介紹另一個方法：Array.at。雖然它用起來跟 bracket notation 非常像，但它有兩個額外的優勢。'
---

# 透過 Array.at 存取陣列裡的值

一講到透過 index 存取 JavaScript 陣列裡的值，應該不少人第一個念頭是用 bracket notation（中括號）吧？今天要介紹另一個方法：[`Array.at`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at)。

它用起來跟 bracket notation 非常像：

```javascript
const fruits = ['apple', 'banana', 'cherry'];

const firstFruit = fruits.at(0); // 'apple'
const secondFruit = fruits.at(1); // 'banana'
const thirdFruit = fruits.at(2); // 'cherry'
```

不過，`Array.at` 有兩個額外的優勢：

1. 能夠從陣列尾端倒數
2. 型別更安全

## 從陣列尾端倒數

`Array.at` 可以倒數。傳入負整數時，它會從陣列尾端數回來。

由於 bracket notation 不支援負數，以往要存取陣列裡最後一個值的話，我們只能用「陣列長度減一」的方式彆扭地處理：

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const lastNumber = numbers[numbers.length - 1]; // 9
```

改用 `Array.at` 的話就沒有這煩惱囉！

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const lastNumber = numbers.at(-1); // 9
```

## 更安全的型別

在 TypeScript 透過 bracket notation 存取值時，如果沒有開啟 [noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess) 設定，在寫 code 時有可能會誤以為一定有值。

```typescript
const numbers = [1000, 2000, 3000, 4000];
const firstNumber = numbers[0];
const sixthNumber = numbers[5];

console.log(firstNumber.toLocaleString());
// ✅ '1,000'

console.log(sixthNumber.toLocaleString());
// ❌ Cannot read properties of undefined (reading 'toLocaleString')
```

`Array.at` 的回傳值型別是 `Type | undefined`，誤用時 TypeScript 會警告。

```typescript
const numbers = [1000, 2000, 3000, 4000];
const firstNumber = numbers.at(0);
const sixthNumber = numbers.at(5);

console.log(firstNumber.toLocaleString());
// ⚠️       ^^^^^^^^^^^ 'firstNumber' is possibly 'undefined'

console.log(sixthNumber.toLocaleString());
// ⚠️       ^^^^^^^^^^^ 'sixthNumber' is possibly 'undefined'
```

## 語法支援度

本文撰寫當下，[Can I use](https://caniuse.com/mdn-javascript_builtins_array_at) 的資料顯示 `Array.at` 支援度為 89.47%，主流瀏覽器都已支援。

## 參考資料

- [Array.prototype.at() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at)
