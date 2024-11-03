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
                            <Image src={`/images/projects/willmore.png`} fill alt="" className="object-contain" />
                        </div>
                        <div className="relative w-full keen-slider__slide imgContainer aspect-16/7">
                            <Image src={`/images/projects/willmore2.png`} fill alt="" className="object-contain" />
                        </div>
                        <div className="relative w-full keen-slider__slide imgContainer aspect-16/7">
                            <Image src={`/images/projects/willmore3.png`} fill alt="" className="object-contain" />
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
                <h2 className="mb-4 text-2xl font-semibold md:text-3xl">Explore Willmore Wilderness</h2>
                <div className="textContainer">
                    <h3 className="text-xl font-semibold">Summary</h3>
                    <p className="mb-4">
                        Explore Willmore Wilderness was a school assignment developed with SEO in mind. We were supposed to simulate what making a website for a client would be like and the steps needed to get a page on Google. The website promoted what you could do in Willmore Wilderness (like a brochure website).
                    </p>
                </div>

                <div className="textContainer">
                    <h3 className="text-xl font-semibold">Things I Did</h3>
                    <p className="mb-4">
                        I designed and developed the website using HTML, CSS, and Javascript. Still, the main focus was creating a website that Google would index, achieved with adequately formatted content and following proper coding conventions. I also made graphics using Adobe Illustrator for my logos and advertising banners.
                    </p>

                    <p className="mb-4">
                        After regular content updates and using keywords related to Willmore Wilderness, I made Explore Willmore Wilderness a top page result when users searched &#34;Willmore Wilderness&#34; on Google.
                    </p>
                </div>

                <div className="textContainer">
                    <h3 className="text-xl font-semibold">Reflection</h3>
                    <p className="mb-4">
                        This project was a lot of fun for me. Designing and creating a nature-themed website appealed to my creative side. The only real issue I encountered was that I was making a lot of UI elements from scratch for the first time, so the polish was lacking in some areas of the website.

                        I wished I made the Modals better or used a UI library to create it.
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
