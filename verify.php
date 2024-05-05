<?php
    $recaptcha_secret = '6LcUrtEpAAAAAIH-Y3OufoNl6kEjDhpd_5STYaBD';
    $recaptcha_response = $_POST['g-recaptcha-response'];

    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = [
        'secret' => $recaptcha_secret,
        'response' => $recaptcha_response
    ];
    $options = [
        'http' => [
            'header' => 'Content-type: application/x-www-form-urlencoded',
            'method' => 'POST',
            'content' => http_build_query($data)
        ]
    ];
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    $response = json_decode($result);

    if ($response->success) {
        // CAPTCHA verification successful
        echo "CAPTCHA verification successful!";
    } else {
        // CAPTCHA verification failed
        echo "CAPTCHA verification failed!";
    }
?>
