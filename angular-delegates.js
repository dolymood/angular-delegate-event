'use strict'

;(function() {
    
    var root = document.documentElement;
    var matchesSelector = root.matches ||
                          root.matchesSelector ||
                          root.webkitMatchesSelector ||
                          root.mozMatchesSelector ||
                          root.msMatchesSelector ||
                          root.oMatchesSelector;
    var mSelector = function(ele, selector) {
        if (typeof jQuery !== 'undefined') {
            return jQuery(ele).is(selector);
        }
        if (matchesSelector) {
            return matchesSelector.call(ele, selector);
        }
        return ele.tagName.toLowerCase() === selector;
    };
    var getClosest = function(ele, selector, rootE) {
        rootE || (rootE = root);
        while(ele && ele != rootE && (rootE.contains(ele))) {
            if (mSelector(ele, selector)) {
                return ele;
            } else {
                ele = ele.parentNode;
            }
        }
        return null;
    };
    var dgEventDirectives = {};
    
    if (!root.contains) {
        Node.prototype.contains = function(arg) {
            return !!(this.compareDocumentPosition(arg) & 16);
        }
    }

    var rtObj = /^\s*?{.+}\s*?$/;

    angular.forEach(
        'Event Click Dblclick Mousedown Mouseup Mouseover Mouseout Mousemove Mouseenter Mouseleave'.split(' '),
        function(name) {

            var dirName = 'ngd' + name;

            dgEventDirectives[dirName] = ['$parse', function($parse) {

                return function(scope, ele, attrs) {
                    var selector = attrs.selector;
                    var eventName = (name == 'Event' ? (attrs.eventName || 'click') : name.toLowerCase());
                    var events = attrs[dirName];
                    if (selector.match(rtObj)) {
                        selector = scope.$eval(selector);
                    }
                    if (events.match(rtObj)) {
                        // 是对象
                        events = scope.$eval(events);
                        angular.forEach(events, parseFn);
                    } else {
                        parseFn(events, eventName);
                    }

                    function parseFn(events, eventName) {
                        var func = $parse(events);
                        ele.on(eventName, function(e) {
                            var target = e.target;
                            var el;
                            if (
                                (el = getClosest(
                                    target,
                                    typeof selector == 'string' ? selector : selector[eventName], 
                                    ele[0]
                                    )
                                )
                            ) {
                                e.delegationTarget = el;
                                func(angular.element(el).scope(), {$event: e, $params: [].slice.call(arguments, 1)});
                                if (!scope.$$phase) {
                                    scope.$apply();
                                }
                            }
                        });
                    }

                };
            }];
        }
    );

    angular.module('DelegateEvents', []).directive(dgEventDirectives);

})()
