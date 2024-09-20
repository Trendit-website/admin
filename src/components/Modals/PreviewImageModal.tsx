import Icons from "../Shared/Icons";
import DefaultModal from "./modal";
import Image from "next/image";
const PreviewImageModal = ({
  isOpen,
  onClose,
  src,
}: {
  isOpen: boolean;
  onClose: () => void;
  src: string;
}) => {
  return (
    <DefaultModal isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center justify-center">
        {src === "" && <Icons type="loader" />}
        {src && (
          <Image
            alt="media"
            src={src}
            width={400}
            height={400}
            className="w-fit h-fit"
          />
        )}
      </div>
    </DefaultModal>
  );
};
export default PreviewImageModal;
