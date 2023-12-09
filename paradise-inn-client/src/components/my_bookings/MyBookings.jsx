import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import { AiFillDelete } from 'react-icons/ai';
import { BiSolidEditAlt } from 'react-icons/bi';
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import moment from "moment";

const MyBookings = () => {
    const [loading, setLoading] = useState(true);
    const { user, setTitle } = useContext(AuthContext);
    const [bookingList, setBookingList] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [checkInDate, setCheckInDate] = useState();
    const [checkOutDate, setCheckOutDate] = useState();
    const [price, setPrice] = useState(0);
    const [calculatedTotalPrice, setCalculatedTotalPrice] = useState(0);
    const [diffDays, setDiffDays] = useState(0);
    const myAxios = useAxiosSecure();


    const loadData = () => {
        if (user?.uid && user?.email) {
            const url = `/myBookings?firebaseUid=${user.uid}&email=${user.email}`;
            myAxios.get(url)
                .then(res => {
                    setLoading(false)
                    setBookingList(res?.data?.bookingList);
                    setRooms(res?.data?.rooms);
                })
        }
    }

    useEffect(() => {
        setTitle("My Booking");
        if (user?.uid && user?.email) {
            const url = `/myBookings?firebaseUid=${user.uid}&email=${user.email}`;
            myAxios.get(url)
                .then(res => {
                    setLoading(false)
                    setBookingList(res?.data?.bookingList);
                    setRooms(res?.data?.rooms);
                })
        }
    }, [myAxios, user]);



    useEffect(() => {
        const date1 = new Date(moment(checkInDate).format("MM/DD/YYYY"));
        const date2 = new Date(moment(checkOutDate).format("MM/DD/YYYY"));
        const diffDays = Math.abs((date2 - date1) / (1000 * 60 * 60 * 24), 10);
        setDiffDays(diffDays)
        setCalculatedTotalPrice(diffDays * price);
    }, [checkInDate, checkOutDate, price])


    const handlerBookingUpdate = (bookingId, userId, roomId) => {
        const updatedBooking = {
            bookingId,
            userId,
            roomId,
            checkInDate: moment(checkInDate).format("MM/DD/YYYY"),
            checkOutDate: moment(checkOutDate).format("MM/DD/YYYY"),
            totalPrice: calculatedTotalPrice
        }
        if (diffDays < 1) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please, select correct date range. Check in date and check out date can't be same."
            });
        }
        else {
            Swal.fire({
                title: "Are you sure, you want to update?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes"
            }).then((result) => {
                if (result.isConfirmed) {
                    setLoading(true);
                    myAxios.put("/booking", updatedBooking)
                        .then(res => {
                            if (res?.data?.success) {
                                setLoading(false);
                                loadData();
                                Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    title: "Your booking has been updated.",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        })
                }
            });
        }


    }


    const handlerBookingDelete = (bookingItem) => {

        // console.log("Check in :", new Date(moment(bookingItem?.checkInDate).add(-1, 'days').format("MM/DD/YYYY")), "     Current date : ", new Date());

        if (!(new Date(moment(bookingItem?.checkInDate).add(-1, 'days').format("MM/DD/YYYY")) > new Date())) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You can only cancel booking up to 1 day before check-in."
            });
            return;
        }

        const deletedBookingId = bookingItem?._id;
        Swal.fire({
            title: "Are you sure, you want to delete?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                myAxios.post("/deleteBooking", bookingItem)
                    .then(res => {
                        if (res?.data?.success) {
                            const removedDeletedBooking = bookingList.filter(booking => booking?._id != deletedBookingId);
                            setBookingList(removedDeletedBooking);
                            setLoading(false)
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your booking has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }

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
                        <h1 className="text-4xl md:text-6xl text-white marcellus">Your Booking List</h1>
                        <p className="text-base md:text-xl font-jost">The seaside haven of warmth, tranquility and restoration</p>
                    </div>
                </div>
            </div>
            <div className="relative">
                <div className="lg:w-[75%] lg:mx-auto mx-4 my-10 ">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Check-in Date</th>
                                    <th>Check-Out Date</th>
                                    <th>Price/Night</th>
                                    <th>Total</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bookingList?.map((bookingItem, index) => {
                                        const room = rooms?.find(room => room?._id === bookingItem?.roomId)
                                        return (
                                            <tr key={index}>
                                                <th>{index + 1}</th>
                                                <td>{room.title}</td>
                                                <td>{bookingItem?.checkInDate}</td>
                                                <td>{bookingItem?.checkOutDate}</td>
                                                <td>${room.price}</td>
                                                <td>${bookingItem?.totalPrice}</td>
                                                <td className="flex">
                                                    <button
                                                        onClick={() => {
                                                            setPrice(room.price);
                                                            setCalculatedTotalPrice(bookingItem?.totalPrice);
                                                            setCheckInDate(new Date(bookingItem?.checkInDate));
                                                            setCheckOutDate(new Date(bookingItem?.checkOutDate));
                                                            document.getElementById(bookingItem?._id).showModal();
                                                        }} className="btn btn-square btn-sm mr-4"
                                                    >
                                                        <BiSolidEditAlt className="text-warning md:text-xl"></BiSolidEditAlt>
                                                    </button>
                                                    <button onClick={() => {
                                                        setCheckInDate(new Date(bookingItem?.checkInDate));
                                                        handlerBookingDelete(bookingItem)
                                                    }}
                                                        className="btn btn-square btn-sm mr-4"
                                                    >
                                                        <AiFillDelete className="text-error md:text-xl"></AiFillDelete>
                                                    </button>
                                                </td>




                                                <dialog id={bookingItem?._id} className="modal h-screen mx-auto">
                                                    <div className="modal-box min-h-[70%]">


                                                        <form method="dialog">
                                                            <div className='space-y-4 mx-8'>
                                                                <div className='space-y-4 '>

                                                                    <div className='flex justify-between items-center'>
                                                                        <h2 className="card-title font-marcellus">UPDATE BOOKING</h2>
                                                                        <h2 className="font-jost">${room?.price} / NIGHT</h2>
                                                                    </div>

                                                                    <div>
                                                                        <label className="grid grid-cols-8 p-0 m-0 input input-bordered input-warning bg-transparent">
                                                                            <div className="marcellus col-span-3 flex items-center justify-center max-lg:text-sm ">Check In</div>
                                                                            <div className="col-span-5 flex items-center justify-center">
                                                                                <DatePicker
                                                                                    selected={checkInDate}
                                                                                    onChange={(date) => setCheckInDate(date)} className="font-jost bg-transparent outline-none text-center max-lg:text-sm"
                                                                                />
                                                                            </div>
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <label className="grid grid-cols-8 p-0 m-0 input input-bordered input-warning bg-transparent">
                                                                            <div className="marcellus col-span-3 flex items-center justify-center max-lg:text-sm">Check Out</div>
                                                                            <div className="col-span-5 flex items-center justify-center">
                                                                                <DatePicker selected={checkOutDate} onChange={(date) => setCheckOutDate(date)}
                                                                                    className="font-jost bg-transparent text-center outline-none max-lg:text-sm" />
                                                                            </div>
                                                                        </label>
                                                                    </div>

                                                                </div>
                                                                <div className="absolute bottom-8 w-[77%]">
                                                                    <div className='flex justify-between items-center px-2'>
                                                                        <h1 className='font-marcellus text-2xl'>Total Cost</h1>
                                                                        <p className='font-jost text-2xl text-end'>${calculatedTotalPrice}</p>
                                                                    </div>
                                                                    <div className="modal-action flex justify-between items-center">
                                                                        <button
                                                                            onClick={() => handlerBookingUpdate(bookingItem?._id, bookingItem?.userId, room?._id)}
                                                                            className="btn btn-warning btn-outline">Update</button>
                                                                        <button className="btn btn-error btn-outline">Cancel</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>


                                                    </div>
                                                </dialog>





                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                {
                    loading && <span className="loading loading-spinner loading-lg absolute top-16 left-[48%]"></span>
                }
            </div>

        </div>
    );
};

export default MyBookings;