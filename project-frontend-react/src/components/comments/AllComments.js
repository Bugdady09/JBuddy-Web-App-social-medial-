import React, { useState, useEffect } from "react";
import "./AllComments.css";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import swal from "sweetalert";

function AllComments({ post_id, share, setAllData }) {
  const [coment, setComment] = useState({});
  const [allComent, setAllComment] = useState([]);
  const [like, setLike] = useState(0);
  const [islikedUser, setIsLikeUser] = useState(false);
  //get logged in profile id for comment
  const { id } = JSON.parse(localStorage.getItem("userinfo"));

  // useEffect(() => {
  //   //load all likes
  //   axios
  //     .get(`http://127.0.0.1:8000/api/getLikes?u_id=${id}&id=${post_id}`)
  //     .then(function (response) {
  //       console.log(response);
  //       setLike(response.data.likes);
  //       if (response.data.islikedUser) {
  //         setIsLikeUser(true);
  //       } else {
  //         setIsLikeUser(false);
  //       }
  //     });
  // }, []);

  //user liked store in db
  const likeButtonHandler = () => {
    axios
      .post("http://127.0.0.1:8000/api/b_like", {
        u_id: id,
        post_id: post_id,
      })
      .then(function (response) {
        setLike(response.data.likes);
        setIsLikeUser(response.data.success);
        if (response.data.success) {
          sweetalertresponse("You liked the post just now", "success");
        } else {
          sweetalertresponse("you unliked the post", "info");
        }
      });
  };

  //load all comments from db
  const loadAllComment = (p_id) => {
    axios
      .get(`http://127.0.0.1:8000/api/b_comments/${p_id}`)
      .then(function (response) {
        setAllComment(response.data.comment);
      });
  };

  //make comment ----- store comment to db
  const makeCommentHandler = () => {
    console.log(coment.comment);
    if (Object.keys(coment).length !== 0 && coment.comment !== "") {
      //return console.log(coment);
      axios
        .post("http://127.0.0.1:8000/api/b_comments", coment)
        .then(function (response) {
          setAllComment(response.data.comment);
          setComment([]);
        });
      //props.setdata(userResponse.data.posts);
      sweetalertresponse("Your comment uploaded", "success");
    } else {
      sweetalertresponse("Write a comment to upload..", "error");
      //console.log("nothind to post");
    }

    document.getElementById("coment_box").value = "";
  };

  const sweetalertresponse = (message, alertType) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: alertType,
      title: message,
      background: "#d8e2dc",
    });
  };

  const sharePostHandler = async () => {
    console.log("working...");
    let userResponse = await axios.post("http://127.0.0.1:8000/api/postShare", {
      post_id: post_id,
      u_id: id,
    });
    setAllData(userResponse.data.posts);
    swal({
      text: "You shared the post successfully",
      icon: "success",
      button: "OK",
    });
  };

  return (
    <div>
      <div className="d-flex align-items-center">
        {islikedUser && (
          <div
            onClick={likeButtonHandler}
            className="d-flex align-items-center mr-2 btn btn-primary"
          >
            {like} <i className="fa fa-thumbs-up mx-2"></i>
          </div>
        )}
        {!islikedUser && (
          <div
            onClick={likeButtonHandler}
            className="d-flex align-items-center mr-2 btn btn-secondary"
          >
            {like} <i className="fa fa-thumbs-up mx-2"></i>
          </div>
        )}
        <Form.Control
          as="textarea"
          id="coment_box"
          placeholder="write your comment..."
          rows={1}
          onChange={(e) =>
            setComment({
              u_id: id,
              post_id: post_id,
              comment: e.target.value,
            })
          }
          onClick={() => {
            loadAllComment(post_id);
          }}
        />
        <div
          onClick={() => {
            makeCommentHandler();
          }}
          className="d-flex align-items-center btn btn-secondary ml-2"
        >
          Comment <i className="fa fa-comment-alt mx-2"></i>
        </div>
        {share * 1 === 0 && (
          <div
            onClick={() => sharePostHandler()}
            className="d-flex align-items-center btn btn-secondary ml-2"
          >
            Share<i className="fa fa-share-square mx-2"></i>
          </div>
        )}
        {share * 1 !== 0 && (
          <div
            onClick={() => sharePostHandler()}
            className="d-flex align-items-center btn btn-primary ml-2"
          >
            Share<i className="fa fa-share-square mx-2 bg-secondary"></i>
            {share}
          </div>
        )}
      </div>

      {/* show all comments */}
      {allComent &&
        allComent.map((coment) => (
          <div className="">
            {/* check comment id and post id for show commets */}
            {coment.post_id === post_id && (
              <div className="mt-3 show-all-comment-box">
                <div className="d-flex align-items-center">
                  {!coment.profile_image && (
                    <i className="fa fa-user img-icon-comment"></i>
                  )}
                  {coment.profile_image && (
                    <img
                      src={`http://127.0.0.1:8000/storage/uploadImages/${coment.profile_image}`}
                      alt=""
                      className="img-icon-comment"
                    />
                  )}
                  <p className="mt-3 ml-3">{coment.name}</p>
                  <div className="ml-auto">
                    <p className="ml-3 mt-3">
                      {new Date(coment.created_at).toLocaleTimeString("en-GB", {
                        hour12: true,
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      |{" "}
                      {new Date(coment.created_at).toLocaleDateString("en-GB", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <Form.Control
                  className="mt-1 border border-light"
                  as="textarea"
                  placeholder={coment.comment}
                  readOnly
                  rows={1}
                />
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default AllComments;
