import React, { useEffect, useState, useLayoutEffect } from "react";
import clsx from "clsx";

import Filter from "../../components/filter";
import SortedByComponent from "../../components/sortBy";
import WorkSpaceCard from "../../components/workspace-card";
import WorkspaceMap from "../../components/workspace-map";
import Pagination from "../../components/pagination";
import Aboutfooterlink from "../../components/aboutblog/aboutui/aboutfooterlink";

import Down from "../../assets/icons/Down-1.svg";
import FilterComponent from "../../components/filterComponent";

import { useDispatch, useSelector } from "react-redux";
import {
  getAmenities,
  getCanFilter,
  getCapacity,
  getClearFilter,
  getCoordinatesLatLng,
  getDateFilterPicked,
  getDistanceRangeFilter,
  getFilterViaCoordinates,
  getMentorship,
  getPriceRangeFilter,
  getRating,
  setAmenities,
  setCanFilter,
  setCapacity,
  setClearFilter,
  setCoordinatesLatLng,
  setDateFilterPicked,
  setDatePicked,
  setDistanceRangeFilter,
  setFilterViaCoordinates,
  setMentorship,
  setPriceRangeFilter,
  setRating,
  setDuration,
  getDuration,
  getCategory,
  setCategory,
} from '../../slices/filterOptions'
import { getTextState, setTextState } from '../../slices/profileUpdateSlice'
import useCookieHandler from '../../hooks/useCookieHandler'
import Header from '../../components/homepage/ui/header'
import useProtectedRoute from '../../hooks/useProtectedRoute'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Capacity from '../../components/capacity'
import RangeSlider from '../../components/page-range/new_range_slider'
import { Checkbox } from 'antd'
import SearchField from '../../components/search'

import ListIcon from "../../svgs/ListIcon.svg";
import GridIcon from "../../svgs/GridIcon.svg";
import { useTranslation } from "react-i18next";
import axios from "axios";
import CAMCDatePicker from "../../components/datepicker";

