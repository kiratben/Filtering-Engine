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

};