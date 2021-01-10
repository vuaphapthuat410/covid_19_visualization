import React, { Component } from 'react';

import './style.css';

class DatePiker extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount = () => { 
        const { id } = this.props;

        window.$(`#${id}`).datepicker({
            format: "dd/mm/yyyy"
        });

        window.$(`#datepicker${id}`).on("change", (value) => {
            var selectedD = window.$(value.target).val();
            this.props.onChange(selectedD);
        });
    }


    componentDidUpdate = () => {
    }

    render() {
        const { id } = this.props;
        return (
            <React.Fragment>
               <div id={`datepicker${id}`} className='container'>
                    <div className="input-group">
                        <input id={`${id}`} type="text" className="form-control date-input"/>
                        <label className="input-group-btn" for="txtDate">
                            <span className="btn btn-default">
                                <span className="glyphicon glyphicon-calendar"></span>
                            </span>
                        </label>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default DatePiker;

