// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
// Connexion à la base de donnee -- https://github.com/fastify/fastify-mongodb
fastify.register(require('fastify-mongodb'), {
  // force to close the mongodb connection when app stopped
  // the default value is false
  forceClose: true,
  
  // url: 'mongodb://mongo/mydb'
  url: 'mongodb://localhost:27017/superheroes'
})

// Declare a route
fastify.get('/', (request, reply) => {
  return { hello: 'world 2' }
})

// Déclarer la route /heroes - cette route retournera la liste des avengers
const avengers = ["Iron man", "Captain america", "Spiderman"]

// heroes GET - Obtiens la liste des héros
fastify.get('/heroes', ()=>{
    return avengers //equivalent à avengers: avengers
})

// heroes POST Ajoute un nouvel héro
fastify.post('/heroes', (request, reply) => {
  console.log(request.body)
  const db = fastify.mongo.db
  const collection = db.collection('heroes')
  // console.log(collection);
  // db.collection('inserts')
  // Insert a single document


  // collection.insertOne({
  //   name: request.body.name,
  //   powerstats: request.body.powerstats,
  // })
  collection.insertOne(request.body)


  return null
  // reply.send(null)
  
})

fastify.get('/me', (request, reply) => {
    //ici on retourne un objet javascript qui va etre converti en json
    //(JavaScript Object Notation)
    return { 
        prenom: 'Abdallah',
        nom: "Dargui d",
        job: "developpeur web 3",
     }
  })


// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()

const student = "Siham"
const age = 18
//dans un objet,si une clé et sa valeur portent le même nom, on pourra utiliser la forme raccourcie
const data ={
    //cle : valeur
    //student // est équivaut à écrire student : student
    student,
    age,
}

//Equivalent à

// const data2 ={
//     student = student,
//     age = age,
// }