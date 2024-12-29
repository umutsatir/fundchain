<?php

// Set the necessary headers
header('Access-Control-Allow-Origin: http://localhost:5173');
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Include necessary files
require_once '../vendor/autoload.php';
include './pdo.php';

// Database connection
$pdo = (new PDOClass())->connect();

// Sanitize POST data
$gump = new GUMP();
$_POST = $gump->sanitize($_POST);

// Get the input ProjectId
$ProjectId_input = $_POST['ProjectId'];
// $ProjectId_input = 1; //TEST

// Prepare the SQL query to fetch comments
$stmt = $pdo->prepare("SELECT * FROM comments WHERE projectId = :p_id");
$stmt->execute(['p_id' => $ProjectId_input]);
$comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($comments) {
    // Prepare the response data array
    $response_data = [];
    $i = 0;

    // Loop through the comments
    while ($i < count($comments)) {
        // Fetch the username for the current comment
        $stmt = $pdo->prepare("SELECT username FROM users WHERE userId = :u_id");
        $stmt->execute(['u_id' => $comments[$i]['userId']]);
        $temp_username = $stmt->fetch(PDO::FETCH_ASSOC);

        // Set the username or 'unknown' if not found
        $send_name = 'unknown';
        if ($temp_username) {
            $send_name = $temp_username['username']; // Correct access to username
        }

        // Create the dictionary for the current comment
        $dict = array(
            'projectId_php' => $comments[$i]['projectId'],
            'username_php' => $send_name,
            'title_php' => $comments[$i]['title'],
            'description_php' => $comments[$i]['description'],
            'rate_php' => $comments[$i]['rate'],
            'creationDate_php' => $comments[$i]['creationDate'],
        );

        // Add the current dictionary to the response data
        $response_data[] = $dict;

        $i++; // Increment the index
    }

    // Return the final response as JSON
    echo json_encode(['status' => true, 'message' => 'Comments Found!', 'data' => $response_data]);
} else {
    // No comments found
    echo json_encode(['status' => false, 'message' => 'No Comments Found!']);
}

?>
