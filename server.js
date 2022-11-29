const express = require('express')
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const  errorHandlers  = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;



// costom middleware logger
app.use(logger);

//specifiying which ever domain can access the webserver
const whiteList = ['https://www.yourwebsite.com','http://127.0.0.1:5500','http://localhost:3500'];


// functions for cors

const corsOptions = {
  origin:(origin, callback) =>{
    if(whiteList.indexOf(origin) !== -1  || !origin ) {
      callback(null ,true);
  }else {
    callback(new Error('not allowed by CORS'));
  }
},
optionsSuccessStatus: 200
}


// cross origin resourse sharing (cors)
app.use(cors(corsOptions));


//built-in middleware to handle urlencoded data
// in other words, form data:
//'content-type: appplication/x-www-form-urlencoded'
app.use(express.urlencoded({extended: false}));

// built in middleware for json
app.use(express.json());

// serve static files 
// it will find the puyblic files and apply css to the pages
// so we can get rid of the ../ befor the path we defined
app.use(express.static(path.join(__dirname, '/public')));
app.use('/subdir',express.static(path.join(__dirname, '/public')));

//new method
app.use('/', require('./routs/root'));
//using the routing method //routes/subdir
app.use('/subdir', require('./routs/subdir'));

app.use('/employees', require('./routs/api/employees'));








//ROUTING

// moved to root.js


//route handlers



/* app.get('/hello(.html)?', (req, res, next) => {
console.log('Attempted to load hello.html');
next();// used to call another route
},

// (req, res, next) => {
    //res.send() 


  // if we have to chain more  then use "next"  or else only use req and res

    (req, res) => {
        res.send('hello wold!');
    });


    // chaning route handlers
    // instead of using the abouve route handlers we use the route handlers
    //GIVEN BELOW THIS



  const one = (req, res,next) => {
    console.log('one');
    next();
  }
  const two = (req, res,next) => {
    console.log('two');
    next();
  }
  const three = (req, res,next) => {
    console.log('three');
    res.send('finished!');
  }

 
  app.get('/chain(.html)?', [one, two, three]);
 */


// END OF ROUTE HANDLERS




//app.all :- used for routing all the functions 
app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views','404.html')); 
    } else if(req.accepts('JSON')){
        res.json({error:"404 Not found"}); 
    } else {
      res.getMaxListeners('txt').send("404 Not found");
    }
   
})

app.use(errorHandlers);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

