import Calendar from "react-calendar";
import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import "react-calendar/dist/Calendar.css";
import { teachers } from "../assets/teachers";
import axios from "axios";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { NavLink } from "react-router-dom";

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [focus, setFocus] = useState(0);
  const availableTime = [
    "1:00-2:00pm",
    "2:00-2:30pm",
    "2:30-3:00pm",
    "3:00-3:30pm",
    "3:30-4:00pm",
    "4:00-5:00pm",
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogged(true);
      axios
        .get(`${import.meta.env.VITE_API_URL}booking`, config)
        .then((res) => {
          setBookings(res.data.booking);
          console.log(res.data.booking);
          setIsLoaded(true);
        })
        .catch((e) => console.error(e));
    } else {
      setIsLoaded(true);
    }
  }, []);

  const cancel = async (id) => {
    axios
      .patch(
        `${import.meta.env.VITE_API_URL}booking/cancel`,
        { bookingId: id },
        config
      )
      .then((e) => {
        console.log(e.data);
        window.location.reload();
      })
      .catch((e) => console.error(e));
  };

  const modify = (body) => {
    axios
      .patch(
        `${import.meta.env.VITE_API_URL}booking/update`,
        { bookingId: focus, booking: body },
        config
      )
      .then((e) => {
        console.log(e.data);
        setFocus(0);
        window.location.reload();
      })
      .catch((e) => console.error(e));
  };
  const tileDisabled = ({ activeStartDate, date, view }) => {
    return date < new Date();
  };

  const create = (body) => {
    console.log(body);
    axios
      .post(`${import.meta.env.VITE_API_URL}booking/create`, body, config)
      .then((e) => {
        window.location.reload();
      })
      .catch((e) => console.error(e));
  };
  if (!isLoaded) {
    return <div></div>;
  }

  if (!isLogged) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh]">
        <div className="text-2xl">You are not logged in</div>
        <NavLink to="/login">
          <button className="mt-4 bg-dark p-3 rounded-md duration-300 text-white">
            Login
          </button>
        </NavLink>
      </div>
    );
  }

  return (
    <div className="w-[90%] mx-auto mb-10">
      <div className="flex">
        <div className="rounded space-y-5">
          <h1 className="text-center my-4 text-xl">My upcoming lessons</h1>
          <Accordion className="w-[500px]">
            {bookings.map((el) => {
              if (Date.parse(el?.date) > Date.now())
                return <AccordionLesson data={el} />;
            })}
          </Accordion>
          <h1 className="text-center my-4 text-xl">My Past lessons</h1>
          <Accordion>
            {bookings.map((el) => {
              if (Date.parse(el?.date) < Date.now())
                return <AccordionLesson data={el} />;
            })}
          </Accordion>{" "}
        </div>
        <div className="grow">
          <CreatePanel sendData={create} />
        </div>
        <div>
          {focus != 0 ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}

                    {/*body*/}
                    <CreatePanel sendData={modify} />
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          setFocus(0);
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );

  function CreatePanel({ sendData }) {
    const [date, setDate] = useState();
    const teacher = useRef();
    const [timeState, setTime] = useState();
    const course = useRef();
    const handleTime = (event) => {
      setTime(event.target.value);
    };
    function Time(time, index) {
      return (
        <div key={nanoid()} className="flex space-x-5">
          <input
            type="radio"
            value={time}
            name="time"
            id={`time${index}`}
            className="peer"
            onChange={handleTime}
            defaultChecked={timeState === time}
          />
          <label
            htmlFor={`time${index}`}
            className="w-full py-4 peer-hover:border-green-500"
          >
            <div className="border-2 border-black p-2 text-center rounded">
              {time}
            </div>
          </label>
        </div>
      );
    }
    const onSubmit = () => {
      console.log(date.toLocaleDateString());
      const body = {
        time: timeState,
        date: new Date(date).toLocaleDateString(),
        teacher: teacher.current.value,
        course: course.current.value,
      };
      sendData(body);
    };
    const onChange = (date) => {
      setDate(date);
    };
    return (
      <div>
        <h1 className="text-center my-4 text-xl">Book a trial lesson</h1>
        <div className="p-10 border-black border-2 mx-8 rounded space-y-5">
          <div className="flex justify-around">
            <p>Choose the needed course</p>
            <select name="course" id="course" ref={course}>
              <option>SAT</option>
              <option>Academic English</option>
              <option>IELTS</option>
            </select>
          </div>
          <div className="flex justify-around">
            <p>Choose a teacher</p>
            <select name="course" id="course" ref={teacher}>
              {teachers.map((el) => {
                return (
                  <option
                    key={nanoid()}
                  >{`${el.lastName} ${el.firstName}`}</option>
                );
              })}
            </select>
          </div>
          <p className="text-center">Pick a convenient date & time</p>
          <div className="flex space-x-5">
            <Calendar
              tileDisabled={tileDisabled}
              onChange={onChange}
              value={date}
              locale={"EN"}
            />
            <div className="border-2 border-black p-2 w-[100%]">
              <p className="text-center mb-7">Times</p>
              <form name="time" className="grid grid-cols-2 grid-rows-3 gap-5">
                {availableTime.map((el, index) => {
                  return Time(el, index);
                })}
              </form>
            </div>
          </div>
          <div className="w-[100%] flex justify-center">
            <button
              className="btn px-4 py-2 bg-primary rounded text-white"
              onClick={() => onSubmit()}
            >
              Book
            </button>
          </div>
        </div>
      </div>
    );
  }

  function AccordionLesson(data) {
    const { _id, date, time, teacher, course } = data.data;
    return (
      <AccordionItem key={_id}>
        <AccordionItemHeading>
          <AccordionItemButton>{course}</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel className="space-y-5 p-5">
          <div className="flex justify-between">
            <p>Data & time of the lesson</p>
            <p className="min-w-[200px] border-black border-2 ml-2">
              {`${date.slice(0, 10)} ${time}`}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Assigned teacher</p>
            <p className="min-w-[200px] border-black border-2 ml-2">
              {teacher}
            </p>
          </div>
          <div className="flex justify-around">
            <button
              className="btn px-4 py-2 bg-primary rounded text-white hover:bg-green-500"
              onClick={() => {
                setFocus(_id);
              }}
            >
              Modify
            </button>
            <button
              onClick={() => cancel(_id)}
              className="btn px-4 py-2 bg-primary rounded text-white hover:bg-green-500"
            >
              Cancel
            </button>
          </div>
        </AccordionItemPanel>
      </AccordionItem>
    );
  }
};

export default Booking;
