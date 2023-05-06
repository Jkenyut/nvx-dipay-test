# Tutorial running project

tsconfig.ts

```
 "outDir": "build" merupakan hasil dari compile typescript sehingga semua js berada pada folder build
```

### Info pengembangan project

jika anda melakukan pengembangan lakukan pada source folder src

### Install library

`$ npm install `

### Buat .env

pastikan bahwa anda telah menginstall mongod DB di localhost atau anda juga bisa menggunkan atlas CompasDB, lalu buatlah .env di folder bagian package.json

```
MONGODB_URI = "mongodb://localhost:27017/dipayDB"  jika menggunakan localhost atau URI atlas
PORT ='3000'secara default menggunakan menggunakan port 3000
```

### Link API

[Links API](https://documenter.getpostman.com/view/3535934/2s93eVXZRu#5c8a7407-f5f0-4407-a839-245cb78c0fe9)
[Links Github ](https://github.com/Jkenyut/test_Dipay)

### Menjalankan program

jika anda melakukan test pastikan anda telah melakukan npm start untuk memastikan server menjalankan mode production terbaru

```
npm start            //build dan start
npm run test        //menjalankan test 23 passed
npm run dev         //develompment
```
