import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

const MainCover = () => {

    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());
    const [price, setPrice] = useState(200);

    const handlerPrice = (event) => {
        event.preventDefault();
        setPrice(event.target.value);
    }

    return (
        <div className="">
            <div
                className="hero min-h-[93vh] max-md:min-h-screen"
                style={{ backgroundImage: 'url(https://cozystay.loftocean.com/island-resort/wp-content/uploads/sites/3/2023/03/img-74-3.jpg)' }}
                data-aos="fade-down"
                data-aos-easing="ease-in-back"
                data-aos-offset="0">
                <div className="hero-overlay bg-black bg-opacity-30"></div>
                <div className="hero-content w-full text-center text-neutral-content mt-24">
                    <div
                        className="relative"
                        data-aos="fade-zoom-in"
                        data-aos-easing="ease-in-back"
                        data-aos-delay="400"
                        data-aos-offset="0"
                    >
                        <h1 className="mb-5 text-4xl md:text-6xl lg:text-8xl text-white marcellus w-[95%] mx-auto lg:w-[75%] text-center">Boutique Private Island Resort</h1>
                        <p className="mb-5 text-base md:text-xl font-jost">The seaside haven of warmth, tranquility and restoration</p>
                        <Link to={"/rooms"} className="btn  btn-outline btn-warning md:hidden">
                            <span className="text-white font-normal marcellus text-sm">Check Availability</span>
                        </Link>
                        <div
                            className="bg-[#53624E] p-8 grid grid-cols-2 lg:grid-cols-4 gap-4  absolute -bottom-44 md:left-16 lg:left-0 xl:left-10 max-md:hidden"
                        >

                            <div>
                                <label className="grid grid-cols-8 p-0 m-0 input input-bordered input-warning bg-transparent">
                                    <div className="marcellus col-span-3 flex items-center justify-center max-lg:text-sm ">Check In</div>
                                    <div className="col-span-5 flex items-center justify-center">
                                        <DatePicker dateFormat={"dd/MM/yyyy"} selected={checkInDate} onChange={(date) => setCheckInDate(date)} className="font-jost bg-transparent outline-none text-center max-lg:text-sm" />
                                    </div>
                                </label>
                            </div>
                            <div>
                                <label className="grid grid-cols-8 p-0 m-0 input input-bordered input-warning bg-transparent">
                                    <div className="marcellus col-span-3 flex items-center justify-center max-lg:text-sm">Check Out</div>
                                    <div className="col-span-5 flex items-center justify-center">
                                        <DatePicker dateFormat={"dd/MM/yyyy"} selected={checkOutDate} onChange={(date) => setCheckOutDate(date)} className="font-jost bg-transparent text-center outline-none max-lg:text-sm" />
                                    </div>
                                </label>
                            </div>
                            <div>
                                <label className="grid grid-cols-8 p-0 m-0 input input-bordered input-warning bg-transparent">
                                    <div className="marcellus col-span-2 flex items-center justify-center max-lg:text-sm">Price</div>
                                    <div className="col-span-4 flex items-center justify-center">
                                        <input
                                            onChange={handlerPrice}
                                            type="range"
                                            id="vol"
                                            name="vol"
                                            min="0"
                                            max="1000"
                                            defaultValue={200}
                                            className="range  range-xs range-warning"
                                        ></input>
                                    </div>
                                    <div className="flex items-center justify-center font-jost col-span-2">
                                        ${price}
                                    </div>
                                </label>
                            </div>
                            <div>
                                <Link to={`/rooms?homePrice=${price}`} className="btn w-full marcellus btn-outline btn-warning max-lg:text-sm">
                                    <span className="text-white font-normal">Check Availability</span>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainCover;