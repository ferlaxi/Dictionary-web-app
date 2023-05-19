import logo from "./assets/images/logo.svg";
import { useEffect, useState } from "react";
import Meaning from "./components/Meaning";
import Synonym from "./components/Synonym";
import Verbs from "./components/Verbs";
import Source from "./components/Source";

const SearchWord = () => {
  const [menu, setMenu] = useState(0);
  const [get, setGet] = useState("");
  const [sig, setSig] = useState([]);
  const [syn, setSyn] = useState([]);
  const [verb, setVerb] = useState([]);
  const [de, setDe] = useState([]);
  const [source, setSource] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [empty, setEmpty] = useState(0);
  const [notfound, setNotfound] = useState(0);
  const [font, setFont] = useState("Sans-Serif");
  const [dark, setDark] = useState(0);

  //Call Api
  const datos = (e) => {
    e.preventDefault();
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${busqueda}`)
      .then((response) => {
        if (response.status === 200) {
          setEmpty(0);
          setNotfound(0);
          setBusqueda("");
          return response.json();
        } else if (response.status === 404 && busqueda.length === 0) {
          setEmpty(1);
        } else if (response.status === 404) {
          setNotfound(1);
        }
        {
        }
      })
      .then((data) => {
        setGet(data[0]);
        setSig(data[0].meanings[0].definitions);
        setSyn(data[0].meanings[0].synonyms);
        setVerb(data[0].meanings);
        setSource(data[0].sourceUrls);
      });
  };

  //capture input
  const handleCapture = (e) => {
    setBusqueda(e.target.value);
  };

  //audio play
  const audioUrl = () => {
    let play = get.phonetics.find((e) => {
      return e.audio;
    });

    new Audio(play.audio).play();
  };

  //Meaning Verb
  useEffect(() => {
    verb.forEach((el) => {
      if (el.partOfSpeech == "verb") {
        setDe(el.definitions);
      }
    });
  }, [verb]);

  //Menu Drop
  const dropmenu = () => {
    menu == 0 ? setMenu(1) : setMenu(0);
  };

  //Font Change

  //Sans
  const Sans = () => {
    setFont("Sans-Serif");
    setMenu(0);
    document.getElementById("html").classList.add("font-sans");
    document.getElementById("html").classList.remove("font-mono");
    document.getElementById("html").classList.remove("font-serif");
  };

  //Serif
  const Serif = () => {
    setFont("Serif");
    setMenu(0);
    document.getElementById("html").classList.add("font-serif");
    document.getElementById("html").classList.remove("font-mono");
    document.getElementById("html").classList.remove("font-sans");
  };

  //Mono
  const Mono = () => {
    setFont("Mono");
    setMenu(0);
    document.getElementById("html").classList.add("font-mono");
    document.getElementById("html").classList.remove("font-serif");
    document.getElementById("html").classList.remove("font-sans");
  };

  // DarkMode
  const darkmode = () => {
    dark == 0 ? setDark(1) : setDark(0);
  };

  //DarkMode Sistema
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDark(1);
      document.getElementById("check").checked = true;
    } else {
      setDark(0);
      document.getElementById("check").checked = false;
    }
  }, []);

  return (
    <div className="container md:w-[700px] w-[310px] md:mt-12 mt-5">
      {dark == 1
        ? document.body.classList.add("dark", "bg-dwa-dark")
        : document.body.classList.remove("dark", "bg-dwa-dark")}
      {notfound == 1 ? (
        <div>
          {/* Header */}
          <div className="flex items-center justify-between relative md:w-[700px] w-[316px]">
            <img src={logo} alt="logo" />
            <div className="flex items-center cursor-pointer md:ml-[400px] ml-7">
              <button
                onClick={dropmenu}
                className="flex items-center font-bold text-dwa-lightdark dark:text-dwa-lightgray-strong"
              >
                {font}
                <svg
                  className="ml-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                >
                  <path
                    fill="none"
                    stroke="#A445ED"
                    strokeWidth="1.5"
                    d="m1 1 6 6 6-6"
                  />
                </svg>
              </button>

              {menu == 1 ? (
                <div className="absolute z-10 -ml-12 mt-[170px] w-36 rounded-xl dark:shadow-dwa-violet dark:bg-dwa-semidark bg-white shadow-lg ring-1 ring-gray-500 ring-opacity-5 focus:outline-none">
                  <div className="py-1" role="none">
                    <a
                      onClick={Sans}
                      href="#"
                      className="text-dwa-lightdark block px-5 py-2 text-base font-sans-serif font-bold hover:text-dwa-violet transition-all duration-150 dark:text-dwa-lightgray-strong"
                      role="menuitem"
                      id="menu-item-0"
                    >
                      Sans Serif
                    </a>
                    <a
                      onClick={Serif}
                      href="#"
                      className="text-dwa-lightdark block px-5 py-2 text-base font-serif font-bold hover:text-dwa-violet transition-all duration-150 dark:text-dwa-lightgray-strong"
                      role="menuitem"
                      id="menu-item-1"
                    >
                      Serif
                    </a>
                    <a
                      onClick={Mono}
                      href="#"
                      className="text-dwa-lightdark block px-5 py-2 text-base font-mono font-bold hover:text-dwa-violet transition-all duration-150 dark:text-dwa-lightgray-strong"
                      role="menuitem"
                      id="menu-item-2"
                    >
                      Mono
                    </a>
                  </div>
                </div>
              ) : (
                <div className="absolute"></div>
              )}
            </div>

            {/* Linea Separadora */}
            <div className="absolute border-l-2 border-dwa-lightgray-strong w-2 h-7 md:ml-[600px] ml-[220px] dark:border-dwa-gray"></div>

            {/* Dark Mode */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                id="check"
                type="checkbox"
                value=""
                className="sr-only peer"
                onClick={darkmode}
              />

              <div className="w-10 h-5 bg-gray-500 rounded-full peer-checked:after:translate-x-full after:absolute after:left-[3px] after:top-[3px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-dwa-violet hover:bg-dwa-violet transition-all duration-300"></div>

              <svg
                className="ml-3 stroke-dwa-gray dark:stroke-dwa-violet"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
              >
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
                />
              </svg>
            </label>
          </div>

          {/* input */}
          <form className="relative" action="#" onSubmit={datos}>
            {empty == 1 ? (
              <div className="relative">
                <input
                  className="md:w-[700px] w-[316px] md:h-16 h-12 md:mt-10 mt-7 rounded-2xl bg-dwa-lightgray-strong border-dwa-red focus:border-dwa-red focus:ring-dwa-red ring-inset font-bold md:text-xl text-base pl-7 placeholder:text-dwa-lightdark placeholder:opacity-30 cursor-pointer dark:bg-dwa-lightdark dark:text-dwa-lightgray-strong dark:placeholder:text-dwa-lightgray-strong dark:opacity-100"
                  placeholder="Search for any word..."
                  type="text"
                  onChange={handleCapture}
                />
                <div className="absolute md:text-[20px] text-[17px] text-dwa-red">
                  Oops, can't be empty
                </div>
              </div>
            ) : (
              <input
                className="md:w-[700px] w-[316px] md:h-16 h-12 md:mt-10 mt-7 rounded-2xl bg-dwa-lightgray-strong border-none focus:border-none focus:ring-dwa-violet ring-inset font-bold md:text-xl text-base pl-7 placeholder:text-dwa-lightdark placeholder:opacity-30 cursor-pointer dark:bg-dwa-lightdark dark:text-dwa-lightgray-strong dark:placeholder:text-dwa-lightgray-strong dark:opacity-100"
                placeholder="Search for any word..."
                type="text"
                onChange={handleCapture}
              />
            )}
            <svg
              className="absolute md:-mt-10 md:ml-[655px] -mt-8 ml-[280px]"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path
                fill="none"
                stroke="#A445ED"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"
              />
            </svg>
          </form>

          {/* Not Found Message */}
          <div className="flex flex-col gap-y-5 md:w-[720px] text-center mt-10">
            <div className="text-[50px]">😕</div>
            <div className="text-[20px] font-bold text-dwa-semidark mt-3 dark:text-dwa-lightgray-strong">
              No Definitions Found
            </div>
            <div className="text-dwa-semigray">
              Sorry, we couldn't find definitions for the word you were looking
              for. You can try the search again at later time or head to the web
              insted
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Header */}
          <div className="flex items-center justify-between relative md:w-[700px] w-[316px]">
            <img src={logo} alt="logo" />
            <div className="flex items-center cursor-pointer md:ml-[400px] ml-7">
              <button
                onClick={dropmenu}
                className="flex items-center font-bold text-dwa-lightdark dark:text-dwa-lightgray-strong"
              >
                {font}
                <svg
                  className="ml-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                >
                  <path
                    fill="none"
                    stroke="#A445ED"
                    strokeWidth="1.5"
                    d="m1 1 6 6 6-6"
                  />
                </svg>
              </button>

              {menu == 1 ? (
                <div className="absolute z-10 -ml-12 mt-[170px] w-36 rounded-xl dark:shadow-dwa-violet dark:bg-dwa-semidark bg-white shadow-lg ring-1 ring-gray-500 ring-opacity-5 focus:outline-none">
                  <div className="py-1" role="none">
                    <a
                      onClick={Sans}
                      href="#"
                      className="text-dwa-lightdark block px-5 py-2 text-base font-sans-serif font-bold hover:text-dwa-violet transition-all duration-150 dark:text-dwa-lightgray-strong"
                      role="menuitem"
                      id="menu-item-0"
                    >
                      Sans Serif
                    </a>
                    <a
                      onClick={Serif}
                      href="#"
                      className="text-dwa-lightdark block px-5 py-2 text-base font-serif font-bold hover:text-dwa-violet transition-all duration-150 dark:text-dwa-lightgray-strong"
                      role="menuitem"
                      id="menu-item-1"
                    >
                      Serif
                    </a>
                    <a
                      onClick={Mono}
                      href="#"
                      className="text-dwa-lightdark block px-5 py-2 text-base font-mono font-bold hover:text-dwa-violet transition-all duration-150 dark:text-dwa-lightgray-strong"
                      role="menuitem"
                      id="menu-item-2"
                    >
                      Mono
                    </a>
                  </div>
                </div>
              ) : (
                <div className="absolute"></div>
              )}
            </div>

            {/* Linea Separadora */}
            <div className="absolute border-l-2 border-dwa-lightgray-strong w-2 h-7 md:ml-[600px] ml-[220px] dark:border-dwa-gray"></div>

            {/* Dark Mode */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                id="check"
                type="checkbox"
                value=""
                className="sr-only peer"
                onClick={darkmode}
              />

              <div className="w-10 h-5 bg-gray-500 rounded-full peer-checked:after:translate-x-full after:absolute after:left-[3px] after:top-[3px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-dwa-violet hover:bg-dwa-violet transition-all duration-300"></div>

              <svg
                className="ml-3 stroke-dwa-gray dark:stroke-dwa-violet"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
              >
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
                />
              </svg>
            </label>
          </div>

          {/* input */}
          <form className="relative" action="#" onSubmit={datos}>
            {empty == 1 ? (
              <div className="relative">
                <input
                  className="md:w-[700px] w-[316px] md:h-16 h-12 md:mt-10 mt-7 rounded-2xl bg-dwa-lightgray-strong border-dwa-red focus:border-dwa-red focus:ring-dwa-red ring-inset font-bold md:text-xl text-base pl-7 placeholder:text-dwa-lightdark placeholder:opacity-30 cursor-pointer dark:bg-dwa-lightdark dark:text-dwa-lightgray-strong dark:placeholder:text-dwa-lightgray-strong dark:opacity-100"
                  placeholder="Search for any word..."
                  type="text"
                  onChange={handleCapture}
                />
                <div className="absolute md:text-[20px] text-[17px] text-dwa-red">
                  Oops, can't be empty
                </div>
              </div>
            ) : (
              <input
                className="md:w-[700px] w-[316px] md:h-16 h-12 md:mt-10 mt-7 rounded-2xl bg-dwa-lightgray-strong border-none focus:border-none focus:ring-dwa-violet ring-inset font-bold md:text-xl text-base pl-7 placeholder:text-dwa-lightdark placeholder:opacity-30 cursor-pointer dark:bg-dwa-lightdark dark:text-dwa-lightgray-strong dark:placeholder:text-dwa-lightgray-strong dark:opacity-100"
                placeholder="Search for any word..."
                type="text"
                onChange={handleCapture}
              />
            )}
            <svg
              className="absolute md:-mt-10 md:ml-[655px] -mt-8 ml-[280px]"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path
                fill="none"
                stroke="#A445ED"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"
              />
            </svg>
          </form>

          {/* result */}
          <div className="flex justify-between mt-5 items-center">
            <div>
              {get.word ? (
                <div className="md:text-[74px] text-[32px] font-bold text-dwa-lightdark dark:text-dwa-lightgray-strong">
                  {get.word}
                </div>
              ) : (
                <div></div>
              )}

              {get.phonetic ? (
                <div className="text-dwa-violet md:text-[24px] text-[20px]">
                  {get.phonetic}
                </div>
              ) : (
                <div></div>
              )}
            </div>

            {/* Play btn */}
            {get.word ? (
              <svg
                onClick={audioUrl}
                className="svgplay transition-all duration-100 cursor-pointer fill-dwa-violet"
                width="75"
                height="75"
                viewBox="0 0 75 75"
              >
                <circle
                  className="circle transition-all duration-100"
                  cx="37.5"
                  cy="37.5"
                  r="37.5"
                  opacity=".25"
                />
                <path d="M29 27v21l21-10.5z" />
              </svg>
            ) : (
              <div></div>
            )}
          </div>

          {/* separator 1 */}
          {get.word ? (
            <div className="relative mt-7">
              <div className="text-[24px] font-bold text-dwa-lightdark italic dark:text-dwa-lightgray-strong">
                noun
              </div>
              <div className="border border-dwa-lightgray-strong md:w-[635px] w-[245px] ml-[70px] -mt-3 dark:border-dwa-gray"></div>
            </div>
          ) : (
            <div></div>
          )}

          {/* content 1 */}
          {get.word ? (
            <div className="mt-10">
              <div className="text-[20px] text-dwa-semigray">Meaning</div>
              <ul className="list-disc marker:text-dwa-violet mt-5 md:ml-9 ml-5 flex flex-col gap-y-3">
                {sig.map((e) => (
                  <Meaning definition={e.definition} key={e.definition} />
                ))}
              </ul>

              <div className="flex mt-10 gap-x-5 h-28 flex-wrap">
                <div className="text-[20px] text-dwa-semigray">Synonyms</div>
                {syn.map((e, index) => (
                  <Synonym synonym={e} key={index} />
                ))}
              </div>
            </div>
          ) : (
            <div></div>
          )}

          {/* separator 2*/}
          {get.word ? (
            <div className="relative md:mt-7 mt-32">
              <div className="text-[24px] font-bold text-dwa-lightdark italic dark:text-dwa-lightgray-strong">
                verb
              </div>
              <div className="border border-dwa-lightgray-strong md:w-[635px] w-[245px] ml-[70px] -mt-3 dark:border-dwa-gray"></div>
            </div>
          ) : (
            <div></div>
          )}

          {/* content 2 */}
          {get.word ? (
            <div className="mt-10">
              <div className="text-[20px] text-dwa-semigray">Meaning</div>
              {de.map((e) => (
                <Verbs defi={e.definition} exa={e.example} key={e.definition} />
              ))}
            </div>
          ) : (
            <div></div>
          )}

          {/* separator 3 */}
          {get.word ? (
            <div className="border border-dwa-lightgray-strong md:w-[700px] w-[320px] mt-10 dark:border-dwa-gray"></div>
          ) : (
            <div></div>
          )}

          {/* Source */}
          {source.map((e) => (
            <Source url={e} key={e} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchWord;
