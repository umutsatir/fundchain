<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST, OPTIONS");
header('Content-Type: application/json');
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

try {
    $pdo = (new PDOClass())->connect();
    $gump = new GUMP();
    $_POST = $gump->sanitize($_POST);

    if (!isset($_POST['userId']) || empty($_POST['userId'])) {
        echo json_encode([
            'status' => false,
            'message' => 'User ID is required.',
        ]);
        exit;
    }

    $userId = $_POST['userId'];
    $stmt = $pdo->prepare("SELECT * FROM users WHERE userId = :u_id");
    $stmt->execute(['u_id' => $userId]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode([
            'status' => false,
            'message' => 'User not found.',
            'data' => null,
        ]);
        exit;
    }

    // Fetch saved projects by the user
    $stmt = $pdo->prepare("SELECT * FROM savedProjects WHERE userId = :u_id");
    $stmt->execute(['u_id' => $userId]);
    $savedProjectsByUser = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (!$savedProjectsByUser) { //todo get random projects if no saved projects
        echo json_encode([
            'status' => false,
            'message' => 'No saved projects found.',
            'data' => null,
        ]);
        exit;
    }

    $SavedCategories = [];
    foreach ($savedProjectsByUser as $savedProject) {
        $stmt = $pdo->prepare("SELECT * FROM projects WHERE projectId = :p_id");
        $stmt->execute(['p_id' => $savedProject['projectId']]);
        $project = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($project) {
            $SavedCategories[] = $project['categoryId'];
        }
    }

    // Get top three categories
    $TopThreeCategoryId = TopThreeKeys($SavedCategories);
    $ProjectsWillBeRecommended = [];

    foreach ($TopThreeCategoryId as $categoryId) {
        $stmt = $pdo->prepare("SELECT * FROM projects WHERE categoryId = :c_id AND userId != :u_id");
        $stmt->execute(['c_id' => $categoryId, 'u_id' => $userId]);
        $projectsByCategory = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (!empty($projectsByCategory)) {
            $randomKey = array_rand($projectsByCategory);
            $projectsByCategory[$randomKey]['owner'] = $user['username'];
            $ProjectsWillBeRecommended[] = $projectsByCategory[$randomKey];
        }
    }

    // Return recommended projects
    echo json_encode([
        'status' => true,
        'message' => 'Projects recommended successfully!',
        'data' => $ProjectsWillBeRecommended,
    ]);
} catch (Exception $e) {
    echo json_encode([
        'status' => false,
        'message' => 'An error occurred: ' . $e->getMessage(),
        'data' => null,
    ]);
}
?>
