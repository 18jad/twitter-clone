<?php

require "./connection.php";
$connection = new Connection();
$db = $connection->connect();

if (isset($_POST['following_id'], $_POST['followed_user_id'], $_POST['auth_token'])) {
    $followingId = $_POST['following_id'];
    $followedUserId = $_POST['followed_user_id'];
    $auth_token = $_POST['auth_token'];

    try {
        // used to prevent people from abusing and force follow just by fetching api and passing ids
        $auth_token_sql = "SELECT auth_token FROM users WHERE `user_id`='$followedUserId'";
        $stored_auth = mysqli_query($db, $auth_token_sql)->fetch_row()[0];
        if ($stored_auth != $auth_token) {
            throw new Exception("Couldn't confirm identity, please sign in again.");
        } else {
            // check if user already following the other user, for data flow and less repeated rows
            $check_follow_sql = "SELECT following_id, followed_user_id FROM follow WHERE followed_user_id='$followedUserId' AND following_id='$followingId'";
            $check_follow_query = mysqli_query($db, $check_follow_sql)->fetch_row();
            if (empty($check_follow_query)) {
                $follow_sql = "INSERT INTO follow(following_id, followed_user_id) VALUE (?, ?)";
                $follow_query = $db->prepare($follow_sql);
                $follow_query->bind_param("ii", $followingId, $followedUserId);
                $follow_query->execute();
                echo json_encode(["status" => 200, "message" => "Successfully followed"]);

                // increase following counter
                $following_counter_sql = "UPDATE users SET `following` = (SELECT COUNT(*) FROM follow WHERE followed_user_id='$followedUserId') WHERE `user_id`='$followedUserId'";
                $following_counter_query = $db->prepare($following_counter_sql);
                $following_counter_query->execute();

                // increase followers counter
                $followers_counter_sql = "UPDATE users SET `followers` = (SELECT COUNT(*) FROM follow WHERE following_id='$followingId') WHERE `user_id`='$followingId'";
                $followers_counter_query = $db->prepare($followers_counter_sql);
                $followers_counter_query->execute();
            } else {
                echo json_encode(["status" => 405, "message" => "You are already follwing this user."]);
            }
        }
    } catch (Exception $e) {
        echo json_encode(["status" => 405, "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => 405, "message" => "Something is missing."]);
}
