import { Alert, Button, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComment/${postId}`, {
          method: "GET",
        });
        const data = await res.json();
        if (res.ok) {
          setComments(data);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment === "") {
      setCommentError("Please write comment first!");
      return;
    }

    try {
      setCommentError(null);
      const res = await fetch(`/api/comment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setCommentError(data.message);
        return;
      }
      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleToEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };
  return (
    <div className="max-w-2xl w-full p-3 mx-auto">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="w-5 h-5 rounded-full object-cover"
            src={currentUser.profilePicture}
            alt=""
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-cyan-500 hover:underline"
          >
            @{currentUser.email}
          </Link>
        </div>
      ) : (
        <div className=" my-5 text-sm flex gap-1">
          You must be signed in to commit.
          <Link to={"/sign-in"} className="text-cyan-500 hover:underline">
            Sign in
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          className="border border-teal-500 p-3 rounded-md"
          onSubmit={handleSubmit}
        >
          <Textarea
            placeholder="Add a comment..."
            rows={3}
            maxLength={200}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-xs">
              {200 - comment.length} charactrer remaining
            </p>
            <Button outline gradientDuoTone={"purpleToBlue"} type="submit">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color={"failure"} className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}

      {comments.length === 0 ? (
        <p className="text-sm my-5">No comment yet!</p>
      ) : (
        <>
          <div className="flex items-center gap-1 text-sm my-5">
            <p>Comments</p>
            <div className="border border-gray-500 py-1 px-2 rounded-md">
              {comments.length}
            </div>
          </div>

          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLikeComment}
              onEdit={handleToEdit}
            />
          ))}
        </>
      )}
    </div>
  );
}
