
# crud-user-register

Back-end de um sistema CRUD de usuários.


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