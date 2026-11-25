const express = require("express");
const router = express.Router();




router.get("/", (req, res)=>{
    res.render("pages/index-adm");
});

router.get("/clientes-adm", (req, res)=>{
    res.render("pages/clientes-adm");
});

router.get("/pedidos-adm", (req, res)=>{
    res.render("pages/pedidos-adm");
});

router.get("/analise-adm", (req, res)=>{
    res.render("pages/analise-adm");
});

router.get("/mensagens-adm", (req, res)=>{
    res.render("pages/mensagens-adm");
});

router.get("/relatorio-adm", (req, res)=>{
    res.render("pages/relatorio-adm");
});

router.get("/config-adm", (req, res)=>{
    res.render("pages/config-adm");
});



module.exports = router;