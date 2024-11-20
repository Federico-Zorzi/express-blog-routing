const express = require("express");
const router = express.Router();

const postList = [
  {
    titolo: "ciambellone",
    contenuto: "plumcake a forma di ciambellone",
    immagine: "/images/ciambellone.jpeg",
    tags: ["Dolci", "Colazione", "Dessert", "Ciambella"],
  },
  {
    titolo: "cracker barbabietola",
    contenuto: "cracker al gusto di barbabietola",
    immagine: "/images/cracker_barbabietola.jpeg",
    tags: ["Salato", "HealthySnacks", "Barbabietola", "NaturalIngredients"],
  },
  {
    titolo: "pane fritto dolce",
    contenuto: "pane fritto dolce",
    immagine: "/images/pane_fritto_dolce.jpeg",
    tags: ["Dolci", "Colazione", "Dessert", "HomemadeDesserts"],
  },
  {
    titolo: "pasta barbabietola",
    contenuto: "pasta condita con la barbabietola",
    immagine: "/images/pasta_barbabietola.jpeg",
    tags: ["Salato", "Pranzo", "Barbabietola", "ItalianFood", "PastaLovers"],
  },
  {
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
router.get("/:Id", (req, res) => {
  res.send("Show");
});

// * Store
router.post("/", (req, res) => {
  res.send("Store");
});

// * Update
router.put("/:Id", (req, res) => {
  res.send("Update");
});

// * Modify
router.patch("/:Id", (req, res) => {
  res.send("Modify");
});

// * Destroy
router.delete("/:Id", (req, res) => {
  res.send("Destroy");
});

module.exports = router;
