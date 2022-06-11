
const testList = (req,res,next)=> {
    
    const {current,pagesize,is_status,gender,search} = req.query
   
    // 参数验证
    if(!(current === undefined || !isNaN(current))) return next(5)
    if(!(pagesize === undefined || !isNaN(pagesize))) return next(5)
    if(!(is_status === undefined || is_status === 'all' || is_status - 0 === 0 || is_status - 0 === 1)) return next(5)
    if(!(gender === undefined || gender === 'all' || gender === '保密' || gender === '男' || gender === '女')) return next(5)

    // 附加默认值
    if (current === undefined) req.query.current = 1
    if (pagesize === undefined) req.query.pagesize = 5
    if (is_status === undefined) req.query.is_status = 'all'
    if (gender === undefined) req.query.gender = 'all'
    if (search === undefined) req.query.search = ''
    next()
}

const testStatus = (req,res,next)=>{
    const {id,status} = req.body
    
    if(id.length !== 24) return next(5)
    if(!(status === '1' || status === '0')) return next(5)
   
    next()
}

module.exports = {
    testList,
    testStatus,
}