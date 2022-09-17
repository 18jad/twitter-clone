<?php

require "./connection.php";
$connection = new Connection();
$db = $connection->connect();

if (isset($_POST['fullname'], $_POST['username'], $_POST['email'], $_POST['password'], $_POST['repeatedPassword'])) {
    $full_name = $_POST['fullname'];
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $repeatedPassword = $_POST['repeatedPassword'];

    $response;

    // check if username already exists in database
    function checkUsername($username)
    {
        global $db;
        $username_check_sql = "SELECT username FROM users WHERE username = '$username'";
        $username_query = mysqli_query($db, $username_check_sql);
        return (mysqli_num_rows($username_query) >= 1);
    }

    try {
        // check if passwords are identical
        if ($password !== $repeatedPassword) {
            throw new Exception("Passwords doesn't match.");
            // check if email is a valid email
        } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception("Unvalid email addres.");
        }
        // check if username is valid and contains only english letter and digits and is at least 4 characters long
        else if (!preg_match('/^\w{5,}$/', $username)) {
            throw new Exception("Unvalid username.");
            // check if password length is at least 8 characters
        } else if (strlen($password) < 8) {
            throw new Exception("Password should be at least 8 characters.");
        } else {
            // if username already exist throw error
            if (checkUsername($username)) {
                throw new Exception("Username already take");
            }
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            $sql_query = "INSERT INTO users(full_name, username, email, `password`) VALUE(?, ?, ?, ?)";
            $query = $db->prepare($sql_query);
            $query->bind_param("ssss", $full_name, $username, $email, $hashed_password);
            $query->execute();
            $response = ["status" => 200, "message" => "User registration succesfully completed"];
        }
    } catch (Exception $e) {
        $response = ["status" => 405, "message" => $e->getMessage()];
    }

    $json_response = json_encode($response);
    echo $json_response;
}
