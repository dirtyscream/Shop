import * as middleware from '../middleware/middleware'
import * as models from '../models/models'
import * as fs from 'fs'



export const getBasket = async (request, response) => {
  try {
    const user_id = request.user_id
    const basket_data = await models.Basket.findAll({
      where: { UsersId: user_id },
      raw: true
    })
    response.status(200).json(basket_data)
  }
  catch (error) {
    fs.appendFileSync("./server.log", `${error}\n`)
    response.status(500).json({ error: error.message || 'Internal Server Error' })
  }
}

export const addToBasket = async (request, response) => {
  try {
    const { product_id } = request.body
    const user_id = request.user_id
    if (!product_id) {
      response.status(400).json({ error: "Invalid data" })
      return
    }
    const product = await models.Product.findByPk(product_id)
    let cart = await models.Basket.findAll({ where: { product_id: product_id }, raw: true })
    if (!cart) {
      await models.Basket.create({
        UsersId: user_id,
      })
    }
  }
  catch (error) {
    fs.appendFileSync("./server.log", `${error}\n`)
    response.status(500).json({ error: error.message || 'Internal Server Error' })
  }
}