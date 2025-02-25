// src/pages/Auth/Signup.js
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const Signup = () => {
        const [formData, setFormData] = useState({
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            role: '',
        });

        const [error, setError] = useState('');
        const [isLoading, setIsLoading] = useState(false);
        const navigate = useNavigate();

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({...prev, [name]: value }));
        };

        const handleSubmit = async(e) => {
            e.preventDefault();
            console.log(formData)
            setIsLoading(true);
            setError('');

            try {
                await axios.post('http://localhost:3001/api/v0/auth/signup', formData);
                navigate('/login', {
                    state: { message: 'Account created successfully! Please log in.' },
                });
            } catch (err) {
                setError(err.response ?.data ?.message || 'Failed to create account');
            } finally {
                setIsLoading(false);
            }
        };
        return (      <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h1 className="text-center">Create an Account</h1>
                    
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="firstname" className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                placeholder="Enter your first name"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="lastname" className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                placeholder="Enter your last name"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="password" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="role" className="mb-3">
    <Form.Label>Role</Form.Label>
    <Form.Select 
        name="role" 
        value={formData.role} 
        onChange={handleChange} 
        required
    >
        <option value="">Select a role</option>
        <option value="Intern">Intern</option>
        <option value="Jr. Developer">Jr. Developer</option>
        <option value="Sr. Developer">Sr. Developer</option>
    </Form.Select>
</Form.Group>

                       
                        <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
                            {isLoading ? <Spinner animation="border" size="sm" /> : 'Sign Up'}
                        </Button>
                    </Form>

                    <div className="text-center mt-3">
                        Already have an account? <Link to="/login">Log in</Link>
                    </div>
                </Col>
            </Row>
        </Container>
)
        };

        export default Signup;