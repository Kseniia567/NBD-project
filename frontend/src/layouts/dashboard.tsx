import {useContext, useLayoutEffect, useState} from "react";
import {AuthenticationContext} from "../context";
import {AUTH_TYPE} from "../@types";
import {NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import {Button} from "../components";
import {FiMenu} from "react-icons/fi";
import {MdOutlineClose} from "react-icons/md";

const routes = [
    {name: "Home", to: "/dashboard"},
    {name: "Add Recipe", to: "/dashboard/addrecipe"},
    {name: "My Recipes", to: "/dashboard/myrecipes"},

];


export const DashboardLayout = () => {
    const { onLogout, user } = useContext(AuthenticationContext) as AUTH_TYPE;

    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (!sessionStorage.getItem("token") && !sessionStorage.getItem("email")) {
            navigate("/");
        }
    }, []);

    const pathname = useLocation().pathname;

    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => {
        setOpen((prev) => !prev);
    };
    const handleLogout = () => {
        onLogout();
    };
    return (
        <div className="w-full h-full bg-black overflow-x-hidden">
            <div className="h-[60px] md:h-[80px] bg-zinc-900 flex items-center justify-between px-3 sticky top-0 z-50">
                <div className="flex items-center">
                    <h2 className="text-white font-bold text-xl underline-offset-4 underline">
                        <NavLink to="/dashboard">RecipeApp</NavLink>
                    </h2>
                    <span className="text-orange-700 font-extrabold text-xl pl-2">.</span>
                </div>

            </div>

            <div className="text-white md:hidden">
                {open ? (
                    <MdOutlineClose onClick={handleOpen} />
                ) : (
                    <FiMenu onClick={handleOpen} />
                )}
            </div>

            <div className="flex flex-col md:flex-row w-full h-full z-10 relative">
                <div className="hidden md:block bg-zinc-900 h-full w-[20%] fixed">
                    <div className="md:flex gap-8 items-start w-full p-3">
                        <img
                            className="h-16 w-16 object-cover rounded-full"
                            src="https://www.shutterstock.com/image-vector/empty-photo-male-profile-gray-260nw-538707310.jpg"
                            alt="A image"
                        />
                        <div>
                            <p className="text-orange-500 font-light">{user}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-1  mt-3">
                        {routes.map(({ name, to }) => (
                            <NavLink
                                key={name + to}
                                to={to}
                                className={({ isActive }) =>
                                    isActive && pathname === to
                                        ? "text-white font-thin text-sm bg-orange-500 p-4"
                                        : "text-white font-thin text-sm hover:bg-orange-500 p-4"
                                }
                            >
                                {name}
                            </NavLink>
                        ))}
                        <Button
                            title="Logout"
                            handleClick={handleLogout}
                            className="text-white font-thin text-sm text-left hover:bg-orange-500 p-4"
                        />
                    </div>
                </div>

                {open && (
                    <div className="md:hidden bg-zinc-800 w-full h-full top-0 absolute md:relative">
                        <div className="flex gap-8 items-start w-full p-3">
                            <img
                                className="w-10 h-10 rounded-3xl"
                                src="https://www.shutterstock.com/image-vector/empty-photo-male-profile-gray-260nw-538707310.jpg"
                                alt=""
                            />
                            <div>
                                <p className="text-orange-500 font-light">{user}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-1  mt-3">
                            {routes.map(({ name, to }) => (
                                <NavLink
                                    key={name + to}
                                    to={to}
                                    onClick={handleOpen}
                                    className={({ isActive }) =>
                                        isActive && pathname === to
                                            ? "text-white font-thin text-sm bg-orange-500 p-4"
                                            : "text-white font-thin text-sm hover:bg-orange-500 p-4"
                                    }
                                >
                                    {name}
                                </NavLink>
                            ))}
                            <Button
                                title="Logout"
                                handleClick={handleLogout}
                                className="text-white font-thin text-sm text-left hover:bg-orange-500 p-4"
                            />
                        </div>
                    </div>
                )}

                <div className="md:w-[80%] p-3 md:px-8 md:py-6 w-full h-full md:ml-[16rem] ">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};