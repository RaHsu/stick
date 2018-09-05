const fs = require('fs');
const dbFile = 'data.json';

// 读取并解析json
async readJson(){
  let json = JSON.parse(await fs.readfile(dbFile,function(data){
    if (err) {
         return console.error(err);
    }
    return data;
  }));
  return json;
}

// 写json
async writeJson(data){
  let json = JSON.stringify(data);
  await fs.writeFile(dbFile,json,function(){
    if (err) {
         return console.error(err);
      }
      console.log("数据写入成功");
  })
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
  }
  // 获取记录（字符串形式）
  get:function(){
    let json = readJson();
    return JSON.stringify(json);
  }
  // 删除一条记录
  delete: function(id){
    let json = readJson();
    for(let i = 0; i < json.length; i++){
      if(json[i].id === id){
        json.splice(index, 1);
        console.log('删除一条记录');
        return true;
      }
    }
  }
}

module.exports = db;
