import React, { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import DataTable, { defaultThemes } from "react-data-table-component";
import { MdArrowBackIos } from "react-icons/md";
import { GrFormAdd } from "react-icons/gr";
import Header from "../../components/header/header";
import "./playlist.css";
import Axios from "../../helpers/axios";
import moment from "moment";
import { Link } from "react-router-dom";

const Playlist = () => {
  const [popUp, setPopUp] = useState(false);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [playlistModel, setPlaylistModel] = useState(false);
  const [Playlist, setPlaylist] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    setIsLoaderVisible(true);
    await Axios.get(`playlist/byUser`)
      .then((res) => {
        setPlaylist(res?.data?.payload?.result);
        setIsLoaderVisible(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoaderVisible(false);
      });
  };

  const handleStatus = async (id, status) => {
    setIsLoaderVisible(true);
    const data = {
      privet: status ? false : true,
    };
    await Axios.put(`playlist/update/${id}`, data)
      .then((res) => {
        getAll();
      })
      .catch((err) => {
        console.log(err);
        setIsLoaderVisible(false);
      });
  };

  const handleDelete = async (id) => {
    setIsLoaderVisible(true);
    await Axios.delete(`playlist/delete/${id}`)
      .then((res) => {
        getAll();
      })
      .catch((err) => {
        console.log(err);
        setIsLoaderVisible(false);
      });
  };

  const columns = [
    {
      name: "SNo",
      cell: (row, index) => index + 1,
      width: "65px",
    },
    {
      name: "Playlist Name",
      selector: (row) => row?.playlistName,
      sortable: true,
    },
    {
      name: "Playlist CreatedBy",
      selector: (row) => row?.playlistBy?.name,
      sortable: true,
    },
    {
      name: "Playlist Created Date",
      selector: (row) => moment(row?.createdAt).format("DD-MM-YYYY"),
      sortable: true,
    },
    {
      name: "View Playlist Movie",
      // width: "300px",
      cell: (row) => {
        return (
          <>
            <div>
              <Link to={`/user/paylist/${row?._id}`}>View Playlist Movie</Link>
            </div>
          </>
        );
      },
    },
    {
      name: "Playlist Mode",
      // width: "300px",
      cell: (row) => {
        return (
          <>
            <div
              onClick={() => {
                handleStatus(row?._id, row?.privet);
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
      name: "Delete Playlist",
      // width: "300px",
      cell: (row) => {
        return (
          <>
            <div
              onClick={() => {
                handleDelete(row?._id);
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
      <div className="container-home-page">
        <div className="temporaray-container">
          <div className="container-content-table">
            <DataTable
              columns={columns}
              data={Playlist}
              customStyles={customStyles}
              style={{
                marginTop: "-3rem",
              }}
              progressPending={isLoaderVisible}
              progressComponent={<ThreeCircles color="#334D52" height={30} width={30} />}
              highlightOnHover
              // pagination
              // paginationServer
              // paginationTotalRows={count}
              // paginationPerPage={countPerPage}
              // paginationRowsPerPageOptions={[10, 20, 25, 50, 100]}
              // paginationDefaultPage={page}
              // onChangePage={(page) => {
              //   setPage(page);
              // }}
              // onChangeRowsPerPage={(rowPerPage) => {
              //   setCountPerPage(rowPerPage);
              // }}
            />
          </div>
        </div>
        <div className="create-playlist-pop-up" id={`${popUp}`}>
          <div className="arrow-icon" id={`arrow-${popUp}`}>
            <MdArrowBackIos
              onClick={() => {
                setPopUp(!popUp);
              }}
            />
          </div>
          <div className="playlist-name-input">
            <input type="text" placeholder="Playlist Name..." />
          </div>
          <div className="add-icon">
            <GrFormAdd />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Playlist;
