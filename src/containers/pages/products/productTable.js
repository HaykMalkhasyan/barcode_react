import React from "react";
import {ListGroup, ListGroupItem, Table} from "reactstrap";
import photo6 from "../../../assets/images/empty_product.svg";
import Translate from "../../../Translate";
import EditButton from "../../../components/buttons/editButton";
import DeleteButton from "../../../components/buttons/deleteButton";
import SearchItem from "./searchGroup/searchItem";
import AdvancedSearch from "./searchGroup/advancedSearch/advancedSearch";

/*name change example to TableComponent*/

export default class TableComponent extends React.Component {

    onEditHandler = product => {
        this.props.toggleModal('edit', product.id)
        this.props.actions('get', product)
    }

    onDeleteHandler = id => {
        this.props.toggleModal('delete', id)
    }

    render() {

        return (
            <>
                <AdvancedSearch
                    searchItemsKey={this.props.searchProduct}
                    createError={this.props.createError}
                    classifiersModal={this.props.classifiersModal}
                    advancedSearchConfig={this.props.advancedSearchConfig}
                    groups={this.props.groups}
                    group={this.props.group}
                    classifiersToggleModal={this.props.classifiersToggleModal}
                    subGroups={this.props.subGroups}
                    selectClassifiersGroup={this.props.selectClassifiersGroup}
                    createClassifiers={this.props.createClassifiers}
                    selectGroupsNode={this.props.selectGroupsNode}
                    buttonName={'Advanced search'}
                />
                <Table responsive>
                    <thead>
                    <tr>
                        <th><Translate name={'image'}/></th>
                        <th><Translate name={'sku'}/></th>
                        <th><Translate name={'name'}/></th>
                        <th><Translate name={'suppliers'}/></th>
                        <th><Translate name={'barcode'}/></th>
                        <th><Translate name={'description'}/></th>
                        <th><Translate name={'active'}/></th>
                        <th><Translate name={'e/d'}/></th>
                    </tr>
                    </thead>
                    <tbody>
                    <SearchItem
                        setSearchProductValue={this.props.setSearchProductValue}
                        searchProduct={this.props.searchProduct}
                        searchErrorName={this.props.searchErrorName}
                    />
                    {
                        this.props.data ?
                            this.props.searchProductResult.length ?
                                this.props.searchProductResult.map(
                                    product => {

                                        return (
                                            <tr
                                                key={product.id}
                                            >
                                                <th scope="row">
                                                    <img
                                                        style={{height: 60}}
                                                        src={
                                                            product.image ?
                                                                product.image
                                                                :
                                                                photo6
                                                        }
                                                        alt="product-icon"
                                                    />
                                                </th>
                                                <td>
                                                    {
                                                        product.sku ?
                                                            product.sku
                                                            :
                                                            '-'
                                                    }
                                                </td>
                                                <td>{product.name}</td>
                                                <td>-</td>
                                                <td>
                                                    <ListGroup>
                                                        {
                                                            product.barcode ?
                                                                product.barcode.map(
                                                                    (item, index) => {

                                                                        return (
                                                                            <ListGroupItem
                                                                                key={index}
                                                                                className="border-0 justify-content-between p-0 pl-2 pr-2"
                                                                            >
                                                                                {item.barcode}{/*
                                                                        <Badge pill className="ml-1 font-small-1 p-1">
                                                                            {
                                                                                this.props.types.map(
                                                                                    type => type.id === parseInt(item.type) ?
                                                                                        type.name
                                                                                        :
                                                                                        null
                                                                                )
                                                                            }
                                                                        </Badge>*/}
                                                                            </ListGroupItem>
                                                                        )
                                                                    }
                                                                )
                                                                :
                                                                '-'
                                                        }
                                                    </ListGroup>
                                                </td>
                                                <td>-</td>
                                                <td>
                                                    {
                                                        product.active ?
                                                            <Translate name={'active'}/>
                                                            :
                                                            <Translate name={'inactive'}/>
                                                    }
                                                </td>
                                                <td>
                                                    <EditButton
                                                        perm={'Edit'}
                                                        onClick={this.onEditHandler.bind(this, product)}
                                                    />
                                                    <DeleteButton
                                                        perm={'Delete'}
                                                        onClick={this.onDeleteHandler.bind(this, product.id)}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    }
                                )
                                :
                                this.props.data.map(
                                    product => {

                                        return (
                                            <tr
                                                key={product.id}
                                            >
                                                <th scope="row">
                                                    <img
                                                        style={{height: 60}}
                                                        src={
                                                            product.image ?
                                                                product.image
                                                                :
                                                                photo6
                                                        }
                                                        alt="product-icon"
                                                    />
                                                </th>
                                                <td>
                                                    {
                                                        product.sku ?
                                                            product.sku
                                                            :
                                                            '-'
                                                    }
                                                </td>
                                                <td>{product.name}</td>
                                                <td>-</td>
                                                <td>
                                                    <ListGroup>
                                                        {
                                                            product.barcode ?
                                                                product.barcode.map(
                                                                    (item, index) => {

                                                                        return (
                                                                            <ListGroupItem
                                                                                key={index}
                                                                                className="border-0 justify-content-between p-0 pl-2 pr-2"
                                                                            >
                                                                                {item.barcode}{/*
                                                                        <Badge pill className="ml-1 font-small-1 p-1">
                                                                            {
                                                                                this.props.types.map(
                                                                                    type => type.id === parseInt(item.type) ?
                                                                                        type.name
                                                                                        :
                                                                                        null
                                                                                )
                                                                            }
                                                                        </Badge>*/}
                                                                            </ListGroupItem>
                                                                        )
                                                                    }
                                                                )
                                                                :
                                                                '-'
                                                        }
                                                    </ListGroup>
                                                </td>
                                                <td>-</td>
                                                <td>
                                                    {
                                                        product.active ?
                                                            <Translate name={'active'}/>
                                                            :
                                                            <Translate name={'inactive'}/>
                                                    }
                                                </td>
                                                <td>
                                                    <EditButton
                                                        perm={'Edit'}
                                                        onClick={this.onEditHandler.bind(this, product)}
                                                    />
                                                    <DeleteButton
                                                        perm={'Delete'}
                                                        onClick={this.onDeleteHandler.bind(this, product.id)}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    }
                                )
                            :
                            null
                    }
                    </tbody>
                </Table>
            </>
        );
    }
}