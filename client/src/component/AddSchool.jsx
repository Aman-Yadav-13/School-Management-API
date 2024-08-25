import { useState } from "react";
import axios from 'axios';
import { validateAddress, validateLatitude, validateLongitude, validateName } from "../util/Validation";
import Loading from "./Loading";

const AddSchool = () => {
    const [name, setname] = useState("");
    const [address, setaddress] = useState("");
    const [latitude, setlatitude] = useState("");
    const [longitude, setlongitude] = useState("");
    const [loading, setloading] = useState(false);

    async function add(){
        setloading(true);
        try{
            console.log(name, address, latitude, longitude);
            if(validateName(name) && validateAddress(address) && validateLatitude(latitude) && validateLongitude(longitude)){
                const response = await axios.post(`${process.env.REACT_APP_URL}/addSchool`, {
                    name : name.trim().replace(/\s+/g, ' '), 
                    address : address.trim().replace(/\s+/g, ' '), 
                    latitude : parseFloat(latitude), 
                    longitude : parseFloat(longitude)
                })
                alert('School added successfully...')
            }else{
                alert("Please enter details correctly");
            }
        }catch(error){
            alert('Unable to add school please try again after sometime');
        }
        setloading(false);
    }

    return (
        <div>
            <div className="flex justify-center">
                <h1>Please enter details to add school :</h1>
            </div>
            <div>
                <label className="input input-bordered flex items-center gap-2 my-3">
                    Name :
                    <input onChange={(event) => setname(event.target.value)} type="text" className="grow" placeholder="Enter school name" />
                </label>
                <label className="input input-bordered flex items-center gap-2 my-3">
                    Address :
                    <input onChange={(event) => setaddress(event.target.value)} type="text" className="grow" placeholder="Enter street address" />
                </label>
                <label className="input input-bordered flex items-center gap-2 my-3">
                    Longitute :
                    <input onChange={(event) => setlongitude(event.target.value)} type="text" className="grow" placeholder="Enter longitude" />
                </label>
                <label className="input input-bordered flex items-center gap-2 my-3">
                    Latitute : 
                    <input onChange={(event) => setlatitude(event.target.value)} type="text" className="grow" placeholder="Enter latitude" />
                </label>
            </div>
            <div onClick={add} className="flex justify-center bg-base-content text-black hover:text-white hover:bg-black text-xl mt-5 btn">
                <h1>Add School</h1>
            </div>

            {loading ? <Loading /> : ""}
        </div>
    )
}

export default AddSchool;