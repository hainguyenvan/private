# Install
* Run commands
```
$ npm install
```
* Server open port 9000

# Example
### Account
#### Fields
* id
* name
* age
* address
#### Sql
```
CREATE TABLE Account (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    age varchar(255) not null,
    addres varchar(255) not null,
    PRIMARY KEY (id)
);
```

### Post
#### Fields
* id
* title
* author
#### Sql
```
CREATE TABLE Post (
    id int NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    author int,
    PRIMARY KEY (id)
);
```

### Role
#### Fields
* id
* name
#### Sql
```
CREATE TABLE Role (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    PRIMARY KEY (id)
);
```

### UserRole
#### Fileds
* id
* userID
* roleID
#### Sql
```
CREATE TABLE UserRole (
    id int NOT NULL AUTO_INCREMENT,
    userID int NOT NULL,
    roleID int not null,
    PRIMARY KEY (id)
);
```