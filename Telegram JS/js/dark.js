let checks = document.querySelectorAll("winui-checkbutton"); // 用 querySelectorAll 方法选择所有 winui-checkbutton 元素
checks.forEach(function(check) { // 对每个元素执行一个函数
    check.addEventListener("click", function() { // 给每个元素添加点击事件监听器
    if (check.hasAttribute("checked")) {
        check.removeAttribute("checked");
    } else {
        check.setAttribute("checked", "");
    }
    });
});

function WinUINotify(content, title, displayTime = 5000) {
    // Create elements
    const winUINotify = document.createElement('WinUI-Notify');
    const winUIH1 = document.createElement('WinUI-H1');

    // Set content and title
    winUIH1.innerText = title;
    winUINotify.innerHTML = `${winUIH1.outerHTML}<br><br>${content}`;

    // Combine elements
    document.body.appendChild(winUINotify);

    // Add active class to initiate transition
    winUINotify.classList.add('active');

    // Set initial opacity to 0
    winUINotify.style.opacity = 0;

    // Set a timeout to increase opacity gradually
    setTimeout(() => {
        winUINotify.style.opacity = 1;
    }, 50); // Delay for a short time to allow initial rendering

    // Set a timeout to remove the notification after the specified display time
    setTimeout(() => {
        // Decrease opacity gradually before removal
        winUINotify.style.opacity = 0;
        setTimeout(() => {
            document.body.removeChild(winUINotify);
        }, 500); // Transition duration is 0.5s
    }, displayTime);
}
