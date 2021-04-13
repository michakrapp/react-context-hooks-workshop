import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import SubHeader from '../Header/SubHeader';
import HotelItem from '../Hotels/HotelItem';
import ReviewItem from "./ReviewItem";
import {HotelContext} from "../../context/HotelsContext";

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
    const [hotel, setHotel] = useState(false);
    const [reviews, setReviews] = useState([]);
    const {hotels, loading, error, loadHotels} = useContext(HotelContext);

    useEffect(() => {
        if (!hotels.length) {
            loadHotels();
        } else {
            if (!hotel) {
                const theHotel = hotels.find((value) => value.id.toString() === match.params.id);
                if (theHotel) {
                    setHotel(theHotel);
                } else {
                    console.error(`no hotel found with id ${match.params.id}`);
                }
            }
        }
    }, [match, hotels, loadHotels]);

    useEffect(() => {
        const loadHotelReview = async (hotelId) => {
            try {
                const data = await fetch(`https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/reviews?hotelId=${hotelId}`)
                    .then(response => response.json());

                if (data) {
                    //setLoading(false);
                    setReviews(data);
                }
            }
            catch (e) {
                //setError(e);
            }

            //setLoading(false);
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
            reviews.map(review => <ReviewItem key={review.id} data={review} />)
          }
      </ReviewsWrapper>
    </>
  ) : (
    <Alert>{loading ? 'Loading...' : error}</Alert>
  );
};

export default Detail;
