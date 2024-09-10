import { useState } from "react"
import Icons from "../Shared/Icons"
import AdvertTask from "./TaskTables/AdvertTask"
import EngageTask from "./TaskTables/EngageTask"
import PostAdvert from "./TaskTables/PostAdvert"
import EngageAdvert from "./TaskTables/EngageAdvert"

const Task = () => {
    const Tabs = ['Advert tasks', 'Engagement tasks', 'Post Adverts', 'Engagement Adverts']
    const [activeTab, setActiveTab] = useState(Tabs[0])
    return (
        <div>
            <div className="flex flex-col text-primary-black gap-y-8 py-6">
                <div className="flex items-center justify-between w-10/12 m-auto">
                    <h1 className="flex flex-col text-[30px] font-bold">
                        Tasks
                        <span className="text-[#667185] text-[14px]">Check and filter all your medical appointments here</span>
                    </h1>
                    <div className="flex items-center justify-around bg-main text-[#FFFFFF] w-[117px] h-[36px] py-[2px] px-[6px] rounded-[6px]">
                        Create
                        <Icons type="plus" />
                    </div>
                </div>
                <div className={`flex items-center w-10/12 gap-x-12 px-28`}>
                    {Tabs.map((tab, index) => (
                        <p key={index} onClick={() => setActiveTab(tab)} className={`pb-2 ${activeTab === tab ? 'text-main border-main border-b-[1px] border-solid' : 'text-secondary'}`}>
                            {tab}
                        </p>
                    ))}
                </div>
                {
                    activeTab === Tabs[0] && (
                        <AdvertTask activeTab={Tabs[0]}/>
                    )
                }
                {
                    activeTab === Tabs[1] && (
                        <EngageTask activeTab={Tabs[1]}/>
                    )
                }
                {
                    activeTab === Tabs[2] && (
                        <PostAdvert activeTab={Tabs[2]}/>
                    )
                }
                {
                    activeTab === Tabs[3] && (
                        <EngageAdvert activeTab={Tabs[3]}/>
                    )
                }
            </div>
        </div>
    )
}
export default Task