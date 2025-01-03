export const Project = (props) => {
  const { name, image, description, url } = props;

  const handleClick = (e) => {
    e.preventDefault();

    // Programmatically trigger download
    const link = document.createElement("a");
    link.href = url;
    link.rel = "noopener noreferrer";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      onClick={handleClick}
      className="relative flex flex-col items-stretch duration-300 ease-out p-7 sm:p-3 group h-100 rounded-2xl"
    >
      <span className="absolute inset-0 z-20 block w-full h-full border-slate-400 dark:border-slate-700 duration-300 ease-out bg-transparent border group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:border group-hover:border-slate-800 dark:group-hover:border-slate-400 rounded-2xl group-hover:bg-white dark:group-hover:bg-slate-950"></span>
      <span className="absolute inset-0 z-10 block w-full h-full duration-300 ease-out border border-dashed rounded-2xl border-slate-300 dark:border-slate-600 group-hover:translate-x-1 group-hover:translate-y-1"></span>

      <span className="relative z-30 block duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1">
        <span className="block w-full">
          <img
            width={60}
            height={60}
            alt={`Project image ${name}`}
            src={image}
            className="w-full h-auto rounded-lg aspect-ratio: 16 / 9"
            loading="lazy"
          />
        </span>
        <span className="block w-full px-1 mt-5 mb-1 sm:mt-3">
          <span className="flex items-center mb-0 text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            <span>{name}</span>
            <svg
              className="group-hover:translate-x-0 group-hover:translate-y-0 -rotate-45 translate-y-1 -translate-x-1 w-2.5 h-2.5 stroke-current ml-1 transition-all ease-in-out duration-200 transform"
              viewBox="0 0 13 15"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <g
                  id="svg"
                  transform="translate(0.666667, 2.333333)"
                  stroke="currentColor"
                  strokeWidth="2.4"
                >
                  <g>
                    <>
                      <polyline
                        className="transition-all duration-200 ease-out opacity-0 delay-0 group-hover:opacity-100"
                        points="5.33333333 0 10.8333333 5.5 5.33333333 11"
                      ></polyline>
                      <line
                        className="transition-all duration-200 ease-out transform -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:ml-0"
                        x1="10.8333333"
                        y1="5.5"
                        x2="0.833333333"
                        y2="5.16666667"
                      ></line>
                    </>
                  </g>
                </g>
              </g>
            </svg>
          </span>
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {description}
          </span>
        </span>
      </span>
    </div>
  );
};
