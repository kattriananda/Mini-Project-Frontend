import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faAngry, faBarChart, faBookmark, faHandshake} from "@fortawesome/free-regular-svg-icons"
import {faGear, faHouse,faListSquares, faRightFromBracket} from "@fortawesome/free-solid-svg-icons"


const Navbar = () => {
    return(
         <div className="container fixed top-0 left-0 h-full w-20 p-4 shadow bg-white">
            <div className="img h-12 justify-center  ">
            <img
                            src="https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63e86ab4c21faa7bc0bd90dd_Logo.svg"
                            alt="Logo"
                        />
            </div>
            <div className="menu flex-col h-3/4 py-4 space-y-7 ">
                <div>
                    <button>
                    <FontAwesomeIcon icon={faHouse}/>
                    </button>
                </div>
                <div>
                    <button>
                    <FontAwesomeIcon icon={faListSquares}/>
                    </button>
                
                </div>
                <div>
                    <button>
                    <FontAwesomeIcon icon={faBookmark}/>
                    </button>
                </div>
                <div>
                    <button>
                    <FontAwesomeIcon icon={faHandshake}/>
                    </button>
                </div>
                <div>
                    <button>
                    <FontAwesomeIcon icon={faBarChart}/>
                    </button>
                </div>
            </div>
            <div className="setting flex-col h-1/5 space-y-6 ">
                <div>
                    <button>
                    <FontAwesomeIcon icon={faGear}/>
                    </button>
                </div>
                <div>
                    <button>
                    <FontAwesomeIcon icon={faRightFromBracket}/>
                    </button>
                </div>
            </div>
            
         </div>
    )
}
export default Navbar;