import React, { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import DataTable, { defaultThemes } from "react-data-table-component";
import { Tooltip } from "bootstrap";
import Header from "../../components/header/header";
import "./home.css";

const Home = () => {
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
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
    <>
      <Header />
      <div className="container">
        <div>
          <DataTable
            columns={columns}
            data={data}
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
    </>
  );
};

export default Home;
