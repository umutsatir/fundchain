<?php 
    header('Access-Control-Allow-Origin: *');
    include './pdo.php';
    $pdo = (new PDOClass())->connect();

    if ($_GET['userId']){
        $stmt = $pdo->prepare("SELECT * FROM projects WHERE userId = :userId");
        $stmt->execute(['userId' => $_GET["userId"]]);
        $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $totalRate = 0;
        $totalRateCount = 0;
        foreach ($projects as $project) {
            $stmt = $pdo->prepare("SELECT * FROM comments WHERE projectId = :projectId");
            $stmt->execute(['projectId' => $project["projectId"]]);
            $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($comments as $comment) {
                $totalRate += $comment['rate'];
                $totalRateCount++;
            }
        }
        if ($totalRateCount == 0) {
            echo json_encode(array('status' => true, 'data' => 0));
        } else {
        echo json_encode(array('status' => true, 'data' => $totalRate / $totalRateCount));
        }
    } else {
        echo json_encode(array('status' => false, 'message' => 'User does not exist'));
    }
?>