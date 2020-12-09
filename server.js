var express = require("express")
var app = express()
var PORT = process.env.PORT || 3000;
var bodyParser = require("body-parser")

app.use(express.static('static'))

app.use(bodyParser.urlencoded({ extended: true }));

var path = require("path")

var logged = 0

var sort = 0

var tab = [
    { id: 1, log: "AAA", pass: "AAA", age: 17, student: "yes", gender: "male" },
    { id: 2, log: "BBB", pass: "PASS2", age: 26, student: "yes", gender: "male" },
    { id: 3, log: "CCC", pass: "PASS3", age: 12, student: "yes", gender: "female" },
    { id: 4, log: "DDD", pass: "PASS4", age: 18, student: "yes", gender: "female" }
]

var tab1 = [
    { id: 1, log: "AAA", pass: "AAA", age: 17, student: "yes", gender: "male" },
    { id: 2, log: "BBB", pass: "PASS2", age: 26, student: "yes", gender: "male" },
    { id: 3, log: "CCC", pass: "PASS3", age: 12, student: "yes", gender: "female" },
    { id: 4, log: "DDD", pass: "PASS4", age: 18, student: "yes", gender: "female" }
]

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/main.html"))
})

app.get("/register", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/register.html"))
})

app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/login.html"))
})

app.get("/admin", function (req, res) {
    if (logged == 0) {
        res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Main</title><script src="js/script.js"></script><link rel="stylesheet" href="css/style.css"><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet"></head><body><div class="top div" id="top_admin"><a href="/">main</a>                    <a href="/register">register</a>                    <a href="/login">login</a>                    <a href="/admin">admin</a></div><div class="main div" id="main_admin">brak dostępu do tej strony</div></body></html>`)
    }
    else {
        res.sendFile(path.join(__dirname + "/static/admin.html"))
    }

})

app.post("/registerUser", function (req, res) {
    var taken = 0
    for (x = 0; x < tab.length; x++) {
        if (req.body.login == tab[x].log) {
            taken++
        }
    }
    if (taken == 0) {
        tab.push({ id: tab.length + 1, log: req.body.login, pass: req.body.password, age: req.body.age, student: req.body.student, gender: req.body.gender })
        tab1.push({ id: tab.length + 1, log: req.body.login, pass: req.body.password, age: req.body.age, student: req.body.student, gender: req.body.gender })
        res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Main</title><script src="js/script.js"></script><link rel="stylesheet" href="css/style.css"><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet"></head><body><div class="top div"><a href="/">main</a>                    <a href="/register">register</a>                    <a href="/login">login</a>                    <a href="/admin">admin</a></div><div class="main div">Witaj ${req.body.login}, zostałeś zarejestrowany!</div></body></html>`)
        console.log(tab)
    }
    else {
        res.send(`<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Register</title>
        <script src="js/script.js"></script>
        <link rel="stylesheet" href="css/style.css">
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet">
    </head>
    
    <body>
        <div class="top div">
            <a href="/">main</a>
            <a href="/register">register</a>
            <a href="/login">login</a>
            <a href="/admin">admin</a>
        </div>
        <div class="main div">podany login jest zajęty
            <form method="POST" action="/registerUser" id="form">
                <label for="login">login:</label>
                <input required type="text" name="login">
                <br>
                <label for="password">password:</label>
                <input required type="password" name="password">
                <br>
                <label for="age">age:</label>
                <input required type="number" name="age" min="10" max="65">
                <br>
                <label for="student">student:</label>
                <input type="checkbox" name="student" value="yes">yes
                <br>
                <label for="gender">gender:</label>
                <input required type="radio" name="gender" value="male">male
                <input required type="radio" name="gender" value="female">female
                <br>
                <button name="submit">Submit</button>
            </form>
        </div>
    </body>
    
    </html>`)
    }
})

app.post("/logUserIn", function (req, res) {
    var log = 0
    for (x = 0; x < tab.length; x++) {
        if (req.body.login == tab[x].log) {
            if (req.body.password == tab[x].pass) {
                log = 1
            }
        }
    }
    if (log == 1) {
        logged = 1
        res.redirect("/admin")
    }
    else {
        res.send(`<!DOCTYPE html>                <html lang="en">                                <head>                    <meta charset="UTF-8">                    <meta name="viewport" content="width=device-width, initial-scale=1.0">                    <title>Login</title>                    <script src="js/script.js"></script>                    <link rel="stylesheet" href="css/style.css">                    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet">                </head>                              <body>                    <div class="top div">                        <a href="/">main</a>                        <a href="/register">register</a>                        <a href="/login">login</a>                        <a href="/admin">admin</a>                    </div>                    <div class="main div">niepoprawne hasło lub login                       <form method="POST" action="/logUserIn" id="form">                            <label for="login">login:</label>                            <input required type="text" name="login">                           <br>                            <label for="password">password:</label>                            <input required type="password" name="password">                            <br>                            <button name="submit">Submit</button>                        </form>                    </div>                </body>                                </html>`)
    }
})

