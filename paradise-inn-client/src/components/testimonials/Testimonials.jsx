import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';

const Testimonials = () => {
    const AutoplaySlider = withAutoplay(AwesomeSlider);
    return (
        <div className='my-44'>
            <AutoplaySlider
                play={true}
                cancelOnInteraction={false} // should stop playing on user interaction
                interval={3000}
                className="h-[75vh]"
            >
                <div
                    className="carousel w-full h-[90vh]"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                >
                    <div id="slide1" className="carousel-item relative w-full hero" style={{ backgroundImage: 'url(https://i.ibb.co/3WgPMPJ/review-1.jpg)' }}>

                        <div className="hero-overlay  bg-opacity-40"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div className="max-w-2xl text-white">
                                <h1 className="mb-5 text-5xl font-bold pb-6">What People Say</h1>
                                {/* <img src={user} className="rounded-full mx-auto w-20 md:w-28 lg:w-36" alt="" /> */}
                                <p className="mb-5 max-w-lg font-semibold mx-auto">Cakes are special. Every birthday, every celebration ends with something sweet, a cake, and people remember.</p>
                                <h2 className="font-bold text-xl">Sakib Al Hasan</h2>
                                <div className="rating rating-md">
                                    <input type="radio" name="rating-15" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-14" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-13" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-12" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-11" className="mask mask-star-2 bg-orange-400" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="carousel w-full h-[90vh]">
                    <div id="slide2" className="carousel-item relative w-full hero" style={{ backgroundImage: 'url(https://i.ibb.co/QmKZHmc/review-2.jpg)' }}>
                        <div className="hero-overlay  bg-opacity-60"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div className="max-w-2xl text-white">
                                <h1 className="mb-5 text-5xl font-bold pb-6">What People Say</h1>
                                {/* <img src={user} className="rounded-full mx-auto w-36" alt="" /> */}
                                <p className="mb-5 max-w-lg font-semibold mx-auto">Cakes are special. Every birthday, every celebration ends with something sweet, a cake, and people remember.</p>
                                <h2 className="font-bold text-xl">Eftekher Shuvo</h2>
                                <div className="rating rating-md">
                                    <input type="radio" name="rating-10" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-9" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="carousel w-full h-[90vh]">
                    <div id="slide3" className="carousel-item relative w-full hero" style={{ backgroundImage: 'url(https://i.ibb.co/jyqsPtR/review-3.jpg)' }}>
                        <div className="hero-overlay  bg-opacity-60"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div className="max-w-2xl text-white">
                                <h1 className="mb-5 text-5xl font-bold pb-6">What People Say</h1>
                                {/* <img src={user} className="rounded-full mx-auto w-36" alt="" /> */}
                                <p className="mb-5 max-w-lg font-semibold mx-auto">Cakes are special. Every birthday, every celebration ends with something sweet, a cake, and people remember.</p>
                                <h2 className="font-bold text-xl">Sheikh Saddad</h2>
                                <p>WEDDINGS</p>
                                <div className="rating rating-md">
                                    <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </AutoplaySlider>
        </div>
    );
};

export default Testimonials;