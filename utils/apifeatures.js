class ApiFeatures{
    constructor(query,queryStr) {
        this.query = query;
        this.queryStr = queryStr
    }
    search(){
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex : this.queryStr.keyword,
                $options : 'i'
            }
        } : {}
        console.log("keyword", keyword)

        this.query = this.query.find({...keyword})
        return this
    }
    filter(){
        const copyQuery = {...this.queryStr}
        console.log('copyQuery',copyQuery)
        //Removing some fields for category
        const removeFields = ['keyword','page','limit']
        removeFields.forEach(key=>delete copyQuery[key])
        console.log('copyQuery',copyQuery)

        let queryStr = JSON.stringify(copyQuery)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`)

        this.query = this.query.find(JSON.parse(queryStr))
        console.log('queryStr',queryStr)
        return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1) // 5* 0
        this.query = this.query.limit(resultPerPage).skip(skip)
        return this
    }
}
module.exports = ApiFeatures