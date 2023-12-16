import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";

const Foreground = () => {
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const ref = useRef(null); // kisi bhi tag ka reference dene ke liye

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/posts/getAllPosts",
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleAddChitClick = () => {
    // Navigate to the AddChit component
    navigate("/add");
  };
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <>
      <div
        ref={ref}
        className="fixed z-[3] top-0 left-0 w-full h-screen flex flex-wrap gap-10 p-10"
      >
        <button
          id="add-btn"
          className=" bg-sky-800 text-white absolute w-[65px] h-[30px] rounded right-[8%] top-[2%] text-xs"
          onClick={handleAddChitClick}
        >
          Add Chit
        </button>
        <button
          id="lout-btn"
          className=" bg-red-600 text-zinc-900 absolute w-[65px] h-[30px] rounded right-[0%] top-[2%] mr-5 text-xs"
          onClick={handleLogout}
        >
          Signout
        </button>
        {post.map((item, index) => (
          <Card
            key={index}
            data={item}
            reference={ref}
            post={post}
            setpost={setPost}
          /> // maine card ko iss div ka reference de diya hai
        ))}
      </div>
      {/* // iss div ko maine ref de diya hai, ab jaha bhi main ref bolunga waha ye
      div target hoga */}
    </>
  );
};

export default Foreground;
