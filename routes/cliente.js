const express = require('express');
const router = express.Router();
const User = require('../models/user');

        router.get('/',(req,res)=>{
            res.render('home');
        });
        
        router.get('/cadastro',(req,res)=>{
            res.render('form');
           
        });
        
        router.get('/login',(req,res)=>{
            res.render('login');
        });
        
            router.post('/login',(req,res)=>{
           User.create({
            email: req.body.email,
            password: req.body.password
               }).then(()=>{
                res.render('login');
           }).catch((error)=>{
                console.log("erro"+error);
           });
        });
        
        router.get('/minhaconta',(req,res)=>{
        res.render('opcao');
        
        });
           
        router.get('/detalhes',(req,res)=>{
            res.render('preDetails');
        });
        
        router.post('/detalhes',(req,res)=>{
            User.findOne({name:req.body.name}).then((user)=>{
                res.render('detailsUser',{user:user})
            }); 
            
        });
        
        router.get('/deletarusuario',(req,res)=>{
            res.render('deleteUser');
        });
        
        router.post('/deletarusuario',(req,res)=>{
            User.destroy({where:{'name': req.body.name} })
            res.send("Conta deletada com sucesso!");
        });
        
        router.get('/atualizarcadastro',(req,res)=>{
                    res.render('preEdit');      
        });
        
        router.post('/atualizarcadastro/',(req,res)=>{
             User.findOne({name:req.body.name}).then((user)=>{
                res.render('atualizarUser',{user:user});
            });

            User.update({where:{},
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
        });
        
        router.post("/atualizado",(req,res)=>{
            res.render('opcao');
        });
           
        module.exports = router;
