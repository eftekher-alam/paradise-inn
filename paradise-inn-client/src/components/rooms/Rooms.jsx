import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Room from "../room/Room"
import moment from "moment/moment";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Rooms = () => {
    const [loading, setLoading] = useState(true);
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());
    const [rooms, setRooms] = useState([]);
    const [price, setPrice] = useState(200);
    const [msg, setMsg] = useState("")
    const myAxios = useAxiosSecure();
    const [loadRoomFromHome, setLoadRoomFromHome] = useState(true);
    const { setTitle } = useContext(AuthContext);

    console.log(loadRoomFromHome, "from out");


    useEffect(() => {
        window.scrollTo(1, 1);
        setTitle("Rooms");

        const homePrice = new URLSearchParams(window.location.search).get('homePrice');
        if (loadRoomFromHome && homePrice) {
            const date1 = moment(checkInDate).format("MM/DD/YYYY");
            const date2 = moment(checkOutDate).format("MM/DD/YYYY");
            const uri = `http://localhost:5000/availableRooms?checkInDate=${date1}&checkOutDate=${date2}&price=${homePrice}`;
            myAxios.get(uri)
                .then(res => {
                    setRooms(res.data);
                    setMsg(`Total available rooms - ${res.data.length}`)
                })
            setLoadRoomFromHome(false);
            setLoading(false);
            setPrice(homePrice);
        }
        else {
            myAxios.get("/rooms")
                .then(res => {
                    setRooms(res.data);
                    setMsg(`Total rooms [ available and reserved included ] - ${res.data.length}`);
                    setLoading(false);
                })
        }
    }, [myAxios, checkInDate, checkOutDate, setTitle, loadRoomFromHome])

    const handlerPrice = (event) => {
        event.preventDefault();
        setPrice(event.target.value);
    }

    const handlerRoomAvailable = () => {
        const date1 = moment(checkInDate).format("MM/DD/YYYY");
        const date2 = moment(checkOutDate).format("MM/DD/YYYY");
        const uri = `http://localhost:5000/availableRooms?checkInDate=${date1}&checkOutDate=${date2}&price=${price}`;

        myAxios.get(uri)
            .then(res => {
                setRooms(res.data);
                setMsg(`Total available rooms - ${res.data.length}`)
            })
    }

    return (
        <div className="min-h-screen">
            <div
                className="hero"
                style={{ backgroundImage: 'url(https://cozystay.loftocean.com/countryside-lodge/wp-content/uploads/sites/5/2023/04/billy-jo-catbagan-zvhjrkA7gSk-unsplash.jpg)' }}
                data-aos="fade-down"
                data-aos-easing="ease-in-back"
                data-aos-offset="0">
                <div className="hero-overlay bg-black bg-opacity-50"></div>
                <div className="hero-content w-full text-center text-neutral-content mt-24">
                    <div
                        className="w-full"
                        data-aos="fade-zoom-in"
                        data-aos-easing="ease-in-back"
                        data-aos-delay="400"
                        data-aos-offset="0"
                    >
                        <div className="flex flex-col md:flex-col-reverse my-8">
                            <div>
                                <h1 className="text-4xl md:text-6xl text-white marcellus">Stay With Us</h1>
                                <p className="text-base md:text-xl font-jost">The seaside haven of warmth, tranquility and restoration</p>
                            </div>

                            <div className="p-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4 ">
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
                                    <button onClick={handlerRoomAvailable} className="btn w-full marcellus btn-outline btn-warning max-lg:text-sm">
                                        <span className="text-white font-normal">Check Availability</span>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p className="text-center my-8 text-2xl font-jost">{msg}</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 mx-8 md:mx-16 mb-16">
                    {
                        rooms?.map((room, index) => <Room key={index} room={room}></Room>)
                    }
                </div>
                {
                    loading && <div className="min-h-[10vh] flex justify-center items-center">
                        <div>
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    </div>
                }
            </div>

        </div>
    );
};

export default Rooms;