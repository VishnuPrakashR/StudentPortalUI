import { ChangeEvent, Key, SyntheticEvent, useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Spinner, Table } from "react-bootstrap";
import { fetchData } from "../api";
import styled from "styled-components";

const RedText = styled.p`
color: #FF0000;
`;
const GreenText = styled.p`
color: #32A545;
`;

interface enrollData {
  Id: Key,
  studentId: String,
  enrollmentNo: String,
  Name: String,
  Email: String,
  Phone: String,
  Dob: String,
  Address: String,
  PostCode: String,
  Country: String,
  Course: String,
  Degree: String,
  Fees: String,
  Status: String,
  IsGraduated: boolean,
  CourseLeader: String,
  FeesPaid: boolean
}

interface courseData {
  Id: Key,
  Course: String,
  Degree: String
}

const MyCourseView = () => {
    const [loadingData, setLoadingData] = useState(true);
    const [data, setData] = useState<enrollData>();
    const [courseData, setCourseData] = useState([])
    const [enrolled, setEnrolled] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [course, setCourse] = useState("")
    async function getEnrollData(){
        const response = await fetchData({
            path: "student/Course/EnrollmentData/",
            body: {}
            })
            const enrollResponseData = response.data
            if (enrollResponseData.enrolled === true){
              setEnrolled(true)
              setData(enrollResponseData)
          }
          else{
              setEnrolled(false)
              setCourseData(enrollResponseData.courses)
          }
            
            setLoadingData(false);
    }
    useEffect(()=>{ 
        if (loadingData) {
            getEnrollData()
        }
        console.log(data)
    }, [data, loadingData])
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
        setLoadingData(true)
        getEnrollData()
      }
      else{
        console.log(data.Msg);
      }
      setLoading(false)
  }

  async function Graduate(event: SyntheticEvent){
    event.preventDefault()
    setLoading(true)
    const enrollmentNo = event.currentTarget.getAttribute("data-enrollment")
    const response = await fetchData({
      path: "student/Course/Graduate/",
      body: {enrollmentNo}
    })
    const GraData = response.data
    if(GraData.Response==='Success'){
      setLoadingData(true)
      getEnrollData()
    }
    else{
      console.log(GraData.Msg);
    }
    setLoading(false)
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <Row>
            <Col md={6} className="d-flex">
              My Course Details
            </Col>
            {/* <Col className="d-flex justify-content-end">
              <Button
                variant="primary"
                className="btn-sm float-right pull-right"
                href="/enroll-new"
              >
                Enroll new course
              </Button>
            </Col> */}
          </Row>
        </Card.Title>
        {
          loadingData?
          <div  className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" size="sm" />
          </div>:
          enrolled?
            <Table bordered>
              <tbody>
              <tr>
                  <td colSpan={2}>
                    <h2>Student Details</h2>
                  </td>
                </tr>
                <tr>
                  <td>
                    Student Id:
                  </td>
                  <td>
                    {data?.studentId}
                  </td>
                </tr>
                <tr>
                  <td>
                    Name:
                  </td>
                  <td>
                    {data?.Name}
                  </td>
                </tr>
                <tr>
                  <td>
                    Email:
                  </td>
                  <td>
                    {data?.Email}
                  </td>
                </tr>
                <tr>
                  <td>
                    Phone:
                  </td>
                  <td>
                    {data?.Phone}
                  </td>
                </tr>
                <tr>
                  <td>
                    Date of Birth:
                  </td>
                  <td>
                    {data?.Dob}
                  </td>
                </tr>
                <tr>
                  <td>
                    Address:
                  </td>
                  <td>
                    {data?.Address}
                  </td>
                </tr>
                <tr>
                  <td>
                    PostCode:
                  </td>
                  <td>
                    {data?.PostCode}
                  </td>
                </tr>
                <tr>
                  <td>
                    Country:
                  </td>
                  <td>
                    {data?.Country}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <h2>Course Details</h2>
                  </td>
                </tr>
                <tr>
                  <td>
                    Enrollment Number:
                  </td>
                  <td>
                    {data?.enrollmentNo}
                  </td>
                </tr>
                <tr>
                  <td>
                    Degree:
                  </td>
                  <td>
                    {data?.Degree}
                  </td>
                </tr>
                <tr>
                  <td>
                    Course:
                  </td>
                  <td>
                    {data?.Course}
                  </td>
                </tr>
                <tr>
                  <td>
                    Fees:
                  </td>
                  <td>
                    {data?.Fees}
                  </td>
                </tr>
                <tr>
                  <td>
                    Course Leader:
                  </td>
                  <td>
                    {data?.CourseLeader}
                  </td>
                </tr>
                <tr>
                  <td>
                    Graduation:
                  </td>
                  <td>
                    {data?.IsGraduated?<GreenText>Graduated</GreenText>:data?.FeesPaid?
                    <Button
                      variant="success"
                      onClick={Graduate}
                      className="btn-sm float-right pull-right"
                      data-enrollment={data?.enrollmentNo}
                      disabled={isLoading}
                    >{isLoading? <Spinner animation="border" size="sm" />:"Graduate"}</Button>
                    : <RedText>Please pay outstanding fees to graduate</RedText>}
                  </td>
                </tr>
              </tbody>
            </Table>:
            <Form onSubmit={handleEnrollment}>
              <Table>
                <tbody>
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
                </tbody>
                </Table>
            </Form>
        }
      </Card.Body>
    </Card>
  );
};
export default MyCourseView;
