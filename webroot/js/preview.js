var email;
var title;
var content;
var time;

$(document).ready(function() {

    $("#submit").on('click', function() {

        var title = $(".title").val();
        var content = $(".content").val();

        var d = {
            "title": title,
            "content": content,
            "date": time
        }

        var s = JSON.stringify(d);
        $.ajax({
            type: 'POST',
            url: "addPost.php?action=addPost",
            data: "{\"s\":" + s + "}",
            dataType: 'text',
            success: function(resp) {
                if (resp == "YES") {
                    location.href = "viewBlog.html?email=" + email;
                } else {
                    alert(resp.desc);
                }
            },
            error: function() {
                onsole.error("There was a connection error of some sort");
            },
            fail: function() {
                console.error("We reached our target server, but it returned an error");
            }
        });
    })

    $("#user").text(email);

    $("#cancel").on('click', function() {
        location.href = "addPost.html?email=" + email;
    })

    $("#logout").on('click', function() {
        var d = {
            "email": email
        }

        var s = JSON.stringify(d);
        $.ajax({
            type: 'POST',
            url: "logout.php?action=logout",
            data: "{\"s\":" + s + "}",
            dataType: 'text',
            success: function(resp) {
                if (resp == "YES") {
                    location.href = "login.html";
                } else {
                    alert(resp.desc);
                }
            },
            error: function() {
                onsole.error("There was a connection error of some sort");
            },
            fail: function() {
                console.error("We reached our target server, but it returned an error");
            }
        });
    })

    email = UrlParm.parm("email");
    time = UrlParm.parm("time");
    title = UrlParm.parm("title");
    content = UrlParm.parm("content");

    $(".title").text(title);
    $(".content").text(content);
    $(".time").text(time);
});

window.onload = function() {}

UrlParm = function() {
    var data, index;
    (function init() {
        data = [];
        index = {};
        var u = window.location.search.substr(1);
        if (u != '') {
            var parms = decodeURIComponent(u).replace(/&amp;/g, "&").split('&');
            for (var i = 0, len = parms.length; i < len; i++) {
                if (parms[i] != '') {
                    var p = parms[i].split("=");
                    if (p.length == 1 || (p.length == 2 && p[1] == '')) { // p | p=
                        data.push(['']);
                        index[p[0]] = data.length - 1;
                    } else if (typeof(p[0]) == 'undefined' || p[0] == '') { // =c | =
                        data[0] = [p[1]];
                    } else if (typeof(index[p[0]]) == 'undefined') { // c=aaa
                        data.push([p[1]]);
                        index[p[0]] = data.length - 1;
                    } else { // c=aaa
                        data[index[p[0]]].push(p[1]);
                    }
                }
            }
        }
    })();
    return {
        parm: function(o) {
            try {
                return (typeof(o) == 'number' ? data[o][0] : data[index[o]][0]);
            } catch (e) {}
        },
        parmValues: function(o) {
            try {
                return (typeof(o) == 'number' ? data[o] : data[index[o]]);
            } catch (e) {}
        },
        hasParm: function(parmName) {
            return typeof(parmName) == 'string' ? typeof(index[parmName]) != 'undefined' : false;
        },
        parmMap: function() {
            var map = {};
            try {
                for (var p in index) {
                    map[p] = data[index[p]];
                }
            } catch (e) {}
            return map;
        }
    }
}();