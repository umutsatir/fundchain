<?php 
    header('Access-Control-Allow-Origin: *');
    include './pdo.php';
    $pdo = (new PDOClass())->connect();

    try {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
        $stmt->execute(['username' => $_POST['username']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user){
            $stmt = $pdo->prepare("DELETE FROM donations WHERE userId = :userId AND projectId = :projectId");
            $stmt->execute(['userId' => $user["userId"], 'projectId' => $_POST['projectId']]);
            echo json_encode(array('status' => true, 'message' => 'Donation removed'));
        } else {
            echo json_encode(array('status' => false, 'message' => 'User does not exist'));
        }
    } catch (PDOException $e) {
        echo json_encode(array('status' => false, 'message' => 'Error removing donation'));
    }
?>