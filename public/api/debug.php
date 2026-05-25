<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://corpenta.com');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$debug = [
    'status' => 'ok',
    'message' => 'PHP API is working!',
    'timestamp' => date('Y-m-d H:i:s'),
    'method' => $_SERVER['REQUEST_METHOD'],
    'php_version' => phpversion(),
    'curl_enabled' => function_exists('curl_version'),
    'request_uri' => $_SERVER['REQUEST_URI'],
    'server_name' => $_SERVER['SERVER_NAME'],
    'document_root' => $_SERVER['DOCUMENT_ROOT'],
    'script_filename' => $_SERVER['SCRIPT_FILENAME'],
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $debug['post_data'] = $input;
    $debug['parsed_json'] = json_decode($input, true);
}

echo json_encode($debug, JSON_PRETTY_PRINT);
?>
