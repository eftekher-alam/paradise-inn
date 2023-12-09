import PropTypes from 'prop-types';
import { Rating } from '@smastrom/react-rating'
import moment from 'moment';

const Review = ({ reviewInfo }) => {
    const { username, reviewDate, rating, review } = reviewInfo;

    return (
        <div>
            <h2 className='font-extrabold text-xl marcellus'>{username}</h2>
            <div className='font-jost'>
                <div><Rating style={{ maxWidth: 80 }} value={rating} isDisabled /></div>
                <p>Reviewed on {moment(reviewDate).format("MMM DD, YYYY")}</p>
                <p>{review}</p>
            </div>
        </div>
    );
};

Review.propTypes = {
    reviewInfo: PropTypes.object
}
export default Review;