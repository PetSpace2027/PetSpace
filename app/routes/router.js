const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("pages/index", {
        usuario: null
    });
});

router.get("/login", (req, res)=>{
    res.render("pages/login");

});

router.post("/login", (req, res) => {

    const UserNome = req.body.nome;
    const UserSenha = req.body.senha;

    if (UserNome === "lais@gmail.com" && UserSenha === "0305") {

        req.session.usuario = {
            nome: "Laís",
            premium: false
        };

        return res.redirect("/compras");
    }

    if (UserNome === "nathan@gmail.com" && UserSenha === "0705") {

        req.session.usuario = {
            nome: "Nathan",
            premium: true
        };

        return res.redirect("/compras");
    }

    res.send("Usuário ou senha inválidos.");
});

router.get("/cadastro", (req, res)=>{
    res.render("pages/cadastro");
});


router.get("/compras", (req, res) => {

    res.render("pages/compras", {
        usuario: req.session.usuario || null
    });
});



module.exports = router;