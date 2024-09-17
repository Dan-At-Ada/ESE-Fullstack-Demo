import express from 'express';
import Post from '../models/Post';

const router = express.Router();

router.get('/', async (req, res) => {
  console.log('Fetching all posts');
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    console.log(`${posts.length} posts fetched`);
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

router.post('/', async (req, res) => {
  console.log('Creating new post:', req.body.title);
  try {
    const { title, content, author } = req.body;
    const post = new Post({ title, content, author, date: new Date() });
    console.log('New post:', post);
    await post.save();
    console.log('New post created:', post._id);
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(400).json({ message: 'Error creating post' });
  }
});

router.get('/:id', async (req, res) => {
  console.log('Fetching post:', req.params.id);
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      console.log('Post not found:', req.params.id);
      return res.status(404).json({ message: 'Post not found' });
    }
    console.log('Post fetched:', post._id);
    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Error fetching post' });
  }
});

router.put('/:id', async (req, res) => {
  console.log('Updating post:', req.params.id);
  try {
    const { title, content } = req.body;
    const post = await Post.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
    if (!post) {
      console.log('Post not found for update:', req.params.id);
      return res.status(404).json({ message: 'Post not found' });
    }
    console.log('Post updated:', post._id);
    res.json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(400).json({ message: 'Error updating post' });
  }
});

router.delete('/:id', async (req, res) => {
  console.log('Deleting post:', req.params.id);
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      console.log('Post not found for deletion:', req.params.id);
      return res.status(404).json({ message: 'Post not found' });
    }
    console.log('Post deleted:', req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Error deleting post' });
  }
});

export default router;