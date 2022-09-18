<?php
require "./connection.php";
$connection = new Connection();
$db = $connection->connect();

if (isset($_POST['user_id'], $_POST['auth_token'])) {
    $user_id = $_POST['user_id'];
    $auth_token = $_POST['auth_token'];
    $stored_auth_token = NULL;
    $old_username = NULL;
    $new_username_query = NULL;
    $new_fullname_query = NULL;
    $new_bio_query = NULL;
    $response = [];

    function checkUsername($username)
    {
        global $db;
        $username_check_sql = "SELECT username FROM users WHERE username = '$username'";
        $username_query     = mysqli_query($db, $username_check_sql);
        return (mysqli_num_rows($username_query) >= 1);
    }

    try {
        // get stored auth token to compare with local one
        $auth_token_sql = "SELECT auth_token FROM users WHERE `user_id`='$user_id'";
        $auth_query = mysqli_query($db, $auth_token_sql)->fetch_row();
        if (empty($auth_query)) {
            throw new Exception("No auth token found, please sign in again.");
        } else {
            $stored_auth_token = $auth_query[0];
        }

        if (isset($_POST['username'])) {
            // get old username
            $old_username_sql = "SELECT username FROM users WHERE `user_id`='$user_id'";
            $old_username_query = mysqli_query($db, $old_username_sql)->fetch_row();
            if (empty($old_username_query)) {
                throw new Exception("Unexpected error happened, username not found");
            } else {
                $old_username = $old_username_query[0];
            }

            // check if the user stored auth token is the same as the one available in database, for more security and to prevent impersonating
            if ($stored_auth_token != $auth_token) {
                throw new Exception("Wrong auth_token please try again.");
            } else {
                $username = $_POST['username'];
                // check if new username is taken
                if (checkUsername($username) && $username != $old_username) {
                    throw new Exception("Username already taken");
                    // check if username is valid and contains only english letter and digits and is at least 4 characters long
                } elseif (!preg_match('/^\w{5,}$/', $username)) {
                    throw new Exception((strlen($username) < 5) ? "Username too short, it must contain at least 5 characters" :
                        "Unvalid username, it must be consistent of letters and digits only");
                } else {
                    $new_username_sql = "UPDATE users SET username = ? WHERE username = '$old_username' AND auth_token = '$auth_token'";
                    $new_username_query = $db->prepare($new_username_sql);
                    $new_username_query->bind_param("s", $username);
                    $response  = ["status" => 200, "message" => "Username succesfully changed from $old_username to $username."];
                }
            }
        }
        if (isset($_POST['fullname'])) {
            $fullname = $_POST['fullname'];
            $new_fullname_sql = "UPDATE users SET full_name = ? WHERE auth_token = '$auth_token'";
            $new_fullname_query = $db->prepare($new_fullname_sql);
            $new_fullname_query->bind_param("s", $fullname);
            $response  = ["status" => 200, "message" => "Full name succesfully changed."];
        }
        if (isset($_POST['bio'])) {
            $bio = $_POST['bio'];
            if (strlen($bio) > 160) {
                throw new Exception("Bio too long, max is 160 characters.");
            }
            $new_bio_sql = "UPDATE users SET bio_text = ? WHERE auth_token = '$auth_token'";
            $new_bio_query = $db->prepare($new_bio_sql);
            $new_bio_query->bind_param("s", $bio);
            $response  = ["status" => 200, "message" => "Bio succesfully changed."];
        }
        if (isset($_POST['username'], $_POST['fullname']) || isset($_POST['username'], $_POST['bio']) || isset($_POST['fullname'], $_POST['bio'])) {
            $response  = ["status" => 200, "message" => "Profile succesfully updated."];
        }
        if ($new_username_query != NULL) {
            $new_username_query->execute();
        }
        if ($new_bio_query != null) {
            $new_bio_query->execute();
        }
        if ($new_fullname_query != null) {
            $new_fullname_query->execute();
        }
    } catch (Exception $e) {
        $response = ["status" => 405, "message" => $e->getMessage()];
    }
    $json_response = json_encode($response);
    echo $json_response;
} else {
    echo json_encode(["status" => 405, "message" => "Something is missing."]);
}
