<?php
class Connection
{
  protected static $host = "localhost";
  protected static $username = "root";
  protected static $password = "";
  protected static $db_name = "twitterclone";
  public function __construct()
  {
  }

  public static function connect()
  {
    try {
      $connect = new mysqli(self::$host, self::$username, self::$password, self::$db_name);
    } catch (Exception $e) {
      $error = mysqli_error($connect);
      echo "Connection failed: " . $error . " " . $e->getMessage();
    }
    return $connect;
  }
}
