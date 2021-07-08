// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const { ObjectId } = require('mongodb')
// Connexion à la base de donnee -- https://github.com/fastify/fastify-mongodb
fastify.register(require('fastify-mongodb'), {
  // force to close the mongodb connection when app stopped
  // the default value is false
  forceClose: true,
  
  // url: 'mongodb://mongo/mydb'
  url: 'mongodb://localhost:27017/superheroes'
  // url: 'mongodb://localhost:27017/bdd-test'
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

// // /heroes/69 GET - Obtiens le héros ayant l'id 69
// fastify.get('/heroes/:heroesId', async (request, reply) => {
//   // console.log({
//   //   id: request.id,
//   //   params: request.params
//   // })
//   const heroesId = request.params.heroesId
//   const db = fastify.mongo.db
//   const collection = db.collection('heroes')
//   const result = await collection.findOne({
//     // id: "69"
//     id: heroesId
//   })
//   // return["name"]
//   // return result.name
//   return result
  
// })

// Recuperer l'ID de Mongodb
fastify.get('/heroes/:heroesId', async (request, reply) => {
  // console.log({
  //   id: request.id,
  //   params: request.params
  // })
  const { heroesId } = request.params
  const db = fastify.mongo.db
  const collection = db.collection('heroes')
  const result = await collection.findOne({
    // id: "69"
    _id: new ObjectId(heroesId)
  })
  // return["name"]
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
  // return result.name
  return result
  
})

// /heros/bio/id
// cette route devra retourner: nomDuHero connu sous le nom de vraiNom.
// je suis née à lieuDeNaissance. j'ai XX en intelligence, et YY en vitesse.
fastify.get('/heroes/bio/:heroesId', async (request, reply) => {
  const db = fastify.mongo.db
  const collection = db.collection('heroes')
     const { heroesId } = request.params
  const result = await collection.findOne({
    // id: "69"
    _id: new ObjectId(heroesId)
  })
  
 /** Version ES 6  NOUVEAU *******/
//  const {name, biography, powerstats: {intelligence, speed} } = result
 const {
   name,
   biography,
   powerstats: {intelligence, speed},
 } = result
  //Template literals : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
  // return  `${result.name} connu sous le nom de result.biography.full-name. je suis née à  j'ai ${result.powerstats.intelligence}, et ${result.powerstats.speed} en vitesse .`

  //result.biography.full-name ===> ${biography["full-name"]}
  //autre Methode pour éviter la repetition de result result ..

  // const {name, biography, powerstats} = result 
  // const{intelligence,speed}= powerstats
  // Ou pour change cette methode  ${powerstats.speed} à ${speed}


   
  return  `${name} connu sous le nom de ${biography["full-name"]}. je suis née à ${biography["place-of-birth"]} j'ai ${intelligence} en intelligence, et ${speed} en vitesse .`

  //***  Version ES5 (Vieux JS) ********/
  /** 
   * const name = result.name
  const fullName = result.biography["full-name"]
  const placeOfBirth = result.biography["place-of-birth"]
  const intelligence = result.powerstats.intelligence
  const speed = result.powerstats.speed

  return "Version ES5 : " + name + " connu sous le nom de " + fullName + ". je suis née à "+ placeOfBirth + ". J'ai " + intelligence + " en intelligence, et + " + speed + " en vitesse"
  */

  /**** fin Version ES5 */
})



// heroes POST Ajoute un nouvel héro
fastify.post('/heroes', async (request, reply) => {
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
  const result = await collection.insertOne(request.body)
  return result


  // return null
  // reply.send(null)
  
})
// Methode DELETE ************ /////
fastify.delete('/heroes/:heroesId', async (request, replay) => {
  const collection = fastify.mongo.db.collection('heroes')
  const{heroesId} = request.params
  const result = await collection.findOneAndDelete({
    _id: new ObjectId(heroesId)
  })

  return result
})

// methode PATCH -- mettre à jour par ID
fastify.patch('/heroes/:id', async (request, replay) => {
  const collection = fastify.mongo.db.collection('heroes')
  const { id } = request.params
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: request.body },
    { returnDocument: 'after'},
    
  )
  return result
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

// Exercice :
// Une route qui me permette de creer un nouvel utilisateur (user) dans une collection users
//-email
//-password
//-Role (user/admin)
// Une route qui me permette de récupérer tout les utilisateurs
// Une route qui me permette de récupérer un utilisateur par son id
// Une route qui me permette de mettre à jour un utilisateur par son id
// Une route qui me permette de supprimer un utilisateur par son id





// fastify.register(require('fastify-mongodb'), {
//   forceClose: true,
//   url: 'mongodb://localhost:27017/bdd-test'
// })

//------ creer un nouvel utilisateur
fastify.post('/user', async (request, reply) => {
  console.log(request.body)
  const db = fastify.mongo.db
  const collection = db.collection('users')
  const result = await collection.insertOne(request.body)
  return result 
})

//------ 

fastify.get('/users', async (request, reply) => {
  const db = fastify.mongo.db
  const collection = db.collection('users')
  const result = await collection.find({}).toArray()
  //https://mongodb.github.io/node-mongodb-native/3.6/api/Cursor.html
  return result
})

//------- récupérer l'utilisateur par son id

fastify.get('/users/:userId', async (request, reply) => {
  const { userId } = request.params
  const db = fastify.mongo.db
  const collection = db.collection('users')
  const result = await collection.findOne({
    _id: new ObjectId(userId)
  })
  return result
})

// ------ mettre à jour un utilisateur par son id
fastify.patch('/users/:id', async (request, replay) => {
  const collection = fastify.mongo.db.collection('users')
  const { id } = request.params
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: request.body },
    { returnDocument: 'after'},
  )
  return result
})

// ----- Supprimer un utilisateur par son ID
fastify.delete('/users/:id', async (request, replay) => {
  const collection = fastify.mongo.db.collection('users')
  const{id} = request.params
  const result = await collection.findOneAndDelete({
    _id: new ObjectId(id)
  })
  return result
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