import React, { Component } from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import './Posts.css'

class Posts extends Component {
  state = {
    posts: []
  }

  componentDidMount () {
    this.loadData();
  }

  // componentDidUpdate () {
  //   this.loadData();
  // }

  loadData () {
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
      const posts = response.data.slice(0,4);
      const updatedPosts = posts.map(post => {
        return {
          ...post,
          author: 'Zerch'
        }
      })
      this.setState({ posts: updatedPosts});
    })
    .catch(error => {
      console.log(error);
    });
  }

  postSelectedHandler = (id) => {
    this.setState({selectedPostId: id});
  }

  render () {
    const posts = this.state.posts.map(post => {
      return (
      <Link key={post.id}  to={'/'+ post.id}>
        <Post 
          title={post.title} 
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)}/>
      </Link>)
    })
    return (
      <section className='Posts'>
        {posts}
        <Route path="/:id" exact component={FullPost} />
      </section>
    )
  }
}

export default Posts;
