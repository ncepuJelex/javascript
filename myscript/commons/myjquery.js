// �鼶������
			// ����������ʱ�򣬴����ִ���ˣ�
			// alert('haha');

			// �ڲ�����ı������ⲿ�޷����ʣ����˲���var���εı���

		

(function(window,undefined) {

			// $����õĶ��󣬷��ظ�����,���ͳ��򿪷�һ��ʹ��'_'��Ϊ˽�ж���
			function _$(arguments) {

				this.dom ;
				var idSelector = /#\w+/;
				if(idSelector.test(arguments[0])) {
					this.dom = document.getElementById(arguments[0].substring(1));
				}else {
					throw new Error('������������Ŷ��');
				}
			}

			// ��Function������չһ������ʵ����ʽ��̵ķ���
			Function.prototype.method = function(methodName,fn) {
				this.prototype[methodName] = fn;
				return this;
			};

			// ��_$��ԭ�Ͷ����ϼ���һЩ����
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

			// window����ע��һ��ȫ�ֱ���,����������ϵ
			window.$ = _$;

			// дһ��׼���ķ���
			_$.onReady = function(fn) {
				// ʵ����������������ע�ᵽwindow��
				window.$ = function() {
					return new _$(arguments);
				}
				//ִ�д������Ĵ���
				fn();
				// ʵ����ʽ���
				$.method('addEvent',function(){

				}).method('setStyle',function() {

				});
			}

		})(window);//�������ڣ���window������������