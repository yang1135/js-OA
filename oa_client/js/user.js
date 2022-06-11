// 进行登录验证


// import { template } from "express-art-template"

// 拿到sessionStorage内的信息
const token = window.sessionStorage.getItem('token')
const id = window.sessionStorage.getItem('id')

    testLogin()
    async function testLogin(){
        // 判断token 和id 是否存在
        if(!token || !id)
        return window.location.href = './login.html'
        // 发送请求，请求用户个人信息
        const res = await $.ajax({
            url:'http://localhost:8080/users/info/' + id,
            // data:{id},
            headers:{authorization:token}
        })
        // console.log(res)
        // 成功
        if(res.code ===1){
            // 接受信息，渲染表格
            // console.log(res.info)
            $('.user').html(template('user_info',{list:res.info}))
            // 对文本域进行渲染
            document.getElementsByName('desc')[0].value = res.info.desc
            return
        }
        // 不成功，就跳回登录界面去
        window.location.href ='./login.html'
    }
    
    // const 
    document.addEventListener('click', async (e)=>{
        e.preventDefault()
        if(e.target.className === 'update')
        {
            const fm = new FormData($('form')[0])
            console.log(fm);

            var obj={}
            for (let [k,v] of fm){
                obj[k]=v
                if(k === 'nickname' && (v.length > 6 || v.length < 2))
               {
                alert('昵称最少两位，最长六位')
                return
               }
                if(k === 'desc' && (v.length > 200))
                {
                    alert('描述最多200字')
                    return
                }
                console.log(v);
            }
            obj.id = id
            //走到这里可以安心发送请求 
            const res = await $.ajax({
            url:'http://localhost:8080/users/update',
            method:'PUT',
            data:obj,
            // processData:false,
            // contentType:false,
            headers:{authorization:token},
            })
            console.log(res)
            if(res.code === 1){
                alert('修改成功')
                testLogin()
            }

        }
        else if( e.target.className === 'cancel'){
            console.log('点击取消')
            testLogin()
        }
        
    })

    // 有一个submit事件
    // 接收表格内的信息，然后进行验证

    // 发送更改的请求

