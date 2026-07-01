<?php

include 'db/connection.php';

$username=$_POST['username'];

$email=$_POST['email'];

$password=$_POST['password'];

$confirm=$_POST['confirmPassword'];

if($password!=$confirm){

die("Passwords do not match");

}

$check=$conn->prepare("SELECT * FROM students WHERE username=? OR email=?");

$check->bind_param("ss",$username,$email);

$check->execute();

$result=$check->get_result();

if($result->num_rows>0){

die("Username or Email already exists");

}

$hash=password_hash($password,PASSWORD_DEFAULT);

$stmt=$conn->prepare("INSERT INTO students(username,email,password) VALUES(?,?,?)");

$stmt->bind_param("sss",$username,$email,$hash);

if($stmt->execute()){

header("Location: login.php");

}

else{

echo "Registration Failed";

}

?>