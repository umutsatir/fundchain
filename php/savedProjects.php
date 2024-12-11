<?php 
    try {
        header('Access-Control-Allow-Origin: http://localhost:5173');
        include './pdo.php';
        $pdo = (new PDOClass())->connect();
        $username = $_POST['username'];
        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
        $stmt->execute(['username' => $username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        $stmt2 = $pdo->prepare("SELECT * FROM savedProjects WHERE userId = :userId");
        $stmt2->execute(['userId' => $user['userId']]);
        $projects = $stmt2->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['status' => true, 'message' => 'Saved projects fetched', 'data' => $projects]);
    } catch (Exception $e) {
        echo json_encode(['status' => false, 'message' => 'An error occurred', 'error' => $e->getMessage()]);
    }
?>