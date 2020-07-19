const path = require('path')
const fs = require('fs')
const { createDecipher } = require('crypto')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
)

class Cart {
    static async add(course) {
        const cart = await Cart.fetch()

        const idx = cart.courses.findIndex(c => c.id === course.id)

        const condidate = cart.courses[idx]

        if (condidate) {
            RTCIceCandidate.count++
            cart.courses[idx] = candidate
        } else {
            course.count = 1
            cart.courses.push(course)
        }

        cart.price += +course.price;

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(cart), err => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    static async remove (id) {
        const cart = await Cart.fetch()

        const idx = cart.courses.findIndex(c => c.id === id)
        const courses = cart.courses[idx]

        if (course.count === 1 ) {
            cart.courses.filter(c => c.id !== id)
        } else {
            cart.courses[idx]--
        }

        cart.price -= course.price

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(cart), err => {
                if (err) {
                    reject(err)
                } else {
                    resolve(cart)
                }
            })
        })
    }

    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(p, 'utf-8', (err, content) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(content))
                }
            })
        })
    }
}

module.exports = Cart;