// Importa as funções para obter todos os posts e criar um novo post do modelo de posts
import { getTodosPosts, criarPost } from "../models/postsModel.js";

// Importa o módulo fs para trabalhar com o sistema de arquivos
import fs from "fs";

// Função assíncrona para listar todos os posts
export async function listarPosts(req, res) {
  // Chama a função para obter os posts do banco de dados
  const posts = await getTodosPosts();

  // Envia os posts como resposta em formato JSON com status 200 (OK)
  res.status(200).json(posts);
}

// Função assíncrona para criar um novo post
export async function postarNovoPost(req, res) {
  // Obtém os dados do novo post do corpo da requisição
  const novoPost = req.body;

  try {
    // Chama a função para criar um novo post no banco de dados
    const postCriado = await criarPost(novoPost);

    // Envia o post criado como resposta em formato JSON com status 200 (OK)
    res.status(200).json(postCriado);
  } catch (erro) {
    // Imprime o erro no console para depuração
    console.error(erro.message);

    // Envia uma mensagem de erro ao cliente com status 500 (Erro interno do servidor)
    res.status(500).json({ "Erro": "Falha na requisição" });
  }
}

// Função assíncrona para fazer upload de uma imagem e criar um novo post
export async function uploadImagem(req, res) {
  // Cria um objeto com os dados do novo post, incluindo o nome da imagem
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: ""
  };

  try {
    // Chama a função para criar um novo post no banco de dados
    const postCriado = await criarPost(novoPost);

    // Constrói o novo nome da imagem com o ID do post criado
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;

    // Renomeia o arquivo da imagem para o novo nome
    fs.renameSync(req.file.path, imagemAtualizada);

    // Envia o post criado como resposta em formato JSON com status 200 (OK)
    res.status(200).json(postCriado);
  } catch (erro) {
    // Imprime o erro no console para depuração
    console.error(erro.message);

    // Envia uma mensagem de erro ao cliente com status 500 (Erro interno do servidor)
    res.status(500).json({ "Erro": "Falha na requisição" });
  }
}