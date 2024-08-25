import { useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import Modal from "./Modal";
import { validateLatitude, validateLongitude } from "../util/Validation";

const SearchSchool = () => {
    const [longitude, setlongitude] = useState("");
    const [latitude, setlatitude] = useState("");
    const [modal, setmodal] = useState(false);
    const [loading, setloading] = useState(false);
    const [list, setlist] = useState(null);

    async function search(){
        setloading(true);

        try{
            if(validateLatitude(latitude) && validateLongitude(longitude)){
                const response = await axios.get(process.env.REACT_APP_URL+'/listSchools', {params : {
                    latitude : parseFloat(latitude),
                    longitude : parseFloat(longitude)
                }});

                setmodal(true);

                // setmodal(false);
                console.log(response.data.data);
                setlist(response.data.data);
            }else{
                alert("Incorrect location please enter correct coordinates...")
            }
            
        }catch(error){
            alert("Error in fetching school list...")
            console.log(error);
        }
        
        
        setloading(false);
    }

    function getCoordinates(){
        setloading(true);
        try{
            navigator.geolocation.getCurrentPosition(position => {
                setlongitude(position.coords.longitude);
                setlatitude(position.coords.latitude);
                search();
            })
        }catch(error){
            alert("Unable to fetch the coordinated please enter manually")
        }
        setloading(false);
    }

    return (
        <div>
            <div className="flex justify-center">
                <h1>Please enter details to search school : </h1>
            </div>
            <div>
                <label className="input input-bordered flex items-center gap-2 my-3">
                    Longitute :
                    <input onChange={(event) => setlongitude(event.target.value)} type="text" className="grow" placeholder="Enter longitude"/>
                </label>
                <label className="input input-bordered flex items-center gap-2 my-3">
                    Latitute : 
                    <input onChange={(event) => setlatitude(event.target.value)} type="text" className="grow" placeholder="Enter latitude" />
                </label>
            </div>
            <div onClick={search} className="flex justify-center bg-base-content text-black hover:text-white hover:bg-black text-xl mt-5 btn">
                <h1>Search School</h1>
            </div>

            <div className="divider lg:divider-vertical">OR</div>

            <div onClick={getCoordinates} className="flex justify-center bg-base-content text-black hover:text-white hover:bg-black text-xl mt-5 btn">
                <h1>Take Current Position & Search Schools</h1>
            </div>

            {loading ? <Loading /> : ""}

            {modal ? <Modal setmodal={setmodal} list={list}/> : ""}
        </div>
    )
}

export default SearchSchool;