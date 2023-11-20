---
title: '怎麼解構巢狀 JavaScript 物件？'
publishedAt: '2019-03-03T04:00:00.000Z'
slug: 'destructuring-nested-objects-in-javascript'
tags:
  - 'JavaScript'
summary: '解構賦值（destructuring assignment）是滿常用到的 ES6 語法，不過最近發現自己遇到巢狀的物件時，還是常常忘記怎麼寫。來記錄一下。'
---

# 怎麼解構巢狀 JavaScript 物件？

解構賦值（destructuring assignment）是滿常用到的 ES6 語法，不過最近發現自己遇到巢狀的物件時，還是常常忘記怎麼寫。來記錄一下。

---

假如有一個物件長這樣：

```javascript
const person = {
  realIdentity: 'secret agent',
  firstName: 'James',
  lastName: 'Bond',
};
```

目標是分別用 `console.log()` 秀出這樣的內容：

<!-- prettier-ignore-start -->
```javascript
'secret agent'
'James'
'Bond'
```
<!-- prettier-ignore-end -->

怎麼做呢？大概有幾種方法：

---

## 直接硬幹一波

```javascript
console.log(person.realIdentity); // 'secret agent'
console.log(person.firstName); // 'James'
console.log(person.lastName); // 'Bond'
```

雖然這樣寫幾乎不用動腦，不過缺點滿明顯的，第一個是變數名稱落落長，要存取物件的 properties，前面一定要加那個物件的名稱（例如 `person.firstName`），造成 text editor 版面迅速橫向發展。

另外一個缺點是變數名稱不能自己訂，一定得照原本物件的寫法。例如 `person.realIdentity` 我就不能叫他 `person.identity`。遇到奇怪的 property name 會很煩躁

## 另外創造變數

```javascript
const identity = person.realIdentity;
const firstName = person.firstName;
const lastName = person.lastName;

console.log(identity); // 'secret agent'
console.log(firstName); // 'James'
console.log(lastName); // 'Bond'
```

變數命名問題解決了，不過行數也跟著倍增了，而且一直重複打 `person.` 這個東西好麻煩啊。

## 解構解起來

```javascript
const { realIdentity, firstName, lastName } = person;

console.log(realIdentity); // 'secret agent'
console.log(firstName); // 'James'
console.log(lastName); // 'Bond'
```

---

如果物件比較複雜、超過一層呢？例如：

```javascript
const person = {
  name: {
    first: 'James',
    last: 'Bond',
  },
};
```

---

### 解構再度解構

```javascript
const {
  name: { first, last },
} = person;

console.log(first); // 'James'
console.log(last); // 'Bond'
```

### 解構再解構 + 重新命名

```javascript
const {
  name: { first: firstName, last: lastName },
} = person;

console.log(firstName); // 'James'
console.log(lastName); // 'Bond'
```

---

## 參考資料

- [Destructuring assignment - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
