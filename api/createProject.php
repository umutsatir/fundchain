<?php 
    header('Access-Control-Allow-Origin: *');
    include './pdo.php';
    
    try {
        $pdo = (new PDOClass())->connect();
        $data = json_decode($_POST['data'], true);
        
        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
        $stmt->execute(['username' => $data['username']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        $stmt = $pdo->prepare("INSERT INTO projects (`userId`, `categoryId`, `title`, `description`, `location`, `image`, `video`, `goal`, `contractAddress`, `launchDate`, `fundCount`, `status`) VALUES (:userId, :categoryId, :title, :description, :location, :image, :video, :goal, :contractAddress, :launchDate, 0, 1)");
        $stmt->execute([
            'userId' => $user['userId'],
            'categoryId' => intval($data['basics']['category']),
            'title' => $data['basics']['title'],
            'description' => $data['basics']['description'],
            'location' => $data['basics']['location'],
            'image' => json_encode($data['basics']['image']),
            'video' => $data['basics']['video'],
            'goal' => $data['funding']['amount'],
            'contractAddress' => $data['contractAddress'],
            'launchDate' => date('Y-m-d')
        ]);

        $stories = [];
        foreach ($data['story']['story'] as $story){
            $stories[] = array(
                'heading' => $story['heading'],
                'paragraphs' => $story['paragraphs']
            );
        }

        $stories = [
            "story" => $stories
        ];

        $stmt = $pdo->prepare("INSERT INTO stories (`projectId`, `story`) VALUES (:projectId, :story)");
        $stmt->execute([
            'projectId' => $pdo->lastInsertId(),
            'story' => json_encode($stories)
        ]);

        echo json_encode(array('status' => true, 'message' => 'Project created successfully'));
    } catch (PDOException $e) {
        echo json_encode(array('status' => false, 'message' => $e->getMessage()));
    }
?>
<!-- 
{
    "basics": {
        "category": "",
        "title": "",
        "location": "",
        "image": "",
        "video": "",
        "targetDate": "",
        "duration": {
            "type": "",
            "value": ""
        }
    },
    "funding": {
        "currency": "USD",
        "amount": ""
    },
    "story": {
        "story": []
    },
    "collaborators": {
        "collaborators": []
    }
} -->