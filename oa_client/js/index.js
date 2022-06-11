// 导入person相关
import  {getUserList}  from './person.js'

// console.log(getUserList)
$(function (){
    // 实现选项卡
    $('.nav > li').click(function(){
        $(this).addClass('active').siblings().removeClass('active')
        $('.box > li').removeClass('active').eq($(this).index()).addClass('active')

        switch($(this).index()){
            case 0:getUserList();break;
            case 1:getBannerList();break;
        }
    })


    // 进行登录验证
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
            // 昵称换名
            $('.nickname').text(res.info.nickname)
            // 页面逻辑开始
            init()
            return
        }
        // 不成功，就跳回登录界面去
        window.location.href ='./login.html'
    }

    // 页面逻辑启动函数
    function init(){
        // getBannerList()
        getUserList()
    }

    // 获取轮播图列表
    async function getBannerList(){
        // 直接发送请求
        const res = await $.ajax({ url:'http://localhost:8080/banner/list',headers:{authorization:token}})
        console.log(res);
        // 使用列表内的信息渲染表格
        $('.banner_list > tbody').html(template('list_template',{list:res.list}))
    }
        // input type=file 改变的时候触发
        $('.banner .form input[type=file]').on('change', function (){
            const fileInfo = this.files[0]
            // console.log(fileInfo);
            if(!fileInfo) return

            if(fileInfo.type.split('/')[0] !== 'image') return this.value = ''

            // 利用fileReader 读取文件信息，展示在指定位置
            const fr = new FileReader()
            fr.readAsDataURL(fileInfo)
            // 解析完毕后执行的事件
            fr.onload =  res => {
                
                // console.log(res.currentTarget.result)
                // 展示出来
                $(this).prev().css('background-image', `url(${ res.currentTarget.result })`)
            }
        })

        // 点击确定上传
        $('.banner > .add').on('submit',async e => {
            e.preventDefault()
            // 利用formData获取表单信息
            const fm = new FormData($('.banner > .add')[0])
            console.log('轮播图的fm',fm)
            for (let [k,v] of fm){
            
                console.log(k,v)
                console.log(typeof(v))
            }
            const res = await $.ajax({
                url:'http://localhost:8080/banner/add',
                method:'PUT',
                data:fm,
                processData:false,
                contentType:false,
                headers:{authorization:token},
            })
            // console.log(res)
            // console.log('点击提交成功')

            if(res.code === 0) return alert(res.message)

            if(res.code === 1){
                alert('添加成功')
                getBannerList()
                // 加载完之后置空
                $('form')[0].reset()
                $('.banner .add .show div')[0].style.backgroundImage = ''
            }
        })

        // 点击删除
        $('.banner tbody').on('click', '.del', async function () {
            if (!window.confirm('您确定要删除该内容吗 ?')) return
            console.log(this);
            // 发送删除的请求
            const res = await $.ajax({
              url: 'http://localhost:8080/banner/remove/' + this.dataset.id,
              method: 'DELETE',
              headers: { authorization: token }
            })
            console.log('删除的res',res)
           
            if (res.code === 0) return alert(res.message)
           
            if (res.code === 1) {
              alert('删除成功')
              getBannerList()
              return
            }
          })

        //   进入编辑状态
        $('.banner tbody').on('click', '.edit', async function () {
            console.log('点击编辑')
            const res = await $.ajax({
                url: 'http://localhost:8080/banner/info/' + this.dataset.id,
                headers: { authorization: token }
              })
            console.log(res)
            
            if(res.code !== 1) return
            // 拿到信息填到指定位置
            $('.banner > .edit .title').val(res.info.title)
            $('.banner > .edit .link').val(res.info.link)
            $('.banner > .edit .show div').css('background-image',`url(http://localhost:8080${res.info.img_url})`)
            $('.banner > .edit .update').attr('data-id',res.info.id)
            $('.banner > .edit').show()
            $('.banner > .add').hide()
        })

        // 取消编辑状态
        $('.banner > .edit .cancel').on('click', (e)=>{
            e.preventDefault()
            $('.banner > .edit')[0].reset()
            $('.banner > .edit .show div')[0].style.backgroundImage = ''
            // 存在问题，点击取消按钮后，自动回到添加（初始页）
            $('.banner > .edit').hide()
            $('.banner > .add').show()
            console.log('aa');
        })

        // 确认编辑
        $('.banner > .edit').on('submit', async e => {
            e.preventDefault()

             // 利用formData获取表单信息
            const fm = new FormData($('.banner > .edit')[0])

            for (let [k,v] of fm){
                console.log(k,v)
                console.log(typeof(v))
            }
            // 补充一个id
            fm.append('id',$('.banner > .edit .update')[0].dataset.id)

            fm.forEach((v,k)=>{
                console.log(v,k)
            })
            console.log('******开始发送patch请求')
            const res = await $.ajax({
                url:'http://localhost:8080/banner/update',
                method:'PATCH',
                data:fm,
                processData:false,
                contentType:false,
                headers:{authorization:token},
            })
            console.log(res)
            console.log('点击确认编辑')

            if(res.code === 0) return alert(res.message)
            console.log(res)

            if(res.code === 1){
                alert('修改成功')
                getBannerList()
                $('.banner > .edit')[0].reset()
                $('.banner > .edit .show div')[0].style.backgroundImage = ''
                // 存在问题，点击取消按钮后，自动回到添加（初始页）
                $('.banner > .edit').hide()
                $('.banner > .add').show()
                // 加载完之后置空
                // $('.banner > .edit .cancel').trigger('click')
                // return
            }
        })

    
    // 用户相关
    // const list_info = {
    //     current:1,
    //     pagesize:5,
    //     is_status:'all',
    //     gender:'all',
    //     search:'',
    // }
    //     async function getUserList(){
    //         const res = await $.ajax({
    //             url:'http://localhost:8080/person/list',
    //             headers:{authorization:token},
    //             data:list_info,
    //         })
    //             // 根据 res 来渲染页面列表
    //     $('.users tbody').html(template('users_template', { list: res.list }))
    //     // 根据 res 来渲染页面分页器
    //     $('.users .pagination').html(template('users_pagination', { list_info, list: res.list, total: res.totalPage }))
    //     // 根据 res 来渲染筛选框
    //     $('.users .filter_box').html(template('users_filter', { list_info }))
    //     }
    // //    事件委托
    // $('.users .pagination').on('click',e =>{
    //     const t = e.target
    //     if(t.className === 'next'){
    //         list_info.current++
    //         getUserList()
    //     }
    //     if(t.className === 'prev'){
    //         list_info.current--
    //         getUserList()
    //     }
    //     if(t.className === 'first'){
    //         list_info.current = 1
            
    //         getUserList()
           
    //     }
    //     if(t.className === 'last'){
    //         list_info.current = t.dataset.total - 0
    //         getUserList()
    //     }
    //     if(t.className === 'item'){
            
    //         list_info.current = t.innerText - 0

    //         getUserList()
    //     }
    //     if(t.className === 'go'){
    //         let page = $(t).prev().val() - 0

    //         if(isNaN(page)) page = 1
    //         if(page <= 1) page = 1
    //         if(page >= t.dataset.total - 0) page = t.dataset.total - 0
    //         page = parseInt(page)
    //         list_info.current = page
    //         getUserList()
    //     }
    // })

    // // 筛选
    // $('.users .filter_box').on('click','button',()=>{
       
    //     list_info.search = $('.users .filter_box').find('.search').val()
    //     list_info.gender = $('.users .filter_box').find('.gender').val()
    //     list_info.is_status = $('.users .filter_box').find('.status').val()
    //     list_info.pagesize = $('.users .filter_box').find('.pagesize').val() - 0
    //     getUserList()
        
    // })

    // // 修改用户状态
    // $('.users table tbody').on('change','select', async function () {
    //     const id = this.dataset.id
    //     const status = this.value === '启用' ? 1 : 0
        
    //     // 发请求
    //     const res = await $.ajax({
    //         url:'http://localhost:8080/person/status',
    //         method:'PATCH',
    //         data:{id,status},
    //         headers:{authorization:token},

    //     })

    //     if(res.code === 1) return alert(res.message)
    // })
        
})