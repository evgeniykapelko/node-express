const uuid = require('uuid/v4');
const fs = require('fs');
const path = require('path');

class Course {
    constructor(title, price, image) {
        this.title = title;
        this.price = price;
        this.image = image;
        this.id = uuid();
    }

    toJSON() {
        return {
            title: this.title,
            price: this.price,
            image: this.image,
            id: this.is
        }
    }
    async save() {
        const courses = await Course.getAll();
        courses.push(this.toJSON())

        return new Promise((resolve, reject) => {
            s.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '..', 'data', 'courses.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        throw reject(err);
                    } else {
                        resolve(JSON.parse(content))
                    }
                }
            )
        })
        
    }
}

module.exports = Course;