app.get("/logOut", function (req, res) {
    logged = 0
    res.redirect("/admin")
})

app.get("/show", function (req, res) {
    if (logged == 0) {
        res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Main</title><script src="js/script.js"></script><link rel="stylesheet" href="css/style.css"><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet"></head><body><div class="top div" id="top_admin"><a href="/">main</a>                    <a href="/register">register</a>                    <a href="/login">login</a>                    <a href="/admin">admin</a></div><div class="main div" id="main_admin">brak dostępu do tej strony</div></body></html>`)
    }
    else {
        res.send(`<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>show</title>
        <script src="js/script.js"></script>
        <link rel="stylesheet" href="css/style.css">
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet">
    </head>
    <body>
    <div class="top div"  id="top_panel">
        <a href="/">main</a>
        <a href="/register">register</a>
        <a href="/login">login</a>
        <a href="/admin">admin</a>
        <a href="/logOut">logout</a>
    </div>
        <div id="main">
            <a href="/sort">sort</a>
            <a href="/gender">gender</a>
            <a href="/show">show</a>
        </div>
        <script>
        var tab1 = ${JSON.stringify(tab)}
            
            var table = document.createElement("table");
            table.id = "table1";
            for (y = 0; y < tab1.length; y++) {
                var tr = document.createElement("tr");
                table.appendChild(tr);
                for (x = 0; x < 5; x++) {
                    var td = document.createElement("td");
                    td.id = "cell." + y + "." + x;
                    td.classList.add("cell_" + x);
                    if (x == 0) {
                        td.innerHTML = "id: " + tab1[y].id;
                    }
                    else if (x == 1) {
                        td.innerHTML = "user: " + tab1[y].log + " - " + tab1[y].pass;
                    }
                    else if (x == 2) {
                        td.innerHTML = "age: " + tab1[y].age;
                    }
                    else if (x == 3) {
                        td.innerHTML = "student: " + tab1[y].student;
                    }
                    else if (x == 4) {
                        td.innerHTML = "gender: " + tab1[y].gender;
                    }
                    tr.appendChild(td);
                };
            };
            document.getElementById("main").appendChild(table);

        </script>
    </body>  
    </html>`)
    }
})

app.get("/gender", function (req, res) {
    if (logged == 0) {
        res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Main</title><script src="js/script.js"></script><link rel="stylesheet" href="css/style.css"><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet"></head><body><div class="top div" id="top_admin"><a href="/">main</a>                    <a href="/register">register</a>                    <a href="/login">login</a>                    <a href="/admin">admin</a></div><div class="main div" id="main_admin">brak dostępu do tej strony</div></body></html>`)
    }
    else {
        res.send(`<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>show</title>
        <script src="js/script.js"></script>
        <link rel="stylesheet" href="css/style.css">
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet">
    </head>
    <body>
    <div class="top div"  id="top_panel">
        <a href="/">main</a>
        <a href="/register">register</a>
        <a href="/login">login</a>
        <a href="/admin">admin</a>
        <a href="/logOut">logout</a>
    </div>
        <div id="main">
            <a href="/sort">sort</a>
            <a href="/gender">gender</a>
            <a href="/show">show</a>
        </div>
        <script>
        var tab1 = ${JSON.stringify(tab)}
            
            var table1 = document.createElement("table");
        table1.id = "table1";
        var table2 = document.createElement("table");
        table2.id = "table2";
        for (y = 0; y < tab1.length; y++) {
            if (tab1[y].gender == "female") {
                table = table1
            }
            else {
                table = table2
            }
            var tr = document.createElement("tr");
            for (x = 0; x < 5; x++) {
                var td = document.createElement("td");
                td.id = "cell." + y + "." + x;
                td.classList.add("cell_" + x);
                if (x == 0) {
                    td.innerHTML = "id: " + tab1[y].id;
                }
                else if (x == 1) {
                    td.innerHTML = "user: " + tab1[y].log + " - " + tab1[y].pass;
                }
                else if (x == 2) {
                    td.innerHTML = "age: " + tab1[y].age;
                }
                else if (x == 3) {
                    td.innerHTML = "student: " + tab1[y].student;
                }
                else if (x == 4) {
                    td.innerHTML = "gender: " + tab1[y].gender;
                }
                tr.appendChild(td);
            }
            table.appendChild(tr);
        };
        document.getElementById("main").appendChild(table1);
        document.getElementById("main").appendChild(table2);
        </script>
    </body>  
    </html>`)
    }

})

