
function rxArray(r) {

	var Rules = new Array();

	r.forEach(function(e, i, arr) {

  		var from = e.from ?  new RegExp(e.from.split("*").join(".*").split("?").join(".")) : new RegExp(".*");

		var to = e.to ? new RegExp(e.to.split("*").join(".*").split("?").join(".")) : new RegExp(".*");
		
		Rules.push({"from":from,"to":to,"action":e.action});

	});

	return Rules;
}