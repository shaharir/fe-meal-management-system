import { useSelector } from "react-redux";
import { menuItems } from "./menu";
import { Link, Outlet, useNavigate } from "react-router";
import ThemeToggle from "./TheamToogle";
import { Fragment } from "react";

const Sidebar = () => {
  const profile = useSelector((state) => state.profile.user);
  const navigate = useNavigate();
  return (
    <>
      <div className="drawer drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-4">
          <Outlet />
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="is-drawer-close:w-14 is-drawer-open:w-64 bg-base-200 flex flex-col items-start min-h-full">
            <ul className="menu w-full grow gap-4">
              {/* {menuItems.map((item, index) => (
                <li key={index}>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip={item.name}
                    onClick={() => navigate(item.path)}
                  >
                    {item.icon}
                    <span className="is-drawer-close:hidden">{item.name}</span>
                  </button>
                </li>
              ))} */}
              {menuItems.map((item, index) => (
                <Fragment key={index}>
                  {item?.children ? (
                    // Dropdown menu
                    <li className="dropdown dropdown-start">
                      <button
                        tabIndex={0}
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 w-full px-3 py-1.5 rounded-md hover:bg-gray-100"
                        data-tip={item.name}
                      >
                        {item.icon}
                        <span className="is-drawer-close:hidden">
                          {item.name}
                        </span>
                      </button>
                      <ul
                        tabIndex="-1"
                        className="dropdown-content menu bg-base-100 rounded-box mt-1 shadow-sm w-52"
                      >
                        {item.children.map((child, cIndex) => (
                          <li key={cIndex}>
                            <button
                              className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 py-1.5 rounded-md hover:bg-gray-100"
                              // data-tip={child.name}
                              onClick={() => navigate(child.path)}
                            >
                              {child.icon}
                              {child.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    // Single menu item
                    <li>
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 w-full px-3 py-1.5 rounded-md hover:bg-gray-100"
                        data-tip={item.name}
                        onClick={() => navigate(item.path)}
                      >
                        {item.icon}
                        <span className="is-drawer-close:hidden">
                          {item.name}
                        </span>
                      </button>
                    </li>
                  )}
                </Fragment>
              ))}
            </ul>
            {/* profile */}
            <div
              className="m-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Profile"
            >
              <Link
                to="/profile"
                className="btn btn-ghost btn-circle drawer-button relative"
              >
                <div className="avatar avatar-online avatar-placeholder">
                  <div className="bg-neutral text-neutral-content w-10 rounded-full">
                    <span className="text-sm font-semibold">
                      {profile?.name?.slice(0, 2)?.toUpperCase()}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            {/* theme controller */}
            <ThemeToggle />

            {/* button to open/close drawer */}
            <div
              className="m-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Open"
            >
              <label
                htmlFor="my-drawer-4"
                className="btn btn-ghost btn-circle drawer-button is-drawer-open:rotate-y-180"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="inline-block size-4 my-1.5"
                >
                  <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                  <path d="M9 4v16"></path>
                  <path d="M14 10l2 2l-2 2"></path>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
