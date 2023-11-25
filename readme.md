# NovaWebClickGUI

#### 这是一个使用C#编写的Minecraft 作弊客户端的ClickGUI拉参程序.
#### 支持局域网内多设备拉参

## 安装
先使用cmd定位到文件夹内，运行
<pre>dotnet run</pre>
然后运行
<pre>start bin\Release\net6.0\WebPage.exe</pre>
浏览器打开
<pre>http://localhost:5000</pre>

### 安装为应用程序
在EDGE浏览器中，地址栏输入
<pre>edge://apps/</pre>
打开
<pre>在工具条上显示应用程序按钮</pre>
然后在拉参界面点击工具条中的应用，安装即可

### 局域网多设备
Win+R运行cmd，输入指令
<pre>ipconfig</pre>
找到 “IPv4 地址”一行
如果有多个则是 192.168.xxx.xxx
在连接同一个网络的其他设备上打开
<pre>http://192.168.xxx.xxx</pre>

## 对接接口方法
程序开放了一个接口
<pre>tcp://localhost:24317</pre>
可以使用Java程序调用
当用户在拉参界面点击保存按钮时，服务器会向客户端（Java程序）发送保存后的json数据，例如
<pre>{
	"Aimbot": {
		"Range": "4.4",
		"TurnSpeed": "2",
		"FOV": "180",
		"Center": false,
		"Lock": true,
		"OnClick": false,
		"Jitter": false
	},
	"Criticals": {
		"Mode": "Packet",
		"Delay": "0",
		"HurtTime": "10"
	}
}</pre>
