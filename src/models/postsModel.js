import conectarAoBanco from "../config/dbConfig.js";

// Estabelece a conexão com o banco de dados usando a string de conexão do ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts do banco de dados
export async function getTodosPosts() {
  // Seleciona o banco de dados "imersao-instabyte"
  const db = conexao.db("imersao-instabyte");

  // Seleciona a coleção "posts" dentro do banco de dados
  const colecao = db.collection("posts");

  // Busca todos os documentos da coleção e retorna um array com os resultados
  return colecao.find().toArray();
}

// Função assíncrona para criar um novo post no banco de dados
export async function criarPost(novoPost) {
  // Seleciona o banco de dados "imersao-instabyte"
  const db = conexao.db("imersao-instabyte");

  // Seleciona a coleção "posts" dentro do banco de dados
  const colecao = db.collection("posts");

  // Insere um novo documento na coleção "posts" com os dados do novo post
  return colecao.insertOne(novoPost);
}