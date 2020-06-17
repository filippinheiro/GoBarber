# Features

## Recuperação de Senha

### FR

- O usuário deve poder solicitar recuperar sua senha informando seu email;
- O usuário deve receber um email com instruções de recuperação de senha;
- O usuário deve poder alterar sua senha;

### NFR

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios de email em produção;
- O envio de emails deve acontecer em segundo plano (background job);

### BR

- O link para resetar a senha deve expirar em 2 horas;
- O usuário precisa confirmar a nova senha ao alterá-la;
- A senha não pode ser a mesma da anterior;

## Atualização do Perfil

### FR

- O usário deve poder alterar nome, email e senha;

### BR

- O usuário não pode alterar seu email para um email já utilizado por outro usuário;
- para atualizar a senha o usuário deve informar a senha antiga;
- para atualizar a senha, usuário deve confirmar a senha;

## Painel do Prestador

### FR

- O prestador deve poder visualizar os agendamentos de um dia específico;
- O prestador deve receber uma notifição sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

### NFR

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armzanadas no MongoDB;
- As notifiicações do prestador devem ser enviadas em tempo real usando socket.io;

### BR

- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar;

## Agendamento de Serviços

### FR

- O usuário deve poder visualizar uma lista com todos os prestadores cadastrados;
- O usuário deve poder visualizar os dias do mês com pelo menos um horário disponível de um prestador selecionado;
- O usuário deve poder visualizar horários disponíveis em um dia selecionado;
- O usuário deve poder realizar um agendamento;

### NFR

- A listagem de prestadores deve sera armazenada em cache;

### BR

- Cada agendamento deve durar exatamente uma hora;
- Cada agendamento deve estar disponível entre 8h as 18h (primeiro as 8h e o último as 17h);
- O usuário não pode agendar em um horário ocupado;
- O usuário nao pode agendar em um horário passado;
- O usuário não pode agender horários consigo mesmo;
