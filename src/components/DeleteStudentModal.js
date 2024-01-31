import React, { Component } from "react";
import { connect } from "react-redux";
import { Button,  Icon, Modal } from "semantic-ui-react";
import { fetchStudentList } from "../Redux/Action";

class DeleteStudentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModal: false,
      newStudentName: "",
      newStudentEmail: "",
      newStudentClass: "",
    };
  }

  // ----- Delete student start -----//

  handleDelete = async () => {
    const {data, onCloseDelete } = this.props;
    const baseUrl = process.env.REACT_APP_BASE_URL;
    try {
      const response = await fetch(baseUrl + `Students/${data}`, {
        method: "DELETE",
      });

      if (response.ok) {
        this.props.loaduserdata();
        onCloseDelete()
       
      } else {
        console.error("Failed to delete entry");
        onCloseDelete()

      }
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  // ----- Delete student end -----//

  render() {
    const { onOpenDelete, onCloseDelete } = this.props;
   

    return (
      <>
        <Modal open={onOpenDelete} onClose={onCloseDelete} style={{ width: "45%" }}>
          <Modal.Header>
            Delete Student
            <div
              onClick={onCloseDelete}
              style={{ float: "right", cursor: "pointer" }}
            >
              <Icon disabled name="close" />
            </div>
          </Modal.Header>
          <Modal.Content>
            <p> Are you sure you want to delete this student</p>
          </Modal.Content>
          
          <Modal.Actions>
            <Button basic color="red" onClick={onCloseDelete}>
              CANCEL
            </Button>
            <Button color="green" inverted onClick={this.handleDelete}>
             DELETE STUDENT
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    student: state.student,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loaduserdata: () => dispatch(fetchStudentList()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DeleteStudentModal);
