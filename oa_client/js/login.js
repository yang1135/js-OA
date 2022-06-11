$(function () {
    if (window.location.href.indexOf("/login") > -1) {
        //防止页面后退
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, document.URL);
        })
    }
})


$('form').on('submit', async e => {
    

    e.preventDefault()
    // console.log('摁下');
    // 发送ajax请求
    const res = await $.ajax({
        url: 'http://localhost:8080/users/login',
        method: 'POST',
        data: $('form').serialize(),
    })
    // console.log(res);
    if (res.code === 0) return $('.error').show()

    // oa一般存储在sessionStorage里面
    window.sessionStorage.setItem('token', res.token)
    window.sessionStorage.setItem('id', res.user_id)
   
    // 跳转页面
    window.location.href = './index.html'
    // console.log(res)
})
