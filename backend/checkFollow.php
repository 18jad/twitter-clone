<?php

require "./connection.php";
$connection = new Connection();
$db = $connection->connect();

// CHECK IF FIRST USER IS FOLLOWING SECOND USER

if (isset($_GET['first_user_id'], $_GET['second_user_id'])) {
    $first_user_id = $_GET['first_user_id'];
    $second_user_id = $_GET['second_user_id'];
    $result = [];

    try {
        $check_sql = "SELECT * FROM `follow` WHERE followed_user_id = $first_user_id AND following_id = $second_user_id";
        $check_query = mysqli_query($db, $check_sql)->fetch_row();
        if (empty($check_query)) {
            $result = ["status" => 200, "following" => false];
        } else {
            $result = ["status" => 200, "following" => true];
        }
    } catch (Exception $e) {
        $result = ["status" => 200, "following" => $e->getMessage()];
    }
    echo json_encode($result);
}
