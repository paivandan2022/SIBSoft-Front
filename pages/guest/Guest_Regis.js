import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Navbar,
  Row,
} from "react-bootstrap";

function Guest_Regis() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    console.log("", validated);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  moment.updateLocale("th", {
    durationLabelsStandard: {
      S: "millisecond",
      SS: "milliseconds",
      s: "ว",
      ss: "วินาที",
      m: "นาที",
      mm: "นาที",
      h: "ชม.",
      hh: "ชั่วโมง",
      d: "ว",
      dd: "วัน",
      w: "สัปดาห์",
      ww: "สัปดาห์",
      M: "เดือน",
      MM: "เดือน",
      y: "ป",
      yy: "ปี",
    },
  });

  const [strAge, setstrAge] = useState();
  const setDate = (dateValue) => {
    const a = moment();
    const b = moment(dateValue, "YYYY-MM-DD");

    const age = moment.duration(a.diff(b));
    const years = age.years();
    const months = age.months();
    const day = age.days();
    const calAge = years + " ปี " + months + " เดือน " + day + " วัน";
    console.log("DateValues------------- ", calAge);

    setstrAge(calAge);
  };

  const getAge = () => {
    const setStr = strAge.Age;
    return setStr;
  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Navbar bg="secondary" variant="secondary">
          <Container>
            <Navbar.Brand href="">
              <img
                alt=""
                src="/logo.png"
                width="100"
                height="35"
                className="d-inline-block align-top"
              />{" "}
            </Navbar.Brand>
          </Container>
        </Navbar>
        <Container fluid="md" style={{ padding: "0 50px" }}>
          <Row style={{ padding: "20px 0" }}>
            <div className="row">
              <div className="col-4">
                <Card>
                  <Card.Header as="h5">รูปภาพประจำตัว</Card.Header>
                  <Card.Img variant="top" src="/logo.png" />
                  <Card.Body>
                    <Form.Group controlId="formFileLg" className="mb-3">
                      <Form.Label className="text-danger">
                        เลือกรูปที่ต้องการแสดง
                      </Form.Label>
                      <Form.Control type="file" size="md" />
                    </Form.Group>
                  </Card.Body>
                </Card>
                <br />
              </div>
              <div className="col-8">
                <Card>
                  <Card.Header as="h5">เลขประจำตัว</Card.Header>
                  <Card.Body>
                    <Card.Title></Card.Title>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationCustom01"
                      >
                        <Form.Label>
                          กรุณากรอกรเลขบัตรประจำตัวประชาชน
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="เลขประจำตัวประชาชน"
                          defaultValue=""
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group md="12" controlId="validationCustom02">
                        <Form.Label>PASSPORT</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="PASSPORT"
                          defaultValue=""
                        />
                      </Form.Group>
                    </Row>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Row>
          <Row>
            <div className="row">
              <div className="col-12">
                <Card>
                  <Card.Header as="h5">ประวัติส่วนตัว</Card.Header>
                  <Card.Body>
                    <Card.Title></Card.Title>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustom03"
                      >
                        <Form.Label>คำนำหน้า</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          required
                        >
                          <option></option>
                          <option value="1"></option>
                          <option value="2"></option>
                          <option value="3"></option>
                          <Form.Control.Feedback type="invalid">
                            กรุณาเลือกคำนำหน้าภาษาอังกฤษ
                          </Form.Control.Feedback>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustom04"
                      >
                        <Form.Label>ชื่อจริง</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="ชื่อจริง"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          กรุณากรอกชื่อจริงภาษาอังกฤษ
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustom05"
                      >
                        <Form.Label>นามสกุล</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="นามสกุล"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          กรุณากรอกนามสกุลภาษาอังกฤษ
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustom03"
                      >
                        <Form.Label>PREFIX</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          required
                        >
                          <option></option>
                          <option value="1"></option>
                          <option value="2"></option>
                          <option value="3"></option>
                          <Form.Control.Feedback type="invalid">
                            กรุณาเลือกเพศ
                          </Form.Control.Feedback>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustom04"
                      >
                        <Form.Label>NAME</Form.Label>
                        <Form.Control type="text" placeholder="NAME" required />
                        <Form.Control.Feedback type="invalid">
                          กรุณาเลือกอาชีพ
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustom05"
                      >
                        <Form.Label>LASTNAME</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="LASTNAME"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          กรุณาเลือกสถานะ
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustom05"
                      >
                        <Form.Label>เพศ</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          required
                        >
                          <option></option>
                          <option value="1"></option>
                          <option value="2"></option>
                          <option value="3"></option>
                          <Form.Control.Feedback type="invalid">
                            กรุณาเลือกคำนำหน้า
                          </Form.Control.Feedback>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustom03"
                      >
                        <Form.Label>อาชีพ</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          required
                        >
                          <option></option>
                          <option value="1"></option>
                          <option value="2"></option>
                          <option value="3"></option>
                          <Form.Control.Feedback type="invalid">
                            กรุณาเลือกคำนำหน้า
                          </Form.Control.Feedback>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustom04"
                      >
                        <Form.Label>สถานะ</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          required
                        >
                          <option></option>
                          <option value="1"></option>
                          <option value="2"></option>
                          <option value="3"></option>
                          <Form.Control.Feedback type="invalid">
                            กรุณาเลือกคำนำหน้า
                          </Form.Control.Feedback>
                        </Form.Select>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="5"
                        controlId="validationCustom04"
                      >
                        <Form.Label>เบอร์มือถือ</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Tel: 08X-XXX-XXXX"
                          required
                          name="tel"
                          id="tel"
                        />
                        <Form.Control.Feedback type="invalid">
                          กรุณากรอกเบอร์มือถือ
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="7"
                        controlId="validationCustom05"
                      >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          กรุณากรอกอีเมลล์
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="8"
                        controlId="validationCustom04"
                      >
                        <Form.Label>วันเดือนปีที่เกิด</Form.Label>
                        <Form.Control
                          type="date"
                          id="dob"
                          placeholder="YYYY-MM-DD"
                          value=""
                          onChange={(e) => setDate(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          กรุณากรอกอายุ
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustom05"
                      >
                        <Form.Label>อายุ</Form.Label>
                        <Form.Control
                          type="text"
                          value={calAge}
                          placeholder="อายุ"
                          //disabled
                          id="resultAge"
                        />
                        <Form.Control.Feedback type="invalid">
                          กรุณากรอกวันเดือนปัเกิด
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Row>
          <br></br>
          <Row>
            <div className="row">
              <div className="col-12">
                <Card>
                  <Card.Header as="h5">ที่อยู่</Card.Header>
                  <Card.Body>
                    <Card.Title></Card.Title>

                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="3"
                        controlId="validationCustom05"
                      >
                        <Form.Label>Zip</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="บ้านเลขที่"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          กรุณากรอกบ้านเลขที่
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="3"
                        controlId="validationCustom05"
                      >
                        <Form.Label>ถนน</Form.Label>
                        <Form.Control type="text" placeholder="ถนน" required />
                        <Form.Control.Feedback type="invalid">
                          กรุณากรอกชื่อถนน
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="3"
                        controlId="validationCustom04"
                      >
                        <Form.Label>ซอย</Form.Label>
                        <Form.Control type="text" placeholder="ซอย" required />
                        <Form.Control.Feedback type="invalid">
                          กรุณากรอกชื่อซอย
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="3"
                        controlId="validationCustom05"
                      >
                        <Form.Label>หมู่</Form.Label>
                        <Form.Control type="text" placeholder="หมู่" required />
                        <Form.Control.Feedback type="invalid">
                          กรุณากรอกหมู่
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="3"
                        controlId="validationCustom04"
                      >
                        <Form.Label>จังหวัด</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          required
                        >
                          <option></option>
                          <option value="1"></option>
                          <option value="2"></option>
                          <option value="3"></option>
                          <Form.Control.Feedback type="invalid">
                            กรุณาเลือกจังหวัด
                          </Form.Control.Feedback>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="3"
                        controlId="validationCustom04"
                      >
                        <Form.Label>อำเภอ</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          required
                        >
                          <option></option>
                          <option value="1"></option>
                          <option value="2"></option>
                          <option value="3"></option>
                          <Form.Control.Feedback type="invalid">
                            กรุณาเลือกอำเภอ
                          </Form.Control.Feedback>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="3"
                        controlId="validationCustom04"
                      >
                        <Form.Label>ตำบล</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          required
                        >
                          <option></option>
                          <option value="1"></option>
                          <option value="2"></option>
                          <option value="3"></option>
                          <Form.Control.Feedback type="invalid">
                            กรุณาเลือกตำบล
                          </Form.Control.Feedback>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="3"
                        controlId="validationCustom05"
                      >
                        <Form.Label>เลขที่ไปรษณีย์</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="เลขที่ไปรษณีย์"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          กรุณากรอกเลขที่ไปรษณีย์
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Check
                        required
                        label="ยินยอมการนำไปใช้ข้อมูลขอทาง โรงพยาบาล"
                        feedback="กรุณากดปุ่มยืนยัน"
                        feedbackType="invalid"
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>
                <br></br>
                <div className="row">
                  <div className="col-12">
                    <Button type="submit" align="right">
                      ลงทะเบียน
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Row>
          <br></br>
        </Container>
      </Form>
    </div>
  );
}

export default Guest_Regis;
