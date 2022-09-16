import React, { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import DataTable, { defaultThemes } from "react-data-table-component";
// import Header from "../../components/header/header";
import "./yourPlaylistMovie.css";
import Axios from "../../helpers/axios";
import moment from "moment";
import { Link, useLocation, useParams } from "react-router-dom";

const YourPlaylistMovie = () => {
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [countPerPage, setCountPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [allMovies, setAllMovies] = useState([]);
  const { id } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    getMovie();
  }, [page, countPerPage]);

  const getMovie = async () => {
    setIsLoaderVisible(true);
    await Axios.get(`movie/byUser/${id}`)
      .then((res) => {
        setAllMovies(res?.data?.payload?.result);
        setCount(res?.data?.payload?.count);
        setIsLoaderVisible(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoaderVisible(false);
      });
  };

  const handleStatus = async (playlistId, MovieId, status) => {
    setIsLoaderVisible(true);
    const data = {
      privet: status ? false : true,
    };
    await Axios.put(`movie/update/${playlistId}/${MovieId}`, data)
      .then((res) => {
        getMovie();
      })
      .catch((err) => {
        console.log(err);
        setIsLoaderVisible(false);
      });
  };

  const handleDelete = async (playlistId, MovieId) => {
    const confirmBox = window.confirm("Do you really want to delete this Movie?");
    if (confirmBox === true) {
      setIsLoaderVisible(true);
      await Axios.delete(`movie/delete/${playlistId}/${MovieId}`)
        .then((res) => {
          getMovie();
        })
        .catch((err) => {
          console.log(err);
          setIsLoaderVisible(false);
        });
    }
  };

  const columns = [
    {
      name: "SNo",
      cell: (row, index) => index + 1,
      width: "65px",
    },
    {
      name: "Movie Id",
      selector: (row) => row?.movieId,
      sortable: true,
    },
    {
      name: "Movie Name",
      selector: (row) => row?.movieName,
      sortable: true,
    },
    {
      name: "Movie Added Date",
      selector: (row) => moment(row?.createdAt).format("DD-MM-YYYY"),
      sortable: true,
    },
    {
      name: "Movie Mode",
      // width: "300px",
      cell: (row) => {
        return (
          <>
            <div
              onClick={() => {
                handleStatus(row?.playlist, row?._id, row?.privet);
              }}
              className="sub-action"
            >
              <button>{row?.privet ? "Privet" : "Public"}</button>
            </div>
          </>
        );
      },
    },
    {
      name: "Delete Movie",
      // width: "300px",
      cell: (row) => {
        return (
          <>
            <div
              onClick={() => {
                handleDelete(row?.playlist, row?._id);
              }}
              className="sub-action"
            >
              <button>Delete</button>
            </div>
          </>
        );
      },
    },
  ];

  // Table Style
  const customStyles = {
    header: {
      style: {
        minHeight: "56px",
      },
    },
    headRow: {
      style: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: defaultThemes.default.divider.default,
      },
    },
    headCells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: defaultThemes.default.divider.default,
        },
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: defaultThemes.default.divider.default,
        },
      },
    },
  };

  return (
    <div>
      {/* <Header /> */}
      <h1>{state?.playlistName}</h1>
      <div className="container-home-page">
        <div className="temporaray-container">
          <div className="container-content-table">
            <DataTable
              columns={columns}
              data={allMovies}
              customStyles={customStyles}
              style={{
                marginTop: "-3rem",
              }}
              progressPending={isLoaderVisible}
              progressComponent={<ThreeCircles color="#334D52" height={30} width={30} />}
              highlightOnHover
              pagination
              paginationServer
              paginationTotalRows={count}
              paginationPerPage={countPerPage}
              paginationRowsPerPageOptions={[10, 20, 25, 50, 100]}
              paginationDefaultPage={page}
              onChangePage={(page) => {
                setPage(page);
              }}
              onChangeRowsPerPage={(rowPerPage) => {
                setCountPerPage(rowPerPage);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourPlaylistMovie;
