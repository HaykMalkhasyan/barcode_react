import React from 'react';
import Select from 'react-select';


class App extends React.Component {
    handleChange = selectedOption => {
        this.props.handleChange(this.props.name,selectedOption)
    };
    render() {

        return (
            <Select
                isMulti
                color={"primary"}
                options={this.props.data}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={this.handleChange}
                theme={theme => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary25: '#e6e6e6',
                        primary: '#009da0',
                    },
                })}
            />
        );
    }
}
export default App