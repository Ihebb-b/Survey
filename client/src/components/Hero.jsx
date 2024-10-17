import { Container, Card, Button, Form, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useState } from 'react';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    gender: '',
    ageMin: '',
    ageMax: '',
    country: '',
  });

  const handleSearch = () => {
    // Implement search functionality here
    console.log('Search Query:', searchQuery);
    console.log('Filters:', filters);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className='py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center text-4xl font-bold mb-4'>Statistics Observatory</h1>
          <p className='text-center mb-4'>
            Search and explore health statistics across various demographics.
          </p>

          {/* Search Bar */}
          <Form className='w-100 mb-4'>
            <Row>
              <Col md={9}>
                <Form.Control
                  type='text'
                  placeholder='Search statistics...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Col>
              <Col md={2}>
                <Button variant='primary' onClick={handleSearch} className='w-100'>
                  Search
                </Button>
              </Col>
            </Row>
          </Form>

            {/* Filter Buttons Section */}
          <div className='d-flex flex-wrap justify-content-center'>
            <Button className="bg-gray-500 text-white hover:bg-gray-600 m-2">
              Sport practicing
            </Button>
            <Button className="bg-gray-500 text-white hover:bg-gray-600 m-2">
              Healthiest foods
            </Button>
            <Button className="bg-gray-500 text-white hover:bg-gray-600 m-2">
              Pizza consumed during one year
            </Button>
            <Button className="bg-gray-500 text-white hover:bg-gray-600 m-2">
              Weather and foods
            </Button>
            <Button className="bg-gray-500 text-white hover:bg-gray-600 m-2">
              Saty slim
            </Button>
            <Button className="bg-gray-500 text-white hover:bg-gray-600 m-2">
              Or not
            </Button>
            
          </div>

        </Card>
      </Container>
    </div>
  );
};

export default Hero;
