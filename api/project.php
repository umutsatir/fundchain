<?php 
    header('Access-Control-Allow-Origin: *');
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

        $query = $pdo->prepare("SELECT * FROM categories WHERE categoryId = :categoryId");
        $query->execute(['categoryId' => $project['categoryId']]);
        $category = $query->fetch(PDO::FETCH_ASSOC);

        $json = array(
            'success' => true,
            'message' => 'Project found',
            'id' => $project['projectId'],
            'userId' => $project['userId'],
            'category' => $category['category'],
            'title' => $project['title'],
            'description' => $project['description'],
            'location' => $project['location'],
            'img' => $project['image'],
            'subimg' => $project['subimage'],
            'goal' => $project['goal'],
            'video' => $project['video'],
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