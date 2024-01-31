import React, { Component } from "react";
import { Container, Table, Button } from "semantic-ui-react";
import AddStudentModal from "./AddStudentModal";
import DeleteStudentModal from "./DeleteStudentModal";

class NinthClassStudent extends Component {
  state = {
    students: [],
    newStudentName: "",
    newStudentEmail: "",
    isModal: false,
    isDelete: false,
    studentId: null,
  };

  handleAddClick = () => {
    this.setState({ isModal: true });
  };

  handleAddModalClose = () => {
    this.setState({ isModal: false });
  };

  handleDeleteModalClick = (id) => {
    this.setState({ isDelete: true, studentId: id });
  };

  handleDeleteModalClose = () => {
    this.setState({ isDelete: false });
  };

  componentDidMount() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    fetch(baseUrl + `GetAllStudent`)
      .then((response) => response.json())
      .then((data) => {
        console.log("studentdata", data.data);
        this.setState({ students: data.data });
      })
      .catch((error) => console.error("Error fetching students:", error));
  }

  toggleAttendance = (id, currentStatus) => {
    // ... your existing code
  };

  render() {
    const { isModal, isDelete, studentId, students } = this.state;

    return (
      <div>
        <div style={{ marginTop: "20px" }}>
          <div
            style={{
              float: "right",
              marginRight: "100px",
              marginBottom: "20px",
            }}
          >
            <Button
              primary
              style={{ borderRadius: "0" }}
              onClick={this.handleAddClick}
            >
              ADD STUDENT
            </Button>
          </div>
          <AddStudentModal onOpen={isModal} onClose={this.handleAddModalClose} />
          <Container style={{ marginTop: "2em", width: "90%" }}>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>ID</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Student E-mail</Table.HeaderCell>
                  <Table.HeaderCell>Class</Table.HeaderCell>
                  <Table.HeaderCell>Present</Table.HeaderCell>
                  <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {students.map((student) => (
                  <Table.Row key={student?.s_Id}>
                    <Table.Cell>{student?.s_Id}</Table.Cell>
                    <Table.Cell>{student?.name}</Table.Cell>
                    <Table.Cell>{student?.email}</Table.Cell>
                    <Table.Cell>{student?.classNm}</Table.Cell>
                    <Table.Cell>
                      <Button
                        color={student.present ? "green" : "red"}
                        onClick={() =>
                          this.toggleAttendance(student.s_Id, student.present)
                        }
                      >
                        {student.present ? "Present" : "Absent"}
                      </Button>
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        color="red"
                        data={student?.id}
                        onClick={() => this.handleDeleteModalClick(student?.s_Id)}
                      >
                        Delete
                      </Button>
                      <DeleteStudentModal
                        onOpenDelete={isDelete}
                        onCloseDelete={this.handleDeleteModalClose}
                        data={studentId}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Container>
        </div>
      </div>
    );
  }
}

export default NinthClassStudent;
