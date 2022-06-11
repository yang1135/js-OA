// 注销登录
const logout = document.querySelector('.logout')

logout.onclick = function (){
    window.localStorage.clear()
    window.sessionStorage.clear()
    // window.history.pushState()
    // window.
    window.location.href = '../pages/login.html'
    // window.history.pushState()
}