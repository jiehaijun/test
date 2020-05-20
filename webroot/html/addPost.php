<?php
    
    function addPost() {
        include("conn.php");
        
        $input = file_get_contents('php://input');
        $o = json_decode($input);
        $a = $o->s;
        $title = $a->title;
        $content = $a->content;
        $date = $a->date;

        $request = "insert into blog ( Date, Title, Content ) values ('".$date."', '".$title."', '".$content."')";
        $queryResult = mysqli_query($conn, $request);

        if ($queryResult) {
            echo "YES";
        }
        else {
            echo "NO";
        } 

    }

    $action = $_GET['action'];
    if ($action === "addPost") {
        addPost();
    }
?>