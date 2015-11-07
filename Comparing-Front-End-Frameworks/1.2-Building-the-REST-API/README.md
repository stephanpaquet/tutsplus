# 1.2 Building the REST API
Before we start building front ends, we’ll write a Node.js- and Express-based REST API. We’ll also create a template that we can use for every version of our application.

### Related Links
- [Express](http://expressjs.com/)
- [Getting Started With Express](http://code.tutsplus.com/courses/getting-started-with-express)

### Procédure
- [express](http://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js
- body-parser: parse the body of HTTP request

```
mkdir template
cd template
npm install express body-parser
```
### Création du serveur
- Création d'une route pour retourner des contacts
- Idéalement on aurait du utiliser une base de données Mongo DB

## Start the serveur
```
node server.js

http://localhost:3000/api/contacts/
```

## TODO
- voir si on peux créer un package.json pour les dépendances backend
- Voir le tutoriel sur express js
