import React, { useEffect, useState } from "react";
import moment from "moment";
export default function Comment({ comment }) {
  const [user, setUser] = useState({});
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
        <p className="text-gray-500 pb-2">{comment.content}</p>
      </div>
    </div>
  );
}
