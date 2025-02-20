import Image from "next/image";
import Icons from "../Shared/Icons";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import { UsegetProductDetails } from "../../api/useGetProduct";
import { useState } from "react";
import PreviewImageModal from "../Modals/PreviewImageModal";
import { useDisclosure } from "@nextui-org/react";
import ReviewProductModal from "../Modals/ReviewProductModal";

const ProductDetails = () => {
  const router = useRouter();
  const { details, detailsError } = UsegetProductDetails(router.query?.id);
  console.log(router.query?.id)
  console.log(details)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [action, setAction] = useState<string>();
  const [modals, setModal] = useState({
    imageModal: false,
    reviewModal: false,
  });
  const [selectedImage, setSelectedImage] = useState(""); 
  const showImageModal = (img: string) => {
    setSelectedImage(img);
    onOpen();
    setModal((prev) => ({ ...prev, imageModal: true }));
  };
  const showReviewModal = (action: string) => {
    setAction(action);
    onOpen();
    setModal((prev) => ({ ...prev, reviewModal: true }));
  };
  return (
    <div className="bg-[#F9FAFC] w-10/12 h-[450px] flex flex-col">
      {details && (
        <>
          <div className="flex items-start gap-x-8">
            <div>
              <Image
                src={details.images[0]}
                alt="product image"
                width={536}
                height={534}
              />
            </div>
            <div className="flex flex-col gap-y-6 pt-6">
              <div className="flex items-center gap-x-4">
                {details.seller.profile_picture ? (
                  <Image
                    src={details.seller.profile_picture}
                    alt="product owner"
                    width={48}
                    height={48}
                  />
                ) : (
                  <Icons type="profile" />
                )}
                <div className="">
                  <div className="flex items-center gap-x-2 text-[16px]">
                    <p className="text-[#344054]">
                      {details.seller.firstname} {details.seller.lastname}
                    </p>{" "}
                    <Icons type="clock" />
                    <span className="text-[#676767]">
                      {" "}
                      {format(
                        new Date(details?.created_at),
                        "MMM dd, yyyy hh:mma",
                      )}
                    </span>
                  </div>
                  <p className="text-[16px] text-[#676767]">
                    {details?.location}
                  </p>
                </div>
              </div>
              <div className="flex flex-col  text-primary-black">
                <p className="text-[22px] font-semibold">
                  {details.name}
                </p>
                <p className="text-[22px] whitespace-pre-line leading-8 font-semibold">
                  {details?.description}
                </p>
                <p className="flex items-center gap-x-2 font-bold">
                  <Icons type="price-tag" />₦{details?.price}{" "}
                  <span className="text-[#667185] font-normal">
                    <s>₦{details.original_price}</s>
                  </span>
                </p>
                <div className="py-2 grid grid-cols-3">
                  {details.categories &&
                    details.categories.length > 0 &&
                    details.categories.map(
                      (category, index) =>
                        category !== null && (
                          <span
                            key={index}
                            className="w-[131px] bg-[#F9F5FF] px-4 rounded-[16px] border-[1px] border-solid border-[#E9D7FE]"
                          >
                            {category}
                          </span>
                        ),
                    )}
                </div>
                <div className="text-primary-black mt-4 flex flex-col gap-y-[8px]">
                  <p className="text-[14px]">Seller Contact:</p>
                  {details.seller.phone_number && (
                    <h3 className="font-bold text-[24px]">
                      {details.seller.phone_number}
                    </h3>
                  )}
                  <div className="flex items-center gap-x-2">
                    <Link
                      href={`tel:${details.seller.phone_number}`}
                      className="flex items-center gap-x-2 text-[10px] text-[#676767]"
                    >
                      <Icons type="phone" /> Call
                    </Link>
                    <Link
                      href=""
                      className="flex items-center gap-x-2 text-[10px] text-[#676767]"
                    >
                      <Icons type="whatsapp" width={14} height={14} /> WhatsApp
                    </Link>
                  </div>
                  <div className="flex flex-col gap-y-4">
                    <button
                      onClick={() => showReviewModal("rejected")}
                      className="border-solid border-[1px] py-2 text-[13px] text-[#676767] border-[#676767] rounded-[4px] "
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => showReviewModal("approved")}
                      className="bg-main border-solid border-[1px] py-2 text-[13px] text-white border-main rounded-[4px] "
                    >
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center cursor-pointer w-full overflow-x-scroll mt-4 gap-x-2 p-4">
            {details.images &&
              details.images.length > 0 &&
              details.images.map((image, index) => (
                <Image
                  src={image}
                  key={index}
                  width={104}
                  height={104}
                  alt="images"
                  onClick={() => showImageModal(image)}
                />
              ))}
          </div>
        </>
      )}
      {detailsError && (
        <div className="text-red-500 flex items-center justify-center">
          An Error occured{" "}
        </div>
      )}
      {modals.imageModal && (
        <PreviewImageModal
          src={selectedImage}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
      {modals.reviewModal && (
        <ReviewProductModal
          status={action}
          isOpen={isOpen}
          onClose={onClose}
          id={details.product_id}
        />
      )}
    </div>
  );
};
export default ProductDetails;
