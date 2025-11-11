// client.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, 'cart.proto');

// Загружаем описание .proto
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const cart = protoDescriptor.cart;

// Создаём клиент, подключаемся к серверу
const client = new cart.CartService('localhost:50051', grpc.credentials.createInsecure());

// Отправляем запрос на регистрацию
client.RegisterUser({ name: 'Егор' }, (error, response) => {
  if (error) {
    console.error('Ошибка RPC:', error);
  } else {
    console.log('Ответ от сервера:', response);
  }
});
