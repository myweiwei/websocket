
const WebSocket = require('ws');// 导入WebSocket模块:
const WebSocketServer = WebSocket.Server;// 引用Server类:
const wss = new WebSocketServer({ port: 3000 });// 实例化: 端口3000


wss.on('connection', function(ws) {
    // 接收客户端数据
    ws.on('message', (message)=> {
      console.log(message);
      message = JSON.parse(message)
      if(message.type == 'name'){
        ws.userName = message.data;
        return;
      }
      wss.clients.forEach((client)=>{
        // 不接收自己发的信息
        if(client != ws){
          client.send(JSON.stringify({
             name: ws.userName,
             data: message.data,  
             time:  message.time
          }))
        }
      })
    });
    // 关闭 断开的客户端
    ws.on('close',function () {
      console.log('已断开');
    })
  });


