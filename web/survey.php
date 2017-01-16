<?php
if (((isset($_POST['beacon_age'])) && ($_POST['beacon_age'] != '')) or ((isset($_POST['beacon_gender'])) && ($_POST['beacon_gender'] != ''))) {         // 名前かEmailがPOSTされたときに、以下を実行する

          if (isset($_POST['beacon_age'])) {    //もしPOSTに [beacon_age] があれば
                  $beacon_age = $_POST['beacon_age'];    //POSTのデータを変数$beacon_ageに格納
                 if (get_magic_quotes_gpc()) {
                     $beacon_age = stripslashes("$beacon_age");
                 }        //クォートをエスケープする
                  $beacon_age = htmlspecialchars($beacon_age);    //HTMLタグを禁止する
                  $beacon_age = mb_substr($beacon_age, 0, 30, 'UTF-8');        //長いデータを30文字でカット
          }

    if (isset($_POST['beacon_gender'])) {
        $beacon_gender = $_POST['beacon_gender'];     //POSTのデータを変数$beacon_ageに格納
                 if (get_magic_quotes_gpc()) {
                     $beacon_gender = stripslashes("$beacon_gender");
                 }        //クォートをエスケープする
                  $beacon_gender = htmlspecialchars($beacon_gender);        //HTMLタグ禁止
                  $beacon_gender = mb_substr($beacon_gender, 0, 30, 'UTF-8');        //長いデータを30文字でカット
    }
    if (isset($_POST['camera_age'])) {    //もしPOSTに [camera_age] があれば
                 $camera_age = $_POST['camera_age'];    //POSTのデータを変数$camera_ageに格納
                if (get_magic_quotes_gpc()) {
                    $camera_age = stripslashes("$camera_age");
                }        //クォートをエスケープする
                 $camera_age = htmlspecialchars($camera_age);    //HTMLタグを禁止する
                 $camera_age = mb_substr($camera_age, 0, 30, 'UTF-8');        //長いデータを30文字でカット
    }

    if (isset($_POST['camera_gender'])) {
        $camera_gender = $_POST['camera_gender'];     //POSTのデータを変数$camera_ageに格納
                if (get_magic_quotes_gpc()) {
                    $camera_gender = stripslashes("$camera_gender");
                }        //クォートをエスケープする
                 $camera_gender = htmlspecialchars($camera_gender);        //HTMLタグ禁止
                 $camera_gender = mb_substr($camera_gender, 0, 30, 'UTF-8');        //長いデータを30文字でカット
    }
    if (isset($_POST['age'])) {
        $age = $_POST['age'];     //POSTのデータを変数$ageに格納
               if (get_magic_quotes_gpc()) {
                   $age = stripslashes("$age");
               }        //クォートをエスケープする
                $age = htmlspecialchars($age);        //HTMLタグ禁止
                $age = mb_substr($age, 0, 30, 'UTF-8');        //長いデータを30文字でカット
    }
    if (isset($_POST['gender'])) {
        $gender = $_POST['gender'];     //POSTのデータを変数$ageに格納
              if (get_magic_quotes_gpc()) {
                  $gender = stripslashes("$gender");
              }        //クォートをエスケープする
               $gender = htmlspecialchars($gender);        //HTMLタグ禁止
               $gender = mb_substr($gender, 0, 30, 'UTF-8');        //長いデータを30文字でカット
    }

    $write = date().', '.$beacon_age.', '.$beacon_gender.','.$camera_age.', '.$camera_gender.', '.$age.', '.$gender.', '.'\n';    //新しく書き込むデータを <> で区切って整形
            $log = fopen('surveylog.txt', 'a');     //書き込み用モードでデータを開く
            flock($log, LOCK_EX);     //ファイルロック開始
            fputs($log, $write);    //書き込み処理
            flock($log, LOCK_UN);      //ファイルロック解除
            fclose($log);         //ファイルを閉じる

    echo 'OK';
}
