import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'
function App() {

  const [instructorData, setInstructorData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [aboutInstructorData, setAboutInstructorData] = useState([]);
  const [testimonialData, setTestimonialData] = useState([]);







  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching data for instructor
        const instructorResponse = await axios.get('https://test-psp5.vercel.app:3031/instructor');
        setInstructorData(instructorResponse.data);


        // Fetching data for course
        const courseResponse = await axios.get('https://test-psp5.vercel.app:3031/course');
        setCourseData(courseResponse.data);


        // Fetching data for about_instructor
        const aboutInstructorResponse = await axios.get('https://test-psp5.vercel.app:3031/about_instructor');
        setAboutInstructorData(aboutInstructorResponse.data);

        // Fetching data for testimonial
        const testimonialResponse = await axios.get('https://test-psp5.vercel.app:3031/testimonial');
        setTestimonialData(testimonialResponse.data)



      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const aboutRef = useRef(null);
  const instructorRef = useRef(null);
  const reviewsRef = useRef(null);


  const scrollToInstructor = () => {
    instructorRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    aboutRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToReviews = () => {
    reviewsRef.current.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <>

      <div className='top-image-div' style={{ position: 'relative' }}>

        <img className='top-image' src='https://cdn.pixabay.com/photo/2023/12/06/08/41/mountain-8433234_1280.jpg' alt='Mountain'></img>

        <div className='d-flex flex-column t-t position-absolute' style={{ top: '70%', left: '38%', transform: 'translate(-50%, -50%)', color: 'white', }}>
          <h2>{instructorData.name}</h2>
          <h2>{courseData.title}</h2>
        </div>

      </div>


      <div className='container div2 '>
        <div className='row'>

          <div className='col-md-8 d2-left'>

            <nav className="navbar navbar-expand-lg ">

              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <a className="nav-link fw-bold" href="#" onClick={scrollToAbout}>About</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link fw-bold" href="#" onClick={scrollToInstructor}>Instructor</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link fw-bold" href="#" onClick={scrollToReviews}>Reviews</a>
                  </li>

                </ul>
              </div>
            </nav>


            <div className='abt' ref={aboutRef}>
              <h2>About the course</h2>



              <p className="mb-2">
                {courseData && courseData.about ? `${courseData.about.html_content}` : 'N/A'}
              </p>





              <div>
                <h2>What to expect</h2>
                {courseData && courseData.what_to_expect ? (
                  <ul>
                    {courseData.what_to_expect.html_content.split('</li>').map((item, index) => (
                      item.trim() && <li key={index}>{item.replace(/<li>/g, '')}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No information available about what to expect.</p>
                )}
              </div>



              <h2>Key topics covered</h2>
              <div>
                {courseData && courseData.key_topics ? (
                  <ol>
                    {courseData.key_topics.html_content
                      .split('</li>')
                      .map((item, index) => (
                        item.trim() && <li key={index}>{item.replace(/<li>/g, '').trim()}</li>
                      ))}
                  </ol>
                ) : (
                  <p>No information available about key topics covered.</p>
                )}
              </div>


            </div>

          </div>
          <div className='col-md-4 d2-right'>

            <div className='course-box'>

              <div className="card" >
                <div className="card-body m-4">
                  <h5 className="card-title fw-bold">Course fees</h5>
                  <h2 className="card-subtitle mb-2 text-body-secondary fw-bold">
                    {courseData && courseData.fee ? `${courseData.fee.currency}${courseData.fee.amount}` : 'N/A'}
                  </h2>

                  <p className="card-text fw-bold">Whats included</p>
                  <ul>
                    {courseData && courseData.inclusions ? (
                      Object.entries(courseData.inclusions).map(([key, value]) => (
                        <li key={key}>
                          <strong>{key.replace(/_/g, ' ')}:</strong> {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                        </li>
                      ))
                    ) : (
                      <li>No inclusions available</li>
                    )}
                  </ul>

                  <button className='btn btn-primary mt-2'>Register Today</button>




                </div>
              </div>

            </div>
          </div>


          <div className='about row' ref={instructorRef}>

            <div className='mb-3'><h2>About the instructor</h2></div>
            <div className='row'>

              <div className='col-md-2'>


                <div className="" >
                  <img src="https://cdn.pixabay.com/photo/2019/11/29/17/05/hand-4661763_1280.jpg" className="profile" alt="..." />

                </div>




              </div>
              <div className='col-md-5'>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut luctus in augue in congue. Donec non sodales mi. Integer fermentum nisl eget risus suscipit, quis laoreet tellus cursus. Pellentesque id odio porta, commodo lectus vel, luctus lacus. Sed erat nulla, efficitur vel tortor quis, vestibulum pharetra mauris. Nullam dictum odio venenatis vestibulum dignissim. Vestibulum porta ultricies nulla, ac sodales diam fringilla non. In iaculis semper sapien, a lobortis est scelerisque a. Suspendisse in ornare est. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi sed sagittis quam. Donec eget massa interdum, laoreet tortor non, rutrum ipsum. Etiam a pellentesque libero. Sed blandit, dui a fermentum</p>

                <div className='row mt-4 mb-4'>
                  <div className='col-6'><i class="fa-brands fa-facebook"> </i>  Facebook </div>
                  <div className='col-6'><i class="fa-brands fa-twitter"></i>  Twitter </div>

                </div>
              </div>
              <div className='col-md-5'>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut luctus in augue in congue. Donec non sodales mi. Integer fermentum nisl eget risus suscipit, quis laoreet tellus cursus. Pellentesque id odio porta, commodo lectus vel, luctus lacus. Sed erat nulla, efficitur vel tortor quis, vestibulum pharetra mauris. Nullam dictum odio venenatis vestibulum dignissim. Vestibulum porta ultricies nulla, ac sodales diam fringilla non. In iaculis semper sapien, a lobortis est scelerisque a. Suspendisse in ornare est. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi sed sagittis quam. Donec eget massa interdum, laoreet tortor non, rutrum ipsum. Etiam a pellentesque libero. Sed blandit, dui a fermentum</p>

                <div className='row mt-4 mb-4'>
                  <div className='col-6'><i class="fa-brands fa-youtube"></i> Youtube </div>
                  <div className='col-6'><i class="fa-brands fa-instagram">  </i> Instagram </div>

                </div>

              </div>


            </div>




          </div>

        </div>
      </div>

      {/* <div className='bottom-div container-fluid card'>

        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="10000">
              <img src="https://cdn.pixabay.com/photo/2023/12/19/21/19/girls-8458409_1280.jpg" className="d-block w-100 h-50" alt="..." />
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="https://media.istockphoto.com/id/514318830/photo/two-children-rowing-kayak-on-lake.jpg?s=2048x2048&w=is&k=20&c=SLKijV4PcdXwRmzYcDn1VapVNIMUYFP04kCHpSFIdgw=" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://cdn.pixabay.com/photo/2023/12/08/08/58/sea-8437245_1280.jpg" className="d-block w-100" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>


      </div> */}
      <div className='bottom-div container-fluid' ref={reviewsRef}>

        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="10000">
              {/* <img src="https://cdn.pixabay.com/photo/2023/12/19/21/19/girls-8458409_1280.jpg" className="d-block w-100 h-10" alt="..." /> */}

              <div className='c-card'>

                <p className='fw-bold text-center'>{testimonialData.text}</p>

                <div className='row'>

                  <div className='col-4 border r'>

                    <div className="" >
                      <img src="https://cdn.pixabay.com/photo/2014/12/16/22/25/woman-570883_1280.jpg" className="profile2" alt="..." />

                    </div>

                  </div>
                  <div className='col-8 border'>
                    <p className='mb-0'></p>

                    <p className='mb-0'>{testimonialData.reviewer_name}</p>
                    <p className='mb-0'>{testimonialData.reviewer_designation}</p>

                  </div>

                </div>
              </div>
            </div>

          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>


      </div>



    </>
  );
}

export default App;



