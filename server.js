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
        res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Main</title><link rel="stylesheet" href="css/style.css"><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet"></head><body><div class="top div" id="top_admin"><a href="/">main</a>                    <a href="/register">register</a>                    <a href="/login">login</a>                    <a href="/admin">admin</a></div><div class="main div" id="main_admin">brak dostępu do tej strony</div></body></html>`)
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
        res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Main</title><link rel="stylesheet" href="css/style.css"><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet"></head><body><div class="top div"><a href="/">main</a>                    <a href="/register">register</a>                    <a href="/login">login</a>                    <a href="/admin">admin</a></div><div class="main div">Witaj ${req.body.login}, zostałeś zarejestrowany!</div></body></html>`)
        console.log(tab)
    }
    else {
        res.send(`<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Register</title>
        
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
        res.send(`<!DOCTYPE html>                <html lang="en">                                <head>                    <meta charset="UTF-8">                    <meta name="viewport" content="width=device-width, initial-scale=1.0">                    <title>Login</title>                    <link rel="stylesheet" href="css/style.css">                    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet">                </head>                              <body>                    <div class="top div">                        <a href="/">main</a>                        <a href="/register">register</a>                        <a href="/login">login</a>                        <a href="/admin">admin</a>                    </div>                    <div class="main div">niepoprawne hasło lub login                       <form method="POST" action="/logUserIn" id="form">                            <label for="login">login:</label>                            <input required type="text" name="login">                           <br>                            <label for="password">password:</label>                            <input required type="password" name="password">                            <br>                            <button name="submit">Submit</button>                        </form>                    </div>                </body>                                </html>`)
    }
})

app.get("/logOut", function (req, res) {
    logged = 0
    res.redirect("/admin")
})

app.get("/show", function (req, res) {
    if (logged == 0) {
        res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Show</title><link rel="stylesheet" href="css/style.css"><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet"></head><body><div class="top div" id="top_admin"><a href="/">main</a>                    <a href="/register">register</a>                    <a href="/login">login</a>                    <a href="/admin">admin</a></div><div class="main div" id="main_admin">brak dostępu do tej strony</div></body></html>`)
    }
    else {
        var head = `<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>show</title><link rel="stylesheet" href="css/style.css"><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet"></head>`
        var topPanel = "<body><div class='top div'  id='top_panel'><a href='/'>main</a>        <a href='/register'>register</a>        <a href='/login'>login</a>    <a href='/admin'>admin</a>  <a href='/logOut'>logout</a></div><div id='main'><a href='/sort'>sort</a>  <a href='/gender'>gender</a>    <a href='/show'>show</a>"
        var table = '<table id="table1">'
        for (i = 0; i < tab.length; i++) {
            var id = "<td class='cell_0'>id: " + tab[i].id + "</td>"
            var user = "<td class='cell_1'>user: " + tab[i].log + " - " + tab[i].pass + "</td>"
            var student = ""
            if (tab[i].student == "yes") {
                student = "<td class='cell_2'>student: " + tab[i].student + "</td>"
            }
            var age = "<td class='cell_3'>age: " + tab[i].age + "</td>"
            var gender = "<td class='cell_4'>gender: " + tab[i].gender + "</td>"
            table += "<tr>" + id + user + student + age + gender + "</tr>"
        }
        var fullPage = head + topPanel + table + "</table></div></body>"
        res.send(fullPage)
    }
})

