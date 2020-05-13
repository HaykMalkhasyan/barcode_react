import React, {Component} from "react";
import TextFields from "../../../../components/textFieldUI/textField";
import Translate from "../../../../Translate";
import * as Icon from 'react-feather';

class SearchItem extends Component {

    searchProductHandler = (value, name) => {
        this.props.setSearchProductValue(value, name)
    }


    render() {

        return (
            <tr>
                <td/>
                <td>
                    <TextFields
                        label={<Translate name={'search'}/>}
                        type={'search'}
                        value={this.props.searchProduct.sku}
                        name={'sku'}
                        onChange={event => this.searchProductHandler(event.target.value, event.target.name)}
                        style={{
                            width: '100%'
                        }}
                    />
                    {
                        this.props.searchErrorName === 'sku' ?
                            <span className="info font-small-1">
                                <Icon.AlertCircle size={15} className="danger mr-1"/>
                                <Translate name={'the search returned no result'}/>
                            </span>
                            :
                            null
                    }
                </td>
                <td>
                    <TextFields
                        label={<Translate name={'search'}/>}
                        type={'search'}
                        value={this.props.searchProduct.name}
                        name={'name'}
                        onChange={event => this.searchProductHandler(event.target.value, event.target.name)}
                        style={{
                            width: '100%'
                        }}
                    />
                    {
                        this.props.searchErrorName === 'name' ?
                            <span className="info font-small-1">
                                <Icon.AlertCircle size={15} className="danger mr-1"/>
                                <Translate name={'the search returned no result'}/>
                            </span>
                            :
                            null
                    }
                </td>
                <td>
                    <TextFields
                        label={<Translate name={'search'}/>}
                        type={'search'}
                        value={this.props.searchProduct.suppliers}
                        name={'suppliers'}
                        onChange={event => this.searchProductHandler(event.target.value, event.target.name)}
                        style={{
                            width: '100%'
                        }}
                    />
                    {
                        this.props.searchErrorName === 'suppliers' ?
                            <span className="info font-small-1">
                                <Icon.AlertCircle size={15} className="danger mr-1"/>
                                <Translate name={'the search returned no result'}/>
                            </span>
                            :
                            null
                    }
                </td>
                <td>
                    <TextFields
                        label={<Translate name={'search'}/>}
                        type={'search'}
                        value={this.props.searchProduct.barcode}
                        name={'barcode'}
                        onChange={event => this.searchProductHandler(event.target.value, event.target.name)}
                        style={{
                            width: '100%'
                        }}
                    />
                    {
                        this.props.searchErrorName === 'barcode' ?
                            <span className="info font-small-1">
                                <Icon.AlertCircle size={15} className="danger mr-1"/>
                                <Translate name={'the search returned no result'}/>
                            </span>
                            :
                            null
                    }
                </td>
                <td>
                    <TextFields
                        label={<Translate name={'search'}/>}
                        type={'search'}
                        value={this.props.searchProduct.description}
                        name={'description'}
                        onChange={event => this.searchProductHandler(event.target.value, event.target.name)}
                        style={{
                            width: '100%'
                        }}
                    />
                    {
                        this.props.searchErrorName === 'description' ?
                            <span className="info font-small-1">
                                <Icon.AlertCircle size={15} className="danger mr-1"/>
                                <Translate name={'the search returned no result'}/>
                            </span>
                            :
                            null
                    }
                </td>
                <td/>
                <td/>
            </tr>
        )
    }
}

export default SearchItem