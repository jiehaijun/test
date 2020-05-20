var email;
var blogList;
var filteredList;

$(document).ready(function() {
    function getAllBlogs() {
        $.ajax({
            url: "viewBlog.php?action=fetchAll",
            type: "GET",
            dataType: "json",
            success: function(resp) {
                blogList = resp;
                buildList();

            }
        });
    }

    $("#user").text(email);

    $("#add_post").on('click', function() {
        location.href = "addPost.html";
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

    $("select").change(function() {
        buildList();
    })

    function buildList() {
        var select_month = $('#month').val();
        filteredList = [];
        if (select_month == "-1") {
            filteredList = blogList;
        } else {
            blogList.forEach(function(e) {
                var blogDate = e.date;
                blogDate = blogDate.replace(/-/g, "/");
                var date = new Date(blogDate);
                if (date.getMonth() == select_month) {
                    filteredList.push(e);
                }
            })
        }
        $("#blog_list").empty();
        filteredList.forEach(function(it) {
            $("#blog_list").append("<div class='time'>" + it.date + "</div><div class='title'>" + it.title + "</div><div class='content'>" + it.content + "</div><div class='gap'></div>");
        });
    }

    getAllBlogs();
})


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