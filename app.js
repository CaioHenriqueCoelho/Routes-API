const express = require('express');
const app = express();
const port = 3000;
const query = require('./banco.js');
const bodyParser = require('body-parser');
app.use(bodyParser.json());



app.post('/positions', async (req, res) => {
    try {
        let info = {
          cep_ini: req.body.cep_ini,
          cep_des: req.body.cep_des
        }
        const result_ini = await query('select latitude as lat, longitude as lon, logradouro from data__log where cep = $1', [info.cep_ini]);
        const result_des = await query('select latitude as lat, longitude as lon, logradouro from data__log where cep = $1', [info.cep_des]);
        res.json({message:"Sucesso!!", info_ini: result_ini.rows[0], info_des: result_des.rows[0]});
      } catch (error) {
        console.log(error);
        res.json({message:"Algo deu Errado!!"});
      }
});

app.get('/mapa', async (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
