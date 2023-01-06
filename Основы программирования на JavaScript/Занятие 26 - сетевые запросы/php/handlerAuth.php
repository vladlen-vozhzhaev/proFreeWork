<?php
    $login = $_POST['login'];
    $pass = $_POST['pass'];
    if($login == "admin" && $pass == "123456"){
        echo json_encode(["result"=>"success"]);
    }else{
        echo json_encode(["result"=>"error"]);
    }
?>
