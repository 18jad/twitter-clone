<?php

require "./connection.php";
$connection = new Connection();
$db = $connection->connect();

if (isset($_POST['user_id'])) {
    $user_id = $_POST['user_id'];

    $sql = "SELECT * FROM tweets INNER JOIN follow WHERE follow.followed_user_id = $user_id AND tweets.user_id = follow.following_id ORDER BY tweets.tweet_date DESC";
    $query = $db->prepare($sql);
    $query->execute();
    $result = $query->get_result();

    $tweets = [];

    while ($row = $result->fetch_assoc()) {
        $tweets["tweets"][] = ["tweetText" => $row['tweet_text'], "tweetDate" => $row['tweet_date'], "tweetImage" => $row['tweet_image'], "likes" => $row['likes'], "tweetId" => $row['tweet_id'], "userId" => $row['user_id']];
    }
    echo json_encode($tweets);
} else {
    echo json_encode(["status" => 405, "message" => "Something is missing."]);
}
