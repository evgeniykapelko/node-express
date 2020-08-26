const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session)
const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add')
const ordersRoutes = require('./routes/orders')
const coursesRoutes = require('./routes/courses')
const cartRoutes = require('./routes/cart')
const authRouters = require('./routes/auth')

const mongoose = require('mongoose')
const sprintf = require('sprintf').sprintf;
const config = require('./config');
const User = require('./models/user');
const varMiddleware = require('./middleware/variables');
const userMiddleware = require('./middleware/user');

const url = sprintf(
    config.MONGO_URL,
    config.NONGO_USER,
    config.MONGO_PASSWORD,
    config.MONGO_DB
)

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
const store = new MongoStore({
    collection: 'sessions',
    uri: url
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

// for css 
app.use(express.static(path.join(__dirname, 'public')));

// for read req.body
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store: store
}))
app.use(varMiddleware)
app.use(userMiddleware)

app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)


async function start() {
    try {
        const PORT = config.PORT;
        
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)})
    } catch(e) {
        console.log(e)
    }
}

start()

