import { Key, useEffect, useState } from "react";
import { Button, Card, Col, Row, Spinner, Table } from "react-bootstrap";
import { CalendarCheck, Fingerprint } from "react-bootstrap-icons";
import { fetchData } from "../api";

interface RowData {
    No: Number, 
    Id: Key,
    Name: String,
    Department: String,
    Phone: String,
    Email: String,
    Status: String
}

const MyCourseView = () => {
    const [loadingData, setLoadingData] = useState(true);
    const [data, setData] = useState([]);
    const [rowsLoading, setRowsLoading] = useState(false)
    async function getEmployeeList(){
        setRowsLoading(true)
        const response = await fetchData({
            path: "list/HR/Employees/all/",
            body: {}
            })
            setData(response.data);
            setLoadingData(false);
            setRowsLoading(false)
    }
    useEffect(()=>{ 
        if (loadingData) {
            getEmployeeList()
        }
        console.log(data)
    }, [data, loadingData])

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <Row>
            <Col md={6} className="d-flex">
              Employees List
            </Col>
            <Col className="d-flex justify-content-end">
              <Button
                variant="primary"
                className="btn-sm float-right pull-right"
                href="/add-employee"
              >
                Add New Employee
              </Button>
            </Col>
          </Row>
        </Card.Title>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Department</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                rowsLoading? <tr><td colSpan={7}><div  className="d-flex justify-content-center align-items-center">
                    <Spinner animation="border" size="sm" /></div></td>
                    </tr>:
                data.map((rowData: RowData) => <tr key={rowData.Id}>
                        <td>{String(rowData.No)}</td>
                        <td>{rowData.Name}</td>
                        <td>{rowData.Department}</td>
                        <td>{rowData.Phone}</td>
                        <td>{rowData.Email}</td>
                        <td>{rowData.Status}</td>
                        <td><Button size="sm" href={"/add-finger-print?employee=" + rowData.Id}><Fingerprint /></Button>&nbsp;
                        <Button size="sm" variant="success" href={"/attendance?employee=" + rowData.Id}><CalendarCheck /></Button></td>
                    </tr>)
              }
            </tbody>
          </Table>
      </Card.Body>
    </Card>
  );
};
export default MyCourseView;
