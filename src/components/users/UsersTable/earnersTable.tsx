import Icons from "../../Shared/Icons";
import Image from "next/image";
import Link from "next/link";
import { UseGetAllEarners } from "../../../api/useGetUsers";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../Shared/InputField";
import { FilterUserEmail } from "../../../api/useGetUsers";
const EarnersTable = () => {
  const [activePage, setActivePage] = useState(1);
  const { allEarners, isLoading, isError } = UseGetAllEarners(activePage);
  const pages = Array.from({ length: allEarners?.pages ?? 1 }, (_, i) => i + 1);
  const form = useForm();
  const { watch, register } = form;
  const searchParam = watch("searchValue");
  const [searchData, setSearchData] = useState<string | undefined>();
  const { user, isLoadingUser, isErrorUser } = FilterUserEmail(searchData);
  useEffect(() => {
    if (searchParam) {
      setSearchData(searchParam);
    } else if (searchParam === "") {
      setSearchData(undefined);
    }
  }, [searchParam, searchData]);
  const NextPage = () => {
    if (allEarners?.pages) {
      activePage !== allEarners?.pages
        ? setActivePage((prevPage) => prevPage + 1)
        : "";
    }
  };
  const PrevPage = () => {
    if (allEarners?.pages) {
      activePage === 1 ? "" : setActivePage((prevPage) => prevPage - 1);
    }
  };
  const showSpecificPage = (page: number) => {
    setActivePage(page);
  };
  return (
    <div className="text-primary-black w-full px-4">
      {isLoading && !isError && (
        <div className="w-full h-screen py-8 flex justify-center">
          <Icons type="loader" />
        </div>
      )}
      {isError && (
        <div className="w-full py-8 h-screen text-red-500 flex justify-center">
          {isError?.response?.data?.message ||
            " An error occured try again later"}
        </div>
      )}
      {allEarners && (
        <div className="bg-[#FFFFFF] text-[12px] w-11/12 m-auto border-[1px] border-solid border-primary-border rounded-[12px]">
          <>
            <div className="flex items-center justify-between w-full px-6 py-4">
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center gap-x-4">
                  <h3 className="text-[18px] text-primary-black text-semibold">
                    All Earners
                  </h3>
                  <div className="flex items-center justify-center w-[45px] h-[21px] px-4 text-[12px] text-[#344054] border-[1px] rounded-[6px] border-solid border-borderColor">
                    {allEarners?.total}
                  </div>
                </div>
                <span>
                  Manage your team members and their account permissions here.
                </span>
              </div>
              <InputField
                register={register("searchValue")}
                type="search"
                placeholder="Enter User's Email"
                classNames="w-full rounded-[8px] py-[10px] pl-[10px] border-solid border-[#DOD5DD] border-[1px] focus:outline-main"
                containerStyle="w-[300px] ml-32"
              />
              <div>
                <Icons type="vertical-dot" />
              </div>
            </div>
            {searchParam && (
              <div className="w-10/12 flex items-center justify-end -mt-2">
                <div className="bg-[#FFFFFF] flex flex-col rounded-[8px] border-[1px] border-borderColor border-solid h-[200px] w-[300px] z-10 -mb-48">
                  {user?.users?.length > 0 &&
                    user?.users?.map((user, index) => (
                      <Link
                        href={`/users/${user?.id}`}
                        className="flex cursor-pointer items-center px-2 gap-x-4 w-full py-2 border-solid border-b-[1px] border-borderColor"
                        key={index}
                      >
                        <Image
                          src={user?.profile_picture || "/assets/avatar.png"}
                          width={40}
                          height={40}
                          className="rounded-[200px] w-[40px] h-[40px]"
                          alt="avatar"
                        />
                        <div className="flex flex-col gap-y-[2px]">
                          <p>{user?.full_name}</p>
                          <span>
                            {user?.email}{" "}
                            <b className="text-[10px]">({user?.username})</b>
                          </span>
                        </div>
                      </Link>
                    ))}
                  {user?.users?.length <= 0 && (
                    <div className="flex w-full text-red-500 justify-center py-2">
                      User does not exist
                    </div>
                  )}
                  {isErrorUser && (
                    <div className="flex w-full text-red-500 justify-center py-2">
                      {isError?.response?.data?.message ||
                        " An error occured try again later"}
                    </div>
                  )}
                  {isLoadingUser && !isError && (
                    <div className="w-full py-8 flex justify-center">
                      <Icons type="loader" />
                    </div>
                  )}
                </div>
              </div>
            )}
            <table className="w-full flex flex-col">
              <thead className="w-full bg-[#F5F5F5] py-2 px-8 rounded-tr-[12px] rounded-tl-[12px]">
                <tr className="flex items-center">
                  <td className="flex items-center w-7/12">
                    <div className="flex items-center gap-x-3">
                      <Icons type="checkbox" />
                      Name
                    </div>
                  </td>
                  <td className="w-5/12">
                    <div>Email Address</div>
                  </td>
                  <td className="flex items-center w-3/12">
                    <div>Phone Number</div>
                  </td>
                  <td className="w-3/12">
                    <div>Total Referred</div>
                  </td>
                  <td className="w-3/12">
                    <div>Last Login</div>
                  </td>
                </tr>
              </thead>
              <tbody className="flex flex-col gap-y-2 text-secondary text-[12px]">
                {allEarners?.users.map((user, index) => (
                  <tr
                    key={index}
                    className="flex items-center px-8 py-2 border-b-[1px] pb-2 border-solid border-borderColor"
                  >
                    <td className="flex items-center gap-x-2 w-7/12">
                      <Link
                        href={`/users/${user?.id}`}
                        className="flex items-center gap-x-2"
                      >
                        <Icons type="checkbox" />
                        <div className="flex items-center gap-x-2">
                          <Image
                            src={user?.profile_picture || "/assets/avatar.png"}
                            width={40}
                            height={40}
                            className="rounded-[200px] w-[40px] h-[40px]"
                            alt="avatar"
                          />
                          <div className="flex flex-col gap-y-[2px]">
                            <p>{user?.full_name}</p>
                            <span>{user?.username}</span>
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="w-5/12">{user?.email}</td>
                    <td className="w-3/12">{user?.phone}</td>
                    <td className="w-3/12">1,234</td>
                    <td className="w-3/12">Jan 6, 2024 11:59pm</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex w-full items-center justify-between px-4 py-4">
              <div
                onClick={() => PrevPage()}
                className="flex items-center gap-x-[6px] cursor-pointer px-2 py-2 rounded-[8px] border-solid border-[1px] border-borderColor"
              >
                <Icons type="prev" />
                Previous
              </div>
              <div className="flex items-center cursor-pointer gap-x-4">
                {pages.map((page, index) => (
                  <p
                    onClick={() => showSpecificPage(page)}
                    key={index}
                    className={
                      activePage === page
                        ? "text-main h-[20px] w-[20px] rounded-[8px] flex items-center justify-center font-bold border-[1px] border-solid border-main"
                        : ""
                    }
                  >
                    {page}
                  </p>
                ))}
              </div>
              <div
                onClick={() => NextPage()}
                className="flex items-center gap-x-[6px] cursor-pointer px-2 py-2 rounded-[8px] border-solid border-[1px] border-borderColor"
              >
                Next
                <Icons type="next" />
              </div>
            </div>
          </>
        </div>
      )}
    </div>
  );
};
export default EarnersTable;
