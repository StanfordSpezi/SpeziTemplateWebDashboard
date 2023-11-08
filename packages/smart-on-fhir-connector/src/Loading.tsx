/*

This source file is part of the Stanford Spezi SMART-on-FHIR open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
   
*/
import React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
// import logo from '../public/spezi_logo.png';

const Loading = () => {
    return (
    <Container>
        <Row>
            <div className="mx-auto mt-5 mb-5 text-center" style={{ width: '500px'}}>
                {/* <img src={logo} style={{ width: 200 }}alt="Spezi Logo"/> */}
                <br />
                <h2>Spezi</h2>
                <br />
                <h4 className="lead">Loading Spezi dashboard...</h4>
                <br />
                <Spinner animation="border" role="status" />
            </div>
        </Row>
    </Container>
    )
}

export default Loading;