<?php

require "./connection.php";
$connection = new Connection();
$db = $connection->connect();

// CHECK IF FIRST USER IS BLOCKED BY SECOND USER

if (isset($_GET['first_user_id'], $_GET['second_user_id'])) {
    $first_user_id = $_GET['first_user_id'];
    $second_user_id = $_GET['second_user_id'];
    $result = [];

    try {
        $check_sql = "SELECT * FROM `block` WHERE user_blocked = $first_user_id AND by_who_id = $second_user_id";
        $check_query = mysqli_query($db, $check_sql)->fetch_row();
        if (empty($check_query)) {
            $result = ["status" => 200, "blocked" => false];
        } else {
            $result = ["status" => 200, "blocked" => true];
        }
    } catch (Exception $e) {
        $result = ["status" => 200, "blocked" => $e->getMessage()];
    }
    echo json_encode($result);
}
