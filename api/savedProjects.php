<?php 
    try {
        header('Access-Control-Allow-Origin: *');
        include './pdo.php';
        $pdo = (new PDOClass())->connect();
        $username = $_POST['username'];
        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
        $stmt->execute(['username' => $username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        $stmt2 = $pdo->prepare("SELECT * FROM savedProjects WHERE userId = :userId");
        $stmt2->execute(['userId' => $user['userId']]);
        $savedProjects = $stmt2->fetchAll(PDO::FETCH_ASSOC);
        $projects = [];

        for ($i=0; $i < count($savedProjects); $i++) { 
            $stmt = $pdo->prepare("SELECT * FROM projects WHERE projectId = :projectId");
            $stmt->execute(['projectId' => $savedProjects[$i]["projectId"]]);
            $project = $stmt->fetch(PDO::FETCH_ASSOC);
            $projects[$i] = $project;
        }

        for ($i = 0; $i < count($projects); $i++) {
            $stmt = $pdo->prepare("SELECT * FROM users WHERE userId = :userId");
            $stmt->execute(['userId' => $projects[$i]['userId']]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            $projects[$i]['subimage'] = $user['profilePic'];
            $projects[$i]['owner'] = $user['username'];
        }
        $projects = array_map(function($project) {
            $image = json_decode($project['image'], true);
            return array(
                'id' => $project['projectId'],
                'title' => $project['title'],
                'img' => $image[0],
                'subimg' => $project['subimage'],
                'owner' => $project['owner'],
                'deadline' => $project['launchDate']
            );
        }, $projects);
        echo json_encode(['status' => true, 'message' => 'Saved projects fetched', 'data' => $projects]);
    } catch (Exception $e) {
        echo json_encode(['status' => false, 'message' => 'An error occurred', 'error' => $e->getMessage()]);
    }
?>