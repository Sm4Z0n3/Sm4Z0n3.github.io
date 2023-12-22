var apiUrl = `https://api.telegram.org/bot`;
// 连接Telegram Bot
async function connectBot() {
    try {
        var element = document.getElementById('Bot_Token');
        if (element) {
            var content = element.textContent || element.innerText;
            //console.log('Content:', content.trim());
            botToken = content.trim();
        } else {
            console.error('Element with id "Bot_Token" not found.');
        }

        apiUrl = `https://api.telegram.org/bot${botToken}`;

        getUrl(apiUrl + "/getme", function (error, data) {
            if (error) {
                console.error(error);
                output(`<p style='color:red;'>Connect Error...<br></p>`);
            } else {
                console.log(data);
                output(`<p style='color:green;'>Connect Successful...<br></p>`);
                sendMessage("1901930153","✔主人您好,NovaBot WebApp 已经激活✔.\n" );
                //+ "Login IP: <code>"+getIPAddress() + "</code>\nLoginCountry: <code>"+getCountry()+"</code>"
                listenForMessages();
            }
        });


    } catch (error) {
        console.error('Error connecting to the bot:', error);
    }
}

// 监听Telegram消息
let previousMessageText = null;
function listenForMessages() {
    setInterval(async () => {
        try {
            const response = await fetch(`${apiUrl}/getUpdates`);
            const data = await response.json();
            if (data.ok) {
                const latestUpdate = data.result[data.result.length - 1];
                const message = latestUpdate.message;
                if (message) {
                    const messageText = message.text;
                    if (messageText !== previousMessageText) {
                        previousMessageText = messageText;
                        const chatId = message.chat.id;
                        const userId = message.from.id;
                        const messageId = message.message_id;
                        const chatName = message.chat.title || message.chat.first_name;
                        const userName = message.from.username || message.from.first_name;
                        handleMessage(chatId,userId,messageId,messageText,chatName,userName)
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    }, 2000);
}
function escapeHtml(html) {
    return html.replace(/[<>&"'\/()]/g, function (match) {
        switch (match) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '"': return '&quot;';
            case "'": return '&#39;';
            case '\\': return '&#92;';
            //case '/': return '&#47;';
            case '(': return '&#40;';
            default: return match;
        }
    });
}

function runjs(){
    var code = document.getElementById("code").innerText;
    console.log(code);
    eval(code);
}

function handleMessage(chatId,userId,messageId,messageText,chatName,userName) {
    //sendMessage(chatId, 'Hello, I received your message!');

    var currentDate = new Date();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1
    var day = currentDate.getDate().toString().padStart(2, '0');
    var hours = currentDate.getHours().toString().padStart(2, '0');
    var minutes = currentDate.getMinutes().toString().padStart(2, '0');
    var seconds = currentDate.getSeconds().toString().padStart(2, '0');
    messageText = escapeHtml(messageText);
    output(`<p>[${month}-${day} ${hours}:${minutes}:${seconds}] | ChatID:"${chatId}" | UserID:${userId} | MessageID:${messageId} | ChatName:@${chatName} | UserName:@${userName}<br><span style="color:yellow;">${messageText}</span></p>`);
    //var msgresult = messageAA(chatId,userId,messageId,messageText,chatName,userName);
    var msgresult = Main(chatId,userId,messageId,messageText,chatName,userName);
    console.log(msgresult);
    if(msgresult != "MESSAGENULL"){
        sendMessage(chatId,msgresult);
    }
    
}

function sendMessage(chatId, text) {
    // 1901930153
    fetch(`${apiUrl}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: 'html'
        }),
    });
}
function getUrl(url, callback) {
    // 使用 XMLHttpRequest 进行 GET 请求
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            // 请求成功
            var responseData = JSON.parse(xhr.responseText);
            // 调用回调函数，并将结果传递给它
            callback(null, responseData);
        } else {
            // 请求失败
            callback('There was a problem with the request: ' + xhr.statusText, null);
        }
    };

    xhr.onerror = function () {
        // 请求失败
        callback('Network request failed', null);
    };

    xhr.send();
}

function UserInfo(data) {
    if (data.ok) {
        var result = data.result;
        var id = result.id;
        var username = result.username;
        var firstName = result.first_name;
        var lastName = result.last_name || '';

        console.log('User is correct.');
        console.log('ID:', id);
        console.log('Username:', username);
        console.log('Full Name:', firstName + ' ' + lastName);
        output(`<p style='color:green;'>Connect Successful...<br></p>`);
        listenForMessages();
    }
}

function output(message, useAnimation) {
    var messageDiv = document.getElementById('message');

    useAnimation = false;
    if (messageDiv) {
        if (!useAnimation) {
            // 如果不使用动画，直接输出完整的消息到指定的 div
            messageDiv.innerHTML = messageDiv.innerHTML + message;
        } else {
            // 使用动画输出每个字符
            var index = 0;

            function displayCharacter() {
                if (index < message.length) {
                    messageDiv.innerText += message.charAt(index);
                    index++;
                    setTimeout(displayCharacter, 30); // 设置字符输出的间隔时间
                } else {
                    // 所有字符输出完成后，延时一段时间后删除已输出字符
                    setTimeout(function () {
                        clearOutput();
                    }, 10);
                }
            }

            function clearOutput() {
                // 将完整的 HTML 内容显示出来
                messageDiv.innerHTML = messageDiv.innerText + message;
            }

            displayCharacter();
        }
    } else {
        console.error('Element not found.');
    }
}

function getIPAddress() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api64.ipify.org?format=json', false); // 设置同步模式
    xhr.send();

    if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        return data.ip;
    } else {
        throw new Error('Failed to fetch IP address.');
    }
}

function getCountry() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://ipinfo.io/json', false); // 设置同步模式
    xhr.send();

    if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        return data.country;
    } else {
        throw new Error('Failed to fetch country.');
    }
}
