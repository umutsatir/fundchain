<?php
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    require_once '../vendor/autoload.php';
    include './pdo.php';
    use Firebase\JWT\JWT;

    try {
        $gump = new GUMP();
        $_POST = $gump->sanitize($_POST);
        $secretKey = "fundchainApiSecretKey";

        $email = $_POST['email'];
        $password = $_POST['password'];
        $pdo = (new PDOClass())->connect();
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->execute(['email' => $email]);
        $query = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($query && password_verify($password, $query['password'])) {
            $payload = [
                'iss' => 'fundchain-api', // Issuer
                'iat' => time(), // Issued at
                'exp' => time() + 3600, // Expiration time
                'username' => $query['username'], // Custom claim
            ];
            $token = JWT::encode($payload, $secretKey, 'HS256');
            echo json_encode(['status' => true, 'token' => $token]);
        } else {
            echo json_encode(['status' => false, 'message' => 'Invalid email or password']);
        }
    } catch (Exception $e) {
        echo json_encode(['status' => false, 'message' => 'An error occurred', 'error' => $e->getMessage()]);
    }
?>