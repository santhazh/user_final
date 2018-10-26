import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import './GroupManagement.scss';
// import _filter from 'lodash/filter';
// import _uniq from 'lodash/uniq';
// import PropTypes from 'prop-types';
import AddNewGroup from './AddGroup/AddGroup';

export class GroupManagement extends Component {
    constructor() {
        super();
        this.state = {
            isnewGroup: false
        };
        this.count = 0;
        this.isAddGroupClicked = true;
        this.generateUniqueId = {};
    }

    addNewGroup = () => {
        this.setState({
            isnewGroup: true,
            isAddGroupClicked: true
        });
    }

    noNewGroup = () => {
        this.setState({
            isnewGroup: false
        });
    }

    render () {
        const { isnewGroup, isAddGroupClicked } = this.state;

        return (
            <div className="container">
                <Row>
                    {isAddGroupClicked && <AddNewGroup isNewGroup={isnewGroup} setNewGroupfalse={this.noNewGroup}/>}
                    <div onClick={this.addNewGroup}>
                        <Col xs={4} className="gm-add-group">
                            <span className="gm-new-group-title">
                                Add New Group
                            </span>
                        </Col>
                    </div>
                </Row>
            </div>
        );
    }
}

export default GroupManagement;