app.get("/sort", function (req, res) {
    if (req.query.sort) {
        sort = req.query.sort
    }
    if (logged == 0) {
        res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Main</title><script src="js/script.js"></script><link rel="stylesheet" href="css/style.css"><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet"></head><body><div class="top div" id="top_admin"><a href="/">main</a>                    <a href="/register">register</a>                    <a href="/login">login</a>                    <a href="/admin">admin</a></div><div class="main div" id="main_admin">brak dostępu do tej strony</div></body></html>`)
    }
    else {
        if (sort == 0) {
            tab1.sort(function (a, b) {
                return parseFloat(a.age) - parseFloat(b.age);
            });
        }
        else {
            tab1.sort(function (a, b) {

                return parseFloat(b.age) - parseFloat(a.age);
            });
        }
        if (sort == 0) {
            res.send(`<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>show</title>
        <script src="js/script.js"></script>
        <link rel="stylesheet" href="css/style.css">
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet">
    </head>
    <body>
    <div class="top div"  id="top_panel">
        <a href="/">main</a>
        <a href="/register">register</a>
        <a href="/login">login</a>
        <a href="/admin">admin</a>
        <a href="/logOut">logout</a>
    </div>
        <div id="main">
            <a href="/sort">sort</a>
            <a href="/gender">gender</a>
            <a href="/show">show</a>
            <form id="form2" onchange="this.submit()" method="GET>
                <label for="sort">rosnąco:</label>
                <input required type="radio" name="sort" value="0" checked="checked">
                <label for="sort">malejąco:</label>
                <input required type="radio" name="sort" value="1">
            </form>
        </div>
        <script>
            var tab1 = ${JSON.stringify(tab1)}     
            var table = document.createElement("table");
            table.id = "table1";
            for (y = 0; y < tab1.length; y++) {
                var tr = document.createElement("tr");
                table.appendChild(tr);
                for (x = 0; x < 5; x++) {
                    var td = document.createElement("td");
                    td.id = "cell." + y + "." + x;
                    td.classList.add("cell_" + x);
                    if (x == 0) {
                        td.innerHTML = "id: " + tab1[y].id;
                    }
                    else if (x == 1) {
                        td.innerHTML = "user: " + tab1[y].log + " - " + tab1[y].pass;
                    }
                    else if (x == 2) {
                        td.innerHTML = "age: " + tab1[y].age;
                    }
                    else if (x == 3) {
                        td.innerHTML = "student: "
                        if(tab1[y].student == "yes"){
                            td.innerHTML = "student: " + tab1[y].student;
                        }
                    }
                    else if (x == 4) {
                        td.innerHTML = "gender: " + tab1[y].gender;
                    }
                    tr.appendChild(td);
                };
            };
            document.getElementById("main").appendChild(table);
        </script>
    </body>  
    </html>`)

        }
        else {
            res.send(`<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>show</title>
        <script src="js/script.js"></script>
        <link rel="stylesheet" href="css/style.css">
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet">
    </head>
    <body>
    <div class="top div"  id="top_panel">
        <a href="/">main</a>
        <a href="/register">register</a>
        <a href="/login">login</a>
        <a href="/admin">admin</a>
        <a href="/logOut">logout</a>
    </div>
        <div id="main">
            <a href="/sort">sort</a>
            <a href="/gender">gender</a>
            <a href="/show">show</a>
            <form id="form2" onchange=" this.submit()" method="GET>
                <label for="sort">rosnąco:</label>
                <input required type="radio" name="sort" value="0">
                <label for="sort">malejąco:</label>
                <input required type="radio" name="sort" value="1" checked="checked">
            </form>
        </div>
        <script>
            var tab1 = ${JSON.stringify(tab1)}     
            var table = document.createElement("table");
            table.id = "table1";
            for (y = 0; y < tab1.length; y++) {
                var tr = document.createElement("tr");
                table.appendChild(tr);
                for (x = 0; x < 5; x++) {
                    var td = document.createElement("td");
                    td.id = "cell." + y + "." + x;
                    td.classList.add("cell_" + x);
                    if (x == 0) {
                        td.innerHTML = "id: " + tab1[y].id;
                    }
                    else if (x == 1) {
                        td.innerHTML = "user: " + tab1[y].log + " - " + tab1[y].pass;
                    }
                    else if (x == 2) {
                        td.innerHTML = "age: " + tab1[y].age;
                    }
                    else if (x == 3) {
                        td.innerHTML = "student: "
                        if(tab1[y].student == "yes"){
                            td.innerHTML = "student: " + tab1[y].student;
                        }
                    }
                    else if (x == 4) {
                        td.innerHTML = "gender: " + tab1[y].gender;
                    }
                    tr.appendChild(td);
                };
            };
            document.getElementById("main").appendChild(table);
        </script>
    </body>  
    </html>`)

        }
    }
})


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
