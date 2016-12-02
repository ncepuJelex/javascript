// 块级作用域
			// 程序启动的时候，代码就执行了！
			// alert('haha');

			// 内部定义的变量，外部无法访问，除了不加var修饰的变量

		

(function(window,undefined) {

			// $：最常用的对象，返回给外面,大型程序开发一般使用'_'作为私有对象
			function _$(arguments) {

				this.dom ;
				var idSelector = /#\w+/;
				if(idSelector.test(arguments[0])) {
					this.dom = document.getElementById(arguments[0].substring(1));
				}else {
					throw new Error('参数传入有误哦！');
				}
			}

			// 在Function类上扩展一个可以实现链式编程的方法
			Function.prototype.method = function(methodName,fn) {
				this.prototype[methodName] = fn;
				return this;
			};

			// 在_$的原型对象上加入一些方法
			_$.prototype = {
				constructor : _$,
				addEvent : function(type,fn) {
					// alert('addEvent');
					if(window.addEventListener) {
						this.dom.addEventListener(type,fn);
					} else if(window.attachEvent) {
						this.dom.attachEvent('on'+type,fn);
					}
					return this;
				},
				setStyle : function(prop,value) {
					// alert('setStyle');
					this.dom.style[prop] = value;
					return this;
				}
			};

			// window上先注册一个全局变量,与外界产生联系
			window.$ = _$;

			// 写一个准备的方法
			_$.onReady = function(fn) {
				// 实例化出来，真正地注册到window上
				window.$ = function() {
					return new _$(arguments);
				}
				//执行传进来的代码
				fn();
				// 实现链式编程
				$.method('addEvent',function(){

				}).method('setStyle',function() {

				});
			}

		})(window);//程序的入口，把window传入作用域中