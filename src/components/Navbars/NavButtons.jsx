function NavButtons({SecondColor}) {
  return(
    <div className="flex justify-center gap-x-[5%] w-full">
      <button className={`px-5 py-2 rounded-lg hover:bg-[${SecondColor}]`}>
        Explorer
      </button>

      <button className={`px-5 py-2 rounded-lg hover:bg-[${SecondColor}]`}>
        Incubator
      </button>

      <button className={`px-5 py-2 rounded-lg hover:bg-[${SecondColor}]`}>
        Tools
      </button>

      <button className={`px-5 py-2 rounded-lg hover:bg-[${SecondColor}]`}>
        Early Stage
      </button>
    </div>
  )

}

export default NavButtons;