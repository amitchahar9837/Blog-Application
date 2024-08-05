import React from "react";

const About = () => {
  return (
    <div className="flex items-center min-h-[calc(100vh-62px)] justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div className="">
          <h1 className="text-3xl font-semibold my-7 text-center">
            About Nexus Blog
          </h1>
          <div className="flex flex-col text-md text-gray-500 gap-6">
            <p>
              Welcome to Nexus Blog! This blog was created by Amit Chahar as a
              personal project to share his thoughts and ideas with the world.
              Amit is a passionate developer who loves to write about technology
              coding, and everything in between.
            </p>
            <p>
              On this blog, you'll find weekly articles and tutorials on topics
              such as web developer, backend developer and programming
              languages. Amit is learning and exploring new technologies.
            </p>
            <p>
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other people's comments and reply to
              them as well. We believe that a community of learners can help
              each other grow and improve
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
