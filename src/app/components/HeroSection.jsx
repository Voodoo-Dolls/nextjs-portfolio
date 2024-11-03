"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 text-center place-self-center sm:text-left justify-self-start"
        >
          <h1 className="mb-4 text-4xl font-extrabold text-white sm:text-5xl lg:text-8xl lg:leading-normal">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-300">
              <span className="mr-4 text-white">
                👋
              </span>
              Hi, I&apos;m{" "}
            </span>
            <br></br>
            <TypeAnimation
              sequence={[
                "Michael",
                3000,
                "a Web Developer",
                2000,
                "a Web Designer",
                2000,
                "a Photographer",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <div>
            <Link
              href="/#contact"
              className="inline-block w-full px-6 py-3 mr-4 text-black rounded-full sm:w-fit bg-amber-300 hover:bg-slate-200"

            >
              Hire Me
            </Link>
            <Link
              href="/MichaelDam.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full px-1 py-1 mt-3 text-white rounded-full sm:w-fit bg-gradient-to-br from-amber-300 to-amber-300 hover:bg-slate-800"
            >
              <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
                Download CV
              </span>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 mt-4 place-self-center lg:mt-0"
        >
          <div className="rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative">
            <Image
              src="/images/me.jpg"
              alt="hero image"
              className="absolute transform -translate-x-1/2 -translate-y-1/2 border-4 rounded-full top-1/2 left-1/2 border-amber-300"
              width={390}
              height={390}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
