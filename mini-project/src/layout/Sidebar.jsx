import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBoxesStacked,
    faClipboardList,
    faClockRotateLeft,
    faGear,
    faHouse,
    faRightFromBracket,
    faTableList,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="container fixed top-0 left-0 h-full w-20 p-4 shadow bg-white">
            <div className="img h-12 justify-center  ">
                <img
                    src="https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63e86ab4c21faa7bc0bd90dd_Logo.svg"
                    alt="Logo"
                />
            </div>
            <div className="menu flex-col h-3/4 py-4 space-y-7 ">
                <div>
                    <Link to="/">
                        <button className="focus:text-slate-600">
                            <FontAwesomeIcon icon={faHouse} />
                        </button>
                    </Link>
                </div>
                <div>
                    <Link to="/listproduct">
                        <button>
                            <FontAwesomeIcon icon={faClipboardList} />
                        </button>
                    </Link>
                </div>
                <div>
                    <Link to="/transaksi">
                        <button>
                            <FontAwesomeIcon icon={faClockRotateLeft} />
                        </button>
                    </Link>
                </div>
                <div>
                    <Link to="/product">
                        <button>
                            <FontAwesomeIcon icon={faBoxesStacked} />
                        </button>
                    </Link>
                </div>
                <div>
                    <Link to="/category">
                        <button>
                            <FontAwesomeIcon icon={faTableList} />
                        </button>
                    </Link>
                </div>
            </div>
            <div className="setting flex-col h-1/5 space-y-6 ">
                <div>
                    <button>
                        <FontAwesomeIcon icon={faGear} />
                    </button>
                </div>
                <div>
                    <button>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Sidebar;
