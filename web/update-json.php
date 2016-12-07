<?php

$json_string = file_get_contents('php://input');

// $json_string = '{sex:"a"}';
echo $json_string;
$obj = json_decode($json_string);
var_dump($obj);


$fp = fopen('data.json', 'w');

if ($fp){
    if (flock($fp, LOCK_EX)){
        if (fwrite($fp,  $json_string) === FALSE){
            print('ファイル書き込みに失敗しました');
        }else{
            print($json_string.'をファイルに書き込みました');
        }

        flock($fp, LOCK_UN);
    }else{
        print('ファイルロックに失敗しました');
    }
}

fclose($fp);

return $json_string;


?>
