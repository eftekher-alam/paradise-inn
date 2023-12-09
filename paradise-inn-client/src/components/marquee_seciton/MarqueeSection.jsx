import Marquee from "react-fast-marquee";
import { BiSolidSchool } from 'react-icons/bi';

const MarqueeSection = () => {
    return (
        <div className="mt-36 font-light tracking-widest space-y-8">
            <div
                data-aos="fade-up"
                data-aos-duration="1000"
                className="space-y-8"
            >
                <div>
                    <BiSolidSchool className="text-8xl block mx-auto text-[#53624E]"></BiSolidSchool>
                    <h2 className="font-jost text-center text-[#53624E]  uppercase font-semibold">WELCOME TO PARADISE INN.</h2>
                </div>
                <h1 className="text-center font-marcellus text-3xl md:text-4xl lg:text-5xl max-md:mx-4">In the Heart of the South Pacific, <br /> Outstanding Views</h1>
                <p className="font-jost text-center max-md:mx-4 md:w-[80%] block mx-auto">Nestled in the heart of the Pacific Islands resort, on the edge of a tranquil and beautiful Garden Island, CozyStay is a haven of warmth, tranquility and rejuvenation. Bathed in brilliant sunshine and clear skies, it offers stunning views of palm-lined beaches and gorgeous coral reefs.</p>
            </div>
            <div
                data-aos="fade-zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-duration="1500"
                data-aos-offset="0"
            >
                <Marquee
                    speed={150}
                    pauseOnClick={true}
                    pauseOnHover={true}
                >
                    <img src="https://cozystay.loftocean.com/island-resort/wp-content/uploads/sites/3/2023/03/img-75-550x824.jpg" alt="" className="w-96 h-[500px] mr-16" />
                    <img src="https://cozystay.loftocean.com/island-resort/wp-content/uploads/sites/3/2023/03/img-76-550x824.jpg" alt="" className="w-96 h-[500px] mr-16" />
                    <img src="https://cozystay.loftocean.com/island-resort/wp-content/uploads/sites/3/2023/03/img-77-1-550x824.jpg" alt="" className="w-96 h-[500px] mr-16" />
                    <img src="https://cozystay.loftocean.com/island-resort/wp-content/uploads/sites/3/2023/03/img-78-1-550x825.jpg" alt="" className="w-96 h-[500px] mr-16" />
                </Marquee>
            </div>
        </div>
    );
};

export default MarqueeSection;