<?php 
    header('Access-Control-Allow-Origin: *');
    include './pdo.php';
    $pdo = (new PDOClass())->connect();

    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
    $stmt->execute(['username' => $_POST['username']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user){
        $stmt = $pdo->prepare("SELECT * FROM projects WHERE userId = :userId");
        $stmt->execute(['userId' => $user["userId"]]);
        $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(array('status' => true, 'data' => $projects));
    } else {
        echo json_encode(array('status' => false, 'message' => 'User does not exist'));
    }
?>