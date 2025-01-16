<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST, OPTIONS");

require_once '../vendor/autoload.php';
include './pdo.php';

function TopThreeKeys($array) {
    $counts = array_count_values($array);
    arsort($counts);
    return array_keys(array_slice($counts, 0, 3, true));
}

$pdo = (new PDOClass())->connect();

$gump = new GUMP();
$_POST = $gump->sanitize($_POST);

if ($_POST['userId']) {
    $stmt = $pdo->prepare("SELECT * FROM savedProjects WHERE userId = :u_id");
    $stmt->execute(['u_id' => $_POST['userId']]);
    $savedProjectsByUser = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($savedProjectsByUser) {
        $SavedCategories = [];

        // Get all category IDs from saved projects
        foreach ($savedProjectsByUser as $savedProject) {
            $stmt = $pdo->prepare("SELECT categoryId FROM projects WHERE projectId = :p_id");
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
            $stmt->execute(['c_id' => $categoryId, 'u_id' => $_POST['userId']]);
            $projectsByCategory = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (!empty($projectsByCategory)) {
                $randomKey = array_rand($projectsByCategory);
                $ProjectsWillBeRecommended[] = $projectsByCategory[$randomKey];
            }
        }

        // Fill remaining recommendations if less than 3
        if (count($ProjectsWillBeRecommended) < 3) {
            $neededProjects = 3 - count($ProjectsWillBeRecommended);

            $stmt = $pdo->prepare("SELECT * FROM projects WHERE userId != :u_id ORDER BY fundCount DESC LIMIT :limit");
            $stmt->bindValue(':u_id', $_POST['userId'], PDO::PARAM_INT);
            $stmt->bindValue(':limit', $neededProjects, PDO::PARAM_INT);
            $stmt->execute();
            $topFundedProjects = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $ProjectsWillBeRecommended = array_merge($ProjectsWillBeRecommended, $topFundedProjects);
        }

        echo json_encode([
            'status' => true,
            'message' => 'Projects recommended successfully!',
            'data' => $ProjectsWillBeRecommended,
        ]);
    } else {
        // Recommend top 3 funded projects if user has no saved projects
        $stmt = $pdo->prepare("SELECT * FROM projects WHERE userId != :u_id ORDER BY fundCount DESC LIMIT 3");
        $stmt->execute(['u_id' => $_POST['userId']]);
        $randomProjectsToRecommend = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'status' => true,
            'message' => 'Top three funded projects recommended!',
            'data' => $randomProjectsToRecommend,
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
