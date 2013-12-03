angular-delegate-event
======================

<p>在angular内部，没有支持事件代理这个万一，但是在处理大量数据的时候，尤其是一些列表的时候，事件代理是必须的，那应该怎么样实现这个代理呢，并且用起来很方便呢，此处实现一个，有参考nishp1的<a href="https://github.com/nishp1/angular-delegate-event/blob/master/src/angular-delegates.js">angular-delegate-event</a>实现</p>
<h2>使用方法：</h2>
``` html
  <ul dg-click="itemClick($event, item)" selector="a">
    <li ng-repeat="item in items"><a href="javascript:;">item.name</a></li>
  </ul>
  
  <ul dg-event="itemClick($event, item)" event-name="click" selector="li">
    <li ng-repeat="item in items"><a href="javascript:;">item.name</a></li>
  </ul>
```
<p>内置的一些事件：click, dblclick, mousedown, mouseup, mouseover, mouseout, mousemove, mouseenter, mouseleave</p>
<h5>controller写法</h5>
``` js
  // 依赖DelegateEvents
  var app = angular.module('app', ['DelegateEvents']);
  
  app.controller('listCtl', function($scope) {
    
    $scope.itemClick = function(e, item) {
      // do something...
      
      // 注：
      // e 原始的event对象，但是增加了delegationTarget => 代理target元素
      //
      // 对于selector这块，如果引用了jQuery的话，则支持的是jquery的选择器；对于支持matchesSelector的浏览器来说，支持的就是标准的选择器；否则的话只能支持tagName...
    };
  })
```
