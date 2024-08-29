CREATE USER 'test'@'localhost' IDENTIFIED BY 'Umjacare23!';
GRANT ALL PRIVILEGES ON PESSOAS.* TO 'test'@'localhost';

CREATE DATABASE PESSOAS;
use PESSOAS;
 CREATE TABLE pessoas (
       id INT AUTO_INCREMENT PRIMARY KEY,
       Apelido VARCHAR(32) UNIQUE NOT NULL,
       Nome VARCHAR(100) NOT NULL,
       Nascimento DATE NOT NULL,
       Stack JSON,
       CHECK (JSON_VALID(Stack)),
       CHECK (LENGTH(Apelido) <= 32 AND LENGTH(Nome) <= 100)
     );

/*caso tenha problemas de permissao*/
ALTER USER 'test'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Umjacare23';
 FLUSH PRIVILEGES;
 GRANT ALL PRIVILEGES ON PESSOAS.* TO 'test'@'localhost';



