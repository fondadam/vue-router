###ES5编码规范(Airbnb版本)

[](https://github.com/adamlu/javascript-style-guide)

###ES2015编码规范(Airbnb版本)

[](http://www.kancloud.cn/kancloud/javascript-style-guide/43119)

```javascript
条件表达式的强制类型转换遵循以下规则：

对象 被计算为 true
Undefined 被计算为 false
Null 被计算为 false
布尔值 被计算为 布尔的值
数字 如果是 +0, -0, or NaN 被计算为 false , 否则为 true
字符串 如果是空字符串 '' 则被计算为 false, 否则为 true
```

之前就被<code>[]</code>坑了，一直以为[]是返回false.

```javascript
if ([0]) {
  // true
  // An array is an object, objects evaluate to true
}

console.log([0] == true); //false
console.log(!![0]); //true
```

参见： [Truth, Equality and JavaScript](https://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/#more-2108)


