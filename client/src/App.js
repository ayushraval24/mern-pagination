import "./App.css";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap";
import axios from "axios";

function App() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);
  const [finalData, setFinalData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      axios
        .get("http://localhost:8000/userOffset", {
          params: {
            offset: offset,
            limit: limit,
          },
        })
        .then((res) => {
          // console.log("REs: ", res);
          setFinalData(res.data.users);
          setPageCount(Math.ceil(res.data.count / limit));
        })
        .catch((err) => console.log(err));
    };
    getData();
  }, [currentPage, limit, offset]);

  const handlePageClick = ({ selected: selectedPage }) => {
    // console.log("Selected page: ", selectedPage + 1);
    setCurrentPage(selectedPage + 1);
    setOffset(selectedPage * limit);
  };

  return (
    <div className="App">
      <h1 className="text-primary">Working</h1>
      {/* {finalData &&
        finalData?.map((user) => {
          console.log("User: " + user);
          return <h1 key={user?._id}>{user?.username}</h1>;
        })} */}

      {finalData &&
        finalData.map((user) => <h1 key={user?._id}>{user?.first_name}</h1>)}

      <ReactPaginate
        previousLabel={"Previouse"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageRangeDisplayed={5}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        nextClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default App;
