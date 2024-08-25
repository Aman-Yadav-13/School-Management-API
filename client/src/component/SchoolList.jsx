import { useEffect, useState } from "react";
import axios from "axios";

const SchoolList = () => {
    const [list, setlist] = useState(null);

    useEffect(() => {
        async function getList() {
            try{
                const response = await axios.get(`${process.env.REACT_APP_URL}/allSchool`);

                console.log(response.data.data);
                setlist(response.data.data);
            }catch(error){
                console.log('Error occured : ', error);
            }
        }

        getList();
    }, []);
    
    return (
        <div>
            <div className="flex justify-center my-11 text-3xl font-semibold">
                <h1>School List</h1>
            </div>

            <div className="overflow-x-auto border-black m-1 border-4">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Latitue</th>
                        <th>Longitude</th>
                    </tr>
                </thead>
                <tbody>
                    {list ? list.map((data) => {
                        return (
                            <tr key={data.id}>
                                <th>{data.id}</th>
                                <td>{data.name}</td>
                                <td>{data.address}</td>
                                <td>{data.latitude}</td>
                                <td>{data.longitude}</td>
                            </tr>
                        )
                    }) :
                    <>
                    <tr className="hover">
                        <th className="skeleton"></th>
                        <td className="skeleton"></td>
                        <td className="skeleton"></td>
                        <td className="skeleton"></td>
                        <td className="skeleton"></td>
                    </tr>
                    <tr className="hover">
                        <th className="skeleton"></th>
                        <td className="skeleton"></td>
                        <td className="skeleton"></td>
                        <td className="skeleton"></td>
                        <td className="skeleton"></td>
                    </tr>
                    <tr className="hover">
                        <th className="skeleton"></th>
                        <td className="skeleton"></td>
                        <td className="skeleton"></td>
                        <td className="skeleton"></td>
                        <td className="skeleton"></td>
                    </tr></> }
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default SchoolList;