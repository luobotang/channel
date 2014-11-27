channel
=======

基于 jQuery 的消息传递组件，以观察者模式提供前端页面模块、组件间的消息传递服务。

实现方式受 [javascript-patterns/jquery-patterns/pubsub-callback](https://github.com/shichuan/javascript-patterns/blob/master/jquery-patterns/pubsub-callback.html) 的启发，设计参考 [Postal.js](https://github.com/postaljs/postal.js)。

依赖：jQuery。

示例
====

```javascript
var ch = channel('message');

ch.subscribe('add', function (msg) {
	console.log('New message arrived: ' + msg);
});
ch.subscribe('delete', function () {
	console.log('A message was deleted.');
});
ch.subscribe('add', function () {
	num++;
	ch.publish('num.change', num);
});
ch.subscribe('delete', function () {
	num--;
	ch.publish('num.change', num);
});
ch.subscribe('num.change', function (num) {
	console.log('message number changed to: ' + num);
});

// publish some message or delete some
ch.publish('add', 'I am a simple message, but please do not forget me!');
ch.publish('add', 'Hi, I am luobo!');
ch.publish('delete');
ch.publish('delete');
```

使用说明
========

本意是想在工作中使用 Postal.js，但稍微犹豫了下，觉得自己实现个更简单的就够用了，不需要那么多特性。另外工作中 jQuery 是在几乎任何页面都使用的，就依赖 jQuery 的基础设施搭建了。希望能够刚好满足工作的实际需求吧，试试看！

背景
====

页面模块、组件间的消息传递。
