angular-delegate-event
======================

在angular中，默认不支持事件代理，但是在处理大量数据的时候，尤其是一些列表的时候，事件代理是必须的，那应该怎么样实现这个代理呢，并且用起来很方便呢，此处实现一个，有参考nishp1的[angular-delegate-event](https://github.com/nishp1/angular-delegate-event/blob/master/src/angular-delegates.js)实现；增加了对象式代理，详见使用方法

##使用方法：##

``` html
  <ul ngd-click="itemClick($event, item)" selector="a">
    <li ng-repeat="item in items"><a href="javascript:;">item.name</a></li>
  </ul>
  
  <ul ngd-event="itemClick($event, item)" event-name="click" selector="li">
    <li ng-repeat="item in items"><a href="javascript:;">item.name</a></li>
  </ul>
```

``` html
  <ul ngd-event="{click:'itemClick($event, item)','dblclick':'itemDblClick($event)'}" selector="{click:'li',dblclick:'a'}">
    <li ng-repeat="item in items"><a href="javascript:;">item.name</a></li>
  </ul>
```

内置的一些事件：`click`, `dblclick`, `mousedown`, `mouseup`, `mouseover`, `mouseout`, `mousemove`, `mouseenter`, `mouseleave`

####controller写法####

``` js
  // 依赖DelegateEvents
  var app = angular.module('app', ['DelegateEvents']);
  
  app.controller('listCtl', function($scope) {
    
    $scope.itemClick = function(e, item) {
      // do something...
      
      // 注：
      // e 原始的event对象，但是增加了delegationTarget => 代理target元素
      //
      // 对于selector这块，如果引用了jQuery的话，则支持的是jquery的选择器
      // 对于支持matchesSelector的浏览器来说，支持的就是标准的选择器；
      // 否则的话只能支持tagName...
    };
    // itemDblClick 同理。。
  })
```
