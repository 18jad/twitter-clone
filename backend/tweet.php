<?php
require "./connection.php";
$connection = new Connection();
$db = $connection->connect();
$response = [];
if (isset($_POST['tweet_text']) && $_POST['user_id']) {
    $tweetText = $_POST['tweet_text'];
    $user_id = $_POST['user_id'];
    $tweetImage = isset($_POST['tweet_image']) ? $_POST['tweet_image'] : null;
    $tweetDate = date('Y-m-d H:i:s');
    $tweet_sql = "INSERT INTO `tweets` (`tweet_text`, `tweet_date`, `tweet_image`, `user_id`) VALUES (?, ?, ?, ?)";
    $query = $db->prepare($tweet_sql);
    $query->bind_param("sssi", $tweetText, $tweetDate, $tweetImage, $user_id);
    $query->execute();

    $response = [
        "tweet_text" => $tweetText,
        "tweet_date" => $tweetDate,
        "tweet_image" => $tweetImage
    ];

    echo json_encode($response);
} else {
    echo json_encode(['error' => 'No data passed']);
}
