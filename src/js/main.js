var shammiApp = angular.module('shammiApp', ['ngRoute', 'ui.bootstrap']);
shammiApp.controller('mainCtrl', ["$scope", "$routeParams", "$rootScope", "$modal", "$http", function($scope, $routeParams, $rootScope, $modal, $http) {
    $rootScope.move_to = false;
    $rootScope.msg_false = function() {
        $rootScope.mail_success = false;
        $rootScope.mail_fail = false;
        $rootScope.on_login = false;
        $rootScope.login_success = false;
        $rootScope.login_fail = false;
    }
    $rootScope.msg_false();
   
    /*----------- Google Analytics  -----------*/
    (function(i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function() {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
    ga('create', 'UA-64925744-1', 'auto');
    $rootScope.send_GA = function(data_cat, data_action) {
        // google analytics
        if (data_cat && data_action)
            ga('send', 'event', data_cat, data_action, $rootScope.guest_id);
    };

    window.onbeforeunload = function(){
        //localStorage.setItem("link_data", '');
    }

    /*----------- End Google Analytics  -----------*/


    $scope.show_menu = function() {
        var menu_height = $('#main_nav').height();
        if (menu_height == '35') {
            $('#main_nav').height(210);
        } else {
            $('#main_nav').height(35);
        }
    };

    $scope.login_dialogs = function() {
        $rootScope.msg_false();
        $rootScope.on_login = true;
        $modal.open({
            keyboard: true,
            templateUrl: 'message_box.html',
            scope: $rootScope
        });
    };

    $rootScope.no_login = function(x, y) {
        var request = $http({
            method: "post",
            url: "log.php",
            data: {
                user_name: x,
                password: y
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        request.success(function(data) {
            if (data.res == 'pass' && data.mgs == 'pass' && data.token) {
                $rootScope.msg_false();
                $rootScope.login_success = true;
                $modal.open({
                    keyboard: false,
                    templateUrl: 'message_box.html',
                });
                console.log(data.log);
                window.location.href = '#/system';
                localStorage.setItem("link_data", JSON.stringify(data));   

            } else {
                $rootScope.msg_false();
                $rootScope.login_fail = true;
                $modal.open({
                    keyboard: false,
                    templateUrl: 'message_box.html',
                });
            }

        })

    };



    function store_details() {
        $http({
            method: "post",
            url: "log.php",
            data: {
                id: $rootScope.guest_id,
                provider: $rootScope.guest_details.as,
                city: $rootScope.guest_details.city,
                country: $rootScope.guest_details.country,
                countryCode: $rootScope.guest_details.countryCode,
                isp: $rootScope.guest_details.isp,
                lat: $rootScope.guest_details.lat,
                lon: $rootScope.guest_details.lon,
                org: $rootScope.guest_details.org,
                query: $rootScope.guest_details.query,
                region: $rootScope.guest_details.region,
                regionName: $rootScope.guest_details.regionName,
                status: $rootScope.guest_details.status,
                timezone: $rootScope.guest_details.timezone,
                zip: $rootScope.guest_details.zip
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

    };


    function getInfo() {
        $http.get('http://api.ipify.org').success(
            function(response) {
                $rootScope.guest_id = response;
                $http.get('http://ip-api.com/json/' + response).success(
                    function(response2) {
                        $rootScope.guest_details = response2;
                        ga('send', 'event', 'Guest Info', $rootScope.guest_id, $rootScope.guest_details);
                        store_details();
                    }).error(function() {
                    setTimeout('getInfo', 1500);
                });
            });

    }

    getInfo();



    function simpleParallax() {
        var scrolled = $(window).scrollTop() + 3;
        $('.plxScroll').css('background-position', '0' + -(scrolled * 0.3) + 'px');
        $('#pannel1').css('background-position', '0' + -(scrolled * 0.2) + 'px');
        $('#pannel4').css('background-position', '0' + -((-220) + scrolled * 0.18) + 'px');
        $('#pannel8').css('background-position', '0' + -((-250) + scrolled * 0.2) + 'px');
    };

    window.location.href = '#/home';

    $(window).scroll(function(e) {
        simpleParallax();
    });

    $(window).scroll(function() {

        var pos = $(document).scrollTop();
        //        console.log(pos);
        if (pos > 735) {
            $('#main_nav').css('margin-top', '0px');

        } else {
            $('#main_nav').css('margin-top', '-100px');
        }

        if (pos > 2807) {
            $('#pannel5').css('position', 'relative');
            $('#pannel5').css('top', '1302px');
            $('#pannel12').css('display', 'none');
        } else {

            if (pos > 2012) {
                $('#pannel12').css('display', 'block');
                $('#pannel12').css('position', 'fixed');
                $('#pannel12').css('top', '245px');
                $('#pannel12_cover').css('display', 'block');
                $('#pannel7').css('top', '0px');
            } else {
                $('#pannel12').css('position', 'relative');
                $('#pannel12').css('top', '0px');
                $('#pannel12_cover').css('display', 'block');
            }
            if (pos > 1500) {
                $('#pannel5').css('position', 'fixed');
                $('#pannel5').css('top', '-66px');
            } else {
                $('#pannel5').css('position', 'relative');
                $('#pannel5').css('top', '0px');
                $('#pannel7').css('top', '0px');
            }

        }
        var light = ((pos - 1800) * 0.01) / 4;
        if (pos > 1800) {
            $('#second_header').css('opacity', light);
        } else {
            $('#second_header').css('opacity', light);
        }

        if (pos > 3770) {
            $rootScope.move_to = false;
            window.location.href = '#/contact';
            $rootScope.move_to = true;
        } else if (pos > 735) {
            $rootScope.move_to = false;
            window.location.href = '#/about';
            $rootScope.move_to = true;
        } else {
            $rootScope.move_to = false;
            window.location.href = '#/home';
            $rootScope.move_to = true;
        }
    });

    /*        $scope.name = "test";
            $scope.address = "moo@asas.com";
            $scope.note = "SKJHSDLKJHLLKJFSHLFKJSHFLKSJFHDSKFJ";*/




}]);
shammiApp.controller('reportCtrl', ["$scope", "$routeParams", "$rootScope", function($scope, $routeParams, $rootScope) {
    var city = [],country = [],zip = [], state=[], ip=[];
    var ndata = localStorage.getItem("link_data");
    ndata = angular.fromJson(ndata);
    console.log(ndata);
    $scope.data_base = ndata.log;

    for (var i = 0; i < $scope.data_base.length; i++) {
        city.push($scope.data_base[i].city);
        country.push($scope.data_base[i].country);
        zip.push($scope.data_base[i].zip);
        state.push($scope.data_base[i].regionName);
        ip.push($scope.data_base[i].ip);
    }

    function unique(list) {
        var new_list = [];
        $.each(list, function(i, e) {
            if ($.inArray(e, new_list) == -1) new_list.push(e);
        });
        return new_list;
    }

    $scope.citys = unique(city);
    $scope.countrys = unique(country);
    $scope.zips = unique(zip);
    $scope.states = unique(state);
    $scope.ips = unique(ip);

}]);




shammiApp.controller('homeCtrl', ["$scope", "$routeParams", "$rootScope", function($scope, $routeParams, $rootScope) {

    var location = document.URL.toString().split('/')[4];
    if (location == 'home' && $rootScope.move_to) {
        $('html,body').animate({
            scrollTop: 0
        }, 1000);
    }
    $rootScope.move_to = true;
}]);

shammiApp.controller('aboutCtrl', ["$scope", "$routeParams", "$rootScope", function($scope, $routeParams, $rootScope) {

    var location = document.URL.toString().split('/')[4];
    if (location == 'about' && $rootScope.move_to) {
        $('html,body').animate({
            scrollTop: 740
        }, 1000);
    }
    $rootScope.move_to = true;
}]);

shammiApp.controller('contactCtrl', ["$scope", "$routeParams", "$rootScope", "$http", "$modal", function($scope, $routeParams, $rootScope, $http, $modal) {

    var location = document.URL.toString().split('/')[4];
    if (location == 'contact' && $rootScope.move_to) {
        $('html,body').animate({
            scrollTop: 3800
        }, 1000);
    }

    $rootScope.move_to = true;

    $scope.sendMail = function() {
        var request = $http({
            method: "post",
            url: "contact.php",
            data: {
                name: $scope.name,
                address: $scope.address,
                note: $scope.note
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        /* Check whether the HTTP Request is Successfull or not. */
        request.success(function(data) {
            if (data.message == 'pass') {
                $scope.name = '';
                $scope.address = '';
                $scope.note = '';
                window.location.href = '#/home';
                $rootScope.msg_false();
                $rootScope.mail_success = true;
                $modal.open({
                    keyboard: false,
                    templateUrl: 'message_box.html',
                });
            }
        }).error(function(data, status) {
            $rootScope.msg_false();
            $rootScope.mail_fail = true;
            $modal.open({
                keyboard: false,
                templateUrl: 'message_box.html',
            });
        });
    }


}]);

shammiApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'home.html',
            controller: 'homeCtrl'
        })
        .when('/about', {
            templateUrl: 'home.html',
            controller: 'aboutCtrl'
        })
        .when('/contact', {
            templateUrl: 'home.html',
            controller: 'contactCtrl'
        })
        .when('/system', { 
            templateUrl: 'reports.html',
            controller: 'reportCtrl'
        })
            /*.when('/show/:theName/:no1',{
                templateUrl: 'show.html',
                controller: 'showNCt'
            })*/
        .otherwise({ redirectTo: '/home' });
}]);
