       // 进行登录验证

// import { template } from "express-art-template";

    // 拿到sessionStorage内的信息
    const token = window.sessionStorage.getItem('token')
    const id = window.sessionStorage.getItem('id')
   
   // 用户相关
    const list_info = {
        current:1,
        pagesize:5,
        is_status:'all',
        gender:'all',
        search:'',
    }
        async function getUserList(){
            const res = await $.ajax({
                url:'http://localhost:8080/person/list',
                headers:{authorization:token},
                data:list_info,
            })
                // 根据 res 来渲染页面列表
                console.log('返回的res',res);
                console.log('list_info:',list_info)
        $('.users tbody').html(template('users_template', { list: res.list }))
        // 根据 res 来渲染页面分页器
        $('.users .pagination').html(template('users_pagination', { list_info, list: res.list, total: res.totalPage }))
        // 根据 res 来渲染筛选框
        $('.users .filter_box').html(template('users_filter', { list_info }))


        }
    //    事件委托
    $('.users .pagination').on('click',e =>{
        const t = e.target
        if(t.className === 'next'){
            list_info.current++
            getUserList()
        }
        if(t.className === 'prev'){
            list_info.current--
            getUserList()
        }
        if(t.className === 'first'){
            list_info.current = 1
            
            getUserList()
           
        }
        if(t.className === 'last'){
            list_info.current = t.dataset.total - 0
            getUserList()
        }
        if(t.className === 'item'){
            
            list_info.current = t.innerText - 0

            getUserList()
        }
        if(t.className === 'go'){
            let page = $(t).prev().val() - 0

            if(isNaN(page)) page = 1
            if(page <= 1) page = 1
            if(page >= t.dataset.total - 0) page = t.dataset.total - 0
            page = parseInt(page)
            list_info.current = page
            getUserList()
        }
    })

    // 筛选
    $('.users .filter_box').on('click','button',()=>{
       
        list_info.search = $('.users .filter_box').find('.search').val()
        list_info.gender = $('.users .filter_box').find('.gender').val()
        list_info.is_status = $('.users .filter_box').find('.status').val()
        list_info.pagesize = $('.users .filter_box').find('.pagesize').val() - 0
        console.log(list_info);
        getUserList()
        
    })

    // 修改用户状态
    $('.users table tbody').on('change','select', async function () {
        const id = this.dataset.id
        const status = this.value === '启用' ? 1 : 0
        
        // 发请求
        const res = await $.ajax({
            url:'http://localhost:8080/person/status',
            method:'PATCH',
            data:{id,status},
            headers:{authorization:token},

        })

        if(res.code === 1) return alert(res.message)
    })

    // 添加新用户
    const fileInp = document.querySelector('.content > .box > .users  .show > input')
    const form = document.querySelector('.content > .box > .users .addUser')
    const addBtn = document.querySelector('.content > .box > .users button')
    const shutWindow = document.querySelector('.content > .box > li.users > .addUser >  span')
    // 点击添加新用户按钮 弹出添加框
    addBtn.onclick = function (e){
        e.preventDefault()
        form.style.visibility = 'visible'
    }
    // 点击小叉号
    shutWindow.onclick = function (){
        form.style.visibility = 'hidden'
    }
    fileInp.onchange = function(){
        // 拿到文件信息
        // console.dir(fileInp.files[0])
        if(!fileInp.files[0]) return
        if(fileInp.files[0].type.split('/')[0] !== 'image') return
        // 准备fileReader识别解析文件
        const fr = new FileReader()
        // 开始解析
        fr.readAsDataURL(fileInp.files[0])
        // 注册一个解析完毕后执行的事件
        fr.onload = (res)=>{
            // console.log(res.currentTarget.result)
            console.log($(this).prev())
            $(this).prev().css('background-image', `url(${ res.currentTarget.result })`)
        }
    }
    form.onsubmit = async function(e){
        e.preventDefault()
        console.log('点击添加')
        
        // 为什么这里用$('form')可以用form就不行
        const fm = new FormData($('form')[0])
        // console.log('fm.username',fm[username])
        // fm.set('gender',true)
        // for (let [k,v] of fm){
        //     console.log(k,v)
        //     if(k === 'age')
        //     v = v - 0
        //     if(k === 'is_status')
        //     {
        //         if(v === '启用')
        //         v = Boolean(true)
        //         else
        //         v = Boolean(false)
        //     }
        //    console.log(typeof(v))
        // }
        // console.log('第二次打印');
        for (let [k,v] of fm){
            
            console.log(k,v)
            console.log(typeof(v))
        }

        // console.log();
        // 发送请求
        const res = await $.ajax({
            url:'http://localhost:8080/person/add',
            method:'PUT',
            data:fm,
            processData:false,
            contentType:false,
            headers:{authorization:token},
        })
        console.log(res)
        if(res.code === 0) return alert(res.message)

        if(res.code === 1){
            // visibility: hidden;
            form.style.visibility = 'hidden'
            alert('添加成功')
            getUserList()
            // 加载完之后置空
            $('form')[0].reset()
            $('.content > .box > .users  .show div')[0].style.backgroundImage = ''
        }
    }

            // 删除用户按钮
            $('.content > .box > .users > .users_list ').on('click','.del', async function(){
                console.log(this)
                console.log('点击删除用户')
                if (!window.confirm('您确定要删除该用户吗 ?')) return
                // 发送删除请求
                const res = await $.ajax({
                    url:'http://localhost:8080/person/remove/' + this.dataset.id,
                    method:'DELETE',
                    headers: { authorization: token }
                })
                console.log('删除的用户Res',res)
                if(res.code === 0) return alert(res.message)
                if(res.code === 1){
                    alert('删除成功')
                    getUserList()
                    return
                }
            })
   
    // 修改用户 ， 渲染框框
            
        $('.content > .box > .users > .users_list').on('click','.edit',async function(){
            // console.log(this)
            // console.log('点击编辑用户')
            const edit = $('.content > .box > .users >  .editUser')
            // console.log(edit)
            edit.css('visibility', 'visible')
            // 获取用户信息
            const res = await $.ajax({
                url: 'http://localhost:8080/person/info/' + this.dataset.id,
                headers: { authorization: token }
              })
            console.log('获取到用户信息',res)
            // 渲染框框
            $('.editUser').html(template('user_edit',{list:res.info}))
            // $('.user').html(template('user_info',{list:res.info}))
        })
        //点叉号取消
        $('.content > .box > .users > .editUser  ').on('click','span',()=>{
            console.log('点击关闭修改窗口');
            const edit = $('.content > .box > .users >  .editUser')
            // console.log(edit)
            edit.css('visibility', 'hidden')
        })
    // 修改用户， 获取信息，发送请求

    export  {
        getUserList
    }
    
    