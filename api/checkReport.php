<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header("Access-Control-Allow-Methods: POST, OPTIONS");
header('Content-Type: application/json');

// Include necessary files
require_once '../vendor/autoload.php';
include './pdo.php';

// Database connection
try {
    $pdo = (new PDOClass())->connect();
} catch (PDOException $e) {
    echo json_encode([
        'status' => false,
        'message' => 'Database connection failed: ' . $e->getMessage()
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
    $stmt->execute(['username' => $_POST['username']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode([
            'status' => false,
            'message' => 'User not found'
        ]);
        exit;
    }
    $stmt = $pdo->prepare("SELECT * FROM reports WHERE userId = :u_id AND projectId = :p_id");
    $stmt->execute(['u_id' => $user['userId'], 'p_id' => $_POST['projectId']]);
    $reports = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (!$reports) {
        echo json_encode([
            'status' => false,
            'message' => 'No reports found'
        ]);
        exit;
    } else {
        echo json_encode([
            'status' => true,
            'message' => 'Reports found'
        ]);
    }
} catch (PDOException $e) {
    // Handle database query errors
    echo json_encode([
        'status' => false,
        'message' => 'Error processing reports'
    ]);
}
?>
