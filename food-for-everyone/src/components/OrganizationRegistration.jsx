import '../assets/css/OrganizationalRegistration.css'
// import image from '../images/images1.jpg'
export const OraganizationRegistration = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get('value');
    console.log(value)
    return (
        <>
            {/* <div className="landing-hero">
                <img src={image} alt="" className="home-hero-image-copy" />
                <div className="_1080p-wrapper">
                    <div className="homepage-main-container">
                        <h1 className="home-hero-header">Food for Everyone is reducing food loss and waste through surplus food redistribution</h1>
                    </div>
                </div> 
            </div> */}
            <div className="container my-5">
                <form className="mx-5 px-5 organizationForm">
                    <h2 className="text-center my-5 heading">Organization Registration Form</h2>
                    <h3 className="my-4 heading3">Organization Information</h3>
                    <div className="mb-3">
                        <label htmlFor="organizationName" className="form-label OrganizationLabel mt-2">Organization Name <span className="text-danger">*</span></label>
                        <input type="text" className="form-control registrationInput" id="organizationName" required="required" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="organizationStreet" className="form-label OrganizationLabel mt-2">Street Address<span className="text-danger">*</span></label>
                        <input type="text" className="form-control registrationInput" id="organizationStreet" required="required" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="organizationTown" className="form-label OrganizationLabel mt-2">Town / City<span className="text-danger">*</span></label>
                        <input type="text" className="form-control registrationInput" id="organizationTown" required="required" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="organizationTime" className="form-label OrganizationLabel mt-2">What are your operating hours?<span className="text-danger">*</span></label>
                        <input type="text" className="form-control registrationInput" id="organizationTime"  required="required" />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="organizationAbout" className="form-label OrganizationLabel mt-2">Please provide a short description of your service<span className="text-danger">*</span></label>
                        <textarea className="form-control registrationInput2" id="organizationAbout" rows="3"></textarea>
                    </div>

                    <h3 className="my-4 heading3 mt-5">Account Information</h3>
                    <div className="mb-3">
                        <label htmlFor="contactName" className="form-label mt-2 OrganizationLabel">Full Name <span className="text-danger">*</span></label>
                        <input type="text" className="form-control registrationInput" id="contactName"  required="required" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contactEmail" className="form-label mt-2 OrganizationLabel">Email address <span className="text-danger">*</span></label>
                        <input type="email" className="form-control registrationInput" id="contactEmail" required="required" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contactNumber" className="form-label mt-2 OrganizationLabel">Mobile Number <span className="text-danger">*</span></label>
                        <input type="number" className="form-control registrationInput" id="contactNumber" required="required" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label OrganizationLabel">Password <span className="text-danger">*</span></label>
                        <input type="password" className="form-control registrationInput" id="password" required="required" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label OrganizationLabel">Confirm Password <span className="text-danger">*</span></label>
                        <input type="password" className="form-control registrationInput" id="confirmPassword" required="required" />
                    </div>
                    <div className="d-flex justify-content-around mt-5 my-4">
                        <input type="submit" className="btn btn-sm" value="Submit" />
                    </div>
                    <div>
                        <p className="registerParagraph mt-4 mb-4 text-dark">Already have an account? <a href={`/login?value=${value}`}className="signupLink">Login</a></p>
                    </div>
                    {/* <button type="submit" class="btn my-4">Submit</button> */}
                </form>

            </div>
            {/* <div className="mt-5"></div> */}
        </>
    );
};