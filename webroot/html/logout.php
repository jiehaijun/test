<?php 
    function logout() {
        $input = file_get_contents('php://input');
        $o = json_decode($input);
        $a = $o->s;
        $email = $a->email;
        unset( $_SESSION[$email]);

        echo "YES";
    }
    $action = $_GET['action'];
    if ($action === "logout") {
        logout();
    }
?>