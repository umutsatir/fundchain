<?php 
    header('Access-Control-Allow-Origin: http://localhost:5173');
    include './pdo.php';
    try {
        $pdo = (new PDOClass())->connect();
        $stmt = $pdo->prepare("UPDATE projects SET status = 2 WHERE launchDate < :currentDate AND status != 2");
        $stmt->execute(['currentDate' => date('Y-m-d')]);

        echo 'Projects updated successfully';
    } catch (PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }
?>