const express= require('express');
const app= express();
const cors = require('cors');

app.use(cors())
app.use(express.json());

//course routes
const courseRoutes= require('./routes/course')
app.use('/api/course', courseRoutes)

const pageBuilderRoutes= require('./routes/pageBuilder')
app.use('/api/page', pageBuilderRoutes)

const menuBuilderRoutes= require('./routes/menuBuilder')
app.use('/api/menu', menuBuilderRoutes)

const authorRoutes= require('./routes/author')
app.use('/api/author',authorRoutes)

const categoryRoutes= require('./routes/category')
app.use('/api/category',categoryRoutes)

//lesson routes
const lessonRoutes= require('./routes/lesson')
app.use('/api/lesson', lessonRoutes)

//blog routes
const blogRoutes= require('./routes/blog')
app.use('/api/blog', blogRoutes)

//enroll routes
const enrollRoutes= require('./routes/enroll')
app.use('/api/enroll', enrollRoutes)

//transaction routes
const transactionRoutes= require('./routes/transaction')
app.use('/api/transaction', transactionRoutes)

//profile routes
const profileRoutes= require('./routes/profile')
app.use('/api/profile', profileRoutes)

//media routes
const mediaRoutes= require('./routes/media')
app.use('/api/media', mediaRoutes)

//home routes
const homeRoutes= require('./routes/home')
app.use('/api/home', homeRoutes)

//book routes
const bookRoutes= require('./routes/book')
app.use('/api/book', bookRoutes)

//Dashboard routes
const dashboardRoutes= require('./controllers/DashboardController')
app.use('/api/dashboard', dashboardRoutes)



app.use(express.static(__dirname + '/public'));

app.get('/redirect', (req,res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.use('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

const PORT= process.env.PORT || 5000;

app.listen(PORT, () => console.log('Serving.. ' + PORT));
