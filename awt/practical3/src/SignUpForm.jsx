import React,{useState} from "react";

const SighUpForm = () => {
    const [formData, setFormData] = useState({
        name : '',
        mobile : '',
        email : '',
        address : '',
        dob : '',
        gender : '',
        username : '',
        password : '',
        confirmPassword : ''
    });

    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false); // New state for form submission

    const validateForm = () => {
        const newErrors = {};
        let valid = true;

        if(!formData.name){
            newErrors.name = 'Name is required';
            valid = false;
        }

        if(!formData.mobile || !/^\d{10}$/.test(formData.mobile)){
            newErrors.mobile = 'Valid Mobile number is required';
            valid = false;
        }

        if(!formData.email || !/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(formData.email)){
            newErrors.email = 'Valid Email is required';
            valid = false;
        }

        if(!formData.address){
            newErrors.address = 'Address is required';
            valid = false;
        }

        if(!formData.dob){
            newErrors.dob = 'Date of Birth is required';
            valid = false;
        }

        if(!formData.gender){
            newErrors.gender = 'Gender is required';
            valid = false;
        }

        if(!formData.username){
            newErrors.username = 'Username is required';
            valid = false;
        }

        if(!formData.password){
            newErrors.password = 'Password is required';
            valid = false;
        }

        if(!formData.confirmPassword || formData.password !== formData.confirmPassword){
            newErrors.confirmPassword = 'Password does not match';
            valid = false;
        }

        setErrors(newErrors);
        setIsFormValid(valid);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value });
        if (formSubmitted) {
            validateForm();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true); // Set formSubmitted to true on submit
        validateForm();
        if(isFormValid){
            alert('Form Submitted Successfully');
            console.log(formData);
        }
    };

    const handleReset = () => {
        setFormData({
            name : '',
            mobile : '',
            email : '',
            address : '',
            dob : '',
            gender : '',
            username : '',
            password : '',
            confirmPassword : ''
        });

        setErrors({});
        setIsFormValid(false);
        setFormSubmitted(false);
    }

    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto bg-light rounded-xl shadow-lg border border-primary">
            <h2 className="text-center mb-4 text-primary">Sign Up</h2>
            <div className="mb-3">
                <label className="form-label">Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" />
                {formSubmitted && errors.name && <span className="text-danger">{errors.name}</span>}
            </div>

            <div className="mb-3">
                <label className="form-label">Mobile:</label>
                <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} className="form-control" />
                {formSubmitted && errors.mobile && <span className="text-danger">{errors.mobile}</span>}
            </div>

            <div className="mb-3">
                <label className="form-label">Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" />
                {formSubmitted && errors.email && <span className="text-danger">{errors.email}</span>}
            </div>

            <div className="mb-3">
                <label className="form-label">Address:</label>
                <textarea name="address" value={formData.address} onChange={handleChange} className="form-control" />
                {formSubmitted && errors.address && <span className="text-danger">{errors.address}</span>}
            </div>

            <div className="mb-3">
                <label className="form-label">Date of Birth:</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="form-control" />
                {formSubmitted && errors.dob && <span className="text-danger">{errors.dob}</span>}
            </div>

            <div className="mb-3">
                <label className="form-label">Gender:</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="form-select">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                {formSubmitted && errors.gender && <span className="text-danger">{errors.gender}</span>}
            </div>

            <div className="mb-3">
                <label className="form-label">Username:</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} className="form-control" />
                {formSubmitted && errors.username && <span className="text-danger">{errors.username}</span>}
            </div>

            <div className="mb-3">
                <label className="form-label">Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" />
                {formSubmitted && errors.password && <span className="text-danger">{errors.password}</span>}
            </div>

            <div className="mb-3">
                <label className="form-label">Confirm Password:</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="form-control" />
                {formSubmitted && errors.confirmPassword && <span className="text-danger">{errors.confirmPassword}</span>}
            </div>

            <div className="d-flex justify-content-between">
                <button type="reset" onClick={handleReset} className="btn btn-secondary">Reset</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
            {formSubmitted && !isFormValid && (
                <div className="mt-3">
                    <p className="text-danger">Please fix the errors above before submitting the form.</p>
                </div>
            )}
        </form>
    );
};

export default SighUpForm;