const Modal = (props) => {
    console.log("modal")
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto w-[900px]">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">List of Schools according to proximity</h2>
                    <button className="text-gray-600 hover:text-gray-800" onClick={() => props.setmodal(false)}>
                        &times;
                    </button>
                </div>

                <div className="mt-4">
                    {props.list.map((data) => {
                            return <p className="text-gray-700" key={data.id}>{`${data.name}`}</p>
                        })}
                </div>
            </div>
        </div>
    )
}

export default Modal;