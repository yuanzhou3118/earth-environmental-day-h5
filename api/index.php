<?php
require_once "jssdk.php";
$url = trim($_GET['url']);
$jssdk = new JSSDK("wx7ceb0ec8d28d0156", "2a8ceffb928462967e978fa77e900077");
$signPackage = $jssdk->GetSignPackage($url);
echo json_encode($signPackage);
?>