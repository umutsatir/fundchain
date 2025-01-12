<?php 
    header('Access-Control-Allow-Origin: *');
    include './pdo.php';
    $pdo = (new PDOClass())->connect();

    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
    $stmt->execute(['username' => $_POST['username']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user){
        $stmt = $pdo->prepare("SELECT * FROM donations WHERE userId = :userId");
        $stmt->execute(['userId' => $user["userId"]]);
        $donations = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($donations){
            $projects = [];
            foreach ($donations as $donation){
                $stmt = $pdo->prepare("SELECT * FROM projects WHERE projectId = :projectId");
                $stmt->execute(['projectId' => $donation["projectId"]]);
                $project = $stmt->fetch(PDO::FETCH_ASSOC);
                $project['publicKey'] = $donation["publicKey"];
                $projects[] = $project;
            }
            echo json_encode(array('status' => true, 'data' => $projects));
        } else {
            echo json_encode(array('status' => false, 'message' => 'No donations found'));
        }
    } else {
        echo json_encode(array('status' => false, 'message' => 'User does not exist'));
    }
?>