<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = "localhost";
$dbname = "user_db";
$username = "root";
$password = "@DawnZours123"; // Your MySQL password

$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
else {
    echo "Connected successfully!";
}

echo "hello<br>";

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data, using isset to avoid undefined index notices
    $form_type = isset($_POST['form_type']) ? $_POST['form_type'] : '';
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    // Process Login
    if ($form_type === 'login') {
        // Validate login credentials (you should query the database here)
        echo "Login:<br>";
        echo "Phone: " . htmlspecialchars($phone) . "<br>";
        echo "Email: " . htmlspecialchars($email) . "<br>";
        echo "Password: " . htmlspecialchars($password) . "<br>";
        // Here you can add your login logic, e.g., checking credentials in the database
    } 
    // Process Sign Up
    elseif ($form_type === 'signup') {
        // Process sign-up (you should insert into the database here)
        echo "Sign Up:<br>";
        echo "Name: " . htmlspecialchars($name) . "<br>";
        echo "Phone: " . htmlspecialchars($phone) . "<br>";
        echo "Email: " . htmlspecialchars($email) . "<br>";
        echo "Password: " . htmlspecialchars($password) . "<br>";
        
        // Example: Insert into the database
        $stmt = $conn->prepare("INSERT INTO users (name, phone, email, password) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $name, $phone, $email, $password);
        $stmt->execute();
        $stmt->close();
    }
}

$conn->close();
?>
