// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

// Declare a route
fastify.get('/', (request, reply) => {
  return { hello: 'world 2' }
})

// Déclarer la route /heroes - cette route retournera la liste des avengers
const avengers = ["Iron man", "Captain america", "Spiderman"]
fastify.get('/heroes', ()=>{
    return avengers //equivalent à avengers: avengers
})

fastify.get('/me', (request, reply) => {
    //ici on retourne un objet javascript qui va etre converti en json
    //(JavaScript Object Notation)
    return { 
        prenom: 'Abdallah',
        nom: "Dargui",
        job: "developpeur",
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