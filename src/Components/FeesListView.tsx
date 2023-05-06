import { Key, useEffect, useState } from "react";
import { Button, Card, Col, Row, Spinner, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { fetchData } from "../api";

interface RowData {
    No: Number, 
    Id: Key,
    Date: String,
    CheckIn: String,
    CheckInDev: String,
    CheckOut: String,
    CheckOutDev: String,
    TotalHours: String
}

const FeesListView = () => {
    const [loadingData, setLoadingData] = useState(true);
    const [markLoading, setMarkLoading] = useState(false);
    const [data, setData] = useState([]);
    const [rowsLoading, setRowsLoading] = useState(false)
    const query = new URLSearchParams(useLocation().search);
    const employee = query.get('employee')
    async function markAttendance() {
      setMarkLoading(true)
      const response = await fetchData({
        path: "get/HR/Employees/MarkAttendance/",
        body: {employee}
        })
        console.log(response.data)
        getAttendanceList()
        setMarkLoading(false)
    }
    async function getAttendanceList(){
        setRowsLoading(true)
        const response = await fetchData({
            path: "get/HR/Employees/getAttendance/",
            body: {employee}
            })
            setData(response.data);
            setLoadingData(false);
            setRowsLoading(false)
    }
    useEffect(()=>{ 
        if (loadingData) {
            getAttendanceList()
        }
        console.log(data)
    }, [getAttendanceList, loadingData])

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <Row>
            <Col md={6} className="d-flex">
              Attendance List
            </Col>
            <Col className="d-flex justify-content-end">
              <Button
                variant="primary"
                className="btn-sm float-right pull-right"
                onClick={markAttendance}
              >
                {
                  markLoading?
                  <Spinner animation="border" size="sm" /> :
                "Mark Attendance"
}
              </Button>
            </Col>
          </Row>
        </Card.Title>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Date</th>
                <th>CheckIn</th>
                <th>CheckIn Device</th>
                <th>CheckOut</th>
                <th>CheckOut Device</th>
                <th>Total Hours</th>
              </tr>
            </thead>
            <tbody>
              {
                rowsLoading? <tr><td colSpan={7}><div  className="d-flex justify-content-center align-items-center">
                    <Spinner animation="border" size="sm" /></div></td>
                    </tr>:
                data.map((rowData: RowData) => <tr key={rowData.Id}>
                        <td>{String(rowData.No)}</td>
                        <td>{rowData.Date}</td>
                        <td>{rowData.CheckIn}</td>
                        <td>{rowData.CheckInDev}</td>
                        <td>{rowData.CheckOut}</td>
                        <td>{rowData.CheckOutDev}</td>
                        <td>{rowData.TotalHours}</td>
                    </tr>)
              }
            </tbody>
          </Table>
      </Card.Body>
    </Card>
  );
};
export default FeesListView;
