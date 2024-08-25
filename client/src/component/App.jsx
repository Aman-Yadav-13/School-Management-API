import AddSchool from "./AddSchool";
import SearchSchool from "./SearchSchool";
import SchoolList from "./SchoolList";

const App = () => {
    return (
        <div>

            <div className="flex justify-center text-8xl mt-11">
                <h1>Choose Your Service</h1>
            </div>
            
            <div className="flex items-center h-[500px] grow mt-14 ">
                <div className="flex w-full flex-col lg:flex-row">
                    <div className="card bg-base-300 rounded-box grid py-5 flex-grow place-items-center"><AddSchool /></div>
                    <div className="divider lg:divider-horizontal">OR</div>
                    <div className="card bg-base-300 rounded-box grid flex-grow place-items-center"><SearchSchool /></div>
                </div>
            </div>

            <hr className="border-dashed"/>

            <div>
                <SchoolList />
            </div>
        </div>
    )
}

export default App;