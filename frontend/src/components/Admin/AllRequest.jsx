import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import {
  AiFillPhone,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlineMail,
} from "react-icons/ai";
import { FaAddressCard, FaCalendarDay } from "react-icons/fa";
import { MdEmail, MdVerified } from "react-icons/md";
import Button from "@mui/material/Button";
import { getAllRequests } from "../../redux/actions/request";
import { server } from "../../server";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { toast } from "react-toastify";
import Avatar from "react-avatar";
import ReactModal from "react-modal";

const AllRequest = () => {
  const dispatch = useDispatch();
  const { requests } = useSelector((state) => state.requests);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(selectedSeller?.verify || false);
  const [verifiedSellers, setVerifiedSellers] = useState([]);

  useEffect(() => {
    dispatch(getAllRequests());
  }, [dispatch]);

  const fetchSellerInfo = async (sellerId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${server}/shop/get-shop-info/${sellerId}`
      );
      setSelectedSeller(response.data.shop);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const handleVerify = async () => {
    try {
      await axios.put(`${server}/shop/verify-seller`, {
        sellerId: selectedSeller._id,
      });
      setIsVerified(true);
      setVerifiedSellers([...verifiedSellers, selectedSeller._id]);
      setSelectedSeller(null);
      toast.success("Seller verified!");
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    { field: "id", headerName: "Seller ID", minWidth: 150, flex: 0.7 },

    {
      field: "name",
      headerName: "name",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "address",
      headerName: "Seller Address",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "joinedAt",
      headerName: "joinedAt",
      type: "text",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "  ",
      flex: 1,
      minWidth: 150,
      headerName: "Seller Info",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const isSellerVerified = verifiedSellers.includes(params.row.id);
        return (
          <>
            <Button
              onClick={() => fetchSellerInfo(params.row.id)}
              disabled={isLoading || isSellerVerified}
            >
              <AiOutlineEye size={20} />
            </Button>
          </>
        );
      },
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "Delete Seller",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];
  requests &&
    requests.forEach((item) => {
      if (!verifiedSellers.includes(item._id)) {
        row.push({
          id: item._id,
          name: item?.name,
          email: item?.email,
          joinedAt: item.createdAt.slice(0, 10),
          address: item.address,
        });
      }
    });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleImageClick = () => {
    setIsModalOpen(true);
  };
  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px]  pb-2">All Requests</h3>
        <div className="w-full  bg-beige rounded">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
        {selectedSeller && ( // Check if selectedSeller exists
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center overflow-y-scroll h-screen">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] pt-20 h-[120vh] bg-beige rounded shadow p-5 fe-car ">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1 size={25} onClick={() => setSelectedSeller(null)} />{" "}
                {/* Reset selectedSeller */}
              </div>
              <h3 className="text-2xl text-center pb-5 font-semibold">
                Seller Info
              </h3>
              {isLoading ? (
                <p>Loading seller information...</p>
              ) : (
                <div className="flex  flex-col justify-center items-center">
                  <div className="flex items-center justify-center flex-col">
                    {selectedSeller?.avatar?.url ? (
                      <img
                        src={selectedSeller.avatar.url}
                        className="w-[150px] mx-auto h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                        alt=""
                      />
                    ) : (
                      <Avatar
                        name={selectedSeller.name}
                        className="w-[150px] h-[150px]  text-5xl "
                        round={true}
                        style={{ fontSize: "24px" }}
                      />
                    )}
                    <p className="my-3 text-3xl">
                      {selectedSeller.businessInfo.businessName}
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <p className="flex items-center gap-2">
                      <MdEmail size={20} className="text-pink" />
                      {selectedSeller.email}
                    </p>
                    <div className="flex  gap-2">
                      <FaAddressCard size={20} className="text-pink" />{" "}
                      <div className="flex flex-col gap-1">
                        <p>
                          <span className="text-pink">House no:</span>{" "}
                          {selectedSeller.businessInfo.address.houseNo}{" "}
                        </p>
                        <p>
                          <span className="text-pink">Kebele: </span>
                          {selectedSeller.businessInfo.address.kebele}{" "}
                        </p>
                        <p>
                          <span className="text-pink">KifleKetema:</span>{" "}
                          {selectedSeller.businessInfo.address.kifleKetema}{" "}
                        </p>
                        <p>
                          <span className="text-pink">Region:</span>{" "}
                          {selectedSeller.businessInfo.address.region}{" "}
                        </p>
                        <p>
                          <span className="text-pink">Woreda: </span>
                          {selectedSeller.businessInfo.address.woreda}
                        </p>
                      </div>
                    </div>
                    <p className="flex items-center gap-2">
                      <AiFillPhone size={20} className="text-pink" />{" "}
                      {selectedSeller.phoneNumber}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaCalendarDay size={20} className="text-pink" />
                      {new Date(selectedSeller.createdAt).toLocaleString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                        }
                      )}
                    </p>
                    <p className="flex items-center gap-2">
                      <p>License</p>
                      <img
                        src={selectedSeller.businessInfo.tradeLicense.url}
                        alt=" trade license"
                        className="w-[100px] cursor-pointer"
                        onClick={handleImageClick}
                      />
                      <ReactModal
                        isOpen={isModalOpen}
                        onRequestClose={() => setIsModalOpen(false)}
                        className="z-[-10]"
                      >
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="absolute right-0"
                        >
                          <AiOutlineClose />
                        </button>
                        <img
                          src={selectedSeller.tradeLicense}
                          alt="Trade License"
                          className="w-full"
                        />
                      </ReactModal>
                    </p>
                    <p className="flex items-center gap-2">
                      <MdVerified size={20} className="text-red-700" />
                      {verifiedSellers.includes(selectedSeller._id)
                        ? "Verified"
                        : "Not Verified"}
                    </p>
                  </div>
                </div>
              )}
              <div className="w-full flex items-center mt-10 justify-center gap-10">
                <button
                  className={`cursor-pointer bg-green-600 hover:bg-green-900 text-white text-lg py-1 px-5 rounded-md`}
                  onClick={handleVerify}
                >
                  Verify Seller
                </button>

                <button
                  className={`cursor-pointer bg-red-600 hover:bg-red-900 text-white text-lg py-1 px-5 rounded-md`}
                  onClick={() => setSelectedSeller(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRequest;
