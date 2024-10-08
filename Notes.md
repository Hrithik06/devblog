1. Why call dispatch logout(), when login fails it means there is no user then why dispatch logout()?\
   This will keep the state updated, even if login fails, dispatching logout() will make sure that state knows that user is not present.

2. Usecase of forwardRef and useRef.?\
   Say we have a login form and there are input fields for email/username, password, here we are using input fields from Input component but the state of these components is not accessble to Login form, so we make use of useRef and forwardRef so that we can access state of these Input fields.\
   forwardRef in React allows a parent component to manipulate or interact with a child component's DOM node or instance directly. Without forwardRef, when a child component is wrapped in another component (e.g., a higher-order component or a custom component), the parent component would not be able to access the child's DOM node or instance using a ref. This is because the ref is not automatically forwarded to the child component. By using forwardRef, the child component can explicitly forward the ref to its underlying DOM element or instance, allowing the parent component to access and manipulate it as needed.

3. React-hook-form\
   In register "name" is very imp as it corresponds to appwrite method parameters

```javascript
{...register("name",{
required: true,
})}
```

4. In AuthLayout there is\
   By default `authnetication` is `true` even if user doesn't send anything. In `if` condition we check if `authentication` is not equal to `authStatus` which comes from redux-store, if `authStatus==false` then `true && false!==true => true && true` gives `true` then redirected to login page cuz not authenticated. In `elseif` we check for `!authentication` which gives `false` and if `authStatus==true` then `true!==true => false` then `false && false`

```javascript
useEffect(() => {
    if (authentication && authStatus !== authentication) {
        navigate('/login');
    } else if (!authentication && authStatus !== authentication) {
        navigate('/');
    }
}, [authStatus, authentication, navigate]);
```

5. What is control and Controller?\
   `control` comes from react-hook-form it is responsible to take data from RTE to the PostForm. The control of the RTE or any element is passed on to the parent which calls its. Wrap the DOM element to be controlled inside.
    ```javascript
    <Controller control={control}  name="" render={({ field: { onChange } }) => (<div onChange={onChange}></div>)}
    ```
    Controller has name, control and render(which returns the element, and attaches the event) takes a callback function. In `field` we mention the type of event to be tracked, `onChange` tracks changes in the DOM element. onChange from Controller field is a function which sends the input's value to the library. It should be assigned to the onChange prop of the input and value should not be undefined. In case of RTE `onEditorChange={onChange0`
