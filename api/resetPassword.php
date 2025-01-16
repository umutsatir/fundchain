<?php
    header('Access-Control-Allow-Origin: *');
    include './pdo.php';
    $pdo = (new PDOClass())->connect();

    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
    $stmt->execute(['email' => $_POST['email']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user){
        $stmt = $pdo->prepare("UPDATE users SET password = :password WHERE email = :email");
        $stmt->execute(['password' => password_hash($_POST['password'], PASSWORD_DEFAULT), 'email' => $_POST['email']]);
        echo json_encode(array('status' => true, 'message' => 'Password reset'));
    } else {
        echo json_encode(array('status' => false, 'message' => 'Email does not exist'));
    }
?>