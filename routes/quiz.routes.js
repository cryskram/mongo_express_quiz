const Quiz = require("../models/quiz.model");

const router = require("express").Router();

// GET: Brings All The Data From The Database
router.get("/", (req, res) => {
  Quiz.find({})
    .then((quest) => {
      res.status(200).json(quest);
    })
    .catch((e) => {
      res
        .status(500)
        .json({ message: "Something went wrong on the Server 🚫", error: e });
    });
});

// GET(id): Gets The Data Whose ID Is The Passed ID
router.get("/one/:id", (req, res) => {
  Quiz.findOne({ __id: req.params.id })
    .then((quest) => res.status(200).json(quest))
    .catch((e) =>
      res.status(500).json({
        message: "Something went wrong on the Server 🚫",
        error: e,
      })
    );
});

// POST: Create The Data In The Database
router.post("/create", (req, res) => {
  const { question, options, correct, tags, difficulty } = req.body;

  if (!question || !options || !correct || !tags || !difficulty) {
    return res
      .status(404)
      .json({ message: "Some Required Fields Are Missing ☹️" });
  }

  Quiz.create(req.body)
    .then((quest) => res.status(200).json(quest))
    .catch((e) =>
      res.status(500).json({
        message: "Something went wrong on the Server 🚫",
        error: e,
      })
    );
});

// PUT: Updates The Data Present In The Database
router.put("/upd/:id", (req, res) => {
  const { question, options, correct, tags, difficulty } = req.body;

  if (!question || !options || !correct || !tags || !difficulty) {
    return res
      .status(404)
      .json({ message: "Some Required Fields For Updating Are Missing ☹️" });
  }

  Quiz.findOneAndUpdate({ __id: req.params.id }, req.body).then((quest) => {
    Quiz.findOne({ __id: req.params.id })
      .then((quest) => {
        res.status(200).json(quest);
      })
      .catch((e) =>
        res.status(500).json({
          message: "Something went wrong on the Server 🚫",
          error: e,
        })
      );
  });
});

// DELETE: Deletes The Data From The Database
router.delete("/del/:id", (req, res) => {
  Quiz.findOneAndDelete({ __id: req.params.id })
    .then(() =>
      res.status(200).json({ message: "Deleted The Data From The Database" })
    )
    .catch((e) =>
      res.status(500).json({
        message: "Something went wrong on the Server 🚫",
        error: e,
      })
    );
});

module.exports = router;
