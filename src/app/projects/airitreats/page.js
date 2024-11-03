'use client'
import Image from "next/image";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useState } from "react"
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

export default function Tournament() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        loop: true,

        created() {
            setLoaded(true)
        },

    },
        [
            (slider) => {
                let timeout
                let mouseOver = false
                function clearNextTimeout() {
                    clearTimeout(timeout)
                }
                function nextTimeout() {
                    clearTimeout(timeout)
                    if (mouseOver) return
                    timeout = setTimeout(() => {
                        slider.next()
                    }, 4000)
                }
                slider.on("created", () => {
                    slider.container.addEventListener("mouseover", () => {
                        mouseOver = true
                        clearNextTimeout()
                    })
                    slider.container.addEventListener("mouseout", () => {
                        mouseOver = false
                        nextTimeout()
                    })
                    nextTimeout()
                })
                slider.on("dragStarted", clearNextTimeout)
                slider.on("animationEnded", nextTimeout)
                slider.on("updated", nextTimeout)
            },
        ]
    )
    return (
        <>
            <Navbar />
            <div className="container px-12 py-4 mx-auto mt-24">

                <div className="navigation-wrapper">
                    <div ref={sliderRef} className="keen-slider">
                        <div className="relative w-full keen-slider__slide imgContainer aspect-16/7">
                            <Image src={`/images/projects/airi.png`} fill alt="" className="object-contain" />
                        </div>
                        <div className="relative w-full keen-slider__slide imgContainer aspect-16/7">
                            <Image src={`/images/projects/airi2.png`} fill alt="" className="object-contain" />
                        </div>
                        <div className="relative w-full keen-slider__slide imgContainer aspect-16/7">
                            <Image src={`/images/projects/airi3.png`} fill alt="" className="object-contain" />
                        </div>
                    </div>
                    {loaded && instanceRef.current && (
                        <>
                            <Arrow
                                left
                                onClick={(e) =>
                                    e.stopPropagation() || instanceRef.current?.prev()
                                }
                                disabled={currentSlide === 0}
                            />

                            <Arrow
                                onClick={(e) =>
                                    e.stopPropagation() || instanceRef.current?.next()
                                }
                                disabled={
                                    currentSlide ===
                                    instanceRef.current.track.details.slides.length - 1
                                }
                            />
                        </>
                    )}
                </div>
                {loaded && instanceRef.current && (
                    <div className="dots">
                        {[
                            ...Array(instanceRef.current.track.details.slides.length).keys(),
                        ].map((idx) => {
                            return (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        instanceRef.current?.moveToIdx(idx)
                                    }}
                                    className={"dot" + (currentSlide === idx ? " active" : "")}
                                ></button>
                            )
                        })}
                    </div>
                )}
                <h2 className="mb-4 text-2xl font-semibold md:text-3xl">Airitreats</h2>
                <div className="textContainer">
                    <h3 className="text-xl font-semibold">Summary</h3>
                    <p className="mb-4">
                        Airitreats was my capstone assignment. Stephanie approached NAIT for a website redesign, and my group took on that project. We designed and developed a fun, colourful e-commerce website using NextJS, Prismic, and Snipcart.
                    </p>
                </div>

                <div className="textContainer">
                    <h3 className="text-xl font-semibold">Things I Did</h3>
                    <p className="mb-4">
                        I was the Lead Developer for my group, so I was responsible for researching technologies that could help achieve the website the client wanted. Based on my research, I decided to use Prismic because the most considerable appeal of Prismic is that content creators can create new web pages without the need for a developer.
                    </p>

                    <p className="mb-4">
                        I developed a framework for most of the project, ensuring all the technologies worked well together. In short, I integrated the routing and product systems using Prismic&apos;s API and added the payment system using Snipcart, which is all held together using NextJS.
                    </p>
                </div>

                <div className="textContainer">
                    <h3 className="text-xl font-semibold">Reflection</h3>
                    <p className="mb-4">
                        Airitreats is my first big project using NextJS. I learnt so much from this project that it was sometimes overwhelming how much I needed to research. It was also my first time leading a group of people. Working together and contributing with your skillset can create a fantastic website.
                    </p>
                    <p>
                        However, since this was my first NextJS website, I could discover many other plugins that could make a better project.
                    </p>
                </div>
            </div>
            <Footer />
        </>

    )
}


function Arrow(props) {
    const disabled = props.disabled ? " arrow--disabled" : ""
    return (
        <svg
            onClick={props.onClick}
            className={`arrow ${props.left ? "arrow--left" : "arrow--right"
                } ${disabled}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            {props.left && (
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            )}
            {!props.left && (
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
            )}
        </svg>
    )
}
