<?php
$directory = '.'; // 当前路径
$shtmlFiles = glob("$directory/*.html");

$pageData = array();
$twoMonthsAgo = strtotime('-2 months');

foreach ($shtmlFiles as $index => $file) {
    $fileModifiedTime = filemtime($file);
    if ($fileModifiedTime >= $twoMonthsAgo) {
        $fileName = pathinfo($file, PATHINFO_FILENAME); // 获取文件名（去掉扩展名）
        $pageData[$fileName] = file_get_contents($file);
    }
}

$jsonOutput = json_encode($pageData, JSON_PRETTY_PRINT);

header('Content-Type: application/json');
echo $jsonOutput;
?>
