import React, { useEffect, useLayoutEffect, useState } from "react";
import Location from "../../svgs/Location.svg";
import BookedIcon from "../../assets/icons/Bookings.svg";
import NairaIcon from "../../assets/icons/Naira.svg";
import PeopleIcon from "../../assets/icons/People.svg";
import PaymentSteps from "../../components/payment-steps";
import PaymentSuccessful from "../../components/payment-status";
import { useParams } from "react-router";
import moment from "moment";
import Cookies from "universal-cookie";
import { v4 as uuidv4 } from "uuid";
import Header from "../../components/homepage/ui/header";
import Aboutfooterlink from "../../components/aboutblog/aboutui/aboutfooterlink";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Payment = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const { success, errorAuth, loadingfinished } = useProtectedRoute();
  let { id } = useParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [canProceed, setCanProceed] = useState(false);
  const [transactionId, setTranscationId] = useState("");
  const [workspaceData, setWorkspaceData] = useState({});
  const [blockPayment, setBlockPayment] = useState(true);
  const [dateBooked, setDateBooked] = useState([]);

  useEffect(() => {
    let retrievedObject = localStorage.getItem("dateBooked");
    let parsedDate = JSON.parse(retrievedObject);

    if (!parsedDate) {
      navigate("/booking");
      return;
    }
    setDateBooked(parsedDate?.value);
  }, []);

  const getAllDetails = async () => {
    const gottenToken = cookies.get("user_token");
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/workspaces/${id}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${gottenToken}`,
        },
      }
    );
    const data = await res.json();
    if (data?.status === false) {
      setBlockPayment(true);
      toast.error(data?.errors[0]);
      setTranscationId(uuidv4());
      return;
    }
    const myData = data?.data?.data;
    try {
      //  data?.data.amenities.map((amenity) => {
      //   if(amenity?.amenities_item?.amenitygroups?.name === 'Seating'){
      //     setSeatingOptions(prevState => [...prevState, amenity?.amenities_item?.name])
      //   } else if(amenity?.amenities_item?.amenitygroups?.name === 'Booking'){
      //     setBasicOptions(prevState => [...prevState, amenity?.amenities_item?.name])
      //   } else if(amenity?.amenities_item?.amenitygroups?.name === 'Facilities'){
      //     setFacilitiesOptions(prevState => [...prevState, amenity?.amenities_item?.name])
      //   } else if(amenity?.amenities_item?.amenitygroups?.name === 'Equipment'){
      //     setEquipmentOptions(prevState => [...prevState, amenity?.amenities_item?.name])
      //   }
      // })

      setWorkspaceData(data?.data);
      setBlockPayment(false);
      // setWorkspaceReviews(data?.data.reviews)
    } catch (error) {
      setTranscationId(uuidv4());
    }
  };

  useLayoutEffect(() => {
    getAllDetails();
    setTranscationId(uuidv4());
  }, []);

  const exchangeTokenForId = async () => {
    const token = cookies.get("user_token");
    if (!token) {
      // alert('Not authenticated!!!')
      return;
    }
    try {
      const gottenToken = cookies.get("user_token");
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/retrieve-token`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${gottenToken}`,
          },
          body: JSON.stringify({
            token,
          }),
        }
      );
      const data = await res.json();
      if (data?.status !== true) {
        setTranscationId(uuidv4());
        // alert('something went wrong. Seems you are not authenticated')
        return;
      }
      setUserDetails(data?.data);
      const userData = data?.data;
      return { userData };
    } catch (error) {
      setTranscationId(uuidv4());
    }
  };

  const getHoursDistance = (a, b) => {
    let hours = Math.abs(new Date(a) - new Date(b)) / 36e5;
    if (dateBooked?.length == 1) {
      return "1";
    }
    return hours;
  };
  const getCheckout = (a, b) => {
    let date = moment(dateBooked[dateBooked?.length - 1]).format(
      "MMMM Do YYYY"
    );
    let hour =
      parseInt(moment(dateBooked[dateBooked?.length - 1]).format("h")) + 1;
    let meridian = moment(dateBooked[dateBooked?.length - 1]).format("a");

    return `${date}, ${hour} ${meridian}`;
  };

  const getFormattedDate = (dateArr) => {
    const newFormattedDateArray = dateArr?.map((x) => {
      const newDate = new Date(x);
      const unFormated_date = newDate.getDate();
      const date =
        unFormated_date.toString().length < 2
          ? `0${unFormated_date}`
          : unFormated_date;
      const year = newDate.getFullYear();
      const month = newDate.getMonth() + 1;
      const newMonth = month.toString().length < 2 ? `0${month}` : month;
      const hour = newDate.getHours();
      const newHour = hour.toString().length < 2 ? `0${hour}` : hour;
      const minute = newDate.getMinutes();
      const newMinute = minute.toString().length < 2 ? `0${minute}` : minute;
      const formattedDate = `${year}-${newMonth}-${date} ${newHour}:${newMinute}:00`;
      return formattedDate;
    });
    return newFormattedDateArray;
  };

  const createBookingAfterPayment = async () => {
    try {
      const outgoing = {
        workspaces_id: workspaceData?.id,
        user_id: userDetails?.id,
        booking_date: getFormattedDate(dateBooked),
        // ? trying booking_date: formattedDate,
        status: "Pending",
      };
      const gottenToken = cookies.get("user_token");
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/bookings`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${gottenToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          workspaces_id: workspaceData?.id,
          user_id: userDetails?.id,
          booking_date: getFormattedDate(dateBooked),
          // ? trying booking_date: formattedDate,
          status: "Pending",
        }),
      });
      const data = await res.json();
      if (data.status == false) {
        setTranscationId(uuidv4());
        // alert('An error occured!')
        return;
      }
      const result = await recordPaymentTransaction(
        data?.data?.id,
        getFormattedDate([new Date()]),
        transactionId,
        userDetails?.id
      );
    } catch (error) {
      setTranscationId(uuidv4());
    }
  };

  const recordPaymentTransaction = async (bookingId, tDate, tId, userId) => {
    const amount_payment =
      workspaceData?.type?.type === "Monthly"
        ? (10 / 100) * parseInt(workspaceData?.price) +
          parseInt(workspaceData?.price)
        : (10 / 100) * (parseInt(workspaceData?.price) * dateBooked.length) +
          parseInt(workspaceData?.price) * dateBooked.length;
    try {
      const payload = {
        amount_paid: amount_payment,
        // amount_paid:
        //   (10 / 100) * (parseInt(workspaceData?.price) * dateBooked.length) +
        //   parseInt(workspaceData?.price) * dateBooked.length,
        user_id: userId,
        workspace_bookings_id: bookingId,
        payment_status: "success",
        transaction_date: tDate[0],
        transaction_id: tId,
      };
      const gottenToken = cookies.get("user_token");
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/transactions`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${gottenToken}`,
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (data.status !== true) {
        setTranscationId(uuidv4());
        return;
      }
      setCanProceed(true);
    } catch (error) {
      setTranscationId(uuidv4());
    }
  };

  useEffect(() => {
    exchangeTokenForId();
    return () => {};
  }, []);

  useEffect(() => {
    isSuccess && createBookingAfterPayment();
  }, [isSuccess]);

  if (canProceed) {
    return (
      <div style={{ height: "100vh", width: "100%", zIndex: 100 }}>
        <PaymentSuccessful workspaceData={workspaceData} />
      </div>
    );
  }

  return (
    <>
      <Header
        errorAuth={errorAuth}
        success={success}
        loadingfinished={loadingfinished}
      />
      <div className="w-full px-4 flex lg:gap-x-7 h-full justify-between flex-col lg:flex-row">
        <Loader
          className="w-full px-4 flex lg:gap-x-7 h-full fixed"
          failure={errorAuth}
          successful={success}
          isLoading={!loadingfinished}
          redirectTo={"login"}
          customMessage={"You are not autheticated."}
          redirectBack={`booking/${id}/payment`}
        />
        <div className="bg-[#FCFCFC] lg:mx-20 w-full lg:w-2/4 mt-10">
          <div className="w-full lg:w-[560px] border border-[#D4D4D4] mx-auto mt-5 rounded-lg lg:mb-28 overflow-hidden">
            <img
              src="https://trybookings-assets.s3.eu-west-2.amazonaws.com/workspace/workspaceOne.jpg"
              alt=""
              className="w-full object-cover object-center max-h-[300px] "
            />
            <div className="flex justify-between flex-col lg:flex-row border-b p-4">
              <div className="flex flex-col">
                <h3 className="mb-3 text-2xl font-base">{`${
                  workspaceData?.name ? workspaceData?.name : ""
                } Workspace`}</h3>
                <div className="flex flex-row space-x-2">
                  <Location />
                  <span>{workspaceData?.address}</span>
                </div>
              </div>
              <div className="flex justify-start items-center mr-20 gap-x-2">
                <PeopleIcon stroke="#F00FeA" /> 1 user
              </div>
            </div>
            <div className="flex justify-between border-b p-4 flex-col lg:flex-row">
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/10222192/pexels-photo-10222192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt=""
                  className="object-center w-14 h-14 rounded-full object-cover mr-2"
                />
                <div className="flex flex-col">
                  <span className="text-lg text-[#141115]">
                    {userDetails.first_name} {userDetails.last_name}
                  </span>
                  <span className="text-[#5B585B] text-md">Space owner</span>
                </div>
              </div>

              <div className="flex space-x-5 py-4 lg:py-0 lg:flex-col mr-20">
                <span>Mentorship</span>
                <span>{`${
                  workspaceData?.mentorship_available == true ? "YES" : "NO"
                }`}</span>
              </div>
            </div>
            <div className="flex justify-between flex-col lg:flex-row lg:items-center border-b p-4">
              <div className="flex items-center">
                <div className="flex flex-col">
                  <span className="text-lg text-[#141115] font-normal mb-6 flex items-center gap-x-2">
                    <BookedIcon />{" "}
                    {dateBooked?.length && moment(dateBooked[0]).format("ll")}
                  </span>
                  <span className="text-[#5B585B] text-md">
                    {moment(dateBooked[0]).format("MMMM Do YYYY, h a")}
                  </span>
                  <span className="font-light text-sm">Check in</span>
                </div>
              </div>
              <div className="flex flex-col mr-20">
                <span className="text-lg text-[#141115] font-normal mb-6 flex items-center gap-x-2">
                  <BookedIcon />
                  {workspaceData?.type?.type === "Daily" ? (
                    <>{`${dateBooked.length} days`}</>
                  ) : workspaceData?.type?.type === "Hourly" ? (
                    <>
                      {`${getHoursDistance(
                        dateBooked[0],
                        dateBooked[dateBooked?.length - 1]
                      )} hrs`}
                    </>
                  ) : workspaceData?.type?.type === "Monthly" ? (
                    <>{`1 month`}</>
                  ) : (
                    "loading..."
                  )}
                </span>
                <span className="text-[#5B585B] text-md">{getCheckout()}</span>
                <span className="font-light text-sm">Check out</span>
              </div>
            </div>
            <div className="flex justify-between border-b p-4">
              <div className="flex items-center">
                <div className="flex flex-col">
                  <span className="text-lg text-[#141115] flex items-center gap-x-2">
                    <NairaIcon />{" "}
                    {workspaceData?.type?.type === "Daily" ? (
                      <>
                        {workspaceData?.price &&
                          `${workspaceData?.price}/daily`}
                      </>
                    ) : workspaceData?.type?.type === "Hourly" ? (
                      <>
                        {workspaceData?.price && `${workspaceData?.price}/hour`}
                      </>
                    ) : workspaceData?.type?.type === "Monthly" ? (
                      <>
                        {workspaceData?.price &&
                          `${workspaceData?.price}/month`}
                      </>
                    ) : (
                      "loading..."
                    )}
                    {/* {workspaceData?.price && `${workspaceData?.price}/hour`} */}
                  </span>
                  <span className="text-[#5B585B] text-md">Price</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/4 py-9 px-4">
          <PaymentSteps
            blockPayment={blockPayment}
            workspaceData={workspaceData}
            setIsSuccess={setIsSuccess}
            userDetails={userDetails}
            transactionId={transactionId}
            dateBooked={dateBooked}
          />
        </div>
      </div>
      <Aboutfooterlink />
    </>
  );
};

export default Payment;
