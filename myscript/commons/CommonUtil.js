var Jel = {};
/*
	接口声明：
		param1: 接口名称;
		param2 : 实现方法(数组形式)
*/
Jel.Interface = function(name, methods) {

	if(arguments.length !== 2) {
		throw new Error('参数长度必须为2！');
	}
	this.name = name;
	this.methods = [];
	for(var i=0, len=methods.length; i<len; i++) {
		if(typeof methods[i] !== 'string') {
			throw new Error('参数类型必须是string');
		}
		this.methods.push(methods[i]);
	}
};

// 用于校验是否实现了某个接口
Jel.Interface.ensureImplemented = function(object) {

	if(arguments.length < 2) {
		throw new Error('参数个数不能小于2！');
	}

	for(var i=1, len = arguments.length; i<len; i++) {
		var instanceInterface = arguments[i];

		if(instanceInterface.constructor !== Jel.Interface) {
			throw new Error('必须为接口类型参数');
		}
		for(var j=0; j<instanceInterface.methods.length; j++) {
			var methodName = instanceInterface.methods[j];
			if(!object[methodName] || typeof object[methodName] !== 'function') {
				throw new Error('方法\'' + methodName + '\' 没找到！')
			}
		}
		
	}
};

// 继承方法
Jel.extend = function(sub,sup) {
	var F = new Function();
	F.prototype = sup.prototype;
	sub.prototype = new F();
	sub.prototype.constructor = sub;
	sub.superClass = sup.prototype;
	if(sup.prototype.constructor == Object.prototype.constructor) {
		sup.prototype.constructor = sup;
	}
}

//通用的获取对象类型的方法
// 传入constructor
Jel.getFnName = function(fn) {
	
	return typeof fn !== 'function' ? undefined:
		fn.name || /function (.+?)\(/.exec(fn+'')[1];
}

/**
单体模式：
	实现一个跨浏览器的事件处理程序
*/
Jel.EventUtil = {
	addHandler : function(elem, type, handler) {
		// firefox chrome...w3c
		if(elem.addEventListener) {
			// false :表示 冒泡 
			elem.addEventListener(type,handler,false);
		} else if(element.attachEvent) {
			elem.attachEvent('on'+type, handler);
		}
	},
	removeHandler : function(elem, type, handler) {
		// firefox chrome...w3c
		if(element.addEventListener) {
			// false :表示 冒泡 
			elem.removeEventListener(type,handler,false);
		} else if(element.attachEvent) {
			elem.detachEvent('on'+type, handler);
		}
	}
}

Array.prototype.each = function(fn) {

	try {
		//遍历过程中的计数器，这种写法防止变量冲突
		this.i || (this.i = 0);
		//当该数组长度大于0，并且传入的参数是函数时
		if(this.length > 0 && fn.constructor==Function) {
			// 没有遍历到结尾
			while(this.i<this.length) {
				// 获取当前元素
				var ele = this[this.i];
				// 如果不为空之类的，并且它是数组类型，那就
				// 递归吧，接着操作
				if(ele && ele.constructor == Array) {
					ele.each(fn);
				}
				else {
					/*
					调用fn，其实第一个参数是没用的，传null都行，重点是第2个参数了
					*/
					fn.call(ele,ele);
				}
				this.i++;//计数器递增
			}
			this.i = null;//释放资源
		}

	} catch(ex) {
		//do sth
	}
	return this;
}