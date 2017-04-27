/**
 * Created by fm on 2017/4/26.
 */
import AV from "leancloud-storage"
var APP_ID = 'M6TLwD1YqifCWKoH4IJoriiD-gzGzoHsz';
var APP_KEY = 'R4SiMiuvQUf8G7I61hLWzPNp';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
// 查询并获取对象
var query = new AV.Query('TodoFolder');
query.include('name');
query.find().then(function (todos) {
    // 查询到商品后，在前端展示到相应的位置中。
    todos.forEach(function (todo) {
        console.log(todo.get("name"));
        console.log(todo.get("priority"))
    })
}).catch(function(error) {
    alert(JSON.stringify(error));
});
// 创建一个对象
 var TodoFolder = AV.Object.extend('TodoFolder');
 // 新建对象
 var todoFolder = new TodoFolder();
 // 设置名称
 todoFolder.set('name','工作');
 // 设置优先级
 todoFolder.set('priority',1);
 todoFolder.save().then(function (todo) {
 console.log('objectId is ' + todo.id);
 }, function (error) {
 console.error(error);
 });
 AV.Query.doCloudQuery('insert into Todo(name, priority) values("娱乐", 2)').then(function (data) {
 // data 中的 results 是本次查询返回的结果，AV.Object 实例列表
 var results = data.results;
 console.log(results);
 }, function (error) {
 //查询失败，查看 error
 console.error(error);
 });
/*var comment = new AV.Object('Comment');// 构建 Comment 对象
 comment.set('likes', 1);// 如果点了赞就是 1，而点了不喜欢则为 -1，没有做任何操作就是默认的 0
 comment.set('content', '这个太赞了！楼主，我也要这些游戏，咱们团购么？');
 // 假设已知被分享的该 TodoFolder 的 objectId 是 5735aae7c4c9710060fbe8b0
 var todoFolder = new AV.Object("TodoFolder");
 todoFolder.set("name","babybear");
 comment.set('targetTodoFolder', todoFolder);
 comment.save();//保存到云端*/
/*var comment = AV.Object.createWithoutData('Comment', '590165938d6d810058b689d8');
 comment.fetch().then(function () {
 var folder=comment.get("targetTodoFolder")
 console.log(folder);
 folder.fetch().then(function () {
 var name=folder.get("name");
 console.log(name);
 }
 )
 }, function (error) {
 // 异常处理
 });*/
/*var testDate = new Date('2016-06-04');
var testAVObject = new AV.Object('TestClass');
testAVObject.set('testDate', testDate);
testAVObject.save();*/
