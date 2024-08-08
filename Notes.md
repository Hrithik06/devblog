1. Why call dispatch logout(), when login fails it means there is no user then why dispatch logout()?
This will keep the state updated, even if login fails, dispatching logout() will make sure that state knows that user is not present.