app.get("/gender", function (req, res) {
    if (logged == 0) {
        res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Gender</title><link rel="stylesheet" href="css/style.css"><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet"></head><body><div class="top div" id="top_admin"><a href="/">main</a>                    <a href="/register">register</a>                    <a href="/login">login</a>                    <a href="/admin">admin</a></div><div class="main div" id="main_admin">brak dostępu do tej strony</div></body></html>`)
    }
    else {
        var head = `<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>show</title><link rel="stylesheet" href="css/style.css"><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet"></head>`
        var topPanel = "<body><div class='top div'  id='top_panel'><a href='/'>main</a>        <a href='/register'>register</a>        <a href='/login'>login</a>    <a href='/admin'>admin</a>  <a href='/logOut'>logout</a></div><div id='main'><a href='/sort'>sort</a>  <a href='/gender'>gender</a>    <a href='/show'>show</a>"
        var tableF = "<table id='table1'>"
        var tableM = "<table id='table2'>"
        for (i = 0; i < tab.length; i++) {
            if (tab[i].gender == "female") {
                var id = "<td class='cell_0'>id: " + tab[i].id + "</td>"
                var user = "<td class='cell_1'>user: " + tab[i].log + " - " + tab[i].pass + "</td>"
                var student = ""
                if (tab[i].student == "yes") {
                    student = "<td class='cell_2'>student: " + tab[i].student + "</td>"
                }
                var age = "<td class='cell_3'>age: " + tab[i].age + "</td>"
                var gender = "<td class='cell_4'>gender: " + tab[i].gender + "</td>"
                tableF += "<tr>" + id + user + student + age + gender + "</tr>"
            } else {
                var id = "<td class='cell_0'>id: " + tab[i].id + "</td>"
                var user = "<td class='cell_1'>user: " + tab[i].log + " - " + tab[i].pass + "</td>"
                var student = ""
                if (tab[i].student == "yes") {
                    student = "<td class='cell_2'>student: " + tab[i].student + "</td>"
                }
                var age = "<td class='cell_3'>age: " + tab[i].age + "</td>"
                var gender = "<td class='cell_4'>gender: " + tab[i].gender + "</td>"
                tableM += "<tr>" + id + user + student + age + gender + "</tr>"
            }
        }
        let fullPage = head + topPanel + tableF + "</table>" + tableM + "</table></body>"
        res.send(fullPage)
    }

})

app.get("/sort", function (req, res) {
    if (logged == 0) {
        res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Sort</title><link rel="stylesheet" href="css/style.css"><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet"></head><body><div class="top div" id="top_admin"><a href="/">main</a>                    <a href="/register">register</a>                    <a href="/login">login</a>                    <a href="/admin">admin</a></div><div class="main div" id="main_admin">brak dostępu do tej strony</div></body></html>`)
    }
    else {
        if (req.query.sort != null) {
            sort = req.query.sort
        }
        if (sort == 0) {
            tab1.sort(function (a, b) {
                return parseFloat(b.age) - parseFloat(a.age)
            })
            var changeTable = '<form action ="/sort" onchange="this.submit()"><input type="radio" name="sort" value = "1">rosnąco<input type="radio" name="sort" value = "0" style="margin-left: 30px" checked="checked">malejąco</form>'
        }
        else {
            tab1.sort(function (a, b) {
                return parseFloat(a.age) - parseFloat(b.age)
            })
            var changeTable = '<form action ="/sort" onchange="this.submit()"><input type="radio" name="sort" value = "1" checked="checked">rosnąco<input type="radio" name="sort" value = "0" style="margin-left: 30px">malejąco</form>'
        }
        var head = `<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>show</title><link rel="stylesheet" href="css/style.css"><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet"></head>`
        var topPanel = "<body><div class='top div'  id='top_panel'><a href='/'>main</a>        <a href='/register'>register</a>        <a href='/login'>login</a>    <a href='/admin'>admin</a>  <a href='/logOut'>logout</a></div><div id='main'><a href='/sort'>sort</a>  <a href='/gender'>gender</a>    <a href='/show'>show</a>"

        var table = '<table id="table1">'
        for (i = 0; i < tab1.length; i++) {
            var id = "<td class='cell_0'>id: " + tab1[i].id + "</td>"
            var user = "<td class='cell_1'>user: " + tab1[i].log + " - " + tab1[i].pass + "</td>"
            var student = ""
            if (tab1[i].student == "yes") {
                student = "<td class='cell_2'>student: " + tab1[i].student + "</td>"
            }
            var age = "<td class='cell_3'>age: " + tab1[i].age + "</td>"
            var gender = "<td class='cell_4'>gender: " + tab1[i].gender + "</td>"
            table += "<tr>" + id + user + student + age + gender + "</tr>"
        }
        var fullPage = head + topPanel + changeTable + table + "</table></div></body>"
        res.send(fullPage)
    }
})


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
