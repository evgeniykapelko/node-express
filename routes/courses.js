const {Router} = require('express');
const router = Router();

router.get('/', (req, res, next) => {
    res.render('courses', {
        title: 'Main page',
        isHome: true
    })
});

module.exports = router;