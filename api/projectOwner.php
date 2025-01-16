<?php 
    header('Access-Control-Allow-Origin: *');
    include './pdo.php';
    $pdo = (new PDOClass())->connect();

    if (!isset($_GET['id'])) {
        echo json_encode(['status' => false, 'message' => 'User ID not provided']);
        exit;
    }

    $stmt = $pdo->prepare("SELECT * FROM users WHERE userId = :userId");
    $stmt->execute(['userId' => $_GET['id']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    $stmt = $pdo->prepare("SELECT COUNT(*) FROM projects WHERE userId = :userId AND status = 2");
    $stmt->execute(['userId' => $_GET['id']]);
    $backed = $stmt->fetch(PDO::FETCH_ASSOC);
    $backed = $backed['COUNT(*)'];

    $stmt = $pdo->prepare("SELECT COUNT(*) FROM projects WHERE userId = :userId");
    $stmt->execute(['userId' => $_GET['id']]);
    $projectCount = $stmt->fetch(PDO::FETCH_ASSOC);
    $projectCount = $projectCount['COUNT(*)'];

    if (($user['name'] != '' && $user['surname'] != '') || ($user['name'] != null && $user['surname'] != null)) {
        $user['username'] = $user['name'] . ' ' . $user['surname'];
    }

    if ($user) {
        $jsonstring = json_encode(array(
            'status' => true,
            'message' => 'User found',
            'id' => $user['userId'],
            'username' => $user['username'],
            'name' => $user['name'],
            'surname' => $user['surname'],
            'email' => $user['email'],
            'profilePic' => $user['profilePic'],
            'description' => $user['description'],
            'location' => $user['location'],
            'created' => $user['creationDate'],
            'backedCount' => $backed,
            'projectCount' => $projectCount,
        ));
        echo $jsonstring;
    } else {
        echo json_encode(['status' => false, 'message' => 'User not found']);
    }
?>