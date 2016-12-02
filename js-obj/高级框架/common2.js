/*
*	根据id,className或tag名称获取元素的通用方法
*/
function get(selector,context,results) {
	results = results || [];

	var rquickExpr = /^(?:#([\w-]+)|\.([\w-]+)|([\w]+)|(\*))$/gi,
		m = rquickExpr.exec(selector); //?:结果不被捕获
	// 如果匹配到
	if(m) {
		if(m[1]) {
			results = getId(m[1],results);
		} else if(m[2]) {
			results = getClass(m[2],context,results);
		} else {
			results = getTag(m[3] || "*",context,results);
		} 
	}
	return results;
}

function myPush(targets,elems) {
	var j = targets.length,
		i = 0;
	while((targets[j++] = elems[i++])) {}
	targets.length = j - 1;
}

//根据tag获取元素信息
function getTag(tag,context,results) {
	results = results || [];
	context = context || document;
	try {
		results.push.apply(results,context.getElementsByTagName(tag));
	} catch(e) {
		myPush(results,context.getElementsByTagName(tag));
	}
	return results;
}

//根据id获取元素信息
var getId = function(id,results) {
	results = results || [];
	results.push(document.getElementById(id));
	return results;
};
/*
 * 根据className获取元素
 */
var support = {};
support.getElementsByClassName = (function() {
	var exists = !!document.getElementsByClassName;
	if(exists && typeof document.getElementsByClassName == 'function') {
		var div = document.createElement('div'),
			divWithClass= document.createElement('div');
		divWithClass.className = 'c';

		div.appendChild(divWithClass);

		return div.getElementsByClassName('c')[0] == divWithClass;
	}
	return false;
})();

function getClass(className,context,results) {

	results = results || [];
	context = context || document;
	if(support.getElementsByClassName) {
		results.push.apply(results,context.getElementsByClassName(className));
	} else {
		each(getTag("*"),function(i,v) {
			if((' ' + v.className + ' ').indexOf(' ' + className + ' ') != -1) {
				results.push(v);
			}
		});
	}
	return results;
};

//通用的循环功能
function each(arr,fn) {
	for(var i=0; i<arr.length; i++) {
		if(fn.call(arr[i],i,arr[i]) === false) {
			break;
		}
	}
};
