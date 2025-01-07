const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuração do CORS
app.use(cors());

// Configuração do multer para upload
const upload = multer({ dest: 'uploads/' });

// Rota para conversão de imagem
app.post('/convert', upload.single('image'), async (req, res) => {
  const inputPath = req.file.path; // Caminho do arquivo carregado
  const outputPath = `uploads/${req.file.filename}.webp`; // Caminho do arquivo convertido

  try {
    // Conversão para WebP
    await sharp(inputPath).webp().toFile(outputPath);

    // Envio do arquivo convertido para download
    res.download(outputPath, 'imagem-convertida.webp', (err) => {
      if (err) {
        console.error('Erro ao enviar o arquivo:', err.message);
      }

      // Excluindo os arquivos (original e convertido) após o envio
      setTimeout(() => {
        [inputPath, outputPath].forEach((file) => {
          fs.unlink(file, (err) => {
            if (err) {
              console.error(`Erro ao excluir o arquivo ${file}:`, err.message);
            } else {
              console.log(`Arquivo ${file} excluído com sucesso.`);
            }
          });
        });
      }, 100); // Pequeno atraso para evitar bloqueio
    });
  } catch (error) {
    console.error('Erro ao processar a imagem:', error.message);
    res.status(500).send('Erro ao converter a imagem.');
  }
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
