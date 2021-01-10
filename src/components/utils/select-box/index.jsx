import React, { Component } from 'react';


class SelectBox extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount = () => {
        const { id } = this.props;

        window.$(`select#${id}`).on("change", (value) => {
            var selectedD = window.$(value.target).val();
            this.props.onChange(selectedD);
        });
    }

    render() {
        const { id, value, width } = this.props;

        return (
            <React.Fragment>
                <select
                    id={id}
                    className="dropdown selectpicker show-menu-arrow show-tick form-control"
                    title="Pelaajat"
                    data-width="50%"
                    data-size="auto"
                    style={{width: width, margin: 'auto'}}
                >
                    <optgroup>
                        {
                            value && value.map(item => {
                                return (
                                    <option value={item.value}>{item.text}</option>
                                )
                            })
                        }
                    </optgroup>
                </select>
            </React.Fragment>
        )
    }
}

export default SelectBox;