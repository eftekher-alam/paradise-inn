const Newsletter = () => {
    return (
        <div className="">
            <div className="hero min-h-[70vh]" style={{ backgroundImage: 'url(https://cozystay.loftocean.com/island-resort/wp-content/uploads/sites/3/2023/03/img-80-2.jpg)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content flex max-lg:flex-col">
                    <div className="lg:w-1/2">
                        <h2 className="font-jost text-center lg:text-start text-white uppercase ">STAY TUNED WITH PARADISE INN.</h2>
                        <h1 className="text-center lg:text-start font-marcellus text-3xl md:text-4xl lg:text-5xl">Sign up for our newsletter to receive our news, deals and special offers.</h1>
                    </div>
                    <div className="lg:w-1/2 md:px-20">
                        <div className="form-control w-full">
                            <div className="input-group w-full">
                                <input type="text" placeholder="Your Email Address" className="input input-bordered input-success w-full bg-transparent placeholder:text-white" />
                                <button className="btn btn-outline btn-success  border-l-0">
                                    <span className='text-white bg-transparent' >Subscribe</span>
                                </button>
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="cursor-pointer label">
                                <div className="flex justify-end items-center gap-4">
                                    <input type="checkbox" className="checkbox checkbox-success" />
                                    <span className="label-text text-white text-jost">I agree to the Privacy Policy</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;