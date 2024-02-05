function NavButtons() {
  return(
    <div className="flex justify-center gap-x-[5%] w-full">
      <button className={`px-5 py-2 rounded-lg hover:bg-[#1E1E1F]`}>
        Explorer
      </button>

      <button className={`px-5 py-2 rounded-lg hover:bg-[#1E1E1F]`}>
        Incubator
      </button>

      <button className={`px-5 py-2 rounded-lg hover:bg-[#1E1E1F]`}>
        Tools
      </button>

      <button className={`px-5 py-2 rounded-lg hover:bg-[#1E1E1F]`}>
        Early Stage
      </button>
    </div>
  )

}

export default NavButtons;