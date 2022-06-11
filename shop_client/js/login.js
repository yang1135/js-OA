// const e = require("express")

$(function (){
    
    // 表单登录
    $('form').on('submit',async e => {
      
        e.preventDefault()
     
        const res  = await $.ajax({
            url: '/users/login',
            data: $('form').serialize(),
            method: 'POST',
        })

        console.log(res.code)

        if(res.code === 0){
            $('form .error').text(res.message).show()
            return
        }
      if(res.code === 1)
        window.location.href = '/pages/index'
    })
})