module.exports = {
  apps: [
    {
      // Название процесса в PM2
      name: 'grpc-server',

      // Файл, который запускаем
      script: 'server.js',

      // Сколько копий (1 — достаточно)
      instances: 1,

      // Автоматический перезапуск при падении
      autorestart: true,

      // Следить за изменениями в файлах? (в проде — нет)
      watch: false,

      // Перезапустить, если памяти > 1 ГБ
      max_memory_restart: '1G',

      // Переменные окружения для разработки
      env: {
        NODE_ENV: 'development', // Режим разработки
        PORT: 50051              // Порт gRPC
      },

      // Переменные окружения для продакшена
      env_production: {
        NODE_ENV: 'production',  // Режим продакшена
        PORT: 50051              // Порт gRPC
      }
    }
  ]
};