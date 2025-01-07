<?php 
    header('Access-Control-Allow-Origin: *');
    include './pdo.php';
    $pdo = (new PDOClass())->connect();

    $stmt = $pdo->prepare("SELECT * FROM categories");
    $stmt->execute();
    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $categories = array_map(function($category){
        return array(
            'id' => $category['categoryId'],
            'name' => $category['category']
        );
    }, $categories);
    echo json_encode(['status' => true, 'data' => $categories]);
?>