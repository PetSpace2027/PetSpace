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




router.get("/cadastro", (req, res) => {
    res.render("pages/cadastro", {
        erros: [],
        valores: {
            nome: "",
            sobrenome: "",
            email: "",
            senha: ""
        },
        retorno: null
    });
});

// Processar cadastro
router.post(
    "/cadastro",

    body("nome")
        .trim()
        .notEmpty()
        .withMessage("Digite seu nome.")
        .bail()
        .isLength({ min: 3, max: 15 })
        .withMessage("O nome deve ter de 3 a 15 caracteres.")
        .bail()
        .matches(/^[A-Za-zÀ-ÿ ]+$/)
        .withMessage("Use apenas letras e espaços no nome.")
        .bail()
        .custom(nome => {
            if (nome.toLowerCase() === "admin") {
                throw new Error("Esse nome não pode ser utilizado.");
            }
            return true;
        }),

    body("sobrenome")
        .trim()
        .notEmpty()
        .withMessage("Digite seu sobrenome.")
        .bail()
        .isLength({ min: 3, max: 100 })
        .withMessage("O sobrenome deve ter de 3 a 100 caracteres."),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Digite seu e-mail.")
        .bail()
        .isEmail()
        .withMessage("Digite um e-mail válido."),

    body("senha")
        .isLength({ min: 8, max: 72 })
        .withMessage("A senha deve ter de 8 a 72 caracteres."),

    (req, res) => {
        const resultado = validationResult(req);

        if (!resultado.isEmpty()) {
            return res.status(400).render("pages/cadastro", {
                erros: resultado.array(),
                valores: {
                    nome: req.body.nome || "",
                    sobrenome: req.body.sobrenome || "",
                    email: req.body.email || "",
                    senha: ""
                },
                retorno: null
            });
        }

        // Validação concluída.
        // Este trecho ainda não salva o usuário no banco de dados.
        return res.render("pages/cadastro", {
            erros: [],
            valores: {
                nome: "",
                sobrenome: "",
                email: "",
                senha: ""
            },
            retorno: {
                nome: req.body.nome,
                sobrenome: req.body.sobrenome,
                email: req.body.email
            }
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