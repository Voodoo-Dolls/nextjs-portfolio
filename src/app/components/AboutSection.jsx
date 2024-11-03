"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="pl-2 list-disc">
        <li>React/NextJS</li>
        <li>JavaScript</li>
        <li>MySQL</li>
        <li>Figma</li>
        <li>Prismic CMS</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="pl-2 list-disc">
        <li>Diploma: Digital Media & IT</li>
        <li>Northern Alberta Institute of Technology, Edmonton, AB</li>
      </ul>
    ),
  }
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="gap-8 px-4 py-8 md:grid md:grid-cols-2 xl:gap-16 sm:py-16 xl:px-16">
        <Image src="/images/bubble.webp" width={500} height={500} alt="A beautiful shot of a frozen bubble." />
        <div className="flex flex-col h-full mt-4 text-left md:mt-0">
          <h2 className="mb-4 text-4xl font-bold text-white">About Me</h2>
          <p className="mb-4 text-base lg:text-lg">
            Hey! My name is Michael, and I am a Front-End Developer passionate about creating interactive and responsive web applications. I love building web applications using NextJS, but I am also knowledgeable in WordPress, PHP, and JQuery if your project requires those skills.
          </p>
          <p className="text-base lg:text-lg">
            My two big hobbies are photography (mainly outdoor) and gaming. The Frozen Bubble is one of my favourite photos I have captured. If I&apos;m not too busy on the weekends, I play games with my friends; we&apos;re currently playing &quot;The Forever Winter.&quot; If you&apos;re also a big gamer, let me know what you play!
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              Top Skills{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              Education{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
