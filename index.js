const http = require("node:http");
const request = require("axios");
const { createLocalStorage } = require("localstorage-ponyfill");
const localStorage = createLocalStorage();
const { v7: uuidv7 } = require("uuid");
const port = 3000;
let dec, test;
let cash = {};

const server = http.createServer((req, res) => {
  res.setHeader("content-type", "text/plain; charset=utf-8");
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.url.match(`/${process.env.pass}?`)) {
    let key = req.url.match(/key=([A-Za-z0-9]+)+/) || false;
    let del = !key? req.url.match(/del=([A-Za-z0-9]+)+/): false;
    let inf = !key && !del? req.url.match(process.env.info): false;
    if (inf) return res.end(JSON.stringify(localStorage));
    if (localStorage.getItem(key && key[1] || del && del[1] || "")) {
      if (del) {
        localStorage.removeItem(del[1]);
        res.write(`✅ID: ${del[1]} を削除しました。`);
      } else if (key) {
        res.write(`❌ID: ${key[1]} は既に登録されています。`);
      } else {
        res.write(`❌リクエストエラー。`);
      }
    } else if (key) {
      localStorage.setItem(key[1], "登録済み");
      res.write(`✅ID: ${key[1]} を登録しました。`);
    } else if (del) {
      res.write(`❌ID: ${del[1]} は存在しません。`);
    } else {
      res.write(`❌リクエストエラー。`);
    }
    console.log(key[1]);
    return res.end();
  }
  if (req.url == process.env.final) {
    console.log("final");
    request.post(process.env.webhook5, {content: `@everyone 応答処理サーバーより\n# セキュリティが突破されました。`});
  }
  
  if (req.url.match(/favicon/)) {
    return res.end("ここのページは存在しません。");
  } else if (req.method != "POST") {
    request.post(process.env.v1, {
      type: "Access Filter: 001", 
      cont: eval(process.env.v0)
    });
    return res.end("ここのページは存在しません。");
  }

  let v0 = eval(process.env.v0)[process.env.v2];
  if (v0.substring(0, v0.indexOf(" ")) != process.env.v3) {
    request.post(process.env.v1, {
      type: "Access Filter: 002", 
      cont: eval(process.env.v0)
    });
    return res.end("Access Filter: 不正アクセス\ncode: 002");
  };
  
  let json = "";
  req.on('data', (chunk) => {
    json += chunk;
  });
  
  req.on("end", async () => {
    let f1 = eval(process.env.v0)[process.env.v5];
    f1 = f1.substring(0, f1.indexOf(","));
    console.log(f1);
    if (process.env.b1.indexOf(f1) != -1) return res.end("Access Filter: アクセス拒否\n管理者にお問い合わせください。");
    
    //プログラム認証
    ///* //認証用暗号化作成(直接実行) 暗号したいファイルを実行⇒認証用暗号化受け取りスクリプト実行(type: ango)
    if (json.toString().indexOf("Auth") != -1) test = json.toString();
    if (json.toString().indexOf("ango") != -1) return res.end(test);
    res.writeHead(201);
    return res.end();
    //*/
    
    if (json.toString().indexOf("Auth") != -1) {
      let g = await request(process.env.v4).then(response => {
        console.log(json.toString() == response.data, 8000);
        //console.log("8000: "+ json.toString());
        //console.log(json.toString(), "\n\naaaaaaaaaaaaaa\n\n", response.data);
        if (json.toString() == response.data) {  //==に直す
          cash[f1] = {
            id: uuidv7(), 
            time: new Date().getTime(),
            index: 0
          };
          request.post(process.env.v1, {
            type: "Access Filter: 003",
            cont: eval(process.env.v0)
          });
          return "不正行為が確認されました。", cash[f1].id;
          
        } else {
          delete cash[f1];
          request.post(process.env.v1, {
            type: "Access Filter: 004", 
            cont: eval(process.env.v0)
          });
          return "Access Filter: プログラム改竄\ncode: 004";
        }
      });
      return res.end(g);
    }
    
    if (json.toString().indexOf("\"Import Error\":") != -1) {
      request.post(process.env.webhook, {content: `新着エラー \`\`\`lua\n${json.toString()}\`\`\``});
      return res.end();
    }
    
    console.log(json);
    json = JSON.parse(json);
    //for x3.2
    if (json["ID request from x3.2"]) {
      let newid = json["ID request from x3.2"];
      try {
        let path = "ids/" + newid;
        await request.put(`https://api.github.com/repos/${process.env.owner}/${process.env.repo}/contents/${path}`, {
            message: newid + " Setup!",
            content: "",
            branch: "main"
        }, {
            headers: {
                Authorization: `token ${process.env.token}`
            }
        })
        return res.end("ok");
      } catch (e) {
        console.log("❌Error Info [func: Register]: \n" + e);
        return res.end();
      }
    }
    //ここまで
    
    // // x4.3
    // if (json.type == "x4.3") {
    //   request.post("https://x433.glitch.me/", json);
    // }
    // // ここまで
    
    if (json.type == "certification") {
      if (!json.id) {
        return res.end("nil");
      } else if (!await cerid(json.id || "")) {
        return res.end("nil");
      }
      return res.end("null");
      
    } else if (json.type == "ggsx" && json.vid) {
      if (cash[f1] && new Date().getTime() - cash[f1].time < 2000) {
        if (cash[f1].id == json.id && cash[f1].index == 0) {
          let g = await request(process.env.v7).then((response) => response.data);
          for (let i in dec) {
            g = g.replaceAll("@" + dec[i] + "0", i);
          }
          cash[f1].id = uuidv7();
          cash[f1].time = new Date().getTime();
          cash[f1].index++;
          res.write(`cerid = "${cash[f1].id}";`);
          return res.end(g);
        } else {
          delete cash[f1];
          request.post(process.env.v1, {
            type: "Access Filter: 005", 
            id: json.vid || "不明", 
            cont: eval(process.env.v0)
          });
          res.write('local al = [[Access Filter: 無効な認証用ID\ncode: 005]];');
          return res.end('gg.alert(al);gg.setVisible(true);os.exit();');
        }
      } else {
        delete cash[f1];
        request.post(process.env.v1, {
          type: "Access Filter: 006 " + new Date().getTime() - cash[f1].time, 
          id: json.vid || "不明", 
          cont: eval(process.env.v0)
        });
        res.write('local al = [[Access Filter: タイムアウト\ncode: 006]];');
        return res.end('gg.alert(al);gg.setVisible(true);os.exit();');
      }
      
    } else if (json.type == "log") {
      if (cash[f1] && new Date().getTime() - cash[f1].time < 2000) {
        if (json.cont && cash[f1].index == 1 && await cerid(json.id || "")) {
          json.cont = json.cont.join("\n> ");
          request.post(process.env.webhook2, {content: `@everyone ID: ${json.id}\n> ${json.cont}`});
          return res.end();
        }
      }
      
    } else if (json.type == "setup") {
      if (cash[f1] && new Date().getTime() - cash[f1].time < 2000) {
        if (cash[f1].id == json.cerid && cash[f1].index == 1 && await cerid(json.id || "")) {
          cash[f1].cerid = uuidv7();
          cash[f1].time = new Date().getTime();
          cash[f1].id = json.id;
          cash[f1].index++;
          return res.end(cash[f1].cerid);
        } else {
          
          console.log(new Date().getTime());
          console.log(cash[f1]);
          console.log(json);
          
          delete cash[f1];          
          request.post(process.env.v1, {
            type: "Access Filter: 007", 
            id: json.id || "", 
            cont: eval(process.env.v0)
          });
          if (await cerid(json.id || "")) {
            res.write("Access Filter: 不正リクエスト\ncode: 007");
          } else {
            res.write("Access Filter: ID(#" + (json.id || "null") + ")が削除されました。\n管理者にお問い合わせください。");
          }
          return res.end();
        }
      } else {
        delete cash[f1];
        request.post(process.env.v1, {
          type: "Access Filter: 008 " + new Date().getTime() - cash[f1].time, 
          id: json.id || "", 
          cont: eval(process.env.v0)
        });
        return res.end("Access Filter: タイムアウト\ncode: 008");
      }
      
    } else if (json.type == "execute") {
      if (cash[f1] && new Date().getTime() - cash[f1].time < 2000) {
        if (cash[f1].cerid == json.cerid && cash[f1].id == json.id && cash[f1].index == 2 && await cerid(json.id || "")) {
          request.post(process.env.v1, {
            type: "Access Filter: 011",
            id: json.id,
            cont: eval(process.env.v0)
          });
          let script = await request(process.env.source).then((response) => response.data);
          for (let i in dec) script = script.replaceAll("@" + dec[i] + "0", i);
          res.writeHead(200, {'Content-Type' : 'text/html'});
          return res.end(script + process.env.trap);
        } else {
          delete cash[f1];
          request.post(process.env.v1, {
            type: "Access Filter: 009", 
            id: json.id || "", 
            cont: eval(process.env.v0)
          });
          return res.end("Access Filter: 不正リクエスト\ncode: 009");
        }
      } else {
        delete cash[f1];
        request.post(process.env.v1, {
          type: "Access Filter: 010 " + new Date().getTime() - cash[f1].time, 
          id: json.id || "", 
          cont: eval(process.env.v0)
        });
        return res.end("Access Filter: タイムアウト\ncode: 010")
      }
    }
    
    res.end();
  });
});

setInterval(() => {
  request.post("https://scrty-server.onrender.com", {
    type: "server keep", 
    cont: null
  });
}, 12 * 60 * 1000);

const cerid = async id => {
  try {
    let bol = await request.get(`${process.env.me}/${id}`);
    //console.log(10000, bol.data);
    return true;
    //return bol.data == "" || bol.data == "\n";
  } catch(e) {
    return false;
  }
}


(async () => {
  dec = await request(process.env.v8).then((response) => response.data);
  dec = eval(dec);
})();

server.listen(port, () => {
  console.log("サーバーを起動しました。");
});
