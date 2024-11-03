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
                            <Image src={`/images/projects/tournament.webp`} fill alt="" className="object-contain" />
                        </div>
                        <div className="relative w-full keen-slider__slide imgContainer aspect-16/7">
                            <Image src={`/images/projects/tournament2.png`} fill alt="" className="object-contain" />
                        </div>
                        <div className="relative w-full keen-slider__slide imgContainer aspect-16/7">
                            <Image src={`/images/projects/tournament3.png`} fill alt="" className="object-contain" />
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

                <h2 className="mb-4 text-2xl font-semibold md:text-3xl">KF2 Summer Showdown</h2>
                <div className="textContainer">
                    <h3 className="text-xl font-semibold">Summary</h3>
                    <p className="mb-4">
                        The Killing Floor 2 (KF2) Summer Showdown is my first big web project. After my first year of studying web development, I wanted to take on a project to practice the skills I had just learned. The gaming community that I am part of (Tamari&apos;s KF2) was hosting a tournament. I volunteered to make a tournament website, which eventually became a big passion project. Even though the website is programmed in vanilla HTML CSS and Javascript, I like to showcase this project because any passion project can be a high-quality product.
                    </p>
                </div>

                <div className="textContainer">
                    <h3 className="text-xl font-semibold">Things I Did</h3>
                    <p className="mb-4">
                        I developed and designed the website, taking revisions from the client. Since the deadline was only one week, most of the design process was impromptu while programming. The client provided most of the graphical assets and content, so I was programming the entire week (12 hours daily).
                    </p>

                    <p className="mb-4">
                        The website&apos;s features were that it was fully responsive and filled with content related to the Tournament with a countdown timer.
                    </p>

                    <p className="mb-4">
                        After completing the website, I contributed more to the Tournament, creating custom animations for the Stream using Adobe After Effects.
                    </p>
                </div>

                <div className="textContainer">
                    <h3 className="text-xl font-semibold">Reflection</h3>
                    <p className="mb-4">
                        This project taught me how important it is to have a design first. Most of the slowdowns of the project came from changing parts of the website, either by debugging or changing the appearance.
                    </p>
                    <p>
                        One thing I wish I could have done was streamline the work process. If I had been more knowledgeable in JavaScript, I could have modularized the code instead of constantly changing the header for six different files.
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
