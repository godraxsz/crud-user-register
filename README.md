
# crud-user-register (Back-end)

Sistema CRUD de gerenciamento de usuários.

## Front-end
https://github.com/godraxsz/crud-user-register-app

# .env
```
PORT=8000
DB_NAME=crud-user-register
DB_USER=root
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=3306
DB_DIALECT=mysql
DB_TIMEZONE=-03:00
```

# Database
Nome padrão: crud-user-register

```
CREATE TABLE `users` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`email` VARCHAR(75) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`phone` VARCHAR(11) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;
```

# API

```
[GET] Buscar Todos Usuários:
http://localhost:8000/api/users/
[GET] Buscar Usuário por Nome:
http://localhost:8000/api/users/matheus
[GET] Buscar Usuário por Data e/ou Nome:
http://localhost:8000/api/users/date/01-01-2023+31-12-2023/matheus

[POST] Adicionar Usuário
http://localhost:8000/api/users/

{
	"name": "Matheus Parisi",
	"email": "matheusfontesparisi@hotmail.com",
	"phone": "11952275405"
}

[PUT] Atualizar Usuário
http://localhost:8000/api/users/1 < ID do Usuário

{
	"name": "Matheus Parisi",
	"email": "matheusfontesparisi@hotmail.com",
	"phone": "11952275405"
}

[DELETE] Deletar Usuário
http://localhost:8000/api/users/1 < ID do Usuário

```
