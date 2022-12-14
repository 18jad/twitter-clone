<?php

require "./connection.php";
$connection = new Connection();
$db         = $connection->connect();

if (isset($_POST['email'], $_POST['password'])) {
    $email                = $_POST['email'];
    $password             = $_POST['password'];
    $username             = NULL;
    $user_hashed_password = NULL;
    $user_id = NULL;
    $result               = [];
    // get password by email
    $user_hashed_password_sql = "SELECT password FROM users WHERE email='$email'";
    // store auth token when user sign in
    $auth_token_sql = "UPDATE users SET auth_token=UUID() WHERE email='$email'";
    // store user id
    $user_id_sql = "SELECT `user_id` FROM users WHERE email='$email'";
    // if user is logging in with username instead email, switch variable to username and change the query
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $username = $email;
        // get password by usename
        $user_hashed_password_sql = "SELECT password FROM users WHERE username='$username'";
        $auth_token_sql           = "UPDATE users SET auth_token=UUID() WHERE username='$username'";
        $user_id_sql = "SELECT `user_id` FROM users WHERE username='$username'";
    }
    // fetch the query and get the hashed password
    $user_hashed_password_query = mysqli_query($db, $user_hashed_password_sql)->fetch_row();
    // check if the query return something if yes that means the user was found else user is not created yet
    if (!empty($user_hashed_password_query)) {
        // select the hashed password from the query and store it
        $user_hashed_password = $user_hashed_password_query[0];
        // verify that the hashed password match the user input password
        $password_verify = password_verify($password, $user_hashed_password);
        if ($password_verify) {
            // update user auth token, new token will be generated every sign in for more security and to prevent hackers
            $auth_token_query = mysqli_query($db, $auth_token_sql);
            $get_token_sql    = "SELECT auth_token FROM users WHERE email='$email'";
            if ($username !== NULL) {
                $get_token_sql = "SELECT auth_token FROM users WHERE username='$username'";
            }
            $get_token_query = mysqli_query($db, $get_token_sql)->fetch_row();
            $auth_token      = $get_token_query[0];

            $user_id_query = mysqli_query($db, $user_id_sql)->fetch_row();
            $user_id = $user_id_query[0];
            // store the token in cookies
            setcookie("auth_token", $auth_token, time() + (86400 * 30), "/");
            setcookie("user_id", $user_id, time() + (86400 * 30), "/");
            $result = ["status" => 200, "message" => "Successfully signed in, redirecting you now"];
        } else {
            $result = ["status" => 405, "message" => "Uncorrect password, please try again"];
        }
    } else {
        $result = ["status" => 405, "message" => "User is not available. Please sign up"];
    }
    echo json_encode($result);
} else {
    echo json_encode(array("status" => 405, "message" => "Please fill all fields"));
}
