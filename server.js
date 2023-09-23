const express = require('express')
const app = express()
const lespokemon = require('./pokemons.json')
const InformationsPokemon = require('./infospokemons.json')
var cors = require('cors')
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(cors())

const DEFAULT_LIMIT = -1;

app.get('/api/pokemon/:id', (req,res) => {
  const id = parseInt(req.params.id)
  const lePokemon = pokemon.find(jeu => jeu.id === id)
  res.status(200).json(lePokemon)
})

app.get('/api/pokemon/:nom', (req,res) => {
  const nom = req.params.nom
  const lePokemon = pokemon.find(jeu => jeu.name === nom)
  res.status(200).json(lePokemon)
})


app.get('/api/pokemon', (req, res) => {
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : DEFAULT_LIMIT;
  const startIndex = offset;
  const endIndex = startIndex + limit;
  const totalPokemon = pokemon.length;
  const paginatedPokemon = pokemon.slice(startIndex, endIndex);
  const nextOffset = startIndex + limit;
  const previousOffset = Math.max(0, startIndex - limit);
  const nextLink = `/api/pokemon/${nextOffset}/${limit}`;
  const previousLink = `/api/pokemon/${previousOffset}/${limit}`;

  res.status(200).json({
    totalPokemon,
    offset,
    limit,
    next: nextLink,
    previous: previousLink,
    data: paginatedPokemon,
  });
});

app.get('/api/pokemon/:offset/:limit', (req, res) => {
  const offset = req.params.offset ? parseInt(req.params.offset) : 0;
  const limit = req.params.limit ? parseInt(req.params.limit) : DEFAULT_LIMIT;
  const nextOffset = offset + limit;
  const previousOffset = Math.max(0, offset - limit);
  const nextLink = `/api/pokemon/${nextOffset}/${limit}`;
  const previousLink = `/api/pokemon/${previousOffset}/${limit}`;
  const paginatedPokemon = pokemon.slice(offset, offset + limit);

  res.status(200).json({
    offset,
    limit,
    next: nextLink,
    previous: previousLink,
    data: paginatedPokemon,
  });
});

app.get('/api/infoPokemon/:id', (req, res) => {
  const id = req.params.id
  if (!isNaN(id)) {
    const idInt = parseInt(id);
    if (idInt !== null) {
      const LePokemon = InformationsPokemon.find(p => p.id === idInt);

      if (LePokemon) {
        res.status(200).json(LePokemon);
      } else {
        res.status(404).json({ message: "Pokémon not found" });
      }
    } else {
      res.status(400).json({ message: "Invalid ID" });
    }
  }
  else{
    const LePokemon = InformationsPokemon.find(p => p.name === id);
      if (LePokemon) {
        res.status(200).json(LePokemon);
      } else {
        res.status(404).json({ message: "Pokémon not found" });
      }
  }
});


app.get('/nombrePoke', (req,res)=>{
  res.status(200).json(pokemon.length)

})

app.listen(8080, () => {
  console.log('Server started on port 8000');
})