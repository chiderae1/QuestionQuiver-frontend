// for stop watch

// hooks
import { useEffect, useState } from "react";

// function
import useSubmit from '../fetch/useSubmit';

// context
import useAuthContext from '../hooks/useAuthContext';
import useStoptimeContext from "../hooks/useStoptimeContext";

const Stopwatch = ({ Answers, Time }) => {
    // state
    const initialSeconds = parseInt(localStorage.getItem('timerValue'), 10) || Time;
    const [time, setTime] = useState(initialSeconds);

    // context
    const { Auth } = useAuthContext()
    // is true when set false stopwatch will hault
    const { StopTime } = useStoptimeContext()

    // localstorage
    const ExamName = JSON.parse(localStorage.getItem('ExamName'))

    // functon
    const submit = useSubmit()

    useEffect(() => {
        let interval
        if (StopTime && time > 0) {
            interval = setInterval(() => {
                // setTime(prevtime => prevtime - 1);
                setTime((prevSeconds) => {
                    const newSeconds = prevSeconds - 1;
                    localStorage.setItem('timerValue', newSeconds.toString());
                    return newSeconds;
                });
            }, 1000)
        }
        if (!StopTime || time === 0) {
            submit(Answers, ExamName, Auth)
            clearInterval(interval);
            localStorage.removeItem('timerValue');
        }
        return () => clearInterval(interval);
        // eslint-disable-next-line 
    }, [time])

    const formatTime = (seconds) => {
        const minute = Math.floor(seconds / 60)
        const remainingseconds = (seconds % 60)

        return (`${minute}:${remainingseconds < 10 ? '0' : ''}${remainingseconds}`)
    }

    return (
        <div className="stopwatch d-inline">
            <span className="text-white  fw-bold">Timer: </span>
            <span className="text-white  fw-bold">{formatTime(time)}</span>
        </div>
    );
}

export default Stopwatch;