import { Key, SyntheticEvent, useEffect, useState } from "react";
import { Button, Card, Col, Row, Spinner, Table } from "react-bootstrap";
import { fetchData } from "../api";

interface RowData {
    No: Number, 
    Id: Key,
    Reference: String,
    Amount: String,
    Type: String
    isPaid: boolean
}

const FeesListView = () => {
    const [loadingData, setLoadingData] = useState(true);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [data, setData] = useState([]);
    const [rowsLoading, setRowsLoading] = useState(false)
    async function payFees(event:SyntheticEvent) {
      const reference = event.currentTarget.getAttribute('data-reference')
      setPaymentLoading(true)
      const response = await fetchData({
        path: "student/Fees/Pay/",
        body: {reference}
        })
        console.log(response.data)
        getFeeList()
        setPaymentLoading(false)
    }
    async function getFeeList(){
        setRowsLoading(true)
        const response = await fetchData({
            path: "student/Fees/",
            body: {}
            })
            setData(response.data);
            setLoadingData(false);
            setRowsLoading(false)
    }
    useEffect(()=>{ 
        if (loadingData) {
            getFeeList()
        }
    }, [data, loadingData])

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <Row>
            <Col md={6} className="d-flex">
              Fees List
            </Col>
            <Col className="d-flex justify-content-end">
              
            </Col>
          </Row>
        </Card.Title>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Reference</th>
                <th>Amount</th>
                <th>Type</th>
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
                        <td>{rowData.Reference}</td>
                        <td>{rowData.Amount}</td>
                        <td>{rowData.Type}</td>
                        <td>{rowData.isPaid?"Paid":<Button
                              variant="success"
                              className="btn-sm float-right pull-right"
                              onClick={payFees}
                              data-reference={rowData.Reference}
                            >
                {
                  paymentLoading?
                  <Spinner animation="border" size="sm" /> :
                "Pay"
}
              </Button>}</td>
                    </tr>)
              }
            </tbody>
          </Table>
      </Card.Body>
    </Card>
  );
};
export default FeesListView;
