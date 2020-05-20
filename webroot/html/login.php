<?php
    session_start();
    include("conn.php");
    $email = $_POST['email'];
    $password = $_POST['userpass'];
    $result = mysqli_query($conn, "SELECT IFNULL((SELECT 'Y' from user where Email = '".$email."' AND Password = '".$password."' limit 1),'N')");
    echo $result;
?>