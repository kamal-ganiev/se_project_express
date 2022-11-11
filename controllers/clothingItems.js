const clothingItem = require("../models/clothingItem");

const getClothingItems = (req, res) => {
  clothingItem
    .find({})
    .then((itemList) => {
      if (itemList.length === 0) {
        res.status(200).send({ message: "There is no any items yet" });

        return;
      }

      res.send({ data: itemList });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  clothingItem
    .create({ name, weather, imageUrl, owner: owner })
    .then((itemList) => res.send({ data: itemList }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: `Bad request: ${err.message}` });

        return;
      }

      res.status(500).send({ message: err.message });
    });
};

const deleteClothingItem = (req, res) => {
  clothingItem
    .findByIdAndRemove(req.params.itemId)
    .then((itemList) => res.send({ data: itemList }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).send({ message: "There is no item with requested ID" });

        return;
      }

      res.status(500).send({ message: err.message });
    });
};

module.exports = { getClothingItems, createClothingItem, deleteClothingItem };
