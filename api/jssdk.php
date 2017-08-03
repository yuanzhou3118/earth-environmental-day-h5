<?php
class JSSDK {
  private $appId;
  private $appSecret;

  public function __construct($appId, $appSecret) {
    $this->appId = $appId;
    $this->appSecret = $appSecret;
  }

  public function getSignPackage($url) {
//      $mysqli = new mysqli('hdm186864208.my3w.com', 'hdm186864208', 'huitech13579', 'hdm186864208_db');
//
//      if (mysqli_connect_errno()) {
//          error_log('Failed to connect to MySQL,error:' . mysqli_connect_error());
//
//          return array('result' => mysqli_connect_error());
//      }
//
//      $mysqli->query('SET NAMES UTF8');
//
//      $data = array();
//
//      if ($stmt = $mysqli->prepare('SELECT access_token,jsapi_ticket,created_at FROM weixin_session')) {
//          $stmt->execute();
//
//          $stmt->bind_result($accessToken,$jsApiTicket,$createdAt);
//
//          while ($stmt->fetch()) {
//              $arr = array(
//                  'access_token' => $accessToken,
//                  'jsapi_ticket' => $jsApiTicket,
//                  'created_at' => $createdAt
//              );
//              array_push($data, $arr);
//          }
//
//          $stmt->close();
//      }
//
//      $mysqli->close();
//      $data = $data[0];

//      if($data&&(time()>strtotime($data['created_at'])+7200)){//如果有数据，并且在两小时以内
//          $jsapiTicket = $data['jsapi_ticket'];
//      } else{
          $jsapiTicket = $this->getJsApiTicket();
//      }
    // 注意 URL 一定要动态获取，不能 hardcode.
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
//    $url = "$protocol$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
//    $url = "http://www.i4sp.cn/YSL/nurun/2015/earth-environmental-day-h5/index.html";

    $timestamp = time();
    $nonceStr = $this->createNonceStr();

    // 这里参数的顺序要按照 key 值 ASCII 码升序排序
    $string = "jsapi_ticket=$jsapiTicket&noncestr=$nonceStr&timestamp=$timestamp&url=$url";

    $signature = sha1($string);

    $signPackage = array(
      "appId"     => $this->appId,
      "nonceStr"  => $nonceStr,
      "timestamp" => $timestamp,
      "url"       => $url,
      "signature" => $signature,
      "rawString" => $string,
      "jsapi_ticket" => $jsapiTicket
    );
    return $signPackage; 
  }

  private function createNonceStr($length = 16) {
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    $str = "";
    for ($i = 0; $i < $length; $i++) {
      $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
    }
    return $str;
  }

  private function getJsApiTicket() {
    // jsapi_ticket 应该全局存储与更新，以下代码以写入到文件中做示例
    $data = json_decode($this->get_php_file("jsapi_ticket.php"));
    if ($data->expire_time < time()) {
      $accessToken = $this->getAccessToken();
      // 如果是企业号用以下 URL 获取 ticket
      // $url = "https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=$accessToken";
      $url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=$accessToken";
      $res = json_decode($this->httpGet($url));
      $ticket = $res->ticket;
      if ($ticket) {
        $data->expire_time = time() + 7000;
        $data->jsapi_ticket = $ticket;
        $this->set_php_file("jsapi_ticket.php", json_encode($data));
      }
    } else {
      $ticket = $data->jsapi_ticket;
    }

//      $mysqli = new mysqli('hdm186864208.my3w.com', 'hdm186864208', 'huitech13579', 'hdm186864208_db');
//
//      if (mysqli_connect_errno()) {
//          error_log('Failed to connect to MySQL,error:' . mysqli_connect_error());
//
//          return array('result' => 0);
//      }
//
//      $mysqli->query('SET NAMES UTF8');
//
//      $time = date('Y-m-d H:i:s', time());
//
//      $count = 0;
//
//      $deleteCount = 0;
//
//      if ($stmt = $mysqli->prepare('TRUNCATE table weixin_session')
//      ) {
//          $stmt->execute();
//
//          $deleteCount = $stmt->affected_rows;
//
//          $stmt->close();
//      }
//
//      if ($stmt = $mysqli->prepare('INSERT INTO weixin_session(access_token, jsapi_ticket, created_at) VALUES(?, ?, ?)')
//      ) {
//          $stmt->bind_param('sss', $accessToken, $ticket, $time);
//          $stmt->execute();
//
//          $count = $stmt->affected_rows;
//
//          $stmt->close();
//      }
//
//      $mysqli->close();

//      if ($count < 1||$deleteCount < 1) {
//          return $ticket;//保存失败。
//      } else {
          return $ticket;//保存成功。
//      }
  }

  private function getAccessToken() {
    // access_token 应该全局存储与更新，以下代码以写入到文件中做示例
    $data = json_decode($this->get_php_file("access_token.php"));
    if ($data->expire_time < time()) {
      // 如果是企业号用以下URL获取access_token
      // $url = "https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=$this->appId&corpsecret=$this->appSecret";
      $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$this->appId&secret=$this->appSecret";
      $res = json_decode($this->httpGet($url));
      $access_token = $res->access_token;
      if ($access_token) {
        $data->expire_time = time() + 7000;
        $data->access_token = $access_token;
        $this->set_php_file("access_token.php", json_encode($data));
      }
    } else {
      $access_token = $data->access_token;
    }
    return $access_token;
  }

  private function httpGet($url) {
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_TIMEOUT, 500);
    // 为保证第三方服务器与微信服务器之间数据传输的安全性，所有微信接口采用https方式调用，必须使用下面2行代码打开ssl安全校验。
    // 如果在部署过程中代码在此处验证失败，请到 http://curl.haxx.se/ca/cacert.pem 下载新的证书判别文件。
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, true);
    curl_setopt($curl, CURLOPT_URL, $url);

    $res = curl_exec($curl);
    curl_close($curl);

    return $res;
  }

  private function get_php_file($filename) {
    return trim(substr(file_get_contents($filename), 15));
  }
  private function set_php_file($filename, $content) {
    $fp = fopen($filename, "w");
    fwrite($fp, "<?php exit();?>" . $content);
    fclose($fp);
  }
}

