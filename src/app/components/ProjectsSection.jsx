"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "KF2 Summer Showdown",
    description: "HTML | CSS | JS ",
    image: "/images/projects/tournament.webp",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/projects/tournament",
  },
  {
    id: 2,
    title: "Explore Willmore Wilderness",
    description: "HTML | CSS | JS |",
    image: "/images/projects/willmore.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/projects/willmore",
  },
  {
    id: 3,
    title: "Airitreats",
    description: "NextJS | Prismic | Snipcart",
    image: "/images/projects/airi.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/projects/airitreats",
  }
]
const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="mt-4 mb-8 text-4xl font-bold text-center text-white md:mb-12">
        Featured Projects
      </h2>
      <ul ref={ref} className="grid gap-8 md:grid-cols-3 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
