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

// Function to ban a project
function banProject($project_id) {
    global $pdo; // Use global $pdo
    try {
        $stmt = $pdo->prepare("UPDATE projects SET status = -1 WHERE projectId = :p_id");
        $stmt->execute(['p_id' => $project_id]);
    } catch (PDOException $e) {
        echo json_encode([
            'status' => false,
            'message' => 'Failed to ban project: ' . $e->getMessage()
        ]);
        exit;
    }
}

try {
    // Query to fetch project reports
    $stmt = $pdo->prepare("
        SELECT projectId, COUNT(projectId) as numberofid
        FROM reports
        GROUP BY projectId
        ORDER BY COUNT(projectId) DESC
    ");
    $stmt->execute();
    $projectId_list = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Check and ban projects with more than 10 reports
    $bannedProjects = [];
    foreach ($projectId_list as $project) {
        if ($project['numberofid'] > 10) {
            banProject($project['projectId']);
            $bannedProjects[] = $project['projectId'];
        }
    }

    // Return success message
    echo json_encode([
        'status' => true,
        'message' => count($bannedProjects) > 0 
            ? 'Projects banned successfully: ' . implode(', ', $bannedProjects)
            : 'No projects required banning.'
    ]);
} catch (PDOException $e) {
    // Handle database query errors
    echo json_encode([
        'status' => false,
        'message' => 'Error processing reports: ' . $e->getMessage()
    ]);
}
?>
