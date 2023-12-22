        // 定义视频接口地址
        //var videoApi = "http://tucdn.wpon.cn/api-girl/index.php?wpon=json";
        var videoApi = "http://api.yujn.cn/api/juhexjj.php?type=video";
        // 定义视频播放器元素
        var videoPlayer = document.getElementById("video-player");
        // 定义播放上一个按钮元素
        var prevButton = document.getElementById("prev-button");
        // 定义播放下一个按钮元素
        var nextButton = document.getElementById("next-button");
        // 定义自动切换选择框元素
        var autoSwitchCheckbox = document.getElementById("auto-switch-checkbox");
        // 定义一个文本型数组，用来存储已播放的视频地址
        var videoHistory = [];
        // 定义一个变量，用来记录当前播放的视频在数组中的索引
        var videoIndex = -1;
        // 定义一个函数，用来获取视频地址并播放
        
        function playVideo1() {
            // 使用 jQuery 的 ajax 方法，向视频接口发送请求
            $.ajax({
                url: videoApi,
                type: "GET",
                dataType: "json",
                success: function(data) {
                    // 如果请求成功，获取返回的 mp4 属性，拼接完整的视频地址
                    if (data.error == 0 && data.result == 200) {
                        var videoUrl = "https:" + data.mp4;
                        // 将视频地址添加到数组的末尾
                        videoHistory.push(videoUrl);
                        // 将当前播放的视频索引加一
                        videoIndex++;
                        // 将视频地址设置为视频播放器的源
                        videoPlayer.src = videoUrl;
                        // 播放视频
                        videoPlayer.play();
                    } else {
                        // 如果请求失败，提示错误信息
                        alert("获取视频失败，请重试");
                    }
                },
                error: function() {
                    // 如果请求出错，提示错误信息
                    alert("请求出错，请检查网络");
                }
            });
        }
        function playVideo() {
            // 使用 jQuery 的 ajax 方法，向视频接口发送请求
            $.ajax({
                url: videoApi,
                type: "GET",
                dataType: "mp4",
                success: function(data) {
                    // 如果请求成功，获取返回的 mp4 属性，拼接完整的视频地址
                        videoHistory.push(videoUrl);
                        videoIndex++;
                        videoPlayer.src = data;
                        videoPlayer.play();
                },
                error: function() {
                    // 如果请求出错，提示错误信息
                    alert("请求出错，请检查网络");
                }
            });
        }
        // 定义一个函数，用来切换到上一个视频
        function playPrev() {
            // 如果当前播放的视频不是第一个，即索引大于零
            if (videoIndex > 0) {
                // 将当前播放的视频索引减一
                videoIndex--;
                // 根据索引从数组中获取上一个视频地址
                var prevVideoUrl = videoHistory[videoIndex];
                // 将视频地址设置为视频播放器的源
                videoPlayer.src = prevVideoUrl;
                // 播放视频
                videoPlayer.play();
            } else {
                // 如果当前播放的视频是第一个，提示没有上一个视频
                alert("没有上一个视频了");
            }
        }

        // 定义一个函数，用来切换到下一个视频
        function playNext() {
            // 使用 jQuery 的 ajax 方法，向视频接口发送请求
            $.ajax({
                url: videoApi,
                type: "GET",
                dataType: "json",
                success: function(data) {
                    // 如果请求成功，获取返回的 mp4 属性，拼接完整的视频地址
                    if (data.error == 0 && data.result == 200) {
                        var videoUrl = "https:" + data.mp4;
                        // 将视频地址添加到数组的末尾
                        videoHistory.push(videoUrl);
                        // 将当前播放的视频索引加一
                        videoIndex++;
                        // 将视频地址设置为视频播放器的源
                        videoPlayer.src = videoUrl;
                        // 播放视频
                        videoPlayer.play();
                    } else {
                        // 如果请求失败，提示错误信息
                        alert("获取视频失败，请重试");
                    }
                },
                error: function() {
                    // 如果请求出错，提示错误信息
                    alert("请求出错，请检查网络");
                }
            });
        }

        // 定义一个函数，用来检查选择框的状态，并根据状态决定是否自动切换下一个视频
        function checkAutoSwitch() {
            // 获取选择框的 checked 属性，如果为 true，表示选中
            var autoSwitch = autoSwitchCheckbox.checked;
            // 如果选中，调用函数，切换到下一个视频
            if (autoSwitch) {
                playNext();
            } else {
                // 如果未选中，调用函数，循环播放当前视频
                videoPlayer.play();
            }
        }

                // 定义一个函数，用来设置 cookie
        function setCookie(name, value, days) {
            // 获取当前日期
            var date = new Date();
            // 设置过期时间，以天为单位
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            // 设置 cookie 的名称，值和过期时间
            document.cookie = name + "=" + value + ";expires=" + date.toUTCString();
        }

        // 定义一个函数，用来获取 cookie
        function getCookie(name) {
            // 获取所有的 cookie
            var cookies = document.cookie;
            // 分割每个 cookie
            var cookieArr = cookies.split("; ");
            // 遍历每个 cookie
            for (var i = 0; i < cookieArr.length; i++) {
                // 分割每个 cookie 的名称和值
                var cookieItem = cookieArr[i].split("=");
                // 如果找到匹配的名称，返回对应的值
                if (cookieItem[0] == name) {
                    return cookieItem[1];
                }
            }
            // 如果没有找到匹配的名称，返回空字符串
            return "";
        }
        function checkCookie() {
            // 获取名为 u 的 cookie 的值
            var u = getCookie("u");
            // 如果 u 为空
            if (!u) {
                // 使用一个循环，不断要求填写 name 的内容
                while (true) {
                    // 使用 alert 弹出提示框，要求输入 name 的内容，并将输入的内容赋值给 u
                    u = prompt("请输入您的ID：");
                    // 如果 u 不为空
                    if (u) {
                        // 跳出循环
                        break;
                    }
                }
                // 将 u 的值设置为名为 u 的 cookie 的值，过期时间为 30 天（您可以根据需要修改）
                setCookie("u", u, 30);
            }
        }
        // 定义一个函数，用来获取 id="video-player" 的播放器的源，并提交给 info.php
        function submitVideoUrl() {
            // 获取视频播放器元素
            var videoPlayer = document.getElementById("video-player");
            // 获取视频播放器的源属性，即视频地址
            var videoUrl = videoPlayer.src;
            // 获取名为 u 的 cookie 的值
            var u = getCookie("u");
            // 拼接提交的 url，包含 u 和 videoUrl 参数
            var submitUrl = "http://localhost:9010/info.php?u=" + u + "&url=" + videoUrl;
            // 使用 jQuery 的 ajax 方法，向服务器发送异步请求
            $.ajax({
                url: submitUrl, // 提交的 url
                type: "GET", // 请求类型，默认为 GET
                dataType: "text", // 预期服务器返回的数据类型
            });
        }
        
        // 调用函数，检查 cookie 是否含有 u 的内容，并要求填写 name 的内容
        checkCookie();
        // 调用函数，获取 id="video-player" 的播放器的源，并提交给 info.php
        