const BookList = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { token, error, errorMessage } = useCookieHandler("user_token");
  const dispatch = useDispatch();
  const { success, errorAuth, loadingfinished } = useProtectedRoute();
  // const {success, errorAuth, loadingfinished} = useProtectedRoute('user_token', true);
  const reduxCapacity = useSelector(getCapacity);
  const textState = useSelector(getTextState);
  //const profileUpdate = useSelector((state) => state.profileUpdate)

  const dateFilterPicked = useSelector(getDateFilterPicked);

  const reduxAmenities = useSelector(getAmenities);
  const reduxCategory = useSelector(getCategory);
  const coordinates = useSelector(getCoordinatesLatLng);
  const filterViaCoordinates = useSelector(getFilterViaCoordinates);
  const mentorship = useSelector(getMentorship);
  const priceRangeFilter = useSelector(getPriceRangeFilter);
  const distanceRangeFilter = useSelector(getDistanceRangeFilter);
  const clearFilter = useSelector(getClearFilter);
  const rating = useSelector(getRating);
  const canFilter = useSelector(getCanFilter);
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState("Filter");
  const [isListView, setIsListView] = useState(true);
  const [isGridView, setIsGridView] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [updatingText, setUpdatingText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [workspace, setWorkspace] = useState([]);
  const [outsideInfo, setOutsideInfo] = useState(null);
  const [totalWorkspaces, setTotalWorkspaces] = useState("");
  const [perPageCount, setPerPageCount] = useState(null);
  const PER_PAGE = perPageCount ?? 50;
  const offset = currentPage * PER_PAGE;
  const currentPagelist = workspace?.slice(offset, offset + PER_PAGE);
  const pageCount = Math.ceil(workspace?.length / PER_PAGE);
  const [currentUserLocation, setCurrentUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  // filter stuff
  const [selectedCapacity, setSelectedCapacity] = useState(0);
  const [mentorshipSelected, setMentorshipSelected] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [priceRange, setPriceRange] = useState([200, 50000]);
  const [distanceRange, setDistanceRange] = useState([1, 20]);
  const [rate, setRate] = useState([0]);
  const [amenitiesInit, setAmenitiesInit] = useState([]);
  const [categoriesInit, setCategoriesInit] = useState([]);
  const [amenitiesSelected, setAmenitiesSelected] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [triggerPriceFilter, setTriggerPriceFilter] = useState(null);
  const [triggerDistanceFilter, setTriggerDistanceFilter] = useState(null);
  const [searchCategoriesQuery, setSearchCategoriesQuery] = useState("");
  const [filterTrack, setFilterTrack] = useState({
    category: false,
    amenities: false,
    capacity: false,
    priceRange: false,
    distance: false,
    rating: false,
    duration: false,
  });

  const [searchAddress, setsearchAddress] = useState("");
  const [activeDuration, setActiveDuration] = useState([]);
  const durationBtn = ["Hourly", "Daily", "Monthly"];
  const durationFilter = useSelector(getDuration);

  useEffect(() => {
    const isToLeaveReview = searchParams.get("review");
    if (isToLeaveReview == "true") {
      alert("You can leave a review");
      return;
    }
    // alert("You can not leave a review at the moment")
  }, []);

  const fetchViaCordinates = async () => {
    let url;
    if (dateFilterPicked) {
      url = `${process.env.REACT_APP_BASE_URL}/workspaces?lat=${coordinates?.lat}&lng=${coordinates?.lng}&booking_date=${dateFilterPicked}`;
    } else {
      url = `${process.env.REACT_APP_BASE_URL}/workspaces?lat=${coordinates?.lat}&lng=${coordinates?.lng}`;
    }
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (data?.status === false) {
      return;
    }
    setWorkspace(data?.data?.data);
    setTotalWorkspaces(data?.data?.total);
    dispatch(setFilterViaCoordinates(false));
    return;
  };

  useLayoutEffect(() => {
    filterViaCoordinates && fetchViaCordinates();
  }, [coordinates, filterViaCoordinates, dateFilterPicked]);

  useLayoutEffect(() => {
    dateFilterPicked && fetchViaCordinates();
  }, [dateFilterPicked]);

  const getAvaliableWorkspace = async () => {
    if (filterViaCoordinates) {
      return;
    }
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/workspaces`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setPerPageCount(data?.per_page);
    setWorkspace(data?.data?.data);
    setOutsideInfo(data);
    setTotalWorkspaces(data?.data?.data?.length);
  };

  useEffect(() => {
    if (filterViaCoordinates === false) {
      getAvaliableWorkspace();
    }
  }, []);

  const getNewPage = async (num) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/workspaces?page=${num}`
      );
      const data = await res.json();
      setWorkspace(data?.data?.data);
      setOutsideInfo(data);
      setTotalWorkspaces(data?.data?.total);
    } catch (err) {}
  };

  const handlePageClick = (selected) => {
    const pageClicked = selected?.selected + 1;
    getNewPage(pageClicked);
  };

  const filterWorkspace = async () => {
    if (!canFilter && !filterViaCoordinates) {
      return;
    }
    let myArray = [
      {
        name: "capacity",
        value: reduxCapacity,
      },
      {
        name: "category",
        value: reduxCategory,
      },
      {
        name: "amenities",
        value: reduxAmenities,
      },
      {
        name: "rating",
        value: rating,
      },
      {
        name: "distance_from",
        value: distanceRangeFilter,
      },
      {
        name: "distance_to",
        value: distanceRangeFilter,
      },
      {
        name: "price_from",
        value: priceRangeFilter,
      },
      {
        name: "price_to",
        value: priceRangeFilter,
      },
      {
        name: "duration",
        value: durationFilter,
      },
    ];

    const validInputs = myArray.filter((item) => {
      if (item.name === "distance_from" || item.name === "distance_to") {
        if (item.value.min > 0) {
          return item;
        }
      }
      if (item.name === "price_from" || item.name === "price_to") {
        if (item.value.min > 0) {
          return item;
        }
      } else if (item.value !== null) {
        return item;
      }
    });

    if (validInputs?.length === 0) return;
    let baseUrl = `${process.env.REACT_APP_BASE_URL}/workspaces`;
    try {
      let addedParams = false;
      validInputs.map((item) => {
        if (
          item.name === "distance_from" &&
          item.value.min > 0 &&
          triggerDistanceFilter
        ) {
          baseUrl =
            baseUrl +
            `${!addedParams ? '?' : '&'}${item.name}=${item.value.min}`
          addedParams = true
          setTriggerDistanceFilter(false)
          return
        }
        if (
          item.name === "distance_to" &&
          item.value.min > 0 &&
          triggerDistanceFilter
        ) {
          baseUrl =
            baseUrl +
            `${!addedParams ? "?" : "&"}${item.name}=${item.value.max}&lat=${
              currentUserLocation?.latitude
            }&lng=${currentUserLocation?.longitude}`
          addedParams = true
          setTriggerDistanceFilter(false)
          return
        }
        if (
          item.name === "price_from" &&
          item.value.min > 0 &&
          triggerPriceFilter
        ) {
          baseUrl =
            baseUrl +
            `${!addedParams ? "?" : "&"}${item.name}=${item.value.min}`;
          addedParams = true;
          setTriggerPriceFilter(false);
          return;
        }
        if (
          item.name === "price_to" &&
          item.value.min > 0 &&
          triggerPriceFilter
        ) {
          baseUrl =
            baseUrl +
            `${!addedParams ? "?" : "&"}${item.name}=${item.value.max}`;
          addedParams = true;
          setTriggerPriceFilter(false);
          return;
        }
        if (item.name === "amenities" && item.value?.length) {
          baseUrl =
            baseUrl + `${!addedParams ? "?" : "&"}${item.name}=${item.value}`;
          addedParams = true;
          return;
        }
        if (item.name === "category" && item.value?.length) {
          baseUrl =
            baseUrl + `${!addedParams ? "?" : "&"}${item.name}=${item.value}`;
          addedParams = true;
          return;
        }
        if (item.name === "capacity" && parseInt(item.value) > 0) {
          baseUrl =
            baseUrl + `${!addedParams ? "?" : "&"}${item.name}=${item.value}`;
          addedParams = true;
          return;
        }
        if (item.name === "rating" && parseInt(item.value) > 0) {
          baseUrl =
            baseUrl + `${!addedParams ? "?" : "&"}${item.name}=${item.value}`;
          addedParams = true;
          return;
        }
        if (item.name === "duration" && item.value?.length) {
          baseUrl =
            baseUrl + `${!addedParams ? "?" : "&"}${item.name}=${item.value}`;
          addedParams = true;
          return;
        }
      });
      dispatch(setCanFilter(false));
    } catch (error) {}
    const res = await fetch(`${baseUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setWorkspace(data?.data?.data);
    setTotalWorkspaces(data?.data?.total);
  };

  // const triggerFilterFunction = async () => {
  //   try {
  //     dispatch(canFilter(true));
  //   } catch (error) {}
  // };

  useEffect(() => {
    !filterViaCoordinates && filterWorkspace();
  }, [
    canFilter,
    reduxCapacity,
    reduxCategory,
    reduxAmenities,
    mentorship,
    priceRangeFilter,
    distanceRangeFilter,
    rating,
  ]);

  useEffect(() => {
    if (filterTrack.duration === false && !durationFilter?.length) return
    if (filterTrack.duration === false && durationFilter?.length) {
      setFilterTrack((prev) => ({ ...prev, duration: true }));
      handleApplyFilter();
      return;
    }
    if (filterTrack.duration === false && !durationFilter?.length) return;
    if (filterTrack.duration === true && !durationFilter?.length) {
      handleApplyFilter();
      return;
    }
    if (filterTrack.duration === true && durationFilter?.length) {
      handleApplyFilter();
      return;
    }
  }, [durationFilter]);

  useEffect(() => {
    if (filterTrack.category === false && !reduxCategory?.length) return;
    if (filterTrack.category === false && reduxCategory?.length) {
      setFilterTrack((prev) => ({ ...prev, category: true }));
      handleApplyFilter();
      return;
    }
    if (filterTrack.category === false && !reduxCategory?.length) return;
    if (filterTrack.category === true && !reduxCategory?.length) {
      handleApplyFilter();
      return;
    }
    if (filterTrack.category === true && reduxCategory?.length) {
      handleApplyFilter();
      return;
    }
  }, [reduxCategory]);

  useEffect(() => {
    if (filterTrack.amenities === false && !reduxAmenities?.length) return;
    if (filterTrack.amenities === false && reduxAmenities?.length) {
      setFilterTrack((prev) => ({ ...prev, amenities: true }));
      handleApplyFilter();
      return;
    }
    if (filterTrack.amenities === false && !reduxAmenities?.length) return;
    if (filterTrack.amenities === true && !reduxAmenities?.length) {
      handleApplyFilter();
      return;
    }
    if (filterTrack.amenities === true && reduxAmenities?.length) {
      handleApplyFilter();
      return;
    }
  }, [reduxAmenities]);

  useEffect(() => {
    if (filterTrack.rating === false && !rating) return;
    if (filterTrack.rating === false && rating) {
      setFilterTrack((prev) => ({ ...prev, rating: true }));
      handleApplyFilter();
      return;
    }
    if (filterTrack.rating === false && !rating) return;
    if (filterTrack.rating === true && !rating) {
      handleApplyFilter();
      return;
    }
    if (filterTrack.rating === true && rating) {
      handleApplyFilter();
      return;
    }
  }, [rating]);

  useEffect(() => {
    if (filterTrack.capacity === false && !reduxCapacity) return
    if (filterTrack.capacity === false && reduxCapacity) {
      setFilterTrack((prev) => ({ ...prev, capacity: true }));
      handleApplyFilter();
      return;
    }
    if (filterTrack.capacity === false && !reduxCapacity) return;
    if (filterTrack.capacity === true && !reduxCapacity) {
      handleApplyFilter();
      return;
    }
    if (filterTrack.capacity === true && reduxCapacity) {
      handleApplyFilter();
      return;
    }
  }, [reduxCapacity]);
  useEffect(() => {
    if (triggerPriceFilter) {
      handleApplyFilter();
    }
  }, [triggerPriceFilter]);
  useEffect(() => {
    if (triggerDistanceFilter) {
      handleApplyFilter();
    }
  }, [triggerDistanceFilter]);

  const clearFilterFn = () => {
    dispatch(setCapacity("1"));
    dispatch(setRating(0));
    dispatch(setAmenities([]));
    dispatch(setMentorship(""));
    dispatch(setPriceRangeFilter({}));
    dispatch(setDistanceRangeFilter({}));
    dispatch(setCanFilter(false));
    dispatch(setFilterViaCoordinates(false));
    dispatch(setCoordinatesLatLng(null));
    dispatch(setDatePicked(null));
    dispatch(setClearFilter(null));
    dispatch(setDateFilterPicked(null));
    dispatch(setDuration([]));
    setTimeout(() => {
      getAvaliableWorkspace();
    }, 100);
  };

  useEffect(() => {
    clearFilter && clearFilterFn();
  }, [clearFilter]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const toggleCardView = (type) => {
    if (type === "list") {
      setIsListView(true);
      setIsGridView(false);
    } else {
      setIsGridView(true);
      setIsListView(false);
    }
  };

  const dismissDropdown = () => {
    setFilterDropdownVisible(false);
  };

  useEffect(() => {
    try {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCurrentUserLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      });
    } catch (error) {}
  }, []);

  // filter stuff goes here
  const getAvailableAmenities = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/amenities`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data?.status === false) {
        return;
      }
      data?.data?.map((x) => {
        x?.items?.map((y) => {
          if (!amenitiesInit.includes(y?.name)) {
            setAmenitiesInit((prev) => [...prev, y?.name]);
          }
        });
      });
    } catch (error) {}
  };

  const fetchCategories = async () => {
    const config = {
      url: `${process.env.REACT_APP_BASE_URL}/categories`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };

    const { data } = await axios(config);
    data?.data?.map((x) => {
      setCategoriesInit((prev) => [...prev, x?.name]);
    });
  };

  useLayoutEffect(() => {
    getAvailableAmenities();
    fetchCategories();
  }, []);

  useEffect(() => {
    try {
      dispatch(setAmenities(amenitiesSelected));
    } catch (error) {}
  }, [amenitiesSelected]);
  useEffect(() => {
    try {
      dispatch(setCategory(categoriesSelected));
    } catch (error) {}
  }, [categoriesSelected]);

  // useEffect(() => {
  //   try {
  //     dispatch(setCategory(category_id));
  //   } catch (error) {}
  // }, [category_id]);

  useEffect(() => {
    try {
      dispatch(setCapacity(selectedCapacity));
    } catch (error) {}
  }, [selectedCapacity]);

  useEffect(() => {
    try {
      dispatch(setMentorship(mentorshipSelected));
    } catch (error) {}
  }, [mentorshipSelected]);

  useEffect(() => {
    try {
      dispatch(setPriceRangeFilter({ min: priceRange[0], max: priceRange[1] }));
      // dispatch(setPriceRangeFilter(priceRange));
    } catch (error) {}
  }, [priceRange]);

  useEffect(() => {
    try {
      dispatch(
        setDistanceRangeFilter({ min: distanceRange[0], max: distanceRange[1] })
      );
      // dispatch(setDistanceRangeFilter(distanceRange));
    } catch (error) {}
  }, [distanceRange]);

  useEffect(() => {
    try {
      dispatch(setRating(rate[0]));
    } catch (error) {}
  }, [rate]);

  useEffect(() => {
    try {
      dispatch(setDuration(activeDuration));
    } catch (error) {}
  }, [activeDuration]);

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
  };

  const onChange = (e, item) => {
    setIsChecked(e.target.checked);
  };

  const handleIncrement = () => {
    setSelectedCapacity(Number(selectedCapacity) + 1);
  };

  const handleDecrement = () => {
    if (selectedCapacity > 1) {
      setSelectedCapacity(Number(selectedCapacity) - 1);
    }
  };

  const handleChecked = (x) => {
    const isExisting = amenitiesSelected.find((item) => item === x);
    if (isExisting) {
      const newArr = amenitiesSelected.filter((a) => a !== x);
      setAmenitiesSelected(newArr);
      return;
    }
    setAmenitiesSelected([...amenitiesSelected, x]);
  };
  const handleCategoriesChecked = (x) => {
    const isExisting = categoriesSelected.find((item) => item === x);
    if (isExisting) {
      const newArr = categoriesSelected.filter((a) => a !== x);
      setCategoriesSelected(newArr);
      return;
    }
    setCategoriesSelected([...categoriesSelected, x]);
  };

  const handleApplyFilter = () => {
    dispatch(setCanFilter(true));
  };

  const handleClearFilter = () => {
    dispatch(setCanFilter(false));
    dispatch(setClearFilter(true));
    toggleFilter();
  };

  const handleSearch = (e) => {
    setSearchParams(e.target.value);
  };

  const displayCategory = categoriesInit
    .filter((amentySearch) =>
      amentySearch.toLowerCase().includes(searchCategoriesQuery.toLowerCase())
    )
    .map((category, index) => {
      return (
        <Checkbox
          style={{ marginLeft: 10 }}
          onClick={() => handleCategoriesChecked(category)}
          name="categories"
          key={index}
          onChange={onChange}
        >
          {category}
        </Checkbox>
      );
    });

  return (
    <div className="booking">
      <Helmet>
        <title>
          Booking | We connect remote workers to affordable and safe working
          environment...
        </title>
        <meta property="og:type" content="Workspaces" />
        <meta
          name="description"
          content="Book and enjoy cheap and affordable space well equipped with modern facilities and siren environment"
        />
        <meta
          name="keywords"
          content="workspace, rental, affordable space, remote working space, working space around you, monetize your workspace, co-working space, office space with internet"
        />
      </Helmet>
      <Header
        errorAuth={errorAuth}
        success={success}
        loadingfinished={loadingfinished}
      />

      <Filter
        isListView={isListView}
        isGridView={isGridView}
        toggleCardView={toggleCardView}
        toggleFilter={toggleFilter}
      />

      {/* 3 grid workspace */}
      <div className="workspace relative grid lg:grid-cols-4 lg:gap-4 lg:px-10 md:grid-cols-3 md:px-5 md:gap-4 sm:grid-cols-1 sm:px-5 ">
        <div className="lg:col-span-1 lg:block md:col-span-1 md:block sm:col-auto sm:hidden border-r-[1px] px-5 pt-5 ">
          <div className="my-3">
            <CAMCDatePicker fromFilter={true} />
          </div>
          <span className="font-light pt-5 text-md"> Search by location </span>
          <div className="h-14 flex flex-col">
            <SearchField
              style={{ marginTop: -30 }}
              placeholder="Enter location, eg Lagos"
              onChange={handleSearch}
              value={searchAddress}
              name="searchWorkspace"
            />
            {/* <AutoCompletePlaces placeholder="Testing here" /> */}
          </div>

          {/* Duration */}
          <div className="flex flex-col gap-2 py-2">
            <span className="text-md font-light"> Duration </span>
            <div className="flex flex-row justify-start items-start gap-2">
              {durationBtn.map((btn, key) => {
                const isActive = activeDuration.includes(btn);
                return (
                  <button
                    key={key}
                    onClick={() =>
                      setActiveDuration(
                        isActive
                          ? activeDuration.filter((current) => current !== btn)
                          : [...activeDuration, btn]
                      )
                    }
                    className={
                      isActive
                        ? "h-[45px] w-[90px] rounded-lg flex justify-center items-center cursor-pointer bg-blue-500 text-white"
                        : "border-[1px] border-gray-400 h-[45px] w-[90px] rounded-lg flex justify-center items-center cursor-pointer"
                    }
                  >
                    {btn}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="amenty_group h-[300px] overflow-auto my-4 ">
            <span className="block text-md font-light py-2">Categories</span>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search categories..."
              onChange={(e) => setSearchCategoriesQuery(e.target.value)}
              className="lg:w-[290px] md:w-auto h-[50px] indent-2 rounded-md border-[1px] outline-none "
            />
            <div className="flex flex-col justify-start gap-4 items-start py-2">
              {displayCategory}
            </div>
          </div>

          <div className="amenty_group h-[300px] overflow-auto my-4 ">
            <span className="block text-md font-light py-2">Amenities</span>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search amenities..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="lg:w-[290px] md:w-auto h-[50px] indent-2 rounded-md border-[1px] outline-none "
            />
            <div className="flex flex-col justify-start gap-4 items-start py-2">
              {amenitiesInit
                .filter((amentySearch) =>
                  amentySearch.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((amenty, index) => (
                  <Checkbox
                    style={{ marginLeft: 10 }}
                    onClick={() => handleChecked(amenty)}
                    name="amenities"
                    key={index}
                    onChange={onChange}
                  >
                    {amenty}
                  </Checkbox>
                ))}
            </div>
          </div>

          {/* Capacity */}
          <Capacity
            increment={handleIncrement}
            decrement={handleDecrement}
            selectedCapacity={selectedCapacity}
          />

          <div className="">
            <RangeSlider
              min={200}
              max={50000}
              step={1}
              setTriggerPriceFilter={setTriggerPriceFilter}
              title="Price Range"
              // subTitle="Distance in KM"
              setValues={setPriceRange}
              values={priceRange}
            />
            <RangeSlider
              min={0}
              max={5}
              step={0.5}
              title="Rating"
              isRating={true}
              setValues={setRate}
              values={rate}
            />
            <RangeSlider
              min={1}
              setTriggerDistanceFilter={setTriggerDistanceFilter}
              max={20}
              step={1}
              title="Distance Proximity"
              subTitle="Distance in KM"
              setValues={setDistanceRange}
              values={distanceRange}
            />
          </div>

          {/* Apply and clear buttons */}
          {/* <div className="flex space-x-4 mb-10 my-14 -mt-4">
            <button
              style={{
                padding: "2% 4%",
                backgroundColor: "blue",
                color: "white",
                height: 50,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 3,
              }}
              onClick={handleApplyFilter}
            >
              Apply
            </button>
          </div> */}
        </div>

        <div className="lg:col-span-3 md:col-span-3 sm:col-auto py-4">
              <div className="lg:col-span-1 lg:pt-5 lg:block md:hidden sm:hidden">
                <WorkspaceMap givenHeight={"35vh"} givenZoom={15} />
              </div>
          {!showFilter ? (
            <>
              <div className="mb-6">
                <p className="text-xl font-normal mb-4">Available Spaces</p>
                <div className="flex justify-between items-center">
                  <span>{`${totalWorkspaces} Space`}</span>

                  {/* TODO: fix dropdown value */}
                  {/* <SortedByComponent
                    setFilterDropdownVisible={setFilterDropdownVisible}
                    filterDropdownVisible={filterDropdownVisible}
                    filterCriteria={filterCriteria}
                    setFilterCriteria={setFilterCriteria}
                    dismissFilterDropdown={dismissDropdown}
                  /> */}
                  <div className="flex items-center justify-center layout">
                    <div
                      className={clsx({
                        ["h-10 w-10 flex items-center justify-center"]: true,
                        ["bg-[#FCFCFC"]: true,
                        ["view view--list"]: isListView,
                      })}
                      onClick={() => toggleCardView("list")}
                    >
                      <ListIcon />
                    </div>
                    <div
                      className={clsx({
                        ["hidden md:h-10 w-10 md:flex items-center justify-center"]: true,
                        ["bg-[#FCFCFC"]: true,
                        ["view view--grid"]: isGridView,
                      })}
                      onClick={() => toggleCardView("grid")}
                    >
                      <GridIcon />
                    </div>
                  </div>
                </div>
              </div>
              {/*<Link to= {`/booking/:${id}}`> */}
              <WorkSpaceCard
                isListView={isListView}
                isGridView={isGridView}
                currentPagelist={currentPagelist}
              />
              {/* </Link> */}
            </>
          ) : (
            <FilterComponent
              toggleFilter={toggleFilter}
              setShowFilter={setShowFilter}
            />
          )}
        </div>

        {/* <div className='lg:col-span-1 lg:pt-5 lg:block md:hidden sm:hidden'>
          <WorkspaceMap givenHeight={'60vh'} givenZoom={15} />
        </div> */}
      </div>

      {!showFilter && (
        <div className="flex items-center my-6 mx-auto justify-center ">
          {/* <div className="flex items-center justify-between w-[80px] h-10 bg-[#EEE] rounded-lg mr-8 px-4">
            <span>1</span>
            <Down />
          </div> */}
          <Pagination
            pageCount={outsideInfo?.data?.last_page}
            handlePageClick={handlePageClick}
            pageRangeDisplayed="5"
          />
          {/* <div className="flex items-center justify-between">
            <span className="mr-2 ml-8 ">Go to: </span>
            <span className="w-[80px] text-xs flex items-center justify-center h-10 bg-[#EEE] rounded-lg px-4 text-[#aaa]">
              eg: 103
            </span>
          </div> */}
        </div>
      )}

      <Aboutfooterlink />
    </div>
  );
};

export default BookList;
