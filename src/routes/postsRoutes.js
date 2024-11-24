// Importa o framework Express para construir o servidor
import express from "express";

// Importa o middleware Multer para gerenciar uploads de arquivos
import multer from "multer";

// Importa funções para listar posts, criar posts e fazer upload de imagens do arquivo postsController.js
import { listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js";

// Configura o armazenamento em disco do Multer
const storage = multer.diskStorage({
  // Define a pasta de destino para os arquivos enviados ('uploads/')
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Mantém o nome original do arquivo enviado
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Cria uma instância do Multer com o armazenamento configurado
const upload = multer({ storage });

// Define uma função 'routes' que recebe o aplicativo Express como argumento
const routes = (app) => {
  // Habilita o aplicativo para interpretar dados JSON do corpo da requisição
  app.use(express.json());

  // Define uma rota GET para '/posts' que chama a função 'listarPosts'
  app.get("/posts", listarPosts);

  // Define uma rota POST para '/posts' que chama a função 'postarNovoPost'
  app.post("/posts", postarNovoPost);

  // Define uma rota POST para '/upload' que usa o middleware 'upload.single("imagem")'
  // para manipular o upload de um único arquivo chamado 'imagem' e depois chama a função 'uploadImagem'
  app.post("/upload", upload.single("imagem"), uploadImagem);
};

// Exporta a função 'routes' como exportação padrão
export default routes;