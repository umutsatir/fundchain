<?php

header('Access-Control-Allow-Origin: http://localhost:5173');
header("Access-Control-Allow-Methods: POST, OPTIONS");
require_once '../vendor/autoload.php';
include './pdo.php';

function TopThreeKeys($array) {
    // Count occurrences of each element
    $counts = array_count_values($array);
    
    // Sort by occurrence in descending order
    arsort($counts);
    
    // Get the top 3 keys
    return array_keys(array_slice($counts, 0, 3, true));
}

$pdo = (new PDOClass())->connect();
use Firebase\JWT\JWT;

$gump = new GUMP();
$_POST = $gump->sanitize($_POST);

// Simulate a logged-in user for testing
// $u_name = 'emreadmin'; // Replace with actual logged-in username
$u_name = $_POST['username']; // Replace with actual logged-in username

$stmt = $pdo->prepare("SELECT * FROM users WHERE username = :userName");
$stmt->execute(['userName' => $u_name]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    $stmt = $pdo->prepare("SELECT * FROM savedprojects WHERE userId = :u_id");
    $stmt->execute(['u_id' => $user['userId']]);
    $savedProjectsByUser = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($savedProjectsByUser) {
        $SavedCategories = [];

        // Get all category IDs from saved projects
        foreach ($savedProjectsByUser as $savedProject) {
            $stmt = $pdo->prepare("SELECT * FROM projects WHERE projectId = :p_id");
            $stmt->execute(['p_id' => $savedProject['projectId']]);
            $project = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($project) {
                $SavedCategories[] = $project['categoryId'];
            }
        }

        // Find the top three categories
        $TopThreeCategoryId = TopThreeKeys($SavedCategories);
        $ProjectsWillBeRecommended = [];

        // Get random projects from the top categories (excluding the user's own projects)
        foreach ($TopThreeCategoryId as $categoryId) {
            $stmt = $pdo->prepare("SELECT * FROM projects WHERE categoryId = :c_id AND userId != :u_id");
            $stmt->execute(['c_id' => $categoryId, 'u_id' => $user['userId']]);
            $projectsByCategory = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (!empty($projectsByCategory)) {
                $randomKey = array_rand($projectsByCategory);
                $ProjectsWillBeRecommended[] = $projectsByCategory[$randomKey];
            }
        }

        // Send the recommended projects to the frontend
        echo json_encode([
            'status' => true,
            'message' => 'Projects recommended successfully!',
            'data' => $ProjectsWillBeRecommended,
        ]);
    } else {
        echo json_encode([
            'status' => false,
            'message' => 'No saved projects found for this user.',
            'data' => null,
        ]);
    }
} else {
    echo json_encode([
        'status' => false,
        'message' => "User: $u_name not found!",
        'data' => null,
    ]);
}

?>
