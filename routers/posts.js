const express = require("express");
const router = express.Router();

const postList = [
  {
    id: 1,
    titolo: "ciambellone",
    contenuto: "plumcake a forma di ciambellone",
    immagine: "/images/ciambellone.jpeg",
    tags: ["Dolci", "Colazione", "Dessert", "Ciambella"],
  },
  {
    id: 5,
    titolo: "cracker barbabietola",
    contenuto: "cracker al gusto di barbabietola",
    immagine: "/images/cracker_barbabietola.jpeg",
    tags: ["Salato", "HealthySnacks", "Barbabietola", "NaturalIngredients"],
  },
  {
    id: 7,
    titolo: "pane fritto dolce",
    contenuto: "pane fritto dolce",
    immagine: "/images/pane_fritto_dolce.jpeg",
    tags: ["Dolci", "Colazione", "Dessert", "HomemadeDesserts"],
  },
  {
    id: 9,
    titolo: "pasta barbabietola",
    contenuto: "pasta condita con la barbabietola",
    immagine: "/images/pasta_barbabietola.jpeg",
    tags: ["Salato", "Pranzo", "Barbabietola", "ItalianFood", "PastaLovers"],
  },
  {
    id: 10,
    titolo: "torta paesana",
    contenuto: "torta paesana",
    immagine: "/images/torta_paesana.jpeg",
    tags: ["Dolci", "Spuntino", "Dessert", "TortaPaesana", "RicetteDellaNonna"],
  },
];

// * Index
router.get("/", (req, res) => {
  const titleFilter = req.query.title;
  const hashtagFilter = req.query.hashtag;
  let newPostList = postList;

  if (titleFilter) {
    newPostList = postList.filter((post) =>
      post.titolo.toLowerCase().includes(titleFilter.toLowerCase())
    );
  }
  if (hashtagFilter) {
    newPostList = newPostList.filter((post) => {
      let hashtagIncluded = false;
      post.tags.forEach((hashtag) => {
        if (hashtag.toLowerCase().includes(hashtagFilter.toLowerCase())) {
          hashtagIncluded = true;
        }
      });
      return hashtagIncluded;
    });
  }

  res.json({ newPostList, listLength: newPostList.length });
});

// * Show
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  /* controllo se l'id è valido */
  if (isNaN(id)) {
    return res.status(400).send(`id required not valid`);
  }

  /* trovo il post tramite l'id */
  const postRequired = postList.find((post) => post.id === id);

  if (!postRequired) {
    return res.status(404).send(`id required not found`);
  }

  /* res.send(`Show post with id ${id}`); */
  res.send(postRequired);
});

// * Store
router.post("/", (req, res) => {
  res.send(`Store post`);
});

// * Update
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  /* controllo se l'id è valido */
  if (isNaN(id)) {
    return res.status(400).send(`id required not valid`);
  }

  res.send(`Update post with id ${id}`);
});

// * Modify
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  /* controllo se l'id è valido */
  if (isNaN(id)) {
    return res.status(400).send(`id required not valid`);
  }

  res.send(`Modify post with id ${id}`);
});

// * Destroy
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  /* controllo se l'id è valido */
  if (isNaN(id)) {
    return res.status(400).send(`id required not valid`);
  }

  /* ricerca dell'index dell'elemento con l'id scelto da eliminare */
  let postToDeleteIndex;
  postList.find((post, index) => {
    if (post.id === id) {
      postToDeleteIndex = index;
    }
  });

  if (isNaN(postToDeleteIndex)) {
    return res.status(404).send(`id required not found`);
  }

  /* rimozione dell'index trovato */
  const postDeleted = postList.splice(postToDeleteIndex, 1);

  /* res.send(`Delete post with id ${id}`); */
  res.send({ postDeleted, postList });
});

module.exports = router;
