const {Router} = require('express');
const Course = require('../models/course');
const router = Router();


router.get('/dd', (req, res, next) => {
    res.render('add', {
        title: 'Add page',
        isHome: true
    })
})

router.post('/', (req, res) => {
    
    const course = new Course(
        req.body.title,
        req.body.price,
        req.body.image);

        course.save();
    res.redirect('/courses');
})
module.exports = router;