// import { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
// import { useAuth } from '../../context/authContext';
// import axios from 'axios';

// const Login = () => {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const [isLoading, setIsLoading] = useState(false);

//     const { login } = useAuth();
//     const navigate = useNavigate();
//     const location = useLocation();

   
//     useEffect(() => {
//         if (location.state?.message) {
//             setSuccess(location.state.message);
//         }

    
//         const token = localStorage.getItem('token');
//         if (token) {
//             navigate('/dashboard');
//         }
//     }, [location, navigate]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setError('');
//         setSuccess('');

//         try {
//             const response = await axios.post('http://localhost:3001/api/v0/auth/login', formData);

//             if (response.data.success) {
//                 login(response.data.user, response.data.token);
//                 if (response.data.user.role === 'admin') {
//                     navigate('/admin-dashboard');
//                 } else {
//                     navigate('/dashboard');
//                 }
//             }
//         } catch (err) {
//             setError(err.response?.data?.message || 'Invalid email or password');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <Container className="mt-5">
//             <Row className="justify-content-md-center">
//                 <Col xs={12} md={6}>
//                     <h1 className="text-center">Log In</h1>

//                     {error && <Alert variant="danger">{error}</Alert>}
//                     {success && <Alert variant="success">{success}</Alert>}

//                     <Form onSubmit={handleSubmit}>
//                         <Form.Group controlId="email" className="mb-3">
//                             <Form.Label>Email</Form.Label>
//                             <Form.Control
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 placeholder="Enter your email"
//                                 required
//                             />
//                         </Form.Group>

//                         <Form.Group controlId="password" className="mb-3">
//                             <Form.Label>Password</Form.Label>
//                             <Form.Control
//                                 type="password"
//                                 name="password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 placeholder="Enter your password"
//                                 required
//                             />
//                         </Form.Group>

//                         <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
//                             {isLoading ? <Spinner animation="border" size="sm" /> : 'Log In'}
//                         </Button>
//                     </Form>

//                     <div className="text-center mt-3">
//                         Don't have an account? <Link to="/signup">Sign up</Link>
//                     </div>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default Login;


// import { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
// import { useAuth } from '../../context/authContext';
// import axios from 'axios';
// import loginImage from './login.jpg';

// const Login = () => {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const [isLoading, setIsLoading] = useState(false);

//     const { login } = useAuth();
//     const navigate = useNavigate();
//     const location = useLocation();

//     useEffect(() => {
//         if (location.state?.message) {
//             setSuccess(location.state.message);
//         }

//         const token = localStorage.getItem('token');
//         if (token) {
//             navigate('/dashboard');
//         }
//     }, [location, navigate]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setError('');
//         setSuccess('');

//         try {
//             const response = await axios.post('http://localhost:3001/api/v0/auth/login', formData);

//             if (response.data.success) {
//                 login(response.data.user, response.data.token);
//                 if (response.data.user.role === 'admin') {
//                     navigate('/admin-dashboard');
//                 } else {
//                     navigate('/dashboard');
//                 }
//             }
//         } catch (err) {
//             setError(err.response?.data?.message || 'Invalid email or password');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <Container className="mt-5">
//             <Row className="justify-content-center">
//                 <Col md={6} className="d-none d-md-block">
//                 <img src={loginImage} alt="Login" className="img-fluid" />

//                 </Col>
//                 <Col xs={12} md={6}>
//                     <h1 className="text-center">Log In</h1>

//                     {error && <Alert variant="danger">{error}</Alert>}
//                     {success && <Alert variant="success">{success}</Alert>}

//                     <Form onSubmit={handleSubmit}>
//                         <Form.Group controlId="email" className="mb-3">
//                             <Form.Label>Email</Form.Label>
//                             <Form.Control
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 placeholder="Enter your email"
//                                 required
//                             />
//                         </Form.Group>

//                         <Form.Group controlId="password" className="mb-3">
//                             <Form.Label>Password</Form.Label>
//                             <Form.Control
//                                 type="password"
//                                 name="password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 placeholder="Enter your password"
//                                 required
//                             />
//                         </Form.Group>

//                         <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
//                             {isLoading ? <Spinner animation="border" size="sm" /> : 'Log In'}
//                         </Button>
//                     </Form>

//                     <div className="text-center mt-3">
//                         Don't have an account? <Link to="/signup">Sign up</Link>
//                     </div>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default Login;
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import loginImage from './login.jpg';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.message) {
            setSuccess(location.state.message);
        }

        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }
    }, [location, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:3001/api/v0/auth/login', formData);

            if (response.data.success) {
                login(response.data.user, response.data.token);
                if (response.data.user.role === 'admin') {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/dashboard');
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Row className="w-100 justify-content-center">
                <Col md={6} className="d-none d-md-block">
                    <img src={loginImage} alt="Login" className="img-fluid" />
                </Col>
                <Col xs={12} md={6} className="d-flex flex-column justify-content-center">
                    <h1 className="text-center">Log In</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}

                    <Form onSubmit={handleSubmit}>
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

                        <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
                            {isLoading ? <Spinner animation="border" size="sm" /> : 'Log In'}
                        </Button>
                    </Form>

                    <div className="text-center mt-3">
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
