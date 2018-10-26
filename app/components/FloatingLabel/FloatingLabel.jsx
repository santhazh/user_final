import React from 'react';
import {
     ControlLabel
} from 'react-bootstrap';
import './FloatingLabel.scss';

const onlyNumbersAllowFunction = evt => {
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode === 101) {
        evt.preventDefault();
    }
};

const floatingLabelField = ({
    input, label, className, type, disabled, showEyeIcon, meta: { touched, error },
}) => (
    <div id={type === 'hidden' ? 'hideTextBox' : null} className={input.value === '' ? `form-group ${className}` : `form-group labelActive ${className}`}>
        <div className={(touched
            && error) ? 'floatLabelWrap errorBorder' : 'floatLabelWrap'}>
            <input
                {...input}
                autoComplete="off"
                type={type}
                onKeyPress={type === 'number' ? onlyNumbersAllowFunction : null}
                disabled={disabled}
                className="inputTxtStyle"
                />
            {showEyeIcon}
            <ControlLabel className="labelTxt">{label}</ControlLabel>
            {touched && ((
                error && (<span className="error_text">{error}</span>)
                ))}
        </div>
    </div>
);

export default floatingLabelField;
