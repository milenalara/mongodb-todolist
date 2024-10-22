
__Menu__
- [Instruções para Setup de um projeto com Node.js e MongoDB 🇧🇷](#configurando-um-projeto-nodejs-com-typescript-e-mongodb)
- [Node.js and MongoDB Project Setup Instructions 🇬🇧](#setting-up-a-nodejs-project-with-typescript-and-mongodb)

# Configurando um Projeto Node.js com TypeScript e MongoDB

## 1. Instale Node.js e MongoDB

- Node.js: Baixe e instale o Node.js no site oficial: https://nodejs.org.
- MongoDB: Baixe e instale o MongoDB em https://www.mongodb.com.

## 2. Inicialize o Projeto Node.js com TypeScript

Crie um Diretório para o Projeto: Abra o terminal e crie um diretório para o seu projeto:

```bash
mkdir my-node-mongo-ts-project
cd my-node-mongo-ts-project
```

Inicialize o Projeto Node.js: Inicialize o projeto e crie um arquivo package.json:

```bash
npm init -y
```

Instale TypeScript e Tipos do Node.js: Instale o TypeScript e os tipos do Node.js para ajudar o TypeScript a entender as APIs do Node.js.

```bash
npm install typescript @types/node ts-node --save-dev
```

Inicialize o TypeScript: Inicialize um arquivo de configuração do TypeScript (tsconfig.json):

```bash
npx tsc --init
```

## 3. Instale as Dependências Necessárias

Instale os pacotes necessários para Express, MongoDB, e Mongoose, bem como os tipos para o TypeScript:

```bash
npm install express mongoose dotenv
npm install @types/express --save-dev
```

## 4. Configure o MongoDB

Crie um Banco de Dados MongoDB:
- Se estiver usando MongoDB localmente, não é necessário configuração adicional.
- Para um serviço baseado na nuvem, como o MongoDB Atlas, crie um banco de dados e copie a string de conexão do painel do MongoDB Atlas.

## 5. Crie a Estrutura Básica do Projeto

Crie a seguinte estrutura no seu projeto:

```bash
my-node-mongo-ts-project/
│
├── src/
│   ├── models/                # Modelos do Mongoose
│   │   └── Item.ts
│   ├── routes/                # Rotas da API
│   │   └── itemRoutes.ts
│   └── server.ts              # Ponto de entrada da aplicação
├── .env                       # Variáveis de ambiente
├── tsconfig.json               # Configuração do TypeScript
├── package.json                # Configuração do projeto
└── .gitignore                  # Para ignorar certos arquivos
```

Para fazer isso, execute os seguintes comandos:

```bash
mkdir src
mkdir src/models/ src/routes
touch src/models/Item.ts src/routes/itemRoutes.ts src/server.ts .env tsconfig.json package.json .gitignore
```

## 6. Configure as Variáveis de Ambiente

No arquivo `.env`, adicione sua string de conexão MongoDB:

```bash
MONGO_URI=mongodb://localhost:27017/mydatabase
```

Ou, para o MongoDB Atlas:

```bash
MONGO_URI=mongodb+srv://<usuario>:<senha>@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority
```

## 7. Crie um Modelo Mongoose

Em `src/models/Item.ts`, crie um modelo Mongoose para um item:

```ts
import mongoose, { Schema, Document } from 'mongoose';

// Defina a interface para um Item
export interface IItem extends Document {
  name: string;
  price: number;
}

// Defina o esquema para Item
const itemSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

// Exporte o modelo Mongoose
export default mongoose.model<IItem>('Item', itemSchema);
```

## 8. Crie Rotas Express

Em `src/routes/itemRoutes.ts`, crie rotas para interagir com o banco de dados MongoDB:

```ts
import express, { Request, Response } from 'express';
import Item, { IItem } from '../models/Item';

const router = express.Router();

// Obtenha todos os itens
router.get('/', async (req: Request, res: Response) => {
  try {
    const items: IItem[] = await Item.find();
    res.json(items);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
});

// Crie um novo item
router.post('/', async (req: Request, res: Response) => {
  const item = new Item({
    name: req.body.name,
    price: req.body.price
  });

  try {
    const newItem: IItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
});

export default router;
```

## 9. Crie o Servidor Express

Em `src/server.ts`, configure o servidor Express principal e a conexão com o MongoDB:

```ts
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import itemRoutes from './routes/itemRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para analisar JSON
app.use(express.json());

// Conecte-se ao MongoDB
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro de conexão MongoDB:', err));

// Rotas
app.use('/items', itemRoutes);

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
```

## 10. Execute a Aplicação
Compile e execute o projeto TypeScript:

### Inicie o MongoDB: Se estiver usando MongoDB localmente, certifique-se de que ele esteja em execução:

```bash
mongod
```

Execute o Projeto TypeScript: Use ts-node para compilar e executar seu código TypeScript sem transpilar manualmente:

```bash
npx ts-node src/server.ts
```

Seu servidor deve estar rodando, e você pode interagir com sua API fazendo requisições HTTP para endpoints como `http://localhost:3000/items`.

## 11. Adicione Nodemon para Desenvolvimento (Opcional)

Para reiniciar automaticamente o servidor ao fazer mudanças durante o desenvolvimento, instale o nodemon:

```bash
npm install --save-dev nodemon
```

Depois, atualize o arquivo `package.json` para incluir um script para rodar o servidor:

```json
"scripts": {
  "start": "nodemon --exec ts-node src/server.ts"
}
```

Agora você pode executar o app com:

```bash
npm start
```

## 12. Adicione .gitignore (Opcional)

Certifique-se de adicionar um arquivo .gitignore para evitar que arquivos indesejados sejam incluídos no commit, como node_modules e seu arquivo .env:

```bash
# .gitignore
node_modules
.env
dist
```

# Setting Up a Node.js Project with TypeScript and MongoDB

## 1. Install Node.js and MongoDB

- Node.js: Download and install Node.js from the official website: https://nodejs.org.
- MongoDB: Download and install MongoDB from https://www.mongodb.com.

## 2. Initialize the Node.js Project with TypeScript

Create a Project Directory: Open a terminal and create a directory for your project:

```bash
mkdir my-node-mongo-ts-project
cd my-node-mongo-ts-project
```

Initialize the Node.js Project: Initialize the project and create a package.json file:

```bash
npm init -y
```

Install TypeScript and Node.js Types: Install TypeScript, and Node.js types to help TypeScript understand Node.js APIs.

```bash
npm install typescript @types/node ts-node --save-dev
```

Initialize TypeScript: Initialize a TypeScript configuration file (tsconfig.json):

```bash
npx tsc --init
```

## 3. Install Required Dependencies

Install the necessary packages for Express, MongoDB, and Mongoose, as well as the types for TypeScript:

```bash
npm install express mongoose dotenv
npm install @types/express --save-dev
```

## 4. Set Up MongoDB

Create a MongoDB Database:
- If using MongoDB locally, no additional setup is needed.
- For a cloud-based MongoDB service like MongoDB Atlas, create a database and copy the connection string from the MongoDB Atlas dashboard.

## 5. Create Basic Project Structure

Create the following structure in your project:

```bash
my-node-mongo-ts-project/
│
├── src/
│   ├── models/                # Mongoose models
│   │   └── Item.ts
│   ├── routes/                # API routes
│   │   └── itemRoutes.ts
│   └── server.ts              # Entry point of the app
├── .env                       # Environment variables
├── tsconfig.json               # TypeScript configuration
├── package.json                # Project configuration
└── .gitignore                  # To ignore certain files
```

To do so, run the following commands:

```bash
mkdir src
mkdir src/models/ src/routes
touch src/models/Item.ts src/routes/itemRoutes.ts src/server.ts .env tsconfig.json package.json .gitignore
```

## 6. Configure Environment Variables

In the `.env` file, add your MongoDB connection string:

```bash
MONGO_URI=mongodb://localhost:27017/mydatabase
```

Or, for MongoDB Atlas:

```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority
```

## 7. Create Mongoose Model

In `src/models/Item.ts`, create a Mongoose model for an item:

```ts
import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for an Item
export interface IItem extends Document {
  name: string;
  price: number;
}

// Define the schema for Item
const itemSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

// Export the Mongoose model
export default mongoose.model<IItem>('Item', itemSchema);
```

## 8. Create Express Routes

In `src/routes/itemRoutes.ts`, create routes for interacting with the MongoDB database:

```ts
import express, { Request, Response } from 'express';
import Item, { IItem } from '../models/Item';

const router = express.Router();

// Get all items
router.get('/', async (req: Request, res: Response) => {
  try {
    const items: IItem[] = await Item.find();
    res.json(items);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
});

// Create a new item
router.post('/', async (req: Request, res: Response) => {
  const item = new Item({
    name: req.body.name,
    price: req.body.price
  });

  try {
    const newItem: IItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
});

export default router;
```

## 9. Create the Express Server

In src/server.ts, set up the main Express server and MongoDB connection:

```ts
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import itemRoutes from './routes/itemRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/items', itemRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

## 10. Run the Application
Compile and Run the TypeScript Project:

### Start MongoDB: If you’re using a local MongoDB, ensure it's running:

 ```bash
mongod
```

Run the TypeScript Project: Use ts-node to compile and run your TypeScript code without manually transpiling:

```bash
npx ts-node src/server.ts
```

Your server should now be running, and you can interact with your API by making HTTP requests to endpoints like `http://localhost:3000/items`.

## 11. Add Nodemon for Development (Optional)

To automatically restart the server on changes during development, install nodemon:

```bash
npm install --save-dev nodemon
```

Then, update the `package.json` file to include a script for running the server:

```json
"scripts": {
  "start": "nodemon --exec ts-node src/server.ts"
}
```

You can now run the app with:

```bash
npm start
```

## 12. Add .gitignore (Optional)

Make sure to add a .gitignore file to prevent unwanted files from being committed, such as node_modules and your .env file:

```bash
# .gitignore
node_modules
.env
dist
```