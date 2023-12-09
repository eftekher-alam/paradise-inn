import PropTypes from 'prop-types';
import { LiaBedSolid } from 'react-icons/lia';
import { GoPeople } from 'react-icons/go';
import { BiArea } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { Rating } from '@smastrom/react-rating';
import { useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useState } from 'react';

const Room = ({ room }) => {
    const myAxios = useAxiosSecure();
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const { _id, title, description, price, roomSize, guests, bed, image, userId } = room;
    const navigate = useNavigate();

    useEffect(() => {
        myAxios.get(`/review?roomId=${_id}`)
            .then(res => {
                setReviews(res?.data);
            })
    }, [myAxios, _id])

    useEffect(() => {
        const ratingArray = reviews?.map((review) => {
            return review?.rating;
        })

        const total = ratingArray?.reduce((total, value) => total + value, 0);
        setAverageRating(Math.floor(total / reviews?.length));
    }, [reviews])


    const handlerBookingContinue = id => {
        Swal.fire({
            title: "Need more information to booking",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Continue"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(`/room_details/${id}`);
            }
        });
    }


    return (
        <div
            className="card glass "
            data-aos="fade-up"
            data-aos-duration="1000"
        >
            <div className='relative'>
                <figure onClick={() => navigate(`/room_details/${_id}`)}><img src={image[Math.floor(Math.random() * 3)]} /></figure>
                <div className='absolute font-jost top-5 left-5 bg-white p-2 border border-gray-600'>${price} / NIGHT</div>
            </div>
            <div className="card-body p-4">
                <h2 className="card-title font-marcellus">{title}</h2>
                <div className='grid grid-cols-3 font-jost'>
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
                </div>
                <p className='font-jost'>{description?.slice(0, 100)}</p>
                <div className="card-actions justify-between items-center">
                    <div className='flex justify-center items-center gap-2'>
                        <Rating style={{ maxWidth: 100 }} value={averageRating} isDisabled />
                        <p>({reviews?.length} reviews)</p>
                    </div>
                    {
                        userId?.length ? <p className='text-error text-end text-xl font-marcellus'>Booked</p>
                            : <Link onClick={() => handlerBookingContinue(_id)} className="btn btn-outline btn-warning font-marcellus">Book Now</Link>
                    }

                </div>
            </div>
        </div>
    );
};

Room.propTypes = {
    room: PropTypes.object,
}

export default Room;