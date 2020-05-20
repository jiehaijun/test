$(document).ready(function() {
    // var validate1, validate2 = false;

    // $(".enter-btn").on('click', function() {
    //     if (!validate1 || !validate2) {
    //         alert("Please check the format!");
    //         return;
    //     }

    //     var email = $("#email").val();
    //     var password = $("#password").val();

    //     var d = {
    //         "email": email,
    //         "password": password
    //     }

    //     var s = JSON.stringify(d);
    //     $.ajax({
    //         type: 'POST',
    //         url: "login.php?action=login",
    //         data: "{\"s\":" + s + "}",
    //         dataType: 'text',
    //         success: function(resp) {
    //             if (resp == "YES") {
    //                 location.href = "addPost.html?email=" + email;
    //             } else {
    //                 alert("Your email or password is wrong.")
    //             }
    //         },
    //         error: function() {
    //             onsole.error("There was a connection error of some sort");
    //         },
    //         fail: function() {
    //             console.error("We reached our target server, but it returned an error");
    //         }
    //     });
    // })

    // $("#password").blur(
    //     function() {
    //         var name = $("#password").val();
    //         if (name != "") {
    //             validate2 = true;
    //             $("#password").css({
    //                 'border': '2px solid green'
    //             });
    //         } else {
    //             validate2 = false;
    //             $("#password").css({
    //                 'border': '1px solid red'
    //             });
    //         }
    //     }
    // )

    // $("#email").blur(
    //     function() {
    //         var email = $("#email").val();
    //         var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    //         if (reg.test(email)) {
    //             validate1 = true;
    //             $("#email").css({
    //                 'border': '2px solid green'
    //             });
    //         } else {
    //             validate1 = false;
    //             $("#email").css({
    //                 'border': '1px solid red'
    //             });
    //         }
    //     }
    // )

})