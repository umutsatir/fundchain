<?php 
    header('Access-Control-Allow-Origin: *');
    include './pdo.php';
    $pdo = (new PDOClass())->connect();

    try {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
        $stmt->execute(['username' => $_POST['username']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user){
            $stmt = $pdo->prepare("SELECT * FROM donations WHERE userId = :userId AND projectId = :projectId");
            $stmt->execute(['userId' => $user["userId"], 'projectId' => $_POST['projectId']]);
            $donation = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($donation){
                echo json_encode(array('status' => true, 'message' => 'Donation already exists'));
                exit;
            }
            $stmt = $pdo->prepare("INSERT INTO donations (userId, projectId, publicKey) VALUES (:userId, :projectId, :publicKey)");
            $stmt->execute(['userId' => $user["userId"], 'projectId' => $_POST['projectId'], 'publicKey' => $_POST['publicKey']]);
            echo json_encode(array('status' => true, 'message' => 'Donation added'));
        } else {
            echo json_encode(array('status' => false, 'message' => 'User does not exist'));
        }
    } catch (PDOException $e) {
        echo json_encode(array('status' => false, 'message' => 'Error adding donation'));
    }
?>