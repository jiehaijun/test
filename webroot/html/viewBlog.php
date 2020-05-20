<?php
    function fetchAll() {
        include("conn.php");
        $request = "SELECT * FROM blog";
        $queryResult = mysqli_query($conn, $request);
        $rowList=mysqli_fetch_all($queryResult, MYSQLI_ASSOC);   
    
        $retItems = array();
        foreach ($rowList as $key => $value) {
            if ($value != null) {
                array_push($retItems, array('date'=>$value[0], 'title'=>$value[1], 'content'=>$value[2]));
                // $retItems = array('date'=>$value[0], 'title'=>$value[1], 'content'=>$value[2]);
            }
        }
    
        $json = json_encode($retItems);
    
        echo $json;
    }

    $action = $_GET['action'];
    if ($action === "fetchAll") {
        fetchAll();
    }
?>
