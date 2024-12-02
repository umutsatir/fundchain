<?php
    header('Access-Control-Allow-Origin: http://localhost:5173');

    include './pdo.php';
    try {
        $pdo = (new PDOClass())->connect();
        $userId = $_GET['userId'];

        $stmt = $pdo->prepare("SELECT * FROM projects WHERE userId = :userId");
        $stmt->execute(['userId' => $userId]);
        $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (empty($projects)) {
            echo json_encode(['status' => false, 'message' => 'No projects found']);
            return;
        } else {
            $json = array();
            foreach($projects as $project){
                $json[] = array(
                    'id' => $project['projectId'],
                    'title' => $project['title'],
                );
            }
            echo json_encode(['status' => true, 'message' => 'Projects found', 'data' => $json]);
        }
    } catch (PDOException $e) {
        echo json_encode(['status' => false, 'message' => 'Error: ' . $e->getMessage()]);
    }
?>