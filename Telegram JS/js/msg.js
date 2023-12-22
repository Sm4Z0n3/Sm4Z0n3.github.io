var commands = "a a".split(" ");
function messageAA(chatId,userId,messageId,messageText,chatName,userName){
    var result = "MESSAGENULL";

    if(messageText == "/help"){
        result = "帮助菜单\n1.帮助1\n2.帮助2\n3.帮助3";
    }
    
    return result;
}