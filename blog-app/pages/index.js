import { useState } from "react";
export default function Home() {
  const [blogs, setBlogs] = useState([]);
  async function fetchBlogs() {
    const response = await fetch("/api/blogs");
    const data = await response.json();
    setBlogs(data);
  }
  async function postBlog(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const response = await fetch("/api/post", {
      method: "POST",
      body: form
    });
    const result = await response.json();
    alert(`Blog Posted! Post Key: ${result.postKey}`);
  }
  return (
    <div>
      <h1>Post a Blog</h1>
      <form onSubmit={postBlog}>
        <input name="title" placeholder="Blog Title" required /><br />
        <textarea name="content" placeholder="Blog Content" required></textarea><br />
        <button type="submit">Post Blog</button>
      </form>
      <button onClick={fetchBlogs}>Fetch Blogs</button>
      <div>
        {blogs.map(blog => (
          <div key={blog.id}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
