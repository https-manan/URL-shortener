const shortIdd = require('shortid');
const URL = require('../Model/url');

const shortUrlhandler = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        message: 'Please provide a URL',
      });
    }

    const shortId = shortIdd.generate();

    const shortURL = await URL.create({
      shortId,
      redirectUrl: url,
    });

    return res.json({
      id: shortId,
      shortURL,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = shortUrlhandler;
