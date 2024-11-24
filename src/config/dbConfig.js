import { MongoClient } from "mongodb";

// Função assíncrona para conectar ao banco de dados MongoDB
export default async function conectarAoBanco(stringConexao) {
  // Cria uma instância do cliente MongoDB
  let mongoClient;

  try {
    // Cria um novo cliente MongoDB usando a string de conexão fornecida
    mongoClient = new MongoClient(stringConexao);

    // Imprime uma mensagem no console indicando que a conexão está sendo estabelecida
    console.log("Conectando ao cluster do banco de dados...");

    // Conecta ao banco de dados MongoDB
    await mongoClient.connect();

    // Imprime uma mensagem de sucesso no console
    console.log("Conectado ao MongoDB Atlas com sucesso!");

    // Retorna o cliente MongoDB para uso posterior
    return mongoClient;
  } catch (erro) {
    // Imprime uma mensagem de erro no console e encerra o processo
    console.error("Falha na conexão com o banco!", erro);
    process.exit();
  }
}