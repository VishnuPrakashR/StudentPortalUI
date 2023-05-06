import { ChangeEvent, Key, SyntheticEvent, useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Spinner, Table } from "react-bootstrap";
import styled from "styled-components";
import { fetchData } from "../api";

const DashboardWrapper = styled(Col)`

`
interface rowData {
    studentId: String, 
    Id: Key,
    Name: String,
    Email: String,
    Phone: String,
    Dob: String,
    Address: String,
    PostCode: String,
    Country: String,
    Status: Number
}

interface enrollData {
    Id: Key,
    studentId: String,
    enrollmentNo: String,
    Course: String,
    Degree: String,
    Fees: String,
    Status: String,
    IsGraduated: boolean,
    CourseLeader: String
}

interface courseData {
    Id: Key,
    Course: String,
    Degree: String
}

const Dashboard = () => {
    
    const [loadingData, setLoadingData] = useState(true);
    const [data, setData] = useState<rowData>();
    const [rowsLoading, setRowsLoading] = useState(false)
    const [enrolled, setEnrolled] = useState(false)
    const [enrollData, setEnrollData] = useState<enrollData>()
    const [courseData, setCourseData] = useState([])
    const [loadingEnrollData, setLoadingEnrollData] = useState(true)
    const [isLoading, setLoading] = useState(false);
    const [course, setCourse] = useState("")

    async function getStudentDataAPI(){
        setRowsLoading(true)
        const response = await fetchData({
            path: "student/Dashboard/Data/",
            body: {}
            })
            setData(response.data);
            setLoadingData(false);
            setRowsLoading(false)
    }

    async function getEnrollData(){
        const enrollResponse = await fetchData({
            path: "student/Dashboard/Enroll/",
            body: {}
        })
        const enrollResponseData = enrollResponse.data
        if (enrollResponseData.enrolled === true){
            setEnrolled(true)
            setEnrollData(enrollResponseData)
        }
        else{
            setEnrolled(false)
            setCourseData(enrollResponseData.courses)
        }
        setLoadingEnrollData(false)
    }

    useEffect(()=>{ 
        if (loadingData) {
            getStudentDataAPI()
        }
        if (loadingEnrollData){
            getEnrollData()
        }
    }, [data, loadingData, enrolled, enrollData, courseData, loadingEnrollData])

    function handleCourseChange(event: ChangeEvent<HTMLSelectElement>){
        setCourse(event.target.value)
    }
    async function handleEnrollment(event:SyntheticEvent){
        event.preventDefault();
        setLoading(true)
        const response = await fetchData({
          path: "student/Course/Enroll/",
          body: {course}
        })
        const data = response.data
        if(data.Response==='Success'){
          setLoadingEnrollData(true)
          getEnrollData()
        }
        else{
          console.log(data.Msg);
        }
        setLoading(false)
    }
    return (
        <Row>
            <DashboardWrapper>
                <Row>
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <div  className="d-flex justify-content-center align-items-center">
                            <h2>Student Details</h2>
                            </div>
                            <div  className="d-flex justify-content-center align-items-center">
                            <Table bordered>
                            {
                            rowsLoading? <tr><td colSpan={2}><div  className="d-flex justify-content-center align-items-center">
                                        <Spinner animation="border" size="sm" /></div></td>
                                        </tr>:
                                            <><tr>
                                                    <td>Name:</td>
                                                    <td>{data?.Name}</td>
                                                </tr><tr>
                                                        <td>Student Id:</td>
                                                        <td>{data?.studentId}</td>
                                                    </tr>
                                                    <tr>
                                                    <td>Email:</td>
                                                    <td>{data?.Email}</td>
                                                </tr>
                                                <tr>
                                                    <td>Date of Birth:</td>
                                                    <td>{data?.Dob}</td>
                                                </tr>
                                                <tr>
                                                    <td>Phone:</td>
                                                    <td>{data?.Phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Address:</td>
                                                    <td>{data?.Address}</td>
                                                </tr>
                                                <tr>
                                                    <td>PostCode:</td>
                                                    <td>{data?.PostCode}</td>
                                                </tr>
                                                <tr>
                                                    <td>Country:</td>
                                                    <td>{data?.Country}</td>
                                                </tr>
                                                    </>                                
                            }
                            </Table>
                            </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <div  className="d-flex justify-content-center align-items-center">
                                    <h2>Course Details</h2>
                                </div>
                                <div>
                                <Form onSubmit={handleEnrollment}>
                                    <Table bordered>
                                    {
                                        loadingEnrollData?
                                        <tr><td colSpan={2}><div  className="d-flex justify-content-center align-items-center">
                                        <Spinner animation="border" size="sm" /></div></td>
                                        </tr>:
                                        enrolled?
                                        <>
                                            <tr>
                                                <td>Status:</td><td>Enrolled</td>
                                            </tr>
                                            <tr>
                                                <td>Enrollment Number:</td>
                                                <td>{enrollData?.enrollmentNo}</td>
                                            </tr>
                                            <tr>
                                                <td>Degree:</td>
                                                <td>{enrollData?.Degree}</td>
                                            </tr>
                                            <tr>
                                                <td>Course:</td>
                                                <td>{enrollData?.Course}</td>
                                            </tr>
                                            <tr>
                                                <td>Course Leader:</td>
                                                <td>{enrollData?.CourseLeader}</td>
                                            </tr>
                                            <tr>
                                                <td>Graduate:</td>
                                                <td><>{enrollData?.IsGraduated?"Graduated": "Not Graduated"}</></td>
                                            </tr>
                                        </>:
                                        <>
                                            <tr><td>Status:</td><td>Not Enrolled</td></tr>
                                            <tr><td>Course:</td>
                                                <td>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Select aria-label="Default select" value={course} onChange={handleCourseChange}>
                                                <option>Please select a course</option>
                                                {
                                                    courseData.map((RowData: courseData)=>
                                                    <option value={RowData.Id} key={RowData.Id}>{RowData.Degree + " - " + RowData.Course}</option>
                                                    )
                                                }
                                                </Form.Select>
                                                </Form.Group>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td><Form.Group>
                                                    <Button variant="primary" type="submit" disabled={isLoading}>
                                                    {isLoading? <Spinner animation="border" size="sm" />:"Enroll"}
                                                </Button>
                                                </Form.Group></td>
                                            </tr>
                                        </>
                                    }
                                    </Table>
                                    </Form>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </DashboardWrapper>
        </Row>
    )
}

export default Dashboard;