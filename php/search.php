<?php
    header('Access-Control-Allow-Origin: http://localhost:5173');

    include './pdo.php';
    $search = $_GET['search'];
    $pdo = (new PDOClass())->connect();
    if(!empty($search)){
        $stmt = $pdo->prepare("SELECT * FROM projects WHERE title LIKE :search");
        $stmt->execute(['search' => "%$search%"]);
        $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $query = $pdo->prepare("SELECT * FROM users WHERE userId = :userId");
        foreach($projects as $key => $project){
            $query->execute(['userId' => $project['userId']]);
            $user = $query->fetch(PDO::FETCH_ASSOC);
            $projects[$key]['userId'] = $user['username'];
            $projects[$key]['subimage'] = $user['profilePic'];
        }
        $json = array();
        foreach($projects as $project){
            $json[] = array(
                'id' => $project['projectId'],
                'title' => $project['title'],
                'img' => $project['image'],
                'subimg' => $project['subimage'],
                'owner' => $project['userId'],
                'deadline' => $project['launchDate'],
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    } else {
    echo json_encode([]);
    }
?>