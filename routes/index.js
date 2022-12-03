const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.get('*',(req, res) => {
    return res.send('Incorrect route! Use Insomnia to interact with this site!');
  });

module.exports = router;