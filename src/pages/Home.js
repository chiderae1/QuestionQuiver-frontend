// hooks
import { useEffect } from "react"

// usecontext
import useTestContext from '../hooks/useTestContext'

// component
import Test from "../component/Test"


const Home = () => {
    // usecontext
    const {  dispatch: testdispatch } = useTestContext()
    
    // when the page loads get the name of the exams
    useEffect(() => {
        const fetchExamName = async () => {
            const response = await fetch('http://localhost:8080/api/get/')

            const json = await response.json()
            if (!response.ok) {
                throw Error(json.error)
            }
            if (response.ok) {
                // store the Exam_names in useUserContext()
                testdispatch({ type: 'TEST_NAME', payload: json })
            }
        }

        fetchExamName()
    }, [testdispatch])

    return (
        <div className="">
          <Test/>
        </div>
    )

}

export default Home;