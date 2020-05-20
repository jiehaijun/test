var email;
$(document).ready(function() {
    var validate1, validate2 = false;

    $("#title_text").blur(
        function() {
            var name = $("#title_text").val();
            if (name != "") {
                validate1 = true;
                $("#title_text").css({
                    'border': '2px solid green'
                });
            } else {
                validate1 = false;
                $("#title_text").css({
                    'border': '1px solid red'
                });
            }
        }
    )

    $("#content_text").blur(
        function() {
            var name = $("#content_text").val();
            if (name != "") {
                validate2 = true;
                $("#content_text").css({
                    'border': '2px solid green'
                });
            } else {
                validate2 = false;
                $("#content_text").css({
                    'border': '1px solid red'
                });
            }
        }
    )

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

    $("#user").text(email);

    $("#reset").on('click', function() {
        var msg = "Are you sure to clear?";
        if (confirm(msg) == true) {
            $("#title_text").val('');
            $("#content_text").val('');
        } else {

        }
    })

    $("#preview_btn").on('click', function() {
        var title = $("#title_text").val();
        var content = $("#content_text").val();
        var date = new Date();
        var dateTime = dateFormat("YYYY-mm-dd HH:MM:SS", date);
        location.href = "preview.html?email=" + email + "&title=" + title + "&time=" + dateTime + "&content=" + content;
    })

    $("#submit").on('click', function() {
        if (!validate1 || !validate2) {
            alert("Please check the format!");
            return;
        }

        var title = $("#title_text").val();
        var content = $("#content_text").val();
        var date = new Date();
        var dateTime = dateFormat("YYYY-mm-dd HH:MM:SS", date);

        var d = {
            "title": title,
            "content": content,
            "date": dateTime
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
})

function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),
        "m+": (date.getMonth() + 1).toString(),
        "d+": date.getDate().toString(),
        "H+": date.getHours().toString(),
        "M+": date.getMinutes().toString(),
        "S+": date.getSeconds().toString()
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

window.onload = function() {
    email = UrlParm.parm("email");
}

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