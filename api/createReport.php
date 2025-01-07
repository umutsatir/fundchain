<?php 
header('Access-Control-Allow-Origin: http://localhost:5173');
header("Access-Control-Allow-Methods: POST, OPTIONS");
header('Content-Type: application/json');

// Include necessary files
require_once '../vendor/autoload.php';
include './pdo.php';

// Database connection
$pdo = (new PDOClass())->connect();

// Sanitize POST data
$gump = new GUMP();
$_POST = $gump->sanitize($_POST);

// Validation rules
$gump->validation_rules([
    'username' => 'required|alpha_numeric',
    'projectId' => 'required|integer',
    'description' => 'required|max_len,500',
    'reportType' => 'max_len,50'
]);

$validated_data = $gump->run($_POST);

if (!$validated_data) {
    echo json_encode(['status' => false, 'message' => $gump->get_readable_errors()]);
    exit;
}

// Extract sanitized inputs
$username = $validated_data['username'];
$projectId = $validated_data['projectId'];
$reportType = $validated_data['reportType'] ?? 'unknown';
$description = $validated_data['description'];

try {
    // Get user ID
    $stmt = $pdo->prepare("SELECT userId FROM users WHERE username = :username");
    $stmt->execute(['username' => $username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(['status' => false, 'message' => 'User not found.']);
        exit;
    }

    $userId = $user['userId'];

    // Check if the user already reported the project
    $stmt = $pdo->prepare("SELECT 1 FROM reports WHERE userId = :userId AND projectId = :projectId");
    $stmt->execute(['userId' => $userId, 'projectId' => $projectId]);
    $existingReport = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($existingReport) {
        echo json_encode(['status' => false, 'message' => 'You have already reported this project.']);
        exit;
    }

    // Insert report
    $stmt = $pdo->prepare("INSERT INTO reports (projectId, userId, description, reportType) VALUES (:projectId, :userId, :description, :reportType)");
    $stmt->execute([
        'projectId' => $projectId,
        'userId' => $userId,
        'description' => $description,
        'reportType' => $reportType
    ]);

    echo json_encode(['status' => true, 'message' => 'Project reported successfully!']);
} catch (PDOException $e) {
    echo json_encode(['status' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
