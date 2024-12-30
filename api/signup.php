<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    require_once '../vendor/autoload.php';
    include './pdo.php';
    use Firebase\JWT\JWT;

    try {
        $gump = new GUMP();
        $_POST = $gump->sanitize($_POST);

        $username = $_POST['username'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $pdo = (new PDOClass())->connect();
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email OR username = :username");
        $stmt->execute(['email' => $email, 'username' => $username]);
        $query = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($query) {
            echo json_encode(['status' => false, 'message' => 'Email or username already exists']);
        } else {
            $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (:username, :email, :password)");
            $stmt->execute(['username' => $username, 'email' => $email, 'password' => password_hash($password, PASSWORD_DEFAULT)]);
            echo json_encode(['status' => true, 'message' => 'User created successfully']);
        }
    } catch (Exception $e) {
        echo json_encode(['status' => false, 'message' => 'An error occurred', 'error' => $e->getMessage()]);
    }
?>