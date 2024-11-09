import React, { useState, useEffect, useRef, useContext } from 'react';
import Tabs from 'components/ux/tabs/Tabs';
import TabPanel from 'components/ux/tab-panel/TabPanel';
import { faHotel, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from 'contexts/AuthContext';
import { networkAdapter } from 'services/NetworkAdapter';
import { useNavigate } from 'react-router-dom';
import PaymentMethodsPanel from './components/PaymentsMethodsPanel';
import BookingPanel from './components/BookingPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import useOutsideClickHandler from 'hooks/useOutsideClickHandler';

/**
 * UserProfile
 * Renders the user profile page with tabs for personal details, bookings, and payment methods.
 * @returns {JSX.Element} - The UserProfile component
 */
const UserProfile = () => {
  const { userDetails } = useContext(AuthContext);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const wrapperRef = useRef();
  const buttonRef = useRef();

  const [isTabsVisible, setIsTabsVisible] = useState(false);

  // Fetch user bookings data
  const [userBookingsData, setUserBookingsData] = useState({
    isLoading: true,
    data: [],
    errors: [],
  });

  // Fetch user payment methods data
  const [userPaymentMethodsData, setUserPaymentMethodsData] = useState({
    isLoading: true,
    data: [],
    errors: [],
  });

  useOutsideClickHandler(wrapperRef, (event) => {
    if (!buttonRef.current.contains(event.target)) {
      setIsTabsVisible(false);
    }
  });

  const onTabsMenuButtonAction = () => {
    setIsTabsVisible(!isTabsVisible);
  };

  // effect to redirect to login if user details are not present
  useEffect(() => {
    if (!userDetails) {
      navigate('/login');
    }
  }, [navigate, userDetails]);

  // effect to fetch initial data
  useEffect(() => {
    const getInitialData = async () => {
      try {
        const userBookingsDataResponse = await networkAdapter.get(
          `http://localhost:8080/api/reservations/user/${userId}`
        );
        const userPaymentMethodsResponse = await networkAdapter.get(
          'http://localhost:8080/api/users/payment-methods'
        );

        setUserBookingsData({
          isLoading: false,
          data: userBookingsDataResponse || [],
          errors: userBookingsDataResponse.errors || [],
        });
        console.log(
          'User Bookings Data:',
          JSON.stringify(userBookingsDataResponse, null, 2)
        );

        setUserPaymentMethodsData({
          isLoading: false,
          data: userPaymentMethodsResponse.data || [],
          errors: userPaymentMethodsResponse.errors || [],
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserBookingsData({
          isLoading: false,
          data: [],
          errors: [error.message],
        });
        setUserPaymentMethodsData({
          isLoading: false,
          data: [],
          errors: [error.message],
        });
      }
    };

    getInitialData();
  }, [userId]);

  return (
    <div className="container mx-auto p-4 my-10 min-h-[530px]">
      <div className="mx-4">
        <button
          ref={buttonRef}
          onClick={onTabsMenuButtonAction}
          className="block md:hidden items-center px-4 py-1.5 border border-gray-300 font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <FontAwesomeIcon icon={isTabsVisible ? faXmark : faBars} size="lg" />
        </button>
      </div>
      <Tabs isTabsVisible={isTabsVisible} wrapperRef={wrapperRef}>
        <TabPanel label="Bookings" icon={faHotel}>
          {userBookingsData.isLoading ? (
            <p>Loading bookings...</p>
          ) : userBookingsData.errors.length > 0 ? (
            <p>Error loading bookings: {userBookingsData.errors.join(', ')}</p>
          ) : (
            <BookingPanel bookings={userBookingsData} />
          )}
        </TabPanel>
        <TabPanel label="Payment details" icon={faCreditCard}>
          <PaymentMethodsPanel
            userPaymentMethodsData={userPaymentMethodsData}
            setUserPaymentMethodsData={setUserPaymentMethodsData}
          />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default UserProfile;
