const Source = ({ url }) => {
  return (
    <div className="md:flex gap-x-3 md:items-center h-10 md:my-0 my-10 group md:mt-0 mt-4">
      <div className="text-dwa-semigray group-hover:underline">Source</div>
      <div className="flex items-center gap-x-2">
        <a
          className="group-hover:underline dark:text-dwa-lightgray-strong"
          href={url}
          target="_blank"
        >
          {url}
        </a>
        <svg
          className="cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 14 14"
        >
          <path
            fill="none"
            stroke="#838383"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"
          />
        </svg>
      </div>
    </div>
  );
};

export default Source;
