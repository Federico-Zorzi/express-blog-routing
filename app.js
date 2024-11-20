const express = require("express");
const app = express();
const port = 3000;

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

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send(
    `Server del mio blog
    <a href='http://localhost:3000/bacheca'>Bacheca</a>`
  );
});

app.get("/bacheca", (req, res) => {
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

console.log("Server del mio blog");
