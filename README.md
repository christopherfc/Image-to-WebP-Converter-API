# Image to WebP Converter API

Esta API permite converter imagens de diferentes formatos para o formato **WebP**. É simples de usar e foi projetada para lidar com múltiplos usuários simultaneamente.

## Recursos

- Suporte para formatos de entrada como PNG, JPEG, JPG, etc.
- Retorno da imagem convertida diretamente para o cliente.
- Exclusão automática de arquivos temporários para economizar espaço.
- Seguro contra conflitos entre uploads de diferentes usuários.

---

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/christopherfc/Image-to-WebP-Converter-API.git
   cd Image-to-WebP-Converter-API
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor:**
   ```bash
   node app.js
   ```

O servidor estará rodando em `http://localhost:3000` por padrão.

---

## Uso

### **Endpoint:** `POST /convert`

Envie uma requisição `POST` com o arquivo de imagem a ser convertido. A imagem deve ser enviada no corpo da requisição como `form-data`.

#### Exemplo de Requisição

```bash
curl -X POST -F "image=@/caminho/para/sua/imagem.jpg" http://localhost:3000/convert -o output.webp
```

#### Exemplo de Resposta

- **Sucesso:** Retorna a imagem convertida no formato WebP.
- **Erro:** Retorna um código de erro e uma mensagem indicando o problema.

#### Código JavaScript de Exemplo (Frontend)

```javascript
const formData = new FormData();
formData.append('image', fileInput.files[0]);

fetch('http://localhost:3000/convert', {
  method: 'POST',
  body: formData,
})
  .then(response => {
    if (!response.ok) throw new Error('Erro na conversão');
    return response.blob();
  })
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'converted.webp';
    link.click();
  })
  .catch(console.error);
```

---

## Estrutura do Projeto

```
image-to-webp-api/
├── uploads/          # Diretório temporário para uploads
├── app.js            # Código principal da API
├── package.json      # Dependências do projeto
└── README.md         # Documentação
```

---

## Segurança e Confiabilidade

1. **Arquivos únicos:** Cada upload gera um nome de arquivo único para evitar conflitos.
2. **Exclusão automática:** Arquivos temporários são removidos após o processamento para evitar acúmulo.
3. **Limitação de tamanho:** O tamanho máximo do arquivo pode ser configurado para evitar sobrecarga do servidor.

```javascript
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 }, // Máximo de 5 MB
});
```

4. **Validação de tipo de arquivo:** Apenas imagens são permitidas para conversão.

```javascript
if (!req.file.mimetype.startsWith('image/')) {
  return res.status(400).send('Por favor, envie uma imagem válida.');
}
```

---

## Dependências

- [Express](https://expressjs.com/): Framework para criar o servidor.
- [Multer](https://github.com/expressjs/multer): Middleware para upload de arquivos.
- [Sharp](https://github.com/lovell/sharp): Biblioteca para manipulação de imagens.

---

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests para melhorias ou correções.

---

## Autor

**Fernando Christopher**  
[GitHub](https://github.com/christopherfc)  
[LinkedIn](https://www.linkedin.com/in/fernando-christopher-santos-silva-265819223)
