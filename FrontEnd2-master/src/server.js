const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// Defina suas rotas aqui
app.get('/api/exemplo', (req, res) => {
  const exemplo = { mensagem: 'Exemplo de resposta da API' };
  res.json(exemplo);
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
