<?php
    // 获取参数 url 的值，如果没有传递参数 url，返回错误信息
    $url = $_GET["url"] ?? die("缺少参数 url");
    // 获取参数 u 的值，如果没有传递参数 u，返回错误信息
    $u = $_GET["u"] ?? die("缺少参数 u");
    // 使用 file_get_contents 函数，从 url 读取内容
    // 如果读取内容失败，返回错误信息
    if ($content === false) {
        die("读取内容失败");
    }
    // 使用 fopen 函数，以追加模式打开名为 u 的 txt 文件
    $file = fopen($u . ".txt", "a");
    // 如果打开文件失败，返回错误信息
    if ($file === false) {
        die("打开文件失败");
    }
    // 使用 fwrite 函数，向文件写入换行符和内容
    fwrite($file, "\n" . $url);
    // 使用 fclose 函数，关闭文件
    fclose($file);
    // 返回成功信息
    echo "保存成功";
?>
