<?php
if(isset($_POST['submit'])){
  $full_name = $_POST['name'];
  $user_name = $_POST['username'];
  $email = $_POST['email'];
  $new_password = $_POST['new_password'];
  

  $host = "localhost";
  $username = "twitterdb_user";
  $password = "123123";
  $dbname = "twitterdb";

  $con = mysqli_connect($host, $username, $password, $dbname);
  if (!$con){
    die("Connection failed!" . mysqli_connect_error());
  }

  
  $sql = "INSERT INTO users (user_id, full_name, user_name, email, password) VALUES ('', '$full_name','$user_name', '$email', '$new_password')";
  $rs = mysqli_query($con, $sql);
  if($rs){
    echo "Message has been sent successfully!";
  }
  else{
    echo "Error: " . $sql . "<br>" . $con->error;
  }
  
}

if(isset($_POST['signin'])){
  $user_name = $_POST['user_name'];
  $new_password = $_POST['password'];
  $email = $_POST['email'];

  $host = "localhost";
  $username = "twitterdb_user";
  $password = "123123";
  $dbname = "twitterdb";

  $con = mysqli_connect($host, $username, $password, $dbname);
  if (!$con){
    die("Connection failed!" . mysqli_connect_error());
  }

  
  $sql = "INSERT INTO users (user_id, user_name, email, password) VALUES ('', '$user_name', '$email', '$new_password')";
  $rs = mysqli_query($con, $sql);
  if($rs){
    echo "Message has been sent successfully!";
  }
  else{
    echo "Error: " . $sql . "<br>" . $con->error;
  }
  
}

?>