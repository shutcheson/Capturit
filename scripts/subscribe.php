<?php
// Database configuration
$servername = "localhost:3306";
$username = "r12a3kejy2mx";
$password = "Wikitoria57!";
$dbname = "capturit-mailing-list";

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

$response = array("success" => false, "message" => "");

// Check connection
if ($conn->connect_error) {
    $response['message'] = "Connection failed: " . $conn->connect_error;
    echo json_encode($response);
    exit;
}

// Get the inputs from the POST request
$email = isset($_POST['email']) ? $_POST['email'] : '';
$firstname = isset($_POST['firstname']) ? $_POST['firstname'] : '';
$lastname = isset($_POST['lastname']) ? $_POST['lastname'] : '';

// Validate email
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    // Check if the email already exists in the database
    $stmt = $conn->prepare("SELECT COUNT(*) FROM `mailing-list` WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($count);
    $stmt->fetch();
    $stmt->close();

    if ($count > 0) {
        // Email already exists in the database
        $response['message'] = "Email address already exists in the mailing list.";
    } else {
        // Insert the email address, firstname, and lastname into the database
        $stmt = $conn->prepare("INSERT INTO `mailing-list` (email, firstname, lastname) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $email, $firstname, $lastname);

        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = "Email subscribed successfully";
        } else {
            $response['message'] = "Error executing SQL statement: " . $stmt->error;
        }

        $stmt->close();
    }
} else {
    $response['message'] = "Invalid email address";
}

$conn->close();

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>
