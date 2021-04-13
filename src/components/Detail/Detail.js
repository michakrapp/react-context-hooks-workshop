import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import SubHeader from '../Header/SubHeader';
import HotelItem from '../Hotels/HotelItem';
import ReviewItem from "./ReviewItem";

const ReviewsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

const Alert = styled.span`
  width: 100%;
  text-align: center;
`;

const Detail = ({ match, history }) => {
  // Get this information from the API
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [hotel, setHotel] = useState(false);
    const [reviews, setReviews] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const hotelId = match.params.id;
                const data = await fetch(`https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels/${hotelId}`)
                    .then(response => response.json());

                if (data) {
                    setLoading(false);
                    setHotel(data);
                }
            }
            catch (e) {
                setError(e);
            }

            setLoading(false);
        };

        loadData();
    }, [match.params.id]);

    useEffect(() => {
        const loadHotelReview = async (hotelId) => {
            try {
                const data = await fetch(`https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/reviews?hotelId=${hotelId}`)
                    .then(response => response.json());

                if (data) {
                    setLoading(false);
                    setReviews(data);
                }
            }
            catch (e) {
                setError(e);
            }

            setLoading(false);
        };

        if (hotel) {
            loadHotelReview(hotel.id);
        }
    }, [hotel]);

  return !loading && !error ? (
    <>
      {history && hotel && (
        <SubHeader
          goBack={() => history.goBack()}
          title={hotel.title}
          openForm={() => history.push(`${match.url}/new`)}
        />
      )}
      <HotelItem data={hotel} />

      <h3>Reviews:</h3>
      <ReviewsWrapper>
          {reviews &&
            reviews.map(review => <ReviewItem data={review} />)
          }
      </ReviewsWrapper>
    </>
  ) : (
    <Alert>{loading ? 'Loading...' : error}</Alert>
  );
};

export default Detail;
