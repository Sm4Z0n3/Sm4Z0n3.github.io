function getPlayerSkinAndHead(playerId) {
    // 获取玩家的 UUID
    let response = fetch(`https://api.mojang.com/users/profiles/minecraft/${playerId}`);
    let data = response.json();
    let uuid = data.id;

    // 获取玩家的皮肤和头像
    response = fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`);
    data = response.json();
    let skinUrl = JSON.parse(atob(data.properties[0].value)).textures.SKIN.url;
    let headUrl = `https://crafatar.com/avatars/${uuid}?size=512&overlay`;

    return { uuid, skinUrl, headUrl };
}

function addalt()
{
    swal("Type you account username & e-mail.", {
        content: "input",
        })
        .then((usw) => {
            swal("Type you account password(online).", {
                content: "input",
                })
                .then((psw) => {
                    console.log("usw:" + usw,"psw:" + psw);
                    var skin = "";
                    var head = "";
                    var uuid = "";

                    getPlayerSkinAndHead(usw).then(data => {
                        skin = data.skinUrl;
                        head = data.headUrl;
                        uuid = data.uuid;
                    });
                    swal(uuid);
                });
        });
}