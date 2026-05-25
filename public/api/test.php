<?php
header('Content-Type: application/json');

echo json_encode([
    'status' => 'ok',
    'message' => 'PHP is working!',
    'php_version' => phpversion(),
    'curl_enabled' => function_exists('curl_version'),
    'curl_version' => function_exists('curl_version') ? curl_version()['version'] : 'Not available'
]);
?>
