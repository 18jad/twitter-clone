<?php

require "./connection.php";
$connection = new Connection();
$db = $connection->connect();

if (isset($_POST['user_blocked'], $_POST['by_who_id'], $_POST['auth_token'])) {
    $userBlocked = $_POST['user_blocked'];
    $byWho = $_POST['by_who_id'];
    $auth_token = $_POST['auth_token'];

    try {
        $auth_token_sql = "SELECT auth_token FROM users WHERE `user_id`='$byWho'";
        $stored_auth = mysqli_query($db, $auth_token_sql)->fetch_row()[0];
        if ($stored_auth != $auth_token) {
            throw new Exception("Couldn't confirm identity, please sign in again.");
        } else {
            $block_sql = "INSERT INTO `block`(user_blocked, by_who_id) VALUES (?, ?)";
            $block_query = $db->prepare($block_sql);
            $block_query->bind_param("ii", $userBlocked, $byWho);
            $block_query->execute();
            $result = ["status" => 200, "message" => "Successfully blocked user."];
        }
    } catch (Exception $e) {
        $result = ["status" => 405, "message" => $e->getMessage()];
    }
    echo json_encode($result);
}
