import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useEffect } from "react";

const AboutUs = () => {
    const { setTitle } = useContext(AuthContext);
    useEffect(() => {
        setTitle("About Us");
    }, [setTitle])
    return (


        <div className="min-h-screen">
            <div
                className="hero"
                style={{ backgroundImage: 'url(https://cozystay.loftocean.com/countryside-lodge/wp-content/uploads/sites/5/2023/04/billy-jo-catbagan-zvhjrkA7gSk-unsplash.jpg)' }}
                data-aos="fade-down"
                data-aos-easing="ease-in-back"
                data-aos-offset="0"
            >
                <div className="hero-overlay bg-black bg-opacity-50"></div>
                <div className="hero-content w-full text-center text-neutral-content mt-24">
                    <div
                        className="w-full my-8"
                        data-aos="fade-zoom-in"
                        data-aos-easing="ease-in-back"
                        data-aos-delay="400"
                        data-aos-offset="0"
                    >
                        <h1 className="text-4xl md:text-6xl text-white marcellus">About Paradise Inn</h1>
                        <p className="text-base md:text-xl font-jost">The seaside haven of warmth, tranquility and restoration</p>
                    </div>
                </div>
            </div>
            <div className="relative">
                <div className="lg:w-[60%] lg:mx-auto mx-4 my-10 ">
                    <div>
                        <p className="mb-4 text-justify font-jost">Welcome to Paradise Inn, your seaside oasis where comfort, relaxation, and culinary delights converge to create an unforgettable experience.</p>

                        <h2 className="marcellus text-xl font-bold">Your Seaside Retreat</h2>
                        <p className="mb-4 text-justify font-jost">At Paradise Inn, we offer well-appointed rooms with private balconies providing stunning ocean views. Imagine waking up to the soothing sound of the waves and enjoying the sea breeze from your own balcony.</p>

                        <p className="mb-4 text-justify font-jost">We provide amenities like hammocks for relaxing under swaying palm trees, snorkeling gear to explore vibrant coral reefs, kayaks for paddling through crystal-clear waters, and outdoor showers for rinsing off after a refreshing swim. Our service station is stocked with fresh tropical fruits and drinks to keep you refreshed.</p>

                        <h2 className="marcellus text-xl font-bold">A Culinary Journey</h2>
                        <p className="mb-4 text-justify font-jost">Our restaurant serves a diverse menu featuring fresh seafood, international cuisine, and local delights. You can savor your meals with a view of the endless sea, creating a dining experience {`that's`} as unforgettable as the surroundings.</p>

                        <h2 className="marcellus text-xl font-bold">Contact Us</h2>
                        <p className="font-jost">Paradise Inn<br />
                            Seaside Paradise, {`Cox's Bazar, Bangladesh`}<br />
                            Phone: 01518 79 07 38<br />
                            Email: info@paradiseinnseaside.com</p>
                    </div>
                </div>
            </div>

        </div>


    );
};

export default AboutUs;


