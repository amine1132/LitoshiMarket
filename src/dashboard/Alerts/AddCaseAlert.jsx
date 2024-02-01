function AddCaseAlert({SecondColor}) {
    return(
        <div className="flex mt-3 mb-5 justify-center">
            <div className={`flex flex-col justify-center bg-[${SecondColor}] rounded-2xl w-[92%] h-[150px] `}>
                <button>
                    <h1 className="text-6xl text-gray-600 text-center">+</h1>
                    <p className="text-gray-600 text-center">Add an alert</p>
                </button>
            </div>
        </div>
    )
}

export default AddCaseAlert;