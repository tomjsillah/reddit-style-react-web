import React, { Component } from "react";
import "./style.css";
import UpVote from "./UpVote";
import DownVote from "./DownVote";
import Search from "./Search";
const fetch = require("node-fetch");

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      more: false,
      search: ""
    };
    this.showMore = this.showMore.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async componentDidMount() {
    const users = await mergeData();
    console.log(users);
    this.setState({ users: users });
  }
  showMore() {
    this.setState(prevState => {
      return {
        more: !prevState.more
      };
    });
  }
  
  onChange(event) {
    this.setState({ search: event.target.value });
  }

  render() {
    const filteredUsers = this.state.users.filter(user =>
      user.username.toLowerCase().includes(this.state.search.toLowerCase())
    );

    return (
      <div>
        <h1 style={{ textAlign: "center", color: "skyblue" }}> Trendly </h1>

        {this.state.users === null ? (
          "loading"
        ) : (
          <div>
            <Search search={this.searchUser} onChange={this.onChange} />
            {filteredUsers.map(user => (
              <div className="profile-container">
                <h1 style={{ color: "skyblue" }}>{user.username}</h1>
                {user.posts
                  .map(post => (
                    <div>
                      <h4>
                        {post.id}. {post.title}
                      </h4>
                      <p>{post.body}</p>
                      <div className="vote">
                        <UpVote /> <DownVote />
                      </div>
                    </div>
                  ))
                  .slice(0, this.state.more ? user.posts.length : 3)}
                <button className="more" onClick={this.showMore}>
                  {" "}
                  {this.state.more ? "less" : "more..."}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

async function fetchPosts() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const jsonData = await response.json();
    return jsonData;
  } catch (e) {
    throw Error(e);
  }
}

async function fetchUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const jsonData = await response.json();
    return jsonData;
  } catch (e) {
    throw Error(e);
  }
}

async function fetchAlbums() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/albums");
    const jsonData = await response.json();
    return await jsonData;
  } catch (e) {
    throw Error(e);
  }
}

async function mergeData() {
  const albums = await fetchAlbums();
  const users = await fetchUsers();
  const posts = await fetchPosts();
  for (let user of users) {
    user.albums = albums.filter(album => album.userId === user.id);
    user.posts = posts.filter(post => post.userId === user.id);
  }
  return users;
}
