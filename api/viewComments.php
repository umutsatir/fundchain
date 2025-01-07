<?php

// Set the necessary headers
header('Access-Control-Allow-Origin: http://localhost:5173');
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Include necessary files
require_once '../vendor/autoload.php';
include './pdo.php';

try {
    // Database connection
$pdo = (new PDOClass())->connect();

// Sanitize POST data
$gump = new GUMP();
$_POST = $gump->sanitize($_POST);

// Get the input ProjectId
$ProjectId_input = $_POST['projectId'];
// $ProjectId_input = 1; //TEST

// Prepare the SQL query to fetch comments
$stmt = $pdo->prepare("SELECT * FROM comments WHERE projectId = :p_id");
$stmt->execute(['p_id' => $ProjectId_input]);
$comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Prepare the response data array
    $response_data = [];
    $i = 0;

    // Loop through the comments
    while ($i < count($comments)) {
        // Fetch the username for the current comment
        $stmt = $pdo->prepare("SELECT username,name,surname,profilePic FROM users WHERE userId = :u_id");
        $stmt->execute(['u_id' => $comments[$i]['userId']]);
        $user= $stmt->fetch(PDO::FETCH_ASSOC);

        // Set the username or 'unknown' if not found
        $send_name = 'unknown';
        $send_surname = 'unknown';
        $send_username = 'unknown';
        if ($user) {
            $send_name = $user['name'];
            $send_surname = $user['surname'];
            $send_username = $user['username']; // Correct access to username
        }

        // Create the dictionary for the current comment
        $dict = array(
            'username_php' => $send_username,
            'name'=>$send_name,
            'surname'=>$send_surname,
            'profile_pic'=>$user['profilePic'],
            'projectId_php' => $comments[$i]['projectId'],
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
} catch (Exception $e) {
    echo json_encode(['status' => false, 'message' => "An error occurred while fetching comments: {$e->getMessage()}"]);
}
?>
