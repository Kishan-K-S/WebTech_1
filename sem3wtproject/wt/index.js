var express = require ("express");
// var bodyparser = require ("body-parser");
// var mongoose = require("mongoose");
const app = express()
const url="mongodb://127.0.0.1:27017"
var MongoClient = require ("mongodb").MongoClient;
var i=0;
MongoClient.connect (url)
.then((db)=>{
    app.listen(3000);
    console.log("connected to database and listening to 3000 port");
})
.catch((err)=>console.log(err));

app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public/'));
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/',(req,res)=>{
    res.set ({
        "Allow-access-Allow-Origin": '*'
    })
    res.render('home', {i:JSON.stringify(id)});
})

app.post('/',(req,res)=>{
    myfunc1(req,true).then(()=>{
        console.log(i);
        if(i==1)
        {
            res.redirect('/');
        }
        else{
            res.redirect('/signup');
        }
    })
})

app.get('/thingstodo',(req,res)=>{
    res.render('things');
})

app.get('/hotels',(req,res)=>{
    res.render('hotels');
})

app.get('/signup',(req,res)=>{
    res.render('SINGUP')
})

app.post('/signup',(req,res)=>{
    console.log(req.body);
    MongoClient.connect(url)
    .then((db)=>{
        let dbo=db.db("jkk");
        dbo.collection("applicants").insertOne(req.body,(err,res)=>{
            if (err) 
            console.log(err);
            else
            db.close();
        })
    })
    .catch((err)=>console.log(err));
    myfunc(req,false).then(()=>{
        console.log(req.body);
        res.redirect('/'+ id);
    })

})

app.get('/historical',(req,res)=>{
    res.render('historical')
})

app.get('/reach',(req,res)=>{
    res.render('reach')
})

app.get('/pub',(req,res)=>{
    res.render('pub')
})

app.get('/shopping',(req,res)=>{
    res.render('shopping')
})

app.get('/malls',(req,res)=>{
    res.render('malls')
})

app.get('/trek',(req,res)=>{
    res.render('trek')
})

app.get('/cafe',(req,res)=>{
    res.render('cafe')
})

app.get('/travel',(req,res)=>{
    res.status(404).send("error")
})

app.get('/things',(req,res)=>{
    res.render('things')
})

app.get('/feedback',(req,res)=>{
    res.render('feedback')
})
app.post('/feedback',(req,res)=>{
    console.log(req.body);
    MongoClient.connect(url)
    .then((db)=>{
        let dbo=db.db("jkk");
        dbo.collection("notes").insertOne(req.body,(err,res)=>{
            if (err) throw err;
            db.close();
        })
    })
    .catch((err)=>console.log(err));
    res.redirect('/');
})



app.post("/signup",(req,res)=>{
    console.log(req.body)
})


let id;
function myfunc(req,flag){
    return new Promise((resolve,reject)=>{
        MongoClient.connect(url)
        .then((db)=>{
            let dbase=db.db("jkk");
            let a = req.body.phone;
            console.log(req.body);
            dbase.collection("applicants").find({"phone":a}).toArray((err,data)=>{
                console.log(data);
                id=data[0]._id.toString();
                console.log(id);
                if (flag){
                    if(data[0].email==req.body.email){
                        i=1;
                        if (true){
                            resolve();
                        }
                        else 
                            reject();
                    }
                    else{
                        i=0
                        if(true)
                            resolve();
                        else
                            reject();
                    }
                }
                else{
                    if (true)
                        resolve();
                    else
                        reject();
                }
            })
        })
    })
}
function myfunc1(req,flag){
    return new Promise((resolve,reject)=>{
        MongoClient.connect(url)
        .then((db)=>{
            let dbase=db.db("jkk");
            let a = req.body.email;
            console.log(req.body);
            i=0;
            dbase.collection("applicants").find({"email":a}).toArray((err,data)=>{
                console.log(data);
                if (!data.length){
                    resolve();
                }
                else{
                id=data[0]._id.toString();
                console.log(id);
                if (flag){
                    if(data[0].email==req.body.email){
                        i=1;
                        if (true){
                            resolve();
                        }
                        else 
                            reject();
                    }
                    else{
                        i=0
                        if(true)
                            resolve();
                        else
                            reject();
                    }
                }
                else{
                    if (true)
                        resolve();
                    else
                        reject();
                }
            }
            })
        })
    })
}
app.get('/:id',(req,res)=>{
    res.set ({
        "Allow-access-Allow-Origin": '*'
    })
    res.render('home', {i:JSON.stringify(id)});
})
console.log("Listening on Port 3000");
app.get('/:id/feedback',(req,res)=>{
    res.set ({
        "Allow-access-Allow-Origin": '*'
    })
    res.render('feedback', {i:JSON.stringify(id)});
})
console.log("Listening on Port 3000");