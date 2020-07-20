const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const cartRoutes = require('./routes/cart')

const mongoose = require('mongoose')
const sprintf = require('sprintf').sprintf;
const config = require('./config');

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

// for css 
app.use(express.static(path.join(__dirname, 'public')));

// for read req.body
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/cart', cartRoutes);

async function start() {
    try {
        const PORT = config.PORT;
        const url = sprintf(
            config.MONGO_URL,
            config.NONGO_USER,
            config.MONGO_PASSWORD,
            config.MONGO_DB
        )

        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(3000, () => {console.log(`Server is running on port ${PORT}`)})
    } catch(e) {
        console.log(e)
    }
}

start()

