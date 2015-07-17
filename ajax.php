<?php
if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Check the token from the captcha via google
    $captchaSecretCode = '6Le-9QgTAAAAADEnwTSby6o5BdKDkt1QkqroT5gQ';
    $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$captchaSecretCode."&response=".$_POST['g-recaptcha-response']);
    $response = json_decode($response, true);


    if (!$_POST['name']) {
        $nameErr = 'Please enter your name';
    };

    if (!$_POST['email'] || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $emailErr = 'Please enter a valid email address';
    };

    if (!$_POST['message']) {
        $messageErr = 'Please enter your message';
    };

    // First check if the captcha is valid, then check all the required fields
    if($response["success"] === true) {
        if (!$nameErr && !$emailErr && !$messageErr) {
            $result .= 'Name: ' . $name . "\n" . 'Email: ' . $email . "\n" . 'Message: ' . $message;
            toSlack($result);
            echo '<small style="color: #0C7E0C" class="form-caution" id="errorContainer">Caution*: Your message has been sent successfully! Please check your inbox for an email from us.</small>';
        } else {
            echo '<small class="form-caution" id="errorContainer">Caution*: Please fill all the fields.</small>';
        }
    } else {
        echo '<small class="form-caution" id="errorContainer">Caution*: Please check your captcha again.</small>';
    }
};

function toSlack($message, $channel = array("@oe.sonnh", "@minhnt")) {
    $chaLen = count($channel);
    for($i = 0; $i < $chaLen; $i++) {
        slack($message, $channel[$i]);
    }
}

function slack($mes, $room, $icon = ":y:",$username="Messenger") {
    $data = "payload=" . json_encode(array(
            "channel"       =>  $room,
            "text"          =>  $mes,
            "icon_emoji"    =>  $icon,
            "username"      =>  $username
        ));
    $ch =     curl_init("https://hooks.slack.com/services/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");
    curl_setopt_array($ch, array(
        CURLOPT_CUSTOMREQUEST=>"POST",
        CURLOPT_POSTFIELDS=>$data,
        CURLOPT_RETURNTRANSFER=>true));
    $result = curl_exec($ch);
    curl_close($ch);
    return $result;
};
