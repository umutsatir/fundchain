<?php 
    header('Access-Control-Allow-Origin: http://localhost:5173');
    include './pdo.php';
    $pdo = (new PDOClass())->connect();

    $stmt = $pdo->prepare("SELECT * FROM projects ORDER BY launchDate DESC LIMIT 20"); // limit can be added here
    $stmt->execute();
    $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $stmt = $pdo->prepare("SELECT * FROM projects ORDER BY goal DESC LIMIT 20"); // limit can be added here
    $stmt->execute();
    $popular = $stmt->fetchAll(PDO::FETCH_ASSOC);

    for ($i = 0; $i < count($popular); $i++) {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE userId = :userId");
        $stmt->execute(['userId' => $popular[$i]['userId']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        $popular[$i]['subimage'] = $user['profilePic'];
        $popular[$i]['owner'] = $user['username'];
    }

    for ($i = 0; $i < count($projects); $i++) {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE userId = :userId");
        $stmt->execute(['userId' => $projects[$i]['userId']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        $projects[$i]['subimage'] = $user['profilePic'];
        $projects[$i]['owner'] = $user['username'];
    }

    $projects = array_map(function($project) {
        return array(
            'id' => $project['projectId'],
            'title' => $project['title'],
            'img' => $project['image'],
            'subimg' => $project['subimage'],
            'owner' => $project['owner'],
            'deadline' => $project['launchDate']
        );
    }, $projects);

    $popular = array_map(function($project) {
        return array(
            'id' => $project['projectId'],
            'title' => $project['title'],
            'img' => $project['image'],
            'subimg' => $project['subimage'],
            'owner' => $project['owner'],
            'deadline' => $project['launchDate']
        );
    }, $popular);

    $json = array(
        'popular' => $popular,
        'trending' => $projects
    );

    $jsonstring = json_encode($json);
    echo $jsonstring;
?>