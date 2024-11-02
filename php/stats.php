<?php 
    header('Access-Control-Allow-Origin: http://localhost:5173');
    include './pdo.php';
    $pdo = (new PDOClass())->connect();
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM projects where status = 2");
    $stmt->execute();
    $fundedProjects = $stmt->fetch(PDO::FETCH_ASSOC);
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM projects where status = 1");
    $stmt->execute();
    $stillFunding = $stmt->fetch(PDO::FETCH_ASSOC);
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM users");
    $stmt->execute();
    $users = $stmt->fetch(PDO::FETCH_ASSOC);

    $json = array(
        'fundedProjects' => $fundedProjects['COUNT(*)'],
        'stillFunding' => $stillFunding['COUNT(*)'],
        'users' => $users['COUNT(*)']
    );
    $jsonstring = json_encode($json);
    echo $jsonstring;
?>