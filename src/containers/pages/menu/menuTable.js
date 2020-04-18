import React from "react";
import { Table/*, Input */} from "reactstrap";
import { Edit, Trash2 } from "react-feather";

import coffeeMug from "../../../assets/img/elements/01.png";
import camera from "../../../assets/img/elements/11.png";
import headphone from "../../../assets/img/elements/07.png";
import beer from "../../../assets/img/elements/14.png";
import penDrive from "../../../assets/img/elements/04.png";

/*name change example to TableComponent*/

export default class TableComponent extends React.Component {
    render() {
        return (
            <Table responsive>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Իկոնկա</th>
                    <th>ԱՆվանոմ</th>
                    <th>ԱՊՄ</th>
                    <th>Ակտիվ</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">
                        <img
                            src={coffeeMug}
                            alt="coffee-mug"
                            className="img-fluid width-50"
                        />
                    </th>
                    <td>Coffee Mug</td>
                    <td>4545656556322</td>
                    <td>4545656</td>
                    <td>Այո</td>
                    <td>
                        <Edit size={18} className="mr-2" />{" "}
                        <Trash2 size={18} color="#FF586B" />
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <img
                            src={headphone}
                            alt="head-phon"
                            className="img-fluid width-50"
                        />
                    </th>
                    <td>Headphone</td>
                    <td>4545656556322</td>
                    <td>4545656</td>
                    <td>Այո</td>
                    <td>
                        <Edit size={18} className="mr-2" />{" "}
                        <Trash2 size={18} color="#FF586B" />
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <img
                            src={camera}
                            alt="camera"
                            className="img-fluid width-50"
                        />
                    </th>
                    <td>Camera</td>
                    <td>4545656556322</td>
                    <td>4545656</td>
                    <td>Այո</td>
                    <td>
                        <Edit size={18} className="mr-2" />{" "}
                        <Trash2 size={18} color="#FF586B" />
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <img
                            src={beer}
                            alt="beer"
                            className="img-fluid width-50"
                        />
                    </th>
                    <td>Beer</td>
                    <td>4545656556322</td>
                    <td>4545656</td>
                    <td>Այո</td>
                    <td>
                        <Edit size={18} className="mr-2" />{" "}
                        <Trash2 size={18} color="#FF586B" />
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <img
                            src={penDrive}
                            alt="pend-drive"
                            className="img-fluid width-50"
                        />
                    </th>
                    <td>Pendrive</td>
                    <td>4545656556322</td>
                    <td>4545656</td>
                    <td>Այո</td>
                    <td>
                        <Edit size={18} className="mr-2" />{" "}
                        <Trash2 size={18} color="#FF586B" />
                    </td>
                </tr>
                </tbody>
            </Table>
        );
    }
}