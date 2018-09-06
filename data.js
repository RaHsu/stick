const fs = require('fs');
const dbFile = 'data.json';

// 读取并解析json
function readJson(){
  let json = JSON.parse(fs.readFileSync(dbFile));
  return json;
}

// 写json
function writeJson(data){
  let json = JSON.stringify(data);
  fs.writeFileSync(dbFile,json);
}

//生成id
function uid(){
  return Math.floor(Math.random()*1000000000);
}

let db = {};

db = {
  // 插入一条记录
  insert:function(content){
    let json = readJson();
    let record = {
      id:uid(),
      content:content
    }
    json.unshift(record);
    writeJson(json);
    return true;
  },
  // 获取记录（字符串形式）
  get:function(){
    let json = readJson();

    return JSON.stringify(json);
  },
  // 删除一条记录
  delete: function(id){
    let json = readJson();
    for(let i = 0; i < json.length; i++){
      if(json[i].id === id){
        json.splice(i, 1);
        console.log('删除一条记录');
        writeJson(json);
        return true;
      }
    }
  }
}

module.exports = db;
