import React from 'react';

import {
    Button, Icon, Input, Segment
} from "semantic-ui-react";


class InputFile extends React.Component {

    state={value: ''};


    constructor(props) {
        super(props);

        const { value } = this.props;
        if (value) {
            this.state.value = value;
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick = (e) => {
        this.refs[this.props.id + "-inputfile-ref"].click();
        e.stopPropagation();
    };

    handleChange = (e, o) => {
        this.setState({value: e.target.value});
    };

    render() {
        return (
            <div>
                <Input ref={this.props.id + "-inputtext-ref"}
                       value={this.state.value}/>
                <Button type="button" onClick={this.handleClick}>
                    <input ref={this.props.id + "-inputfile-ref"}
                           type="file"
                           id={this.props.id + "inputfile-id"}
                           style={{display: "none"}}
                           onChange={(e, o) => this.handleChange(e,o)}/>
                    <Icon name={'file code outline'}/>
                </Button>
            </div>
        )
    }

}

export default InputFile;