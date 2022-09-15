import React, { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import DataTable, { defaultThemes } from "react-data-table-component";
// import { Tooltip } from "bootstrap";
import Header from "../../components/header/header";
import "./home.css";
import Axios from "../../helpers/axios";
import moment from "moment";
import { Link } from "react-router-dom";

const Home = () => {
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [countPerPage, setCountPerPage] = useState(10);
  const [Playlist, setPlaylist] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAll();
  }, [page, countPerPage]);

  const getAll = async () => {
    await Axios.get(`playlist/public`)
      .then((res) => {
        setPlaylist(res?.data?.payload?.result);
        setCount(res?.data?.payload?.count);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      name: "SNo",
      cell: (row, index) => (page - 1) * countPerPage + (index + 1),
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
      name: "Actions",
      width: "200px",
      cell: (row) => {
        return (
          <>
            <div className="d-flex justify-content-between">
              <Link to={`/user/paylist/${row?._id}`}>View Playlist Movie</Link>
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

export default Home;
