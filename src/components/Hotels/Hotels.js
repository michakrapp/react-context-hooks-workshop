import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SubHeader from '../Header/SubHeader';
import HotelItem from './HotelItem';

const HotelItemsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

const HotelLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const Alert = styled.span`
  width: 100%;
  text-align: center;
`;

const Hotels = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const loadData = async () => {
          try {
              const data = await fetch('https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels').then(response => response.json());

              if (data) {
                  setLoading(false);
                  setHotels(data);
              }
          }
          catch (e) {
              setError(e);
          }

          setLoading(false);
        };

        if (!hotels.length) {
            loadData();
        }
  }, [hotels.length]);

  return !loading && !error ? (
    <>
      {history && <SubHeader title='Your Lists' />}
      <HotelItemsWrapper>
        {hotels &&
          hotels.map((hotel) => (
            <HotelLink key={hotel.id} to={`hotel/${hotel.id}`}>
              <HotelItem data={hotel} />
            </HotelLink>
          ))}
      </HotelItemsWrapper>
    </>
  ) : (
    <Alert>{loading ? 'Loading...' : error}</Alert>
  );
};

export default Hotels;
