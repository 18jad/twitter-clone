<?php

require "./connection.php";
$connection = new Connection();
$db = $connection->connect();

if (isset($_GET["user_id"])) {
    $user_id = $_GET["user_id"];
    // get user name, username, bio, profile pic and cover pic sql query
    $sql_query = "SELECT full_name, username, bio_text, user_profile, user_cover FROM users WHERE `user_id` = $user_id";

    // excute this query and return the first row
    $query = mysqli_query($db, $sql_query)->fetch_row();
    // store return resutls into variables using column index
    $result = [
        "fullName" => $query[0],
        "username" => $query[1],
        "bioText" => $query[2],
        "userProfile" => $query[3],
        "userCover" => $query[4],
    ];
    // return result as json
    echo json_encode($result);
    // if user id is not defined return error json
} else {
    echo json_encode(["error" => "Please specify user id"]);
}
