<?php

require "./connection.php";
$connection = new Connection();
$db         = $connection->connect();

if (isset($_POST['fullname'], $_POST['username'], $_POST['email'], $_POST['password'], $_POST['repeatedPassword'])) {
    $full_name        = $_POST['fullname'];
    $username         = $_POST['username'];
    $email            = $_POST['email'];
    $password         = $_POST['password'];
    $repeatedPassword = $_POST['repeatedPassword'];

    $response;

    // check if username already exists in database
    function checkUsername($username)
    {
        global $db;
        $username_check_sql = "SELECT username FROM users WHERE username = '$username'";
        $username_query     = mysqli_query($db, $username_check_sql);
        return (mysqli_num_rows($username_query) >= 1);
    }

    // check if email already exists in database
    function checkEmail($email)
    {
        global $db;
        $email_check_sql = "SELECT username FROM users WHERE email = '$email'";
        $email_query     = mysqli_query($db, $email_check_sql);
        return (mysqli_num_rows($email_query) >= 1);
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
            throw new Exception((strlen($username) < 5) ? "Username too short, it must contain at least 5 characters" :
                "Unvalid username, it must be consisted of letters and digits only");
            // check if password length is at least 8 characters    
        } else if (strlen($password) < 8) {
            throw new Exception("Password should be at least 8 characters.");
        } else {
            // if username already exist throw error
            if (checkUsername($username)) {
                throw new Exception("Username already taken");
            } else if (checkEmail($email)) {
                throw new Exception("Email already taken");
            }
            // hash password before storing it inside the database
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            // user insertion query
            $sql_query = "INSERT INTO users(full_name, username, email, `password`) VALUE(?, ?, ?, ?)";
            // prepare the query
            $query     = $db->prepare($sql_query);
            // bind user information to the query
            $query->bind_param("ssss", $full_name, $username, $email, $hashed_password);
            // execute the query
            $query->execute();
            // set response status as ok 200, and success message
            $response  = ["status" => 200, "message" => "User registration succesfully completed, please sign in."];
        }
        // catch any throwed error
    } catch (Exception $e) {
        // set response status to 405, and error message
        $response = ["status" => 405, "message" => $e->getMessage()];
    }

    // parse response to json
    $json_response = json_encode($response);
    echo $json_response;
}
