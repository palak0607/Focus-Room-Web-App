import React, { useContext } from "react";
import PomodoroTimer from "./Pomodoro";
import NavbarMain from "./Navbar";
import { Focusroom } from "./Focusroom";
import Calendar from "./Calendar";
import Todomain from "./Todo/Todo-main";
import "./pomodoro.css";
import Quotes from "./widget/Quotes";
import Goals from "./widget/Goals";
import { UserAuth } from "../context/AuthContext";
// import { Sticky } from './sticky';
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Chatbot from "./chatbot/Chat";
import { CarouselDefault } from "./stick/stickmain";

const Productivity = () => {
  const { user, logOut } = UserAuth();

  const navigate = useNavigate();

  const LogOut = () => {
    logOut();
    navigate("/");
  };
  const FocusGo = () => {
    navigate("/focus-join");
  };
  return (
    <div>
      <div className="main p-10 flex flex-col justify-center items-center">
        <div className="up w-full flex justify-between items-center px-10">
          <h1 className="text-xs text-white">Welcome {user.displayName}</h1>

          <Button
            color="red"
            buttonType="filled"
            size="sm"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="light"
            onClick={LogOut}
          >
            Log Out
          </Button>
        </div>

        <div className="flex mt-5">
          <div className="mx-1">
            <PomodoroTimer />
          </div>
          <div className="mx-1 cursor-pointer" onClick={FocusGo}>
            <Focusroom />
          </div>
          <div className="mx-1">
            <Calendar />
          </div>
        </div>
        <div className="flex justify-around mt-2 ">
          <div className="mx-1  todo shadow rounded-md ">
            <Todomain />
          </div>
          <div className="widget mx-1 rounded-md">
            <Goals />
            <Quotes />
          </div>
          <div className="stick-main mx-1 rounded-md">
            <CarouselDefault />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productivity;
