const {Router} = require('express');
const router = Router();

router.get('/dd', (req, res, next) => {
    res.render('add', {
        title: 'Add page',
        isHome: true
    })
})

module.exports = router;