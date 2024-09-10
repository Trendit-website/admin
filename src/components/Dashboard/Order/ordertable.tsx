import Icons from "@/components/Shared/Icons";
import Link from "next/link";

const Ordertable = () => {
  const pages = [1, 2, 3, 4, 5, 6, 6];
  return (
    <div className="text-primary-black w-full px-4">
      <div className="bg-[#FFFFFF] flex flex-col gap-y-4 py-6 text-[12px] w-full border-[1px] border-solid border-primary-border rounded-[12px]">
        <table className="w-full flex flex-col gap-y-2">
          <thead className="w-full bg-[#F5F5F5] py-2 px-4 rounded-tr-[12px] rounded-tl-[12px]">
            <tr className="flex items-center justify-between">
              <td className="flex items-center gap-x-2">
                <Icons type="checkbox" />
                Tasks
              </td>
              <div className="flex items-center gap-x-16">
                <td className="text-[#475467]">Type</td>
                <td className="text-[#475467]">Amount paid</td>
                <td className="flex items-center gap-x-[2px]">
                  Date created <Icons type="arrow-down" />
                </td>
                <td className="text-[#475467] mr-2">Status</td>
              </div>
            </tr>
          </thead>
          <tbody className="flex flex-col gap-y-4 px-2">
            <Link href="/orders/dgvhfvh">
              <tr className="flex items-center justify-between border-b-[1px] border-solid border-borderColor py-2">
                <div className="flex items-center gap-x-2">
                  <td>
                    <Icons type="facebook" width={20} height={20} />
                  </td>
                  <td>
                    <div>
                      <p className="text-[14px] text-[#101828]">
                        Post adverts on your Facebook page
                      </p>
                      <span>
                        Post adverts of various businesses and top brands on
                        your Facebook Page and earn ₦110 per advert past.
                      </span>
                    </div>
                  </td>
                </div>
                <div className="flex items-center gap-x-14">
                  <td>Engagement</td>
                  <td className="mr-6">#11,0000</td>
                  <td>Jan 13, 2024</td>
                  <td className="w-[69px] h-[22px] flex items-center justify-center rounded-[6px] border-solid border-[1px] border-borderColor px-[6px] py-[2px]">
                    Pending
                  </td>
                </div>
              </tr>
            </Link>
            <tr className="flex items-center justify-between border-b-[1px] border-solid border-borderColor py-2">
              <div className="flex items-center gap-x-2">
                <td>
                  <Icons type="facebook" width={20} height={20} />
                </td>
                <td>
                  <div>
                    <p className="text-[14px] text-[#101828]">
                      Post adverts on your Facebook page
                    </p>
                    <span>
                      Post adverts of various businesses and top brands on your
                      Facebook Page and earn ₦110 per advert past.
                    </span>
                  </div>
                </td>
              </div>
              <div className="flex items-center gap-x-14">
                <td>Engagement</td>
                <td className="mr-6">#11,0000</td>
                <td>Jan 13, 2024</td>
                <td className="w-[69px] h-[22px] flex items-center justify-center rounded-[6px] border-solid border-[1px] border-borderColor px-[6px] py-[2px]">
                  Pending
                </td>
              </div>
            </tr>
            <tr className="flex items-center justify-between border-b-[1px] border-solid border-borderColor py-2">
              <div className="flex items-center gap-x-2">
                <td>
                  <Icons type="facebook" width={20} height={20} />
                </td>
                <td>
                  <div>
                    <p className="text-[14px] text-[#101828]">
                      Post adverts on your Facebook page
                    </p>
                    <span>
                      Post adverts of various businesses and top brands on your
                      Facebook Page and earn ₦110 per advert past.
                    </span>
                  </div>
                </td>
              </div>
              <div className="flex items-center gap-x-14">
                <td>Engagement</td>
                <td className="mr-6">#11,0000</td>
                <td>Jan 13, 2024</td>
                <td className="w-[69px] h-[22px] flex items-center justify-center rounded-[6px] border-solid border-[1px] border-borderColor px-[6px] py-[2px]">
                  Pending
                </td>
              </div>
            </tr>
            <tr className="flex items-center justify-between border-b-[1px] border-solid border-borderColor py-2">
              <div className="flex items-center gap-x-2">
                <td>
                  <Icons type="facebook" width={20} height={20} />
                </td>
                <td>
                  <div>
                    <p className="text-[14px] text-[#101828]">
                      Post adverts on your Facebook page
                    </p>
                    <span>
                      Post adverts of various businesses and top brands on your
                      Facebook Page and earn ₦110 per advert past.
                    </span>
                  </div>
                </td>
              </div>
              <div className="flex items-center gap-x-14">
                <td>Engagement</td>
                <td className="mr-6">#11,0000</td>
                <td>Jan 13, 2024</td>
                <td className="w-[69px] h-[22px] flex items-center justify-center rounded-[6px] border-solid border-[1px] border-borderColor px-[6px] py-[2px]">
                  Pending
                </td>
              </div>
            </tr>
            <tr className="flex items-center justify-between border-b-[1px] border-solid border-borderColor py-2">
              <div className="flex items-center gap-x-2">
                <td>
                  <Icons type="facebook" width={20} height={20} />
                </td>
                <td>
                  <div>
                    <p className="text-[14px] text-[#101828]">
                      Post adverts on your Facebook page
                    </p>
                    <span>
                      Post adverts of various businesses and top brands on your
                      Facebook Page and earn ₦110 per advert past.
                    </span>
                  </div>
                </td>
              </div>
              <div className="flex items-center gap-x-14">
                <td>Engagement</td>
                <td className="mr-6">#11,0000</td>
                <td>Jan 13, 2024</td>
                <td className="w-[69px] h-[22px] flex items-center justify-center rounded-[6px] border-solid border-[1px] border-borderColor px-[6px] py-[2px]">
                  Pending
                </td>
              </div>
            </tr>
            <tr className="flex items-center justify-between border-b-[1px] border-solid border-borderColor py-2">
              <div className="flex items-center gap-x-2">
                <td>
                  <Icons type="facebook" width={20} height={20} />
                </td>
                <td>
                  <div>
                    <p className="text-[14px] text-[#101828]">
                      Post adverts on your Facebook page
                    </p>
                    <span>
                      Post adverts of various businesses and top brands on your
                      Facebook Page and earn ₦110 per advert past.
                    </span>
                  </div>
                </td>
              </div>
              <div className="flex items-center gap-x-14">
                <td>Engagement</td>
                <td className="mr-6">#11,0000</td>
                <td>Jan 13, 2024</td>
                <td className="w-[69px] h-[22px] flex items-center justify-center rounded-[6px] border-solid border-[1px] border-borderColor px-[6px] py-[2px]">
                  Pending
                </td>
              </div>
            </tr>
            <tr className="flex items-center justify-between border-b-[1px] border-solid border-borderColor py-2">
              <div className="flex items-center gap-x-2">
                <td>
                  <Icons type="facebook" width={20} height={20} />
                </td>
                <td>
                  <div>
                    <p className="text-[14px] text-[#101828]">
                      Post adverts on your Facebook page
                    </p>
                    <span>
                      Post adverts of various businesses and top brands on your
                      Facebook Page and earn ₦110 per advert past.
                    </span>
                  </div>
                </td>
              </div>
              <div className="flex items-center gap-x-14">
                <td>Engagement</td>
                <td className="mr-6">#11,0000</td>
                <td>Jan 13, 2024</td>
                <td className="w-[69px] h-[22px] flex items-center justify-center rounded-[6px] border-solid border-[1px] border-borderColor px-[6px] py-[2px]">
                  Pending
                </td>
              </div>
            </tr>
          </tbody>
        </table>
        <div className="flex w-full items-center justify-between px-4">
          <div className="flex items-center gap-x-[6px] px-2 py-2 rounded-[8px] border-solid border-[1px] border-borderColor">
            <Icons type="prev" />
            Previous
          </div>
          <div className="flex items-center gap-x-4">
            {pages.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
          <div className="flex items-center gap-x-[6px] px-2 py-2 rounded-[8px] border-solid border-[1px] border-borderColor">
            Next
            <Icons type="next" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Ordertable;
