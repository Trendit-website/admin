import Icons from "@/components/Shared/Icons";
import Image from "next/image";
import Link from "next/link";
import { useGetSocialLinkRequest } from "@/api/useGetSocialLinkRequest";
const RequestTable = () => {
  const pages = [1, 2, 3, 4, 5, 6, 6];
  const { socialRequest, isLoading, isError } = useGetSocialLinkRequest();
  console.log(socialRequest?.social_profiles);
  return (
    <div className="text-primary-black w-full px-4">
      <div className="bg-[#FFFFFF] flex flex-col gap-y-4 py-4 text-[12px] w-full border-[1px] border-solid border-primary-border rounded-[12px]">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="text-primary-black flex flex-col gap-y-2">
            <div className="flex items-center gap-x-4 text-[18px] text-[#101828]">
              Social Link Request
              <p className="text-[#344054] font-bold text-[12px] border-[1px] border-solid border-[#D0D5DD] rounded-[6px] flex items-center px-[6px] py-[1px]">
                {socialRequest?.total}
              </p>
            </div>
            <span className="text-[14px] text-[#475467]">
              Manage your team members and their account permissions here.
            </span>
          </div>
          <span>
            <Icons type="vertical-dot" />
          </span>
        </div>
        <table className="w-full flex flex-col gap-y-2">
          <thead className="w-full bg-[#F5F5F5] py-2 px-4 rounded-tr-[12px] rounded-tl-[12px]">
            <tr className="flex items-center justify-between">
              <div className="flex items-center gap-x-36">
                <td className="flex items-center gap-x-2">
                  <Icons type="checkbox" />
                  Name
                  <Icons type="arrow-down" />
                </td>
                <td className="flex items-center gap-x-2">Links</td>
              </div>
              <div className="flex items-center justify-start gap-x-36">
                <td className="flex items-center gap-x-[2px]">Date created </td>
                <div className="mr-12">
                  <td className="text-[#475467]">Action</td>
                </div>
              </div>
            </tr>
          </thead>
          <tbody className="flex flex-col gap-y-4 w-full">
            <Link href="/users/dvdhhjf">
              <tr className="flex items-center justify-between border-solid border-b-[1px] px-4 border-primary-border">
                <div className="flex items-center gap-x-24 py-4">
                  <td>
                    <div className="flex items-center gap-x-2">
                      <Icons type="checkbox" />
                      <div className="flex items-center gap-x-2">
                        <Image
                          src="/assets/avatar.png"
                          alt="avatar"
                          width={40}
                          height={40}
                        />
                        <div>
                          <p>Olivia Rhye</p>
                          <span>@olivia</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-start gap-x-2">
                      <Icons type="facebook" width={20} height={20} />
                      <div className="flex flex-col">
                        <p>Facebook</p>
                        <Link href="facebook.com">
                          http://facebook.com/stephen.oyeshola.1/?_rdr
                        </Link>
                      </div>
                    </div>
                  </td>
                </div>
                <div className="flex items-center gap-x-32 ml-6">
                  <td>Jan 6, 2024 11:59pm</td>
                  <div className="flex items-center gap-x-2">
                    <td>Decline</td>
                    <td className="text-main font-bold">Approve</td>
                  </div>
                </div>
              </tr>
            </Link>
            {socialRequest?.social_profiles?.map((profiles, index) => (
              <tr className="flex items-center justify-between border-solid border-b-[1px] px-4 border-primary-border">
                <div className="flex items-center gap-x-24 py-4">
                  <td>
                    <div className="flex items-center gap-x-2">
                      <Icons type="checkbox" />
                      <div className="flex items-center gap-x-2">
                        <Image
                          src="/assets/avatar.png"
                          alt="avatar"
                          width={40}
                          height={40}
                        />
                        <div>
                          <p>Olivia Rhye</p>
                          <span>@olivia</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-start gap-x-2">
                      <Icons type="facebook" width={20} height={20} />
                      <div className="flex flex-col">
                        <p>Facebook</p>
                        <Link href="facebook.com">
                          http://facebook.com/stephen.oyeshola.1/?_rdr
                        </Link>
                      </div>
                    </div>
                  </td>
                </div>
                <div className="flex items-center gap-x-32 ml-6">
                  <td>Jan 6, 2024 11:59pm</td>
                  <div className="flex items-center gap-x-2">
                    <td>Decline</td>
                    <td className="text-main font-bold">Approve</td>
                  </div>
                </div>
              </tr>
            ))}
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
export default RequestTable;
