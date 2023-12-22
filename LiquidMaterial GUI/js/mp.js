async function getMinecraftServerStatus(serverAddress) {
    const response = await fetch(`https://api.mcsrvstat.us/2/${serverAddress}`);
    const data = await response.json();
    return data;
}

async function updateServerInfo(serverAddress) 
{
    const serverData = await getMinecraftServerStatus(serverAddress);
    const serverName = serverData.hostname;
    const serverMotd = serverData.motd.html.join('');
    const serverPlayers = serverData.players.online;
    const servermaxPlayers = serverData.players.max;
    const serverIcon = serverData.icon;

    var newserver = `<div><img class="serverimg" src="${serverIcon}"><div class="serverinfo">${serverName}<span style="float: right">${serverPlayers}/${servermaxPlayers}</span><br><span>${serverMotd}</span></div></div>`;
    document.querySelector('.grid_cav').innerHTML += newserver;
        if(localStorage.getItem('serverlist') != null){
            newserver += localStorage.getItem('serverlist');
        }
        localStorage.setItem('serverlist', newserver);
        console.log(newserver);
}

function addserver(){
    swal("Type you add server's IPAddress:", {
        content: "input",
        })
        .then((value) => {
            if(value.length > 5)
            {
                updateServerInfo(value);
            }
        });
}
    // 使用 localStorage 读取数据
    var sli_data = localStorage.getItem('serverlist');
    console.log(sli_data);
    if(sli_data != null){
        document.getElementById("slist").innerHTML = sli_data;
    }