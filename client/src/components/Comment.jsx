import React, { useEffect, useState } from "react";
import { Button, Textarea } from "flowbite-react";
import { FaThumbsUp } from "react-icons/fa";
import moment from "moment";
import { useSelector } from "react-redux";
export default function Comment({ comment, onLike, onEdit }) {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [isEditting, setIsEditting] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`, {
          method: "GET",
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = () => {
    setIsEditting(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditting(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm ">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full"
          src={user.profilePicture}
          alt={user.name}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-2">
          <span className="text-xs font-bold mr-1 truncate">
            {user ? `@${user.email}` : "@unknown user"}
          </span>
          <span className={"text-xs text-gray-500"}>
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditting ? (
          <>
            <Textarea
              className="mb-2 resize-none"
              rows={"3"}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-xs">
              <Button
                type="button"
                gradientDuoTone={"purpleToBlue"}
                size={"sm"}
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                type="button"
                gradientDuoTone={"purpleToBlue"}
                size={"sm"}
                outline
                onClick={() => setIsEditting(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 pb-2">{comment.content}</p>
            <div className="flex items-center pt-2 text-xs border-t dard:border-gray-700 max-w-fit gap-2">
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={` hover:text-blue-500 ${
                  currentUser && comment.likes.includes(currentUser._id)
                    ? "text-blue-500"
                    : "text-gray-400"
                }`}
              >
                <FaThumbsUp className="text-sm" />{" "}
              </button>
              <p className="text-gray-400">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes === 1 ? "like" : "likes")}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <button
                    onClick={handleEdit}
                    type="button"
                    className="text-gray-400 hover:text-blue-500"
                  >
                    Edit
                  </button>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
