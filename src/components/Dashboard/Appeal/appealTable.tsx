import Icons from "../../Shared/Icons";
import Link from "next/link";
import Image from "next/image";
const AppealTable = () => {
  const pages = [1, 2, 3, 4, 5, 6, 6];
  return (
    <div className="text-primary-black w-full px-4">
      <div className="bg-[#FFFFFF] text-[12px] w-full border-[1px] border-solid border-primary-border rounded-[12px]">
        <table className="w-full flex flex-col gap-y-2">
          <thead className="w-full bg-[#F5F5F5] py-2 px-4 rounded-tr-[12px] rounded-tl-[12px]">
            <tr className="flex items-center justify-between">
              <div className="flex items-center gap-x-36">
                <td className="flex items-center gap-x-2">
                  <Icons type="checkbox" />
                  Name
                </td>
                <td className="flex items-center gap-x-2">Tasks</td>
              </div>
              <div className="flex items-center gap-x-14">
                <td className="text-[#475467]">Type</td>
                <td className="text-[#475467]">Amount to earn</td>
                <td className="text-[#475467]">Status</td>
                <td className="flex items-center gap-x-[2px]">Last login</td>
              </div>
            </tr>
          </thead>
          <tbody className="flex flex-col gap-y-4 px-2">
            <Link href="/appeal-request/dhgdhfb">
              <tr className="flex items-center justify-between border-solid border-b-[1px] border-primary-border">
                <div className="flex items-center gap-x-20 py-4">
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
                <div className="flex items-center gap-x-12">
                  <td>Advertisement</td>
                  <td className="">#11,0000</td>
                  <td className="w-[69px] -mr-4 h-[22px] flex items-center justify-center rounded-[6px] border-solid border-[1px] border-borderColor px-[6px] py-[2px]">
                    Pending
                  </td>
                  <td>Jan 13, 2024</td>
                </div>
              </tr>
            </Link>
            <Link href="/appeal-request/dhgdhfb">
              <tr className="flex items-center justify-between border-solid border-b-[1px] border-primary-border">
                <div className="flex items-center gap-x-20 py-4">
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
                <div className="flex items-center gap-x-12">
                  <td>Advertisement</td>
                  <td className="">#11,0000</td>
                  <td className="w-[69px] -mr-4 h-[22px] flex items-center justify-center rounded-[6px] border-solid border-[1px] border-borderColor px-[6px] py-[2px]">
                    Pending
                  </td>
                  <td>Jan 13, 2024</td>
                </div>
              </tr>
            </Link>
            <Link href="/appeal-request/dhgdhfb">
              <tr className="flex items-center justify-between border-solid border-b-[1px] border-primary-border">
                <div className="flex items-center gap-x-20 py-4">
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
                <div className="flex items-center gap-x-12">
                  <td>Advertisement</td>
                  <td className="">#11,0000</td>
                  <td className="w-[69px] -mr-4 h-[22px] flex items-center justify-center rounded-[6px] border-solid border-[1px] border-borderColor px-[6px] py-[2px]">
                    Pending
                  </td>
                  <td>Jan 13, 2024</td>
                </div>
              </tr>
            </Link>
            <tr className="flex items-center justify-between border-solid border-b-[1px] border-primary-border">
              <div className="flex items-center gap-x-20 py-4">
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
              <div className="flex items-center gap-x-12">
                <td>Advertisement</td>
                <td className="">#11,0000</td>
                <td className="w-[69px] -mr-4 h-[22px] flex items-center justify-center rounded-[6px] border-solid border-[1px] border-borderColor px-[6px] py-[2px]">
                  Pending
                </td>
                <td>Jan 13, 2024</td>
              </div>
            </tr>
            <tr className="flex items-center justify-between border-solid border-b-[1px] border-primary-border">
              <div className="flex items-center gap-x-20 py-4">
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
              <div className="flex items-center gap-x-12">
                <td>Advertisement</td>
                <td className="">#11,0000</td>
                <td className="w-[69px] -mr-4 h-[22px] flex items-center justify-center rounded-[6px] border-solid border-[1px] border-borderColor px-[6px] py-[2px]">
                  Pending
                </td>
                <td>Jan 13, 2024</td>
              </div>
            </tr>
            <tr className="flex items-center justify-between border-solid border-b-[1px] border-primary-border">
              <div className="flex items-center gap-x-20 py-4">
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
              <div className="flex items-center gap-x-12">
                <td>Advertisement</td>
                <td className="">#11,0000</td>
                <td className="w-[69px] -mr-4 h-[22px] flex items-center justify-center rounded-[6px] border-solid border-[1px] border-borderColor px-[6px] py-[2px]">
                  Pending
                </td>
                <td>Jan 13, 2024</td>
              </div>
            </tr>
          </tbody>
        </table>
        <div className="flex w-full items-center justify-between px-4 py-2">
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
export default AppealTable;
