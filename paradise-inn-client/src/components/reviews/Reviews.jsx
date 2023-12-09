import PropTypes from 'prop-types';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import Review from '../review/Review';

const Reviews = ({ room }) => {
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const myAxios = useAxiosSecure();
    const [reviewPostPermission, setReviewPostPermission] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [averageRating, setAverageRating] = useState(0);

    console.log(reviews);

    useEffect(() => {
        if (room?._id) {
            myAxios.get(`/review?roomId=${room?._id}`)
                .then(res => {
                    setReviews(res?.data);
                })
        }

        if (user?.uid && room?._id) {
            // console.log(`/reviewPermission?userId=${user?.uid}&roomId=${room?._id}`);
            myAxios.get(`/reviewPermission?userId=${user?.uid}&roomId=${room?._id}`)
                .then(res => {
                    setReviewPostPermission(res?.data?.success);
                })
        }
        setLoading(false);
    }, [user, room, myAxios])



    useEffect(() => {
        const ratingArray = reviews?.map((review) => {
            return review?.rating;
        })

        const total = ratingArray?.reduce((total, value) => total + value, 0);
        setAverageRating(Math.floor(total / reviews?.length));
    }, [reviews])



    const handlerPostReview = (event) => {
        event.preventDefault();
        setLoading(true);
        const reviewText = event.target.review.value;

        if (rating < 1) {
            Swal.fire({
                title: "Please, select rating",
                icon: "warning",
                showConfirmButton: false,
                timer: 1500
            });
            setLoading(false);
            return;
        }

        if (!reviewText) {
            Swal.fire({
                title: "Review can't be empty",
                icon: "warning",
                showConfirmButton: false,
                timer: 1500
            });
            setLoading(false);
            return;
        }

        const review = {
            firebaseUserId: user?.uid,
            roomId: room?._id,
            rating,
            review: reviewText
        }


        myAxios.post("/review", review)
            .then(res => {
                event.target.reset();
                setRating(0);
                setLoading(false);

                if (res?.data?.reachLimit) {
                    Swal.fire({
                        title: "You can post review for each booking only once",
                        icon: "error",
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
                if (res?.data?.success) {
                    myAxios.get(`/review?roomId=${room?._id}`)
                        .then(res => {
                            setReviews(res?.data);
                        })

                    Swal.fire({
                        title: "Your review is added.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

    }

    return (
        <div className='my-10 relative'>
            <div className='mb-8'>
                <h1 className="text-center  font-marcellus text-xl lg:text-2xl">Customer ratings & reviews</h1>
                <div className='flex justify-center items-center gap-2'>
                    <Rating style={{ maxWidth: 100 }} value={averageRating} isDisabled />
                    <p>({reviews?.length} reviews)</p>
                </div>

            </div>
            <div className='flex max-lg:flex-col-reverse mx-8 md:mx-16 gap-10'>
                {
                    reviewPostPermission && <div className='space-y-6 md:w-[80%] mx-auto lg:w-[30%]'>
                        <div className='space-y-1'>
                            <p className="text-xl font-jost">Overall, how would you rate the product?</p>
                            <Rating style={{ maxWidth: 150 }} value={rating} onChange={setRating} />
                        </div>
                        <form onSubmit={handlerPostReview}>
                            <div className='space-y-2'>
                                <p className="text-xl font-jost">Let us know your thoughts!</p>
                                <textarea name="review" placeholder="Type here..." className="textarea textarea-bordered textarea-lg w-full " ></textarea>
                            </div>
                            <button type='submit' className="btn btn-outline btn-warning block mx-auto font-marcellus mt-2">
                                <span className='text-black'>Submit Review</span>
                            </button>
                        </form>
                    </div>
                }
                <div className='lg:w-[70%]'>
                    <div className='space-y-6 min-h-16'>
                        {
                            reviews?.map((review, index) => <Review key={index} reviewInfo={review}></Review>)

                        }
                        {
                            !reviews.length && <div className='text-gray-400'> This product has no reviews.</div>
                        }
                    </div>
                </div>
            </div>
            {
                loading && <span className={`loading loading-spinner loading-lg absolute top-40 left-[48%]`}></span>
            }
        </div>
    );
};

Reviews.propTypes = {
    room: PropTypes.object
}

export default Reviews;