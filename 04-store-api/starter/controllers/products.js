const product = require('../models/product')
const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    //consulta
    // const search = 'a'


    const products = await Product.find({ price: { $gt: 30 } })
        .sort('name')
        .select('name price')
        .limit(30)
        .skip(0)
    res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query
    const queryObject = {}

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    if (company) {
        query.object.company = company
    }
    if (name) {
        query.object.name = { $regex: name, $options: 'i' }
    }
    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`)
        const options = ['price', 'rating']
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) }
            }
        })
    }
    console.log(queryObject);
    let result = Product.find(queryObject)
    if (sort) {
        // products = products.sort()
        //Vai mostrar quais parametro de pesquisa foi enviado para o sort
        // console.log(sort);
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort(crateAt)
    }
    if (fields) {
        const fildsList = fields.split(',').join(' ')
        result = result.select(fildsList)
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)
    const products = await result
    res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
    getAllProducts, getAllProductsStatic
}