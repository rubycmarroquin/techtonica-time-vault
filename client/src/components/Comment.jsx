import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Comment = ({ category, id, refresh }) => {
  const [comment, setComment] = useState({
    username: "",
    content: "",
    id: id,
  });

  const clearForm = () => {
    setComment({
      username: "",
      content: "",
      id: id,
    });
  };

  const handleFormChange = (field, value) => {
    console.log(value);
    setComment((comment) => ({ ...comment, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url = "";

    if (category === "main") {
      url = "/api/code/comments";
    } else {
      url = "/api/solutions/comments";
    }

    await apiCall(url);

    refresh();
  };

  //A function to handle the post request to comments table in db
  const apiCall = async (url) => {
    return fetch(`http://localhost:8080${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        clearForm();
      });
  };

  return (
    <Form className="CommentOutter" onSubmit={handleSubmit}>
      <h5>{category === "main" ? "Respond to Thread" : "Add comment"}</h5>
      <Form.Group>
        <Form.Label>Enter name: </Form.Label>
        <input
          type="text"
          name="username"
          placeholder="Enter name"
          required
          value={comment.username || ""}
          onChange={(e) => handleFormChange("username", e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <input
          type="text"
          name="comment"
          placeholder="Enter comment text"
          required
          value={comment.content || ""}
          onChange={(e) => handleFormChange("content", e.target.value)}
        />
      </Form.Group>
      <Button style={{ marginBottom: "25px" }} type="submit">
        Post Comment
      </Button>
    </Form>
  );
};

export default Comment;