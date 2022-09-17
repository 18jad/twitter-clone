<?php
require "./connection.php";
$connection = new Connection();
$db = $connection->connect();

if (isset($_POST['user_id'])) {
    $user_id = $_POST['user_id'];
    $user_tweets_sql = "SELECT * FROM tweets WHERE `user_id`='$user_id'";
    $user_tweets_query = $db->prepare($user_tweets_sql);
    $user_tweets_query->execute();
    $query_result = $user_tweets_query->get_result();

    $tweets = [];

    while ($row = $query_result->fetch_assoc()) {
        $tweets["tweets"][] = ["tweetText" => $row['tweet_text'], "tweetDate" => $row['tweet_date'], "tweetImage" => $row['tweet_image'], "likes" => $row['likes'], "tweetId" => $row['tweet_id']];
    }

    $tweets_json = json_encode($tweets);
    echo $tweets_json;
} else {
    echo json_encode(["error" => "Please define used_id"]);
}
