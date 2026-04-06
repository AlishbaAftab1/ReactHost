import React, { useState } from "react";
import "./App.css";

const initialPosts = [
  {
    id: 1,
    username: "john_doe",
    profile: "https://i.pravatar.cc/40?img=1",
    image: "https://picsum.photos/500/400?random=1",
    likes: 12,
    comments: ["Nice pic!", "Awesome 🔥"]
  },
  {
    id: 2,
    username: "jane_smith",
    profile: "https://i.pravatar.cc/40?img=2",
    image: "https://picsum.photos/500/400?random=2",
    likes: 30,
    comments: ["Wow!", "Love this ❤️"]
  },
  {
    id: 3,
    username: "alex99",
    profile: "https://i.pravatar.cc/40?img=3",
    image: "https://picsum.photos/500/400?random=3",
    likes: 7,
    comments: []
  }
];

function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [likedPosts, setLikedPosts] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

  const toggleLike = (id) => {
    setLikedPosts((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? {
              ...post,
              likes: likedPosts[id] ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
  };

  const handleCommentChange = (id, value) => {
    setCommentInputs({ ...commentInputs, [id]: value });
  };

  const addComment = (id) => {
    if (!commentInputs[id]) return;

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? {
              ...post,
              comments: [...post.comments, commentInputs[id]]
            }
          : post
      )
    );

    setCommentInputs({ ...commentInputs, [id]: "" });
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h2 className="logo">InstaApp</h2>
        <div className="nav-icons">
          <span>🏠</span>
          <span>💬</span>
          <span>➕</span>
          <span>❤️</span>
        </div>
      </header>

      <div className="main">
        {/* Feed */}
        <div className="feed">
          {/* Stories */}
          <div className="stories">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div key={s} className="story">
                <img src={`https://i.pravatar.cc/60?img=${s}`} alt="" />
                <p>User{s}</p>
              </div>
            ))}
          </div>

          {/* Posts */}
          {posts.map((post) => (
            <div key={post.id} className="post">
              <div className="post-header">
                <img src={post.profile} alt="" />
                <span>{post.username}</span>
              </div>

              <img className="post-image" src={post.image} alt="" />

              <div className="post-actions">
                <button onClick={() => toggleLike(post.id)}>
                  {likedPosts[post.id] ? "❤️ Liked" : "🤍 Like"}
                </button>
              </div>

              <p className="likes">{post.likes} likes</p>

              <div className="comments">
                {post.comments.map((c, i) => (
                  <p key={i}>{c}</p>
                ))}
              </div>

              <div className="add-comment">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentInputs[post.id] || ""}
                  onChange={(e) =>
                    handleCommentChange(post.id, e.target.value)
                  }
                />
                <button onClick={() => addComment(post.id)}>Post</button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          <div className="profile">
            <img src="https://i.pravatar.cc/80" alt="" />
            <h3>Your Profile</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
