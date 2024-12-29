<?php 
    try {
        header('Access-Control-Allow-Origin: http://localhost:5173');
        include './pdo.php';
        $pdo = (new PDOClass())->connect();

        if (!isset($_POST['username'], $_POST['projectId'])) {
            echo json_encode(['status' => false, 'message' => 'Missing required parameters']);
            return;
        }

        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
        $stmt->execute(['username' => $_POST['username']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user){
            $stmt = $pdo->prepare("SELECT * FROM savedProjects WHERE userId = :userId AND projectId = :projectId");
            $stmt->execute(['userId' => $user["userId"], 'projectId' => $_POST['projectId']]);
            $saved = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($saved)
                echo json_encode(array('status' => true, 'message' => 'Project saved'));
            else
                echo json_encode(array('status' => false, 'message' => 'Project not saved'));
        } else {
            echo json_encode(array('status' => false, 'message' => 'User does not exist'));
            return;
        }
    } catch (Exception $e) {
        echo json_encode(['status' => false, 'message' => 'An error occurred', 'error' => $e->getMessage()]);
    }
?>