<?php
    try {
        header('Access-Control-Allow-Origin: *');
        include './pdo.php';
        $pdo = (new PDOClass())->connect();

        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
        $stmt->execute(['username' => $_POST['username']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (empty($user)) {
            echo json_encode(array('status' => false, 'message' => 'User does not exist'));
            return;
        }

        if ($_POST['willBeSaved'] == 'true') {
            $stmt = $pdo->prepare("INSERT INTO savedProjects (userId, projectId) VALUES (:userId, :projectId)");
            $stmt->execute(['userId' => $user['userId'], 'projectId' => $_POST['projectId']]);
            echo json_encode(array('status' => true, 'message' => 'Project saved successfully'));
        } else {
            $stmt = $pdo->prepare("DELETE FROM savedProjects WHERE userId = :userId AND projectId = :projectId");
            $stmt->execute(['userId' => $user['userId'], 'projectId' => $_POST['projectId']]);
            echo json_encode(array('status' => true, 'message' => 'Project unsaved successfully'));
        }
    } catch (Exception $e) {
        echo json_encode(['status' => false, 'message' => 'An error occurred', 'error' => $e->getMessage()]);
    }
?>