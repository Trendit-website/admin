import { useState } from "react";
import Icons from "../../Shared/Icons";
import Activities from "../../Dashboard/Activities";
import Image from "next/image";
import { UseGetProducts } from "../../../api/useGetProduct";
import { useDisclosure } from "@nextui-org/react";
import ReviewProductModal from "../../Modals/ReviewProductModal";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

const MarketPlaceTable = () => {
  const Tabs = ["Review"];
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const [activePage, setActivePage] = useState(currentPage || 1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState(Tabs[0]);
  const { allProductError, allProducts } = UseGetProducts(activePage)
  const [option, setOption] = useState({ id: null, status: "" });
  const router = useRouter()
  return (
    <div className="w-full flex items-start py-8">
      <div className="flex flex-col text-primary-black gap-y-8 py-6 w-9/12">
        <div className="flex items-center justify-between w-10/12 m-auto">
          <h1 className="flex flex-col text-[30px] font-bold">
            Products
            <span className="text-[#667185] text-[14px]">
              Check and evaluate all listed products here
            </span>
          </h1>
          {/* <div className="flex items-center justify-around bg-main text-[#FFFFFF] w-[117px] h-[36px] py-[2px] px-[6px] rounded-[6px]">
            Create
            <Icons type="plus" />
          </div> */}
        </div>
        <div
          className={`flex items-center w-10/12 border-b-[1px] m-auto border-solid border-gray gap-x-12`}
        >
          {Tabs.map((tab, index) => (
            <p
              key={index}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 cursor-pointer w-[150px] text-center ${activeTab === "Review" ? "text-main border-main border-b-[1px] border-solid" : "text-secondary"}`}
            >
              {tab}{" "}
              <span className="text-white bg-main rounded-[12px] px-[9px] py-[4px] w-[54px] text-center text-[12px]">
                {allProducts && allProducts.total}
              </span>
            </p>
          ))}
        </div>
        <div className="m-auto bg-white w-10/12 py-6 rounded-[10px] border-solid border-[1px] border-gray">
          <div className="flex flex-col">
            <div className="flex items-start w-full justify-between px-4">
              <p className="flex items-center gap-x-[8px] font-semibold text-[18px] text-primary-black">
                New Request{" "}
                {allProducts &&
                <span className="text-[12px] text-[#344054] border-[1px] border-solid border-gray rounded-[6px] px-[5px]">
                 {allProducts.total}
                 </span>}{" "}
              </p>
              <Icons type="vertical-dot" />
            </div>
            <div className="p-4 text-[14px] text-[#475467] -mt-[10px]">
              Review, Accept or Decline items from users that whats to sell
              their items on the marketplace
            </div>
          </div>
          <table className="w-full flex flex-col">
            <thead className="w-full text-[12px] text-[#475467] py-2 px-8 border-t-[1px] border-b-[1px] bg-[#F5F5F5]">
              <tr className="flex items-center">
                <td className="flex items-center gap-x-[5px] w-5/12">
                  Product
                </td>
                <td className="w-3/12">Price/Post</td>
                <td className="w-2/12">Owner</td>
                <td className="w-2/12">Status</td>
              </tr>
            </thead>
            {allProducts && (
              <>
                {allProducts.products.length > 0 && (
                  <tbody className="flex flex-col gap-y-4 text-secondary text-[12px] px-8">
                    {allProducts.products.map((product, index) => (
                      <tr
                        className="flex cursor-pointer items-center py-4 border-borderColor border-b-[1px] border-solid"
                        key={index}
                      >
                        <td 
                        onClick={() => router.push(`/marketplace/${product.product_id}`)} className="flex items-start gap-x-[5px] w-5/12">
                          <div
                            className="flex items-start gap-x-2"
                          >
                            <div className="flex items-center gap-x-[3px]">
                              {product?.images.length > 0 && (
                                <Image
                                  src={
                                    product.images[0] ||
                                    "/assets/media-holder.png"
                                  }
                                  alt="product image"
                                  width={37}
                                  height={39}
                                />
                              )}
                              <p className="text-primary-black text-[14px] font-bold">
                                {product.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td 
                        onClick={() => router.push(`/marketplace/${product.product_id}`)} className="w-3/12">
                          #{product.price.toLocaleString()}.00
                        </td>
                        <td 
                        onClick={() => router.push(`/marketplace/${product.product_id}`)} className="w-2/12">
                          <div className="flex items-center gap-x-[3px]">
                            <Icons type="profile" />
                            <p className="text-[14px] text-[#475467]">User</p>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-x-[8px]">
                            <button
                              onClick={() => (
                                setOption({
                                  id: product.product_id,
                                  status: "approved",
                                }),
                                onOpen()
                              )}
                              className="bg-[#D2EBD3] w-[65px] text-[#317234] px-[5px] rounded-[16px] border-[1px] border-solid border-[#5DB160]"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => (
                                setOption({
                                  id: product.product_id,
                                  status: "rejected",
                                }),
                                onOpen()
                              )}
                              className="bg-[#CD9C8D] w-[65px] text-[#A62800] px-[5px] rounded-[16px] border-[1px] border-solid border-[#FF3D00]"
                            >
                              Decline
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
                {allProducts.products.length < 1 && (
                  <div className="flex w-full items-ceter py-4">
                    No Products listed at the moments
                  </div>
                )}
              </>
            )}
            {allProductError && (
              <div className="flex items-center justify-center py-4 text-red-600">
                {allProductError.message ||
                  "An Error Occured try again later !!!"}
              </div>
            )}
            {!allProducts && !allProductError && (
              <div className="flex items-center justify-center py-4">
                <Icons type="loader" />
              </div>
            )}
          </table>
          <div className="flex w-full items-center justify-between px-4 py-6">
            <div className="flex items-center cursor-pointer gap-x-4">
                <p className="">
                  {activePage} of {allProducts ? allProducts.total_pages : activePage}
                </p>
            </div>
            <div className="flex items-center gap-x-4">
              <div
                onClick={() =>
                  activePage !== 1 && (setActivePage(activePage - 1), router.push(`/marketplace?page=${activePage -1}`))
                }
                className="flex items-center cursor-pointer gap-x-[6px] px-2 py-2 rounded-[8px] border-solid border-[1px] border-borderColor"
              >
                <Icons type="prev" />
                Previous
              </div>
              <div
                onClick={() =>
                  activePage !== allProducts.total_pages &&
                  (setActivePage(activePage + 1), router.push(`/marketplace?page=${activePage + 1}`))
                }
                className="flex items-center gap-x-[6px] cursor-pointer px-2 py-2 rounded-[8px] border-solid border-[1px] border-borderColor"
              >
                Next
                <Icons type="next" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Activities />
      {isOpen && (
        <ReviewProductModal
          isOpen={isOpen}
          onClose={onClose}
          status={option.status}
          id={option.id}
        />
      )}
    </div>
  );
};
export default MarketPlaceTable;
