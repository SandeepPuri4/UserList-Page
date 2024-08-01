import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, setSort, setFilter } from "../redux/userSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import "./UserList.css";

const UserList = () => {
  const dispatch = useDispatch();
  // Accessing state from Redux store
  const { users, loading, filters, sort, totalUsers } = useSelector(
    (state) => state.users
  );
  // State for managing infinite scroll
  const [hasMore, setHasMore] = useState(true);
  // State for pagination number of records per page
  const [limit] = useState(10);
  // State for pagination offset for fetching records
  const [skip, setSkip] = useState(0);

  // Fetch users when component mounts or skip/limit changes
  useEffect(() => {
    dispatch(fetchUsers({ limit, skip }));
  }, [dispatch, limit, skip]);

  // Function to handle fetching more users for infinite scroll
  const fetchMoreUsers = () => {
    // Check if all users have been fetched
    if (users.length >= totalUsers) {
      setHasMore(false);
      return;
    }
    // Update skip value to fetch next set of users
    setSkip((prevSkip) => prevSkip + limit);
  };

  // Function to handle sorting users based on selected field
  const handleSort = (field) => {
    dispatch(setSort(field));
  };

  // Function to handle filtering users based on gender or country
  const handleFilterChange = (e) => {
    dispatch(setFilter({ filterType: e.target.name, value: e.target.value }));
  };

  // Filter and sort users based on selected filters and sort field
  const filteredUsers = users
    .filter(
      (user) =>
        (filters.gender ? user.gender === filters.gender : true) &&
        (filters.country ? user.address.country === filters.country : true)
    )
    .sort((a, b) => {
      if (a[sort] < b[sort]) return -1;
      if (a[sort] > b[sort]) return 1;
      return 0;
    });

  return (
    <div className="user-list">
      {/* Sort and Filter Controls */}
      <div className="heading">
        <h1>Employee List</h1>
      </div>
      <div className="sort-filter">
        <label>Sort by:</label>
        <select
          className="select"
          onChange={(e) => handleSort(e.target.value)}
          value={sort}
        >
          <option value="id">ID</option>
          <option value="firstName">Full Name</option>
          <option value="age">Age</option>
        </select>
        <label>Filter by Gender:</label>
        <select
          name="gender"
          onChange={handleFilterChange}
          value={filters.gender}
        >
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <label>Filter by Country:</label>
        <select
          name="country"
          onChange={handleFilterChange}
          value={filters.country}
        >
          <option value="">All</option>
          <option value="India">India</option>
          <option value="United States">United States</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
          <option value="Germany">Germany</option>
        </select>
      </div>
      {/* Sort and Filter Controls end */}
      
      {/* User List with Infinite Scroll */}
      <InfiniteScroll
        dataLength={users.length} // Current number of users in the list
        next={fetchMoreUsers} // Function to call for fetching more users
        hasMore={hasMore} // Boolean indicating if there are more users to load
        loader={<div className="loading">Loading...</div>} // Loader to show while fetching data
        endMessage={<div className="no-more">No more users to load</div>} // Message when no more users are available
      >
        <div className="container">
          <div className="user-list-header">
            <div>ID</div>
            <div>Image</div>
            <div>Age</div>
            <div>Full Name</div>
            <div>Department</div>
            <div>Title</div>
            <div>Country</div>
          </div>
          <div className="user-list-body">
            {/* Render list of filtered users */}
            {filteredUsers.map((user) => (
              <div key={user.id} className="user-item">
                <div>{user.id}</div>
                <div className="user-image-wrapper">
                  <img
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="user-image"
                  />
                </div>
                <div>{user.age}</div>
                <div>
                  {user.firstName} {user.lastName}
                </div>
                <div>{user.company.department || "N/A"}</div>
                <div>{user.company.title || "N/A"}</div>
                <div>{user.address.country || "N/A"}</div>
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
      {loading && <div className="loading">Loading...</div>}
    </div>
  );
};

export default UserList;
