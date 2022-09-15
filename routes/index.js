import { Router } from "express";

const router = Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {title: 'Pidurka', subTitle: 'Developer blog', bg: 'home'});
});

/* GET about me page. */
router.get('/about', function(req, res) {
  res.render('about', {title: 'About Me', subTitle: 'This is what I do', bg: 'about'});
});

/* GET contact page. */
router.get('/contact', function(req, res) {
  res.render('contact', {title: 'Contact Me', subTitle: 'Have questions? I have answers', bg: 'contact'});
});

/* GET contact page. */
router.get('/chat', function(req, res) {
  res.render('chat', {title: 'Chat', subTitle: 'Lets try', bg: 'contact'});
});

/* GET post page. */
router.get('/post', function(req, res) {
  res.render('post');
});

export default router;
