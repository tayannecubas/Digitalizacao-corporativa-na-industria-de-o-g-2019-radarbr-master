var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
/* GET users listing. */
router.get('/', function(req, res, next) {request(
  "https://www.sciencedirect.com/search/advanced?qs=energy%20efficiency",
  function(err, resx, body) {
    if (err) console.log("Erro: " + err);
    var titulos = []
    var $ = cheerio.load(body);
    $(".ResultList li").each(function() {
      var titulolink = $(this)
        .find(".result-item-content h2")
        .text()
        .replace(/\n/g, '')
        .trim();
      /*var pdf = $(this)
        .find(".gs_or_ggsm a")
        .text()
        .trim();*/
        if(titulolink.length){

          titulos.push(titulolink)
        }

        //console.log("Pdf " + pdf);
    });

    return res.status(200).json(titulos)

  }
);
});

module.exports = router;
