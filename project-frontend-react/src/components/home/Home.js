import React, { useEffect, useState, useContext } from "react";
import "./Home.css";
import { Row, Col, Form, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UseContext";
import axios from "axios";
import Swal from "sweetalert2";
import AllComments from "../comments/AllComments";
function Home(props) {
  const { isLogin, setIslogin } = useContext(UserContext);
  let history = useHistory();
  if (!isLogin) {
    history.push("/signin");
  }
  const [posts, setPosts] = useState([]);
  const [available, setAvailabel] = useState(false);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/b_users").then(function (response) {
      // console.log(response.data.posts[0].id);

      setPosts(response.data.posts);
      if (response.data.success === true) {
        setAvailabel(true);
      } else {
        setAvailabel(false);
      }
      // console.log(posts);
      // console.log(response.data.success);
    });
  }, []);

  const setAllData = (data) => {
    setPosts(data);
  };

  const loadImageBig = (src) => {
    //console.log("working");
    Swal.fire({
      imageUrl: src,
      imageAlt: "Profile image did not uploaded yet",
    });
  };

  return (
    <div>
      <div className="container">
        <Row>
          <Col md={{ span: 8, offset: 2 }} className="mt-4">
            {!available && (
              <div style={{ height: "100vh" }}>
                {" "}
                <h1 style={{ marginTop: "35vh" }}>Posts is loading...</h1>
              </div>
            )}
            {/* All JBuddy posts */}
            {available &&
              posts.map((post) => (
                <Card className="text-dark mb-4" key={post.id}>
                  {post.share_Name && (
                    <Card.Header className="bg-secondary text-white">
                      <p className=" d-flex align-items-center ml-3 mr-3 pt-4">
                        <h5 className="ml-3 mr-3 pt-1">{post.name}</h5>
                        shared a post of{" "}
                        <h5 className="text-light rounded bg-dark p-2 ml-2">
                          {" "}
                          {post.share_Name}{" "}
                        </h5>
                      </p>
                    </Card.Header>
                  )}
                  <Card.Header>
                    <div className="d-flex align-items-center">
                      {!post.profile_image && (
                        <i
                          className="fa fa-user img-icon"
                          onClick={() => {
                            loadImageBig(
                              `http://127.0.0.1:8000/storage/uploadImages/${post.profile_image}`
                            );
                          }}
                        ></i>
                      )}
                      {post.profile_image && (
                        <img
                          onClick={() => {
                            loadImageBig(
                              `http://127.0.0.1:8000/storage/uploadImages/${post.profile_image}`
                            );
                          }}
                          src={`http://127.0.0.1:8000/storage/uploadImages/${post.profile_image}`}
                          alt=""
                          className="img-icon"
                        />
                      )}
                      <h5 className="ml-3 mr-3 pt-1">{post.name}</h5>
                      <p className="ml-auto mt-3">
                        {new Date(post.created_at).toLocaleTimeString("en-GB", {
                          hour12: true,
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        |{" "}
                        {new Date(post.created_at).toLocaleDateString("en-GB", {
                          month: "2-digit",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    {/* show post and image */}
                    <Card.Text className="post-text-size">
                      {post.post}
                    </Card.Text>
                    {post.img && (
                      <img
                        src={`http://127.0.0.1:8000/storage/uploadImages/${post.img}`}
                        alt=""
                        className="post-image-home"
                      />
                    )}
                    {/* all like and comments..... */}
                    <AllComments
                      post_id={post.id}
                      share={post.share}
                      setAllData={setAllData}
                    />
                    {/* show all comments  */}
                  </Card.Body>
                </Card>
              ))}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Home;
