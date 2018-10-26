import React from 'react';
import {
    ControlLabel,
} from 'react-bootstrap';
import { Dropdown } from 'semantic-ui-react';
import './multiSelectDropdown.scss';

// const selected = ['Exporter'];
/* eslint-disable react/prop-types */
// const MultiSelectDropdown = ({ label, onChangeMethod, emptyOrNot, BusinesscategorysName, BusinessCategoryValue, optionList, meta: { touched, error } }) => (
const MultiSelectDropdown = ({ label, input, onChangeMethod, defaultValue, emptyOrNot, optionList, meta: { touched, error } }) => (
    <div
        className={emptyOrNot
        ? 'form-group labelActive' : 'form-group'}>
        <div
            id="multiSelectDropdown"
            className={!emptyOrNot && touched
            && error ? 'floatLabelWrap multiSelectDropdown errorBorder' : 'floatLabelWrap multiSelectDropdown'}>
            <input
                {...input}
                autoComplete="off"
                type="hidden"
                className="inputTxtStyle" />
            <Dropdown fluid multiple search selection options={optionList} defaultValue={defaultValue} onChange={onChangeMethod} />
            <ControlLabel className="labelTxt">{label}</ControlLabel>
            {!emptyOrNot && touched && error && <span className="error_text">{error}</span>}
        </div>
    </div>
);

export default MultiSelectDropdown;
