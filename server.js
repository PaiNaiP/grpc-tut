// server.js
const grpc = require('@grpc/grpc-js');          // библиотека gRPC для Node.js
const protoLoader = require('@grpc/proto-loader'); // для загрузки .proto
const path = require('path');

// Указываем путь к файлу с описанием контракта
const PROTO_PATH = path.join(__dirname, 'cart.proto');

// Загружаем proto-файл
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,     // сохраняем стиль написания полей
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

// Превращаем proto в JS-объект
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

// Получаем доступ к пакету cart и сервису CartService
const cart = protoDescriptor.cart;

// Реализуем поведение сервиса — тут описываем, что делает наш метод
const CartServiceImpl = {
  RegisterUser: (call, callback) => {
    // call.request — это объект RegisterUserRequest, который пришёл от клиента
    const name = call.request.name;
    console.log(`Получен запрос на регистрацию пользователя: ${name}`);

    // Генерируем ответ
    const response = {
      id: 'user_' + Math.floor(Math.random() * 1000), // создаём фейковый ID
      status: 'Registered'
    };

    // Отправляем ответ клиенту
    callback(null, response);
  }
};

// Функция запуска сервера
function main() {
  const server = new grpc.Server();
  server.addService(cart.CartService.service, CartServiceImpl);

  const address = '127.0.0.1:50051';
  server.bindAsync(address, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error('Ошибка запуска сервера:', err);
      return;
    }
    console.log(`✅ gRPC сервер запущен на ${address}`);
    server.start();
  });
}

main();
