import moment from 'moment';
import menu from "../assets/menu.png"
import close from "../assets/close.png";
import referesh from "../assets/refresh.png";
import { LineChart, Line, CartesianGrid, YAxis, XAxis, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts';
import { useEffect, useState } from "react";
import FetchUniversityInfo from '../../api/analytics'
export default function Dashboard() {
    const [UniversityData,setUniversityData]=useState();
    const [isShow, setisShow] = useState(false);
    const [FromDate, setFromDate] = useState();
    const [ToDate, setToDate] = useState();
    const [trends, settrends] = useState();
    const chartWidth = window.innerWidth < 600 ? 380 : 485;


    function fetchdata()
    {
        FetchUniversityInfo().then((res)=>{
            setUniversityData(res)
            settrends(res?.trends);
        })
    }
    console.log(UniversityData);
    useEffect(() => {
        fetchdata();
    }, [])

    useEffect(() => {
        if (FromDate || ToDate) {
            const From = FromDate ? moment(FromDate).format('DD-MM-YYYY') : null;
            const To = ToDate ? moment(ToDate).format('DD-MM-YYYY') : null;

            let filterTrend = UniversityData?.trends.filter((ele) => {
                let date = ele.date;
                if (From && !To) {
                    return moment(date).isSameOrAfter(From)
                }
                if (!From && To) {
                    return moment(date).isSameOrBefore(To)
                }
                if (From && To) {
                    return moment(date).isSameOrAfter(From) && moment(date).isSameOrBefore(To)
                }
                return true;
            });
            settrends(filterTrend);
        }
        else {
            settrends(UniversityData?.trends);
        }
    }, [FromDate, ToDate])

    return (
        <>
            <div className="grid md:grid-cols-12 grid-cols-1 min-h-dvh overflow-hidden">
                <div className="col-span-2 bg-gray-500 text-white md:block hidden">
                    <div className="font-semibold mt-5 text-center text-4xl">Dashboard</div>
                    <div className="grid grid-cols-1 text-center mt-10 text-2xl gap-y-10 cursor-pointer">
                        <div className="hover:font-semibold hover:text-3xl">Item1</div>
                        <div className="hover:font-semibold hover:text-3xl">Item2</div>
                        <div className="hover:font-semibold hover:text-3xl">Item3</div>
                        <div className="hover:font-semibold hover:text-3xl">Item4</div>
                        <div className="hover:font-semibold hover:text-3xl">Item5</div>
                    </div>
                    <div className="text-2xl hover:font-semibold hover:text relative size-32 cursor-pointer"><div className="absolute inset-x-10 bottom-0 flex gap-2" onClick={()=>fetchdata()}><img src={referesh} />Referesh</div></div>
                </div>
                <div className="md:hidden flex justify-between">
                    <div className="font-semibold text-center text-2xl">Dashboard</div>
                    <div onClick={() => setisShow(!isShow)}>
                        {
                            isShow ? (
                                <img src={close} alt="close" className="h-8 w-8" />
                            ) : (
                                <img src={menu} alt="menu" className="h-8 w-8" />
                            )
                        }
                    </div>
                    {isShow && (
                        <>
                            <header className="fixed z-10 bg-black bg-opacity-[.35] inset-0 mt-8">
                                <div className="grid grid-cols-1 gap-5 justify-between p-5 bg-black bg-opacity-[.35] text-white absolute mb-10 w-full ">
                                    <div className="hover:bg-black hover:bg-opacity-[.50] rounded-md px-5 py-2">Item1</div>
                                    <div className="hover:bg-black hover:bg-opacity-[.50] rounded-md px-5 py-2">Item2</div>
                                    <div className="hover:bg-black hover:bg-opacity-[.50] rounded-md px-5 py-2">Item3</div>
                                    <div className="hover:bg-black hover:bg-opacity-[.50] rounded-md px-5 py-2">Item4</div>
                                </div>
                            </header>
                        </>
                    )}
                </div>
                <div className="min-w-screen grid md:grid-cols-2 grid-cols-1">
                    <div className="grid md:grid-cols-3 grid-cols-1 col-span-2 gap-10 md:ml-20 md:ml-24 ml-4 md:mr-34 mr-20 mt-5">
                        {
                            UniversityData?.cardData.length>0 ? UniversityData?.cardData.map((ele)=>(<>
                                <div className={`shadow-md md:w-60 w-sm h-50 text-center rounded-md text-white ${ele?.total > 1000 ? 'bg-red-500' : UniversityData?.total > 500 ? 'bg-orange-500' : 'bg-blue-500'}`}>
                                    <div className="text-left ml-3 mt-4 text-2xl font-semibold">{ele.name}</div>
                                    <div className="flex items-center justify-center h-[140px] text-xl font-bold">
                                        {ele?.total}
                                    </div>
                                </div>
                            </>)):''
                        }
                    </div>
                    <div className="grid md:grid-cols-2 grid-cols-1 col-span-2 gap-10 md:ml-20 ml-4 md:mr-52 mt-5 mb-5">
                        <div className="shadow-lg md:w-5/6 w-sm h-full text-center rounded-md">
                            <div className="font-semibold text-2xl">Bar Chart</div>
                            <div className="mt-18">
                                <BarChart width={chartWidth} height={330} data={UniversityData?.perProgram}>
                                    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                                    <XAxis dataKey="program" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="applicants" fill="#8884d8" />
                                </BarChart>
                            </div>
                        </div>
                        <div className="shadow-lg md:w-5/6 w-sm h-full text-center rounded-md">
                            <div className="font-semibold text-2xl">Application Trends</div>
                            <div className="grid grid-cols-2 gap-2 ml-4 mt-5">
                                <div className="text-2xl font-semibold text-left">From</div>
                                <input id="datepicker" className=" shadow-lg rounded px-3 py-2 w-40 md:w-56" type="date" placeholder="Select a From date" onChange={(e) => (setFromDate(e.target.value))} />
                                <div className="text-2xl font-semibold text-left">To</div>
                                <input id="datepicker" className="shadow-lg rounded px-3 py-2 w-40 md:w-56" type="date" placeholder="Select a To date" onChange={(e) => (setToDate(e.target.value))} />
                            </div>
                            <div className="mt-5">
                                <LineChart width={chartWidth} height={300} data={trends}>
                                    <Line type="monotone" dataKey="count" stroke="#8884d8" />
                                    <CartesianGrid stroke="#ccc" strokeDasharray="10 10" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                </LineChart>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}