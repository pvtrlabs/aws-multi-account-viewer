// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { API } from 'aws-amplify';
import Table from './Table';

export default class AllNetworkInterfaces extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            instances: [],
            isLoading: true
        };
    }

    componentDidMount() {

        // API Gateway
        let apiName = 'MyAPIGatewayAPI';
        let querypath = '/search/?scan=network-interfaces';

        // Loading 
        this.setState({ isLoading: true });

        // Scan DynamoDB for results
        API.get(apiName, querypath).then(response => {
            this.setState({
                instances: response,
                isLoading: false
            });
        })
            .then(response => {
                console.log(this.state.instances)
            })
            .catch(error => {
                this.setState({ error, isLoading: false })
                console.log(error.response)
            });
    }
    render() {

        const { isLoading, error, instances } = this.state;

        if (error) {
            return <div className="default"><h1><center><br></br>{error.message}</center></h1></div>;
        }

        if (isLoading) {
            return <div className="default"><h1><center><br></br>Loading ...</center></h1></div>;
        }

        const columns = [
            {
                dataField: 'Id',
                text: 'Id',
                hidden: true,
            }, {
                dataField: 'AccountNumber',
                text: 'Account',
                sort: true
            }, {
                dataField: 'Region',
                text: 'Region',
                sort: true
            },{
                dataField: 'PublicIp',
                text: 'PublicIp',
                sort: true
            }, {
                dataField: 'PrivateIpAddress',
                text: 'PrivateIpAddress',
                sort: true
            }, {
              dataField: 'Primary',
              text: 'Primary',
              sort: true
          }, {
                dataField: 'Status',
                text: 'Status',
                sort: true
            }, {
                dataField: 'AttStatus',
                text: 'AttStatus',
                sort: true
            },{
                dataField: 'InterfaceType',
                text: 'InterfaceType',
                sort: true
            }, {
                dataField: 'NetworkInterfaceId',
                text: 'NetworkInterfaceId',
                sort: true
            }, {
                dataField: 'SubnetId',
                text: 'SubnetId',
                sort: true
            }, {
                dataField: 'VpcId',
                text: 'VpcId',
                sort: true
            }, {
                dataField: 'CidrBlock',
                text: 'CidrBlock',
                sort: true
            }, {
                dataField: 'Description',
                text: 'Description',
                sort: true,
                hidden: true
            }
        ]
        return (
                <div className="default" style={{ padding: "20px", fontSize: "14px" }}>
                    <center><h2>All Network Interfaces</h2></center>
                    <br />
                    <Table data={instances}
                           columns={columns}
                           id="Id"
                           sort="AccountNumber"
                           search="name"/>
                </div>
                )
    }
}






