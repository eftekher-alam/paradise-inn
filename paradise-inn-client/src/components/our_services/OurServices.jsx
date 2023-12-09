import { AiFillCar, AiOutlineWifi } from 'react-icons/ai';
import { MdCleanHands, MdPool, MdFastfood } from 'react-icons/md';
import { GiWashingMachine } from 'react-icons/gi';

const OurServices = () => {
    return (
        <div className="my-32">
            <div className="grid gird-cols-1 lg:grid-cols-2 gap-8 md:gap-16 px-8 md:px-16">
                <div
                    className="max-lg:hidden"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                >
                    <img src="https://cozystay.loftocean.com/island-resort/wp-content/uploads/sites/3/2023/03/img-84-780x1169.jpg" alt="" />
                    <p className='font-satisfy text-3xl text-end my-4'>Inspired by our history, surrounded by nature to offer a different experience</p>
                </div>
                <div
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="300"
                >
                    <div className="space-y-4">
                        <h2 className="font-jost text-center md:text-start text-[#53624E]  uppercase font-semibold">ENJOY WORLD-CLASS STAY EXPERIENCE</h2>
                        <h1 className="text-center md:text-start font-marcellus text-3xl md:text-4xl lg:text-5xl max-md:mx-4">All the Essentials for a Cozy and Comfortable</h1>
                    </div>
                    <div className='my-8 space-y-7'>
                        <div className='grid md:grid-cols-2 gap-4'>
                            <div className='flex justify-center items-start gap-4'>
                                <div>
                                    <AiFillCar className='text-3xl'></AiFillCar>
                                </div>
                                <div>
                                    <h3 className='text-xl font-marcellus'>Airport Pick-up Service</h3>
                                    <p className='font-jost'>Stress-free arrival with a convenient ride from the airport.</p>
                                </div>
                            </div>
                            <div className='flex justify-center items-start gap-4'>
                                <div>
                                    <MdCleanHands className='text-3xl'></MdCleanHands>
                                </div>
                                <div>
                                    <h3 className='text-xl font-marcellus'>Housekeeper Services</h3>
                                    <p className='font-jost'>Enjoy a tidy and well-maintained space with dedicated housekeeping.</p>
                                </div>
                            </div>
                        </div>
                        <div className='grid md:grid-cols-2 gap-4'>
                            <div className='flex justify-center items-start gap-4'>
                                <div>
                                    <AiOutlineWifi className='text-3xl'></AiOutlineWifi>
                                </div>
                                <div>
                                    <h3 className='text-xl font-marcellus'>Wifi & Internet</h3>
                                    <p className='font-jost'>Stay connected effortlessly with high-speed internet access.</p>
                                </div>
                            </div>
                            <div className='flex justify-center items-start gap-4'>
                                <div>
                                    <GiWashingMachine className='text-3xl'></GiWashingMachine>
                                </div>
                                <div>
                                    <h3 className='text-xl font-marcellus'>Laundry Services</h3>
                                    <p className='font-jost'>Travel light and fresh with convenient on-site laundry facilities.</p>
                                </div>
                            </div>
                        </div>
                        <div className='grid md:grid-cols-2 gap-4'>
                            <div className='flex justify-center items-start gap-4'>
                                <div>
                                    <MdFastfood className='text-3xl'></MdFastfood>
                                </div>
                                <div>
                                    <h3 className='text-xl font-marcellus'>Breakfast in Bed</h3>
                                    <p className='font-jost'>Indulge in a cozy morning with the luxury of breakfast delivered to your room.</p>
                                </div>
                            </div>
                            <div className='flex justify-center items-start gap-4'>
                                <div>
                                    <MdPool className='text-3xl'></MdPool>
                                </div>
                                <div>
                                    <h3 className='text-xl font-marcellus'>Swimming Pool</h3>
                                    <p className='font-jost'>Dive into relaxation and refreshment in the inviting pool.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img src="https://cozystay.loftocean.com/island-resort/wp-content/uploads/sites/3/2023/03/img-85-780x520.jpg" alt="" />
                </div>
            </div>
        </div>
    );
};

export default OurServices;