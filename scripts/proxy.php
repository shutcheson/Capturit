// proxy.php
<?php
$subscribePath = __DIR__ . '/subscribe.php';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$postData = http_build_query(['email' => $email]);

$opts = [
    'http' => [
        'method' => 'POST',
        'header' => 'Content-Type: application/x-www-form-urlencoded',
        'content' => $postData
    ]
];

$context = stream_context_create($opts);
$response = file_get_contents($subscribePath, false, $context);

if ($response === false) {
    echo json_encode(['success' => false, 'message' => 'Failed to connect to subscribe.php']);
    error_log('Failed to connect to subscribe.php');
    exit;
}

header('Content-Type: application/json');
echo $response;
?>