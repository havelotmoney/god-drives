var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LoginManager = (function () {
    function LoginManager() {
    }
    LoginManager.login = function () {
    };
    return LoginManager;
}());
__reflect(LoginManager.prototype, "LoginManager");
