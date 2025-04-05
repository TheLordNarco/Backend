const mongoose = require('mongoose');

// Substitua <db_password> pela senha real no URI
const uri = process.env.MONGO_URI || "mongodb+srv://rcambamba64:Dadiva16@@cluster0.jp0fnya.mongodb.net/?retryWrites=true&w=majority";

async function connectMongoDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: { version: '1', strict: true, deprecationErrors: true },
    });
    console.log("Conectado ao MongoDB com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error.message);
    process.exit(1); // Encerra o processo caso a conexão falhe
  }
}

module.exports = connectMongoDB;
