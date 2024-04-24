const report = async (req, res) => {
  try {
    const reporter = req.user._id;
    const { reported, category, description } = req.body;

    if (!reported || !category || !description) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const report = new Report({
      reporter,
      reported,
      category,
      description,
    });
    await report.save();

    res.status(200).send({ message: "Report submitted!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { report };
