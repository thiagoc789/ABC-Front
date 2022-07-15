import React, { useState } from "react";

// React-Bootstrap
import Form from "react-bootstrap/Form";

import Button from 'react-bootstrap/Button';

import API from "../services/apiRoutes.js";
import {
  Card,
  CardHeader,
  Row,
  Col,
  CardTitle,
} from "reactstrap";

const CreateMyModel = () => {

    const [data, setData] = useState({
        title: "",
        description: "",
        image_url: "",
    });
    const [errors, setErrors] = useState({
        title: "",
        description: "",
        image_url: "",
    });


    const handleChange = ({ currentTarget: input }) => {
        let newData = { ...data };
        newData[input.name] = input.value;
        setData(newData);
    };

    const handleImageChange = (e) => {
        let newData = { ...data };
        newData["image_url"] = e.target.files[0];
        setData(newData);
    };

    const doSubmit = async (e) => {
        e.preventDefault();
        const response = await API.createMyModelEntry(data);
        if (response.status === 400) {
            setErrors(response.data);
        }
    };

    return (
      <div className="content">
        <div class="col-md-12 bg-light text-center">
              <Row>
          <Col md="12">
            <Card>
            <CardHeader>
                <CardTitle tag="h4">Crear Un Nuevo Evento</CardTitle>
            </CardHeader>

        <Form>
            <Row>
            <Col md="12">
            <div class="col-md-5 bg-light text-center"> 
                <Form.Group className="mb-3" controlId="titleInput">
                    <Form.Label align="center">Title</Form.Label>
                    <Form.Control
                        align="center"
                        type="text"
                        name="title"
                        value={data.title}
                        isInvalid={errors.title}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        maxLength={80}
                    />
                    {errors.title && (
                        <Form.Text className="alert-danger" tooltip>
                            {errors.title}
                        </Form.Text>
                    )}
                </Form.Group>
                </div>
                </Col>
            </Row>
            <Row>
            <Col md="12">
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>My Image</Form.Label>
                    <Form.Control
                        align="center"
                        type="file"
                        name="image_url"
                        accept="image/jpeg,image/png,image/gif"
                        onChange={(e) => {
                            handleImageChange(e);
                        }}
                    />
                    {errors.image_url && (
                        <Form.Text className="alert-danger" tooltip>
                            {errors.image_url}
                        </Form.Text>
                    )}
                </Form.Group>
                </Col>
            </Row>
            <Form.Group className="mb-3" controlId="descriptionInput">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={10}
                    name="description"
                    value={data.description}
                    isInvalid={errors.description}
                    onChange={(e) => {
                        handleChange(e);
                    }}
                />
                {errors.description && (
                    <Form.Text className="alert-danger" tooltip>
                        {errors.description}
                    </Form.Text>
                )}

            </Form.Group>
            <Button variant="primary" type="submit"  onClick={(e) => doSubmit(e)}>Primary
            </Button>{' '}
            
        </Form>
        
        </Card>
          </Col>
        </Row>
    </div>
    </div>
    );
};

export default CreateMyModel;