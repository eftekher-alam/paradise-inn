import { useContext, useEffect } from 'react';
import { useState } from 'react';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BiArea } from 'react-icons/bi';
import { GoPeople } from 'react-icons/go';
import { LiaBedSolid } from 'react-icons/lia';
import { TbAirConditioning } from 'react-icons/tb';
import { AiOutlineWifi } from 'react-icons/ai';
import { RiComputerLine } from 'react-icons/ri';
import { CgSmartHomeRefrigerator } from 'react-icons/cg';
import { GiSlippers, GiBeerBottle, GiLockedChest, GiTowel } from 'react-icons/gi';
import DatePicker from "react-datepicker";
import moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { AuthContext } from '../../providers/AuthProvider';
import Reviews from '../reviews/Reviews';
import { Helmet } from 'react-helmet';

const RoomDetails = () => {
    const myAxios = useAxiosSecure();
    const { id } = useParams();
    const [room, setRoom] = useState({});
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());
    const [totalPrice, setTotalPrice] = useState(0);
    const [diffDays, setDiffDays] = useState(0);
    const { user } = useContext(AuthContext);
    const redirectTo = useNavigate();
    const location = useLocation();


    const { title, description, price, roomSize, guests, bed, image, userId, facility } = room;

    useEffect(() => {
        window.scrollTo(1, 1);
        console.log("executing");
        myAxios(`/room/${id}`)
            .then(res => {
                setRoom(res.data)
            })
    }, [myAxios, id])

    useEffect(() => {
        const date1 = new Date(moment(checkInDate).format("MM/DD/YYYY"));
        const date2 = new Date(moment(checkOutDate).format("MM/DD/YYYY"));
        const diffDays = Math.abs((date2 - date1) / (1000 * 60 * 60 * 24), 10);
        setDiffDays(diffDays)
        setTotalPrice(diffDays * price);
        if (new Date(moment(checkInDate).format("MM/DD/YYYY")) >= new Date(moment(checkOutDate).format("MM/DD/YYYY")))
            setTotalPrice(0);
    }, [checkInDate, checkOutDate, price])

    const handlerBookingFromDetails = () => {
        if (!user) {
            redirectTo("/login", { state: location.pathname });
            return;
        }
        if (diffDays < 1) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please, select correct date range. Check in date and check out date can't be same."
            });
            return;
        }

        if (new Date(moment(checkInDate).format("MM/DD/YYYY")) >= new Date(moment(checkOutDate).format("MM/DD/YYYY"))) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please, select correct date range."
            });
            return;
        }

        Swal.fire({
            title: "Are you sure, you want to booking?",
            html: `<h1>Check In Date: ${moment(checkInDate).format("MM/DD/YYYY")}</h1> 
                    <h1>Check Out Date: ${moment(checkOutDate).format("MM/DD/YYYY")}</h1>
                    <h1>Total Price: $${totalPrice}</h1>`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                const { uid } = user;
                const bookingInfo = {
                    fireBaseUserId: uid,
                    room,
                    checkInDate: moment(checkInDate).format("MM/DD/YYYY"),
                    checkOutDate: moment(checkOutDate).format("MM/DD/YYYY"),
                    totalPrice
                }
                myAxios.post("/booking", { bookingInfo })
                    .then(res => {
                        if (res?.data?.success) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Your booking has been done.",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            myAxios(`/room/${id}`)
                                .then(res => {
                                    setRoom(res.data)
                                })
                        }
                    })
            }
        });
    }



    return (
        <div className='min-h-screen'>
            <Helmet>
                <title>Hello test</title>
            </Helmet>
            {
                image &&
                <div className="carousel w-full h-[85vh]">
                    <div
                        id="slide1"
                        className="hero carousel-item "
                        style={{ backgroundImage: `url(${room?.image[0]})` }}
                    >
                        <div className="hero-content w-full text-center text-neutral-content mt-24">
                            <div className='flex justify-between w-full'>
                                <a href="#slide1" className="btn btn-circle">❮</a>
                                <a href="#slide2" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                    <div
                        id="slide2"
                        className="hero carousel-item"
                        style={{ backgroundImage: `url(${room?.image[2]})` }}
                    >
                        <div className="hero-content w-full text-center text-neutral-content mt-24">
                            <div className='flex justify-between w-full'>
                                <a href="#slide1" className="btn btn-circle">❮</a>
                                <a href="#slide3" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                    <div
                        id="slide3"
                        className="hero carousel-item"
                        style={{ backgroundImage: `url(${room?.image[3]})` }}
                    >
                        <div className="hero-content w-full text-center text-neutral-content mt-24">
                            <div className='flex justify-between w-full'>
                                <a href="#slide2" className="btn btn-circle">❮</a>
                                <a href="#slide1" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className='flex max-lg:flex-col-reverse mx-8 md:mx-16 my-16 gap-8 lg:gap-28'>
                <div className='lg:w-[65%] space-y-8'>
                    <h1 className="text-center md:text-start font-marcellus text-4xl lg:text-5xl max-md:mx-4">{title}</h1>
                    <div className='grid grid-cols-2 md:grid-cols-4 font-jost md:w-[80%] max-md:gap-4'>
                        <div className='flex justify-start items-center gap-2'>
                            <BiArea className='text-2xl'></BiArea>
                            <p className='text-sm'> {roomSize} m<sup>2</sup></p>
                        </div>

                        <div className='flex justify-start items-center gap-2'>
                            <GoPeople className='text-2xl'></GoPeople>
                            <p className='text-sm'> {guests} Guests</p>
                        </div>

                        <div className='flex justify-start items-center gap-2'>
                            <LiaBedSolid className='text-2xl'></LiaBedSolid>
                            <p className='text-sm'> {bed} King Bed</p>
                        </div>

                        {/* <div>
                            {
                                reserveId ? <p className='font-marcellus text-error font-bold'>Reserved</p>
                                    : <p className='font-marcellus text-success font-bold'>Available</p>
                            }
                        </div> */}
                    </div>
                    <p className='font-jost text-xl'>{description}</p>

                    <h1 className="text-center md:text-start font-marcellus text-2xl md:text-3xl max-md:mx-4">Room Amenities</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 max-md:gap-4'>
                        <div className='space-y-6'>
                            <div className='flex items-center gap-4'>
                                <TbAirConditioning className='text-3xl'></TbAirConditioning>
                                <p className='font-marcellus md:text-xl'>Air conditioner</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <AiOutlineWifi className='text-3xl'></AiOutlineWifi>
                                <p className='font-marcellus md:text-xl'>Wifi & Internet</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <GiSlippers className='text-3xl'></GiSlippers>
                                <p className='font-marcellus md:text-xl'>Slippers</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <GiBeerBottle className='text-3xl'></GiBeerBottle>
                                <p className='font-marcellus md:text-xl'>Shampoo</p>
                            </div>

                        </div>
                        <div className='space-y-6'>
                            <div className='flex items-center gap-4'>
                                <RiComputerLine className='text-3xl'></RiComputerLine>
                                <p className='font-marcellus md:text-xl'>Cable TV</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <GiTowel className='text-3xl'></GiTowel>
                                <p className='font-marcellus md:text-xl'>Towels</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <CgSmartHomeRefrigerator className='text-3xl'></CgSmartHomeRefrigerator>
                                <p className='font-marcellus md:text-xl'>In-room Refrigerator</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <GiLockedChest className='text-3xl'></GiLockedChest>
                                <p className='font-marcellus md:text-xl'>Safe Box</p>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-center md:text-start font-marcellus text-2xl md:text-3xl max-md:mx-4">What’s included in this suite?</h1>
                    <ul className='list-disc ml-6 space-y-2 font-jost text-xl'>
                        {
                            facility?.map((data, index) => <li key={index}>{data}</li>)
                        }
                    </ul>
                </div>
                <div className='lg:w-[35%]'>
                    <div className="card md:w-96 lg:w-auto max-lg:mx-auto bg-base-100 shadow-xl">
                        <div className="card-body ">
                            {
                                userId?.length ? <h2 className="card-title justify-center font-marcellus text-error ">Booked</h2>
                                    :
                                    <div className='space-y-4'>
                                        <div className='flex justify-between items-center'>
                                            <h2 className="card-title font-marcellus">RESERVE</h2>
                                            <h2 className="font-jost">${price} / NIGHT</h2>
                                        </div>
                                        <div>
                                            <label className="grid grid-cols-8 p-0 m-0 input input-bordered input-warning bg-transparent">
                                                <div className="marcellus col-span-3 flex items-center justify-center max-lg:text-sm ">Check In</div>
                                                <div className="col-span-5 flex items-center justify-center">
                                                    <DatePicker selected={checkInDate} onChange={(date) => setCheckInDate(date)} className="font-jost bg-transparent outline-none text-center max-lg:text-sm" />
                                                </div>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="grid grid-cols-8 p-0 m-0 input input-bordered input-warning bg-transparent">
                                                <div className="marcellus col-span-3 flex items-center justify-center max-lg:text-sm">Check Out</div>
                                                <div className="col-span-5 flex items-center justify-center">
                                                    <DatePicker selected={checkOutDate} onChange={(date) => setCheckOutDate(date)} className="font-jost bg-transparent text-center outline-none max-lg:text-sm" />
                                                </div>
                                            </label>
                                        </div>
                                        <div className='flex justify-between items-center px-2'>
                                            <h1 className='font-marcellus text-2xl'>Total Cost</h1>
                                            <p className='font-jost text-2xl text-end'>${totalPrice}</p>
                                        </div>
                                        <div className="card-actions justify-end">
                                            <button onClick={handlerBookingFromDetails} className="btn btn-outline btn-warning w-full font-marcellus">
                                                <span className='text-black'>Book Now</span>
                                            </button>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Reviews room={room}></Reviews>
        </div >
    );
};

export default RoomDetails;