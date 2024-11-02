<?php 
    header('Access-Control-Allow-Origin: http://localhost:5173');
    include './pdo.php';
    $pdo = (new PDOClass())->connect();

    $stmt = $pdo->prepare("SELECT * FROM projects WHERE projectId = :projectId");
    $stmt->execute(['projectId' => $_GET['projectId']]);
    $project = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($project) {
        $query = $pdo->prepare("SELECT * FROM users WHERE userId = :userId");
        $query->execute(['userId' => $project['userId']]);
        $user = $query->fetch(PDO::FETCH_ASSOC);
        $project['subimage'] = $user['profilePic'];

        $json = array(
            'status' => true,
            'message' => 'Project found',
            'id' => $project['projectId'],
            'userId' => $project['userId'],
            'categoryId' => $project['categoryId'],
            'title' => $project['title'],
            'description' => $project['description'],
            'location' => $project['location'],
            'img' => $project['image'],
            'subimg' => $project['subimage'],
            'goal' => $project['goal'],
            'contractAddress' => $project['contractAddress'],
            'launchDate' => $project['launchDate'],
            'status' => $project['status'],
        );
        $jsonstring = json_encode($json);
        echo $jsonstring;
    } else {
        echo json_encode(['status' => false, 'message' => 'Project not found']);
    }
?>