<?php 
    header('Access-Control-Allow-Origin: http://localhost:5173');
    include './pdo.php';
    $pdo = (new PDOClass())->connect();

    $stmt = $pdo->prepare("SELECT * FROM stories WHERE projectId = :id");
    $stmt->execute(['id' => $_GET['projectId']]);
    $project = $stmt->fetch();

    $project = json_decode($project['story'], true);

    echo json_encode([
        'status' => true,
        'message' => 'Story fetched successfully',
        'data' => $project['story'],
    ]);
?>