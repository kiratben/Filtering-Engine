exports.filter = function (messages, rules) {

    function fFunc(s, r) {

        if (r == undefined || r == '*' || s == r) return true;

         var j;

        for (var i = 0; i < r.length; i++) {

            if (r[i] == "*") {

                j = i + 1;

                var mx = r.length > s.length ? r.length : s.length;

                for (var k = i; k < mx; k++) {

                    if (fFunc(s.substr(k, r.length - 1), r.substr(j, s.length - 1))) {

                        return true;
                    }
                }
                return false;
            }

            if (r[i] == "?") {
                continue;
            }
            if (r[i] != s[i]) {
                return false;
            }
        }
        return true; 
    }

   var g = {};

    for (var m in messages) {

        g[m] = [];

        var msg = messages[m];

        for (var l = 0; l < rules.length; l++) {

            var rul = rules[l];

            if (fFunc(msg.from, rul.from) && fFunc(msg.to, rul.to)) {

                g[m].push(rul.action);
            }
        }
    }

    return g;
};
