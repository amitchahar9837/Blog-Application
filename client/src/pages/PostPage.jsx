import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiOutlineExclamation } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`, {
          method: "GET",
        });
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size={"xl"} />
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex items-center flex-col gap-3">
        <HiOutlineExclamation className="text-6xl" />
        <h2 className="text-2xl font-serif max-w-2xl mx-auto text-center lg:text-xl">Something went wrong!</h2>
        <Button color={'gray'} pill onClick={()=>navigate(-1)} >Go Back</Button>
        </div>
      </div>
    );
  return (
    <main className="flex flex-col max-w-6xl mx-auto p-3 min-h-screen">
      <h1 className="text-3xl font-serif mt-10 p-3 max-w-2xl mx-auto text-center lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="mt-5 self-center"
      >
        <Button size={"xs"} color={"gray"} pill>
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between items-center p-3 border-b border-slate-500 mx-auto max-w-2xl w-full text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-3 max-w-2xl w-full mx-auto post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <CommentSection postId={post && post._id} />
    </main>
  );
}
