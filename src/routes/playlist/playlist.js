import React, { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import DataTable, { defaultThemes } from "react-data-table-component";
import { MdArrowBackIos } from "react-icons/md";
import { GrFormAdd } from "react-icons/gr";
import Header from "../../components/header/header";
import "./playlist.css";

const Playlist = () => {
  const [popUp, setPopUp] = useState(false);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [playlistModel, setPlaylistModel] = useState(false);
  const [countPerPage, setCountPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  // useEffect(() => {
  //   // getAll();
  // }, [page, countPerPage]);

  const data = [
    {
      name: "sahil",
    },
    {
      name: "sahil",
    },
    {
      name: "sahil",
    },
    {
      name: "sahil",
    },
    {
      name: "sahil",
    },
    {
      name: "sahil",
    },
    {
      name: "sahil",
    },
    {
      name: "sahil",
    },
    {
      name: "sahil",
    },
    {
      name: "sahil",
    },
  ];

  const columns = [
    {
      name: "SNo",
      cell: (row, index) => (page - 1) * countPerPage + (index + 1),
      width: "65px",
    },
    {
      name: "name",
      selector: (row) => row?.Name,
      sortable: true,
    },
    // {
    //   name: "Actions",
    //   cell: (row) => {
    //     return (
    //       <>
    //         <div className="d-flex justify-content-between">
    //           <div className="cursor-pointer pl-2" onClick={() => {}}>
    //             <Tooltip title="View" arrow>
    //               {/* <RemoveRedEyeIcon /> */}
    //               eye
    //             </Tooltip>
    //           </div>
    //         </div>
    //       </>
    //     );
    //   },
    // },
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
      <Header />
      <div className="container-home-page">
        <div className="temporaray-container">
          <div className="container-content-table">
            <DataTable
              columns={columns}
              data={data}
              customStyles={customStyles}
              style={{
                marginTop: "-3rem",
              }}
              progressPending={isLoaderVisible}
              progressComponent={
                <ThreeCircles color="#334D52" height={30} width={30} />
              }
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
