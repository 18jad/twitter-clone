<?php

require "./connection.php";
$connection = new Connection();
$db = $connection->connect();

if (isset($_GET["username"])) {
    $username = $_GET["username"];
    // get user name, username, bio, profile pic and cover pic sql query
    $sql_query = "SELECT `user_id`, full_name, username, bio_text, user_profile, user_cover FROM users WHERE username = '$username'";

    // excute this query and return the first row
    $query = mysqli_query($db, $sql_query)->fetch_row();
    // store return resutls into variables using column index
    $result = [
        "userId" => $query[0],
        "fullName" => $query[1],
        "username" => $query[2],
        "bioText" => $query[3],
        "userProfile" => $query[4],
        "userCover" => $query[5],
    ];
    // return result as json
    echo json_encode($result);
    // if user id is not defined return error json
} else {
    echo json_encode(["error" => "Please specify user username"]);
}
