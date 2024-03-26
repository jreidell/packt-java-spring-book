import { useState } from "react";

function FirstForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        alert(`Hello ${firstName} ${lastName}`);
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>First Name </label>
            <input type="text" name="firstName" onChange={e => setFirstName(e.target.value)} value={firstName} /><br />
            <label>Last Name </label>
            <input type="text" name="lastName" onChange={e => setLastName(e.target.value)} value={lastName} /><br />
            <label>Email </label>
            <input type="email" name="email" onChange={e => setEmail(e.target.value)} value={email} /><br />
            <input type="submit" value="Press me" />
        </form>
    );
}

export default FirstForm;