import Icons from "@/components/Shared/Icons";
import Image from "next/image";
import { Modal, ModalContent } from "@nextui-org/react";
import Button from "@/components/Shared/Button";
import { useState } from "react";
const WithdrawalModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const modals = ["withdraw", "confirm-withdraw"];
  const [activeModal, setActiveModal] = useState(modals[0]);
  return (
    <>
      <Modal
        placement="center"
        size="md"
        isOpen={isOpen}
        onClose={onClose}
        hideCloseButton={true}
        className="rounded-none w-[23rem] md:w-[28rem]"
      >
        <ModalContent className="rounded-[12px] py-2">
          {activeModal === modals[0] && (
            <div className="text-primary-black w-full py-4 flex flex-col px-4 gap-y-8">
              <div className="text-[24px] font-bold">Withdraw</div>
              <div className="self-end" onClick={onClose}>
                <Icons type="cancel" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-[10px] text-secondary">Amount</p>
                <p className="text-[30px] font-bold">#0.00</p>
                <span className="text-[12px] text-[#344054]">
                  Processing fee: #50
                </span>
                <div className="flex text-[10px] justify-center gap-x-2 rounded-[8px] items-center w-[139px] h-[28px] bg-[#F7F9FC]">
                  <Icons type="single-dot" />
                  Balance: #158,000
                </div>
              </div>
              <div className="flex flex-col gap-y-4">
                <p className="text-[#98A2B3] text-[9px]">Bank Account</p>
                <div className="flex items-center w-full justify-between gap-x-4">
                  <div className="flex items-start">
                    <Image
                      src="/assets/access-logo.png"
                      alt="bank logo"
                      width={40}
                      height={40}
                    />
                    <div className="text-[12px] text-secondary">
                      <p>John Doe</p>
                      <span>•••• 9872</span>
                    </div>
                  </div>
                  <div className="border-solid border-[1px] border-borderColor w-[35px] h-[35px] rounded-[125px] flex items-center justify-center">
                    <Icons type="horizontal-dot" />
                  </div>
                </div>
              </div>
              <Button
                clickFunction={() => setActiveModal(modals[1])}
                classNames="bg-main w-full text-center py-2 text-[#ffffff] font-bold text-[16px] rounded-[8px]"
                label="Continue"
              />
            </div>
          )}
          {activeModal === modals[1] && (
            <div className="text-primary-black w-full py-4 flex flex-col px-4 gap-y-8">
              <div className="text-[24px] font-bold">Very Action</div>
              <div
                className="self-end"
                onClick={() => setActiveModal(modals[0])}
              >
                <Icons type="cancel" />
              </div>
              <div className="text-secondary text-[14px] w-9/12">
                Enter the otp code that was sent to the{" "}
                <span className="font-bold">administrator’s</span> email, kindly
                insert
              </div>
              <div className="flex items-center justify-center gap-x-2">
                <input
                  type="number"
                  className="border-solid border-[1px] text-center border-borderColor w-[44px] h-[44px] rounded-[8px]"
                />
                <input
                  type="number"
                  className="border-solid border-[1px] text-center border-borderColor w-[44px] h-[44px] rounded-[8px]"
                />
                <input
                  type="number"
                  className="border-solid border-[1px] text-center border-borderColor w-[44px] h-[44px] rounded-[8px]"
                />
                <input
                  type="number"
                  className="border-solid border-[1px] text-center border-borderColor w-[44px] h-[44px] rounded-[8px]"
                />
              </div>
              <div className="text-secondary flex justify-center text-[12px]">
                Didn’t Receive a code?{" "}
                <span className="text-primary-black font-bold">
                  Resend code in 20s{" "}
                </span>
              </div>
              <Button
                classNames="bg-main w-full text-center py-2 text-[#ffffff] font-bold text-[16px] rounded-[8px]"
                label="Continue"
              />
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default WithdrawalModal;
