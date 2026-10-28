const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.get("/", (req, res) => {
    res.render("pages/index", {
        usuario: null
    });
});

router.get("/login", (req, res)=>{
    res.render("pages/login");

});

router.get("/compras", (req, res)=>{
    res.render("pages/compras");

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
  res.render("pages/cadastro", { "erros": null, "valores": {"nome":"","sobrenome":"","telefone":"","email":"","senha":""} ,"retorno":null });
});

router.get("/cadastro", (req, res) => {
    res.render("pages/cadastro", {
        erros: null,
        valores: {
            nome: "",
            sobrenome: "",
            email: "",
            senha: ""
        },
        retorno: null
    });
});

router.post(
    "/cadastro",

    body("nome")
        .isLength({ min: 3, max: 15 })
        .withMessage("Nome deve ter de 3 a 15 caracteres!"),

    body("sobrenome")
        .isLength({ min: 3, max: 100 })
        .withMessage("Sobrenome deve ter de 3 a 100 caracteres!"),

    body("email")
        .isEmail()
        .withMessage("Email inválido!"),

    body("senha")
        .isLength({ min: 8, max: 72 })
        .withMessage("Senha deve ter de 8 a 72 caracteres!"),

    function (req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).render("pages/cadastro", {
                erros: errors.array(),
                valores: req.body,
                retorno: null
            });
        }

        return res.render("pages/cadastro", {
            erros: null,
            valores: req.body,
            retorno: req.body
        });
    }
);
router.get("/contato", (req, res)=>{
    res.render("pages/contato", {
        usuario: req.session.usuario || null
    });
});

router.get("/fornecedor", (req, res)=>{
    res.render("pages/fornecedor",{
        usuario: req.session.usuario || null
    });
});

module.exports = router;