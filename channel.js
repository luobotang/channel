/*
 * 消息组件，基于观察者模式
 * 用于在不同的页面模块、组件间进行消息传递。
 * 模仿 Postal.js（https://github.com/postaljs/postal.js）模式，提供“channel”对消息进行划分，channel 下划分 topic。
 * 底层回调函数基于 jQuery 的 Callbacks。
 * version: 0.1
 * author: tangkangxing
 * @https://github.com/luobotang/channel
 */
// require jQuery
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else {
		window.channel = factory(window.jQuery);
	}
})(function ($) {
	// 缓存所有命名“频道”
	var __channels = {};

	function getChannel(name) {
		var c = __channels[name];
		if (!c) {
			c = __channels[name] = new Channel();
		}
		return c;
	}

	// 频道构造函数（“类”）
	function Channel(name) {
		this.__topics = {};
	}

	// 辅助方法：获取一个 topic（jQuery Callbacks 对象）
	Channel.prototype.__getTopic = function (topic) {
		var callbacks = this.__topics[topic];
		if (!callbacks) {
			callbacks = this.__topics[topic] = $.Callbacks();
		}
		return callbacks;
	};

	// http://api.jquery.com/callbacks.fire/
	// callbacks.fire() 支持传入多个参数，这里就限制为只能传递一个任意类型的数据对象
	Channel.prototype.publish = function (topic, data) {
		this.__getTopic(topic).fire(data);
		return this;
	};
	Channel.prototype.subscribe = function (topic, callback) {
		this.__getTopic(topic).add(callback);
		return this;
	};
	Channel.prototype.unsubscribe = function (topic, callback) {
		this.__getTopic(topic).remove(callback);
		return this;
	};

	return getChannel;
});
