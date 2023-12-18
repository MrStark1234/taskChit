import React from "react";
import { FaFileAlt } from "react-icons/fa";
import { GrDocumentUpdate } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import axios from "axios";

const Card = ({ data, reference, post, setpost }) => {
  const handleDeleteClick = async () => {
    try {
      // Use the actual post ID from the data prop
      const postId = data._id;

      await axios.delete(`http://localhost:8000/posts/deletePost/${postId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      // Update the state by removing the deleted post
      const newPosts = post.filter((e) => e._id !== postId);
      setpost(newPosts);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <motion.div
      drag
      dragConstraints={reference}
      whileDrag={{ scale: 1.2 }}
      dragElastic={0.1}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
      className="flex-shrink-0 relative w-52 h-64 rounded-[50px] bg-sky-900/90  py-10 px-5 text-orange-500 overflow-hidden "
    >
      <span
        className="w-4 h-4 rounded-full flex items-center justify-center bg-orange-500 float-right cursor-pointer"
        onClick={handleDeleteClick}
      >
        <IoClose size=".6em" color="#000" />
      </span>
      <FaFileAlt />

      <p className="mt-4 text-sm leading-tight text-zinc-300">{data.desc}</p>
      <div className="footer absolute bottom-0  w-full  left-0">
        <motion.div className="flex items-center justify-between mb-2 py-2 px-8">
          <p className="text-xs text-orange-500">{data.fileSize}</p>
          <span className="w-5 h-5 rounded-full flex items-center justify-center bg-orange-500">
            <GrDocumentUpdate size=".6em" color="#000" />
          </span>
        </motion.div>
        {data.tag.isOpen ? (
          <div
            className={`tag w-full py-3 ${
              data.tag.tagColor === "red" ? "bg-rose-500" : "bg-green-300"
            }`}
          >
            <h3 className="text-sm flex items-center justify-center text-black font-semibold">
              {data.tag.tagTitle}
            </h3>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
};

export default Card;
