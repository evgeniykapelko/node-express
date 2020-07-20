const { Router } = require('express');
const Course = require('../models/course');
const router = Router();


router.get('/', (req, res, next) => {
    res.render('add', {
        title: 'Add page',
        isHome: true
    })
})

router.post('/', async (req, res) => {
    const course = new Course({
        title: req.body.title,
        price: req.body.price,
        img: req.body.img
    })

    try {
        await course.save();
        res.redirect('/courses');
    } catch (e) {
        console.log(e)
    }
    
})
module.exports = router;