



// ------------- Archived - See Admin section  -------------------

// import { useState, useEffect } from "react";
// import useStore from "../../zustand/store";

// function RegisterPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [role, setRole] = useState("");
//   const [department, setDepartment] = useState("");

//   const register = useStore((state) => state.register);
//   const errorMessage = useStore((state) => state.authErrorMessage);
//   const setAuthErrorMessage = useStore((state) => state.setAuthErrorMessage);

//   useEffect(() => {
//     // Clear the auth error message when the component unmounts:
//     return () => {
//       setAuthErrorMessage("");
//     };
//   }, []);

//   const handleRegister = (event) => {
//     event.preventDefault();

//     register({
//       username: username,
//       password: password,
//       email: email,
//       firstName: firstName,
//       lastName: lastName,
//       role: role,
//       department: department,
//     });
//   };

//   return (
//     <>
//       <h2>Register Page</h2>
//       <form onSubmit={handleRegister}>
//         <label htmlFor="username">Username:</label>
//         <input
//           type="text"
//           id="username"
//           required
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <label htmlFor="firstName">First Name:</label>
//         <input
//           type="text"
//           id="firstName"
//           required
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//         />{" "}
//         <label htmlFor="lastName">Last Name:</label>
//         <input
//           type="text"
//           id="lastName"
//           required
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//         />{" "}
//         <label htmlFor="role">Role:</label>
//         <input
//           type="text"
//           id="role"
//           required
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//         />{" "}
//         <label htmlFor="department">Department:</label>
//         <input
//           type="text"
//           id="department"
//           required
//           value={department}
//           onChange={(e) => setDepartment(e.target.value)}
//         />
//         <button type="submit">Register</button>
//       </form>
//       {
//         // Conditionally render registration error:
//         errorMessage && <h3>{errorMessage}</h3>
//       }
//     </>
//   );
// }

// export default RegisterPage;
