import * as middleware from '../middleware/middleware'
import * as models from '../models/models'
import bcrypt from 'bcrypt'
import * as fs from 'fs'



export const addProduct = async (request, response) => {
  try {
    const { name, description, product_type, price } = request.body
    console.log(request.user.company_id)
    if (!name ||
      !description ||
      !product_type || !price ||
      typeof name !== 'string' ||
      typeof description !== 'string' ||
      typeof product_type !== 'number') {
      response.status(400).json({ error: "Invalid data" })
      return
    }
    const product = await models.Product.create({
      name: name,
      description: description,
      CompanyId: request.user.company_id,
      CategoryId: product_type,
      price: price
    })
    response.status(200).json(product)
  }
  catch (error) {
    fs.appendFileSync("./server.log", `${error}\n`)
    response.status(500).json({ error: error.message || 'Internal Server Error' })
  }
}

export const findProduct = async (request, response) => {
  try {
    const { name } = request.body
    if (!name) {
      response.status(400).json({ error: "Invalid data" })
      return
    }
    const data = await models.Product.findAll({
      where: { name: name },
      raw: true
    })
    response.status(200).json(data)
  }
  catch (error) {
    fs.appendFileSync("./server.log", `${error}\n`)
    response.status(500).json({ error: error.message || 'Internal Server Error' })
  }
}

export const filterProduct = async (request, response) => {
  try {
    const { name, filter } = request.body
    if (!name || !filter) {
      response.status(400).json({ error: "Invalid data" })
      return
    }

  }
  catch (error) {
    fs.appendFileSync("./server.log", `${error}\n`)
    response.status(500).json({ error: error.message || 'Internal Server Error' })
  }
}


export const addComment = async (request, response) => {
  try {
    const { text, product_id } = request.body
    const user_id = request.user_id
    if (!text) {
      response.status(400).json({ error: "Invalid data" })
      return
    }
    const comment = await models.Comment.create({
      text: text,
      ProductsId: product_id,
      UsersId: user_id,
    })
    response.status(200).json(comment)
  }
  catch (error) {
    fs.appendFileSync("./server.log", `${error}\n`)
    response.status(500).json({ error: error.message || 'Internal Server Error' })
  }
}

export const productInfo = async (request, response) => {
  try {
    const id = request.query.id
    if (!id) {
      response.status(400).json({ error: "Invalid data" })
      return
    }
    const data = await models.Product.findAll({
      where: {
        id: id
      },
      include: models.Comment,
      raw: true,
    })
    response.status(200).json(data)
  }
  catch (error) {
    fs.appendFileSync("./server.log", `${error}\n`)
    response.status(500).json({ error: error.message || 'Internal Server Error' })
  }
}