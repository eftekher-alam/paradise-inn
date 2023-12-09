import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Room from "../room/Room";
import { Link } from "react-router-dom";


const Accommodation = () => {
    const [loading, setLoading] = useState(true);
    const [rooms, setRooms] = useState([]);
    const myAxios = useAxiosSecure();
    useEffect(() => {
        myAxios.get("/featuredRooms")
            .then(res => {
                setRooms(res?.data);
                setLoading(false);
            })

    }, [myAxios]);

    return (
        <div className="mx-8 lg:mx-16 my-32">
            <div
                className="flex max-md:flex-col justify-between items-center md:items-end  gap-4"
                data-aos="fade-up"
                data-aos-duration="1000"
            >
                <div className="space-y-4">
                    <h2 className="font-jost text-center md:text-start text-[#53624E]  uppercase font-semibold">ENJOY WORLD-CLASS STAY EXPERIENCE</h2>
                    <h1 className="text-center md:text-start font-marcellus text-3xl md:text-4xl lg:text-5xl max-md:mx-4">The Accommodations</h1>
                </div>
                <Link to={"/rooms"} className="btn marcellus btn-outline btn-warning max-w-fit max-lg:text-sm">Discover All Suites</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-12">
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
    );
};

export default Accommodation;