const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const port = 8080;
const { eAdmin } = require('./middlewares/auth');
const User = require('./models/User');
const CadProduto = require('./models/CadProduto');
const CadRecycle = require('./models/CadRecycle');
const path = require('path');
const { application } = require('express');
const { match } = require('assert');
const handlebars = require('express-handlebars');
const bodyParser = require("body-parser");

app.use(express.json());

//rota cliente
const routeCliente = require("./routes/cliente"); 

//rota Produto
//const routeProduto = require("./routes/produto"); 

// handlebars
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//arquivos estáticos
app.use(express.static(path.join(__dirname,"public")));

//rotas
app.use('/cliente', routeCliente);
//app.use('/produto', routeProduto);


app.get('/cadastro',(req,res)=>{
    res.render('form');
});

app.get('/login',(req,res)=>{
    res.render('login');
});

app.get('/',(req,res)=>{
    res.render('home');
});


//pag1 da loja
   /// app.get('/p1',(req,res)=>{
      //  res.render('p1');
    //});

    //
app.get('/', eAdmin, async (req, res) => {

    await User.findAll({
        attributes: ['id','name','email'],
        order: [['id', "DESC"]]
    })
    .then((users)=>{
        return res.json({
            erro: false,
            users: users,
            id_usuario_logado: req.userId
        });
    })
   .catch(()=>{
    return res.status(400).json({
        erro: true,
        mensagem: "Erro ao cadastrado!",
    });
   });
});

app.post('/cadastro', async (req, res) => {

    var name = req.body.name
    var email = req.body.email
    var password = req.body.password

    var dados = req.body;
 
     dados.password = await bcrypt.hash(dados.password, 8);

    await User.create(dados)
    .then(()=>{
        return res.json({
            erro: false,
            mensagem: "Usuário cadastrado com Sucesso!",
        });
    }).catch(()=>{
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Nenhum usuário encontrado!!",
        });
});
});

app.post('/login', async (req, res) => {

    const user = await User.findOne({
        attributes: ['id', 'name', 'email', 'password'],
        where:{
            email: req.body.email
        }
    });

    if(user === null){
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou a senha incorreta!"
        });
    }
    //console.log(req.body);

    if(!(await bcrypt.compare(req.body.password, user.password))){
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou a senha incorreta!"
        });
    }

    var token = jwt.sign({id: user.id}, "QHDUA44G35AH6K42K4N3H4K34H5", {
        expiresIn: 3600 //10 min
    });

    return res.json({
        erro: false,
        mensagem: "Login realizado com sucesso!",
        token
    });
});

app.listen(port);