"use strict";
module.exports = {
    math: (lvalue, operator, rvalue) => {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);
        return {
            "+": lvalue + rvalue,
            "-": lvalue - rvalue,
            "*": lvalue * rvalue,
            "/": lvalue / rvalue,
            "%": lvalue % rvalue
        }[operator];
    },
    prettifyDate: (timestamp) => {
        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }
        var curr_date = timestamp.getDate();
        var curr_month = timestamp.getMonth();
        curr_month++;
        var curr_year = timestamp.getFullYear();
        var curr_hour = timestamp.getHours();
        var curr_minutes = timestamp.getMinutes();
        var curr_seconds = timestamp.getSeconds();
        var result = addZero(curr_date) + "/" + addZero(curr_month) + "/" + addZero(curr_year) + '   ' + addZero(curr_hour) + ':' + addZero(curr_minutes) + ':' + addZero(curr_seconds);
        return result;
    }
};
