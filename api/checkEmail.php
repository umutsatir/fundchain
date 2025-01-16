<?php
    header('Access-Control-Allow-Origin: *');
    include './pdo.php';
    $pdo = (new PDOClass())->connect();

    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
    $stmt->execute(['email' => $_POST['email']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user){
        echo json_encode(array('status' => true, 'message' => 'Email already exists'));
    } else {
        echo json_encode(array('status' => false, 'message' => 'Email does not exist'));
    }
?>