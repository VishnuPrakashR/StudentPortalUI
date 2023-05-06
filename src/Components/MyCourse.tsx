import { Col, Container, Row } from "react-bootstrap"
import styled from "styled-components"
import MyCourseView from "./MyCourseView"
import Footer from "./Footer"
import Sidebar from "./Sidebar"

const Head = styled(Row)`
box-shadow: #cccccc 0px 2px 5px 0px;
`
const Body = styled(Container)`
background: #f8f8f8;
`

const MyCourse = () => {
    return(
        <Body fluid>
            <Head>
                <Col md={12} xs={12}>
                    <h2>LBU Student Portal</h2>
                </Col> 
            </Head>
            <Row>
                <Col md={2} className="d-none d-md-flex">
                    <Sidebar />
                </Col>
                <Col md={10} xs={12} className="p-3">
                    <MyCourseView />
                </Col>
            </Row>
            <Row>
                <Col md={2}></Col>
                <Col md={10} >
                    <Footer />
                </Col>
            </Row>
        </Body>
    )
}
export default MyCourse