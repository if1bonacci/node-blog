import { Router } from "express";

const router = Router();

/* GET users listing. */
router.get('/users', function(req, res) {
  res.send('respond with a resource');
});

export default router;
