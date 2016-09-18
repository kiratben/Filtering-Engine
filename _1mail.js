
var _messages;
var _rules;
var _res = new Object();

function filter(m,r) {

	_messages = m;

	_rules = rxArray(r);

	Object.keys(m).forEach(messageForFunc);

	return _res;
}

function rxArray(r) {

	var Rules = new Array();

	r.forEach(function(e, i, arr) {

  		var from = e.from ?  new RegExp(e.from.split("*").join(".*").split("?").join(".")) : new RegExp(".*");

		var to = e.to ? new RegExp(e.to.split("*").join(".*").split("?").join(".")) : new RegExp(".*");
		
		Rules.push({"from":from,"to":to,"action":e.action});

	});

	return Rules;
}


function MessageRule(r,messageObj,rArray) {

	if (RuleRegEx(messageObj.from,r.from) && RuleRegEx(messageObj.to,r.to)){

			rArray.push(r.action);
	}
}

function RuleRegEx(str,regExp) {
	
	return str.search(regExp) == 0;
}

function messageForFunc(k) {

	var messageObj = _messages[k];

	var from = messageObj.from;

	var to = messageObj.to;
	
	var rArray = new Array();

	for (var i=0; i < _rules.length; i++) {

		MessageRule(_rules[i],messageObj,rArray);
	}

	_res[k] = rArray;

}

exports.filter = filter;
