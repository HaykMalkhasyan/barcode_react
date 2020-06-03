import React, {useState} from "react";
import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";
import MyChart from "./chart/chart";
import CustomizedTables from "../../../components/tableUi/tableUi";

const MainPage = props => {
    const [product] = useState([
        {id: 1, name: 'Active', value: '26'},
        {id: 2, name: 'Inactive', value: '6'},
        {id: 3, name: 'With image', value: '448'},
        {id: 4, name: 'Test classifier', value: '60'},
        {id: 5, name: 'Drinks classifier', value: '150'},
    ])

    const [user] = useState([
        {id: 1, name: 'Active', value: '26'},
        {id: 2, name: 'Inactive', value: '6'},
        {id: 3, name: 'Deleted', value: '448'},
    ])

    return (
        <>
            <Row>
                <Col md={12}>
                    <Card>
                        <CardHeader>
                            <h3 className='text-center'>Statistic for all</h3>
                        </CardHeader>
                        <CardBody className='mt-3'>
                            <Row>
                                <Col md={4}>
                                    <MyChart/>
                                </Col>
                                <Col md={8}>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, dignissimos
                                        doloribus dolorum fugit quia sapiente tenetur voluptatem! A ab at doloremque eos
                                        est harum inventore rerum sapiente, suscipit velit voluptatem.
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi
                                        architecto, asperiores, consectetur dolores earum esse est facilis ipsam nemo
                                        neque quibusdam rerum sit sunt ut vel veritatis voluptates voluptatum?
                                    </p>
                                    <p>
                                        <b className='mr-1'>Products,</b>
                                        <b className='mr-1'>Users,</b>
                                        <b className='mr-1'>Groups and subgroups,</b>
                                        <b className='mr-1'>Translations,</b>
                                        <b className='mr-1'>Positions,</b>
                                        <b className='mr-1'>Currency,</b>
                                        <b className='mr-1'>Partners,</b>
                                    </p>
                                    <p>
                                        <b>Edit menu - </b>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad animi asperiores
                                        earum hic id in ipsa, laboriosam natus similique ullam. Debitis delectus ducimus
                                        itaque maiores mollitia nulla odio quia tempore?
                                    </p>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <CardHeader>
                            <h3 className='text-center'>Products</h3>
                        </CardHeader>
                        <CardBody>
                            <CustomizedTables
                                data={product}
                            />
                            <div style={{alignItems: 'flex-end', background: 'rgb(245, 245, 245)', boxShadow: '0 2px 5px 0 rgba(0, 0, 0, .24)'}} className='d-flex justify-content-between p-1'>
                                <b className='text-left pl-2' style={{width: '100px'}}>All count</b>
                                <div style={{padding: 2, width: '100%'}}/>
                                <small className='pr-1'>678</small>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <CardHeader>
                            <h3 className='text-center'>Users</h3>
                        </CardHeader>
                        <CardBody>
                            <CustomizedTables
                                data={user}
                            />
                            <div style={{alignItems: 'flex-end', background: 'rgb(245, 245, 245)', boxShadow: '0 2px 5px 0 rgba(0, 0, 0, .24)'}} className='d-flex justify-content-between p-1'>
                                <b className='text-left pl-2' style={{width: '100px'}}>All count</b>
                                <div style={{padding: 2, width: '100%'}}/>
                                <small className='pr-1'>480</small>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <CardHeader>
                            <h3 className='text-center'>Groups</h3>
                        </CardHeader>
                        <CardBody>
                            <CustomizedTables
                                data={product}
                            />
                            <div style={{alignItems: 'flex-end', background: 'rgb(245, 245, 245)', boxShadow: '0 2px 5px 0 rgba(0, 0, 0, .24)'}} className='d-flex justify-content-between p-1'>
                                <b className='text-left pl-2' style={{width: '100px'}}>All count</b>
                                <div style={{padding: 2, width: '100%'}}/>
                                <small className='pr-1'>678</small>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <CardHeader>
                            <h3 className='text-center'>Subgroups</h3>
                        </CardHeader>
                        <CardBody>
                            <CustomizedTables
                                data={user}
                            />
                            <div style={{alignItems: 'flex-end', background: 'rgb(245, 245, 245)', boxShadow: '0 2px 5px 0 rgba(0, 0, 0, .24)'}} className='d-flex justify-content-between p-1'>
                                <b className='text-left pl-2' style={{width: '100px'}}>All count</b>
                                <div style={{padding: 2, width: '100%'}}/>
                                <small className='pr-1'>480</small>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <CardHeader>
                            <h3 className='text-center'>Translations</h3>
                        </CardHeader>
                        <CardBody>
                            <CustomizedTables
                                data={product}
                            />
                            <div style={{alignItems: 'flex-end', background: 'rgb(245, 245, 245)', boxShadow: '0 2px 5px 0 rgba(0, 0, 0, .24)'}} className='d-flex justify-content-between p-1'>
                                <b className='text-left pl-2' style={{width: '100px'}}>All count</b>
                                <div style={{padding: 2, width: '100%'}}/>
                                <small className='pr-1'>678</small>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <CardHeader>
                            <h3 className='text-center'>Currency</h3>
                        </CardHeader>
                        <CardBody>
                            <CustomizedTables
                                data={user}
                            />
                            <div style={{alignItems: 'flex-end', background: 'rgb(245, 245, 245)', boxShadow: '0 2px 5px 0 rgba(0, 0, 0, .24)'}} className='d-flex justify-content-between p-1'>
                                <b className='text-left pl-2' style={{width: '100px'}}>All count</b>
                                <div style={{padding: 2, width: '100%'}}/>
                                <small className='pr-1'>480</small>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <CardHeader>
                            <h3 className='text-center'>Positions</h3>
                        </CardHeader>
                        <CardBody>
                            <CustomizedTables
                                data={product}
                            />
                            <div style={{alignItems: 'flex-end', background: 'rgb(245, 245, 245)', boxShadow: '0 2px 5px 0 rgba(0, 0, 0, .24)'}} className='d-flex justify-content-between p-1'>
                                <b className='text-left pl-2' style={{width: '100px'}}>All count</b>
                                <div style={{padding: 2, width: '100%'}}/>
                                <small className='pr-1'>678</small>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default MainPage