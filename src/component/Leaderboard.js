// to display leaderrboard

import { useEffect, useState } from "react";
// import Table from 'react-bootstrap/Table';
import React from 'react'
// import { leaderboard } from "../../../backend/controller/LeadController";


const Leaderboard = () => {
    const ExamName = JSON.parse(localStorage.getItem('ExamName'))
    const [leadboard, setLeaderboard] = useState('')

    useEffect(() => {

        const fetchdata = async () => {
            const response = await fetch('http://localhost:8080/api/get/test/retrieve/leadboard',
                {
                    method: "POST",
                    body: JSON.stringify({ ExamName }),
                    headers: { "Content-Type": 'application/json' }
                })

            const json = await response.json()
            if (response.ok) {
                setLeaderboard(json)
            }
            if (!response.ok) {
                throw Error(json.error)
            }
        }
        fetchdata()
    }, [ExamName])
    return (
        <div className="leaderboard">
            <p className="lead fw-bold text-center p-2">Leaderboard</p>
            <table className="table p-4">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>username</th>
                        <th>score</th>
                    </tr>
                </thead>
                <tbody>
                    {leadboard && leadboard.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.username}</td>
                            <td>{item.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default React.memo(Leaderboard